"use strict";
import Layer from './Layer';
import ImageTile from './ImageTile';
import ColorTile from './ColorTile';
import request from 'superagent';
import debugFactory from "debug";
const debug = debugFactory('app:layers:VegetationLayer');

const VEGETATION_GRANULARITY = 80;
const MIN_ZOOM = 8;

let genIndex = 0;
let postReq = null, getReq = null;

class VegetationLayer extends Layer {
    constructor(map, isVisible) {
        super(map, isVisible);
        this.year = 2014;
        this.onLoadingChangeCallbacks =[];
        this.onDataLoadedCallbacks =[];
    }

    setYear(year) {
        if (this.year !== year) {
            this.year = year;
            this.rerender();
        }
    }

    generateMapArtifacts(map) {
        let currentIndex = ++genIndex;
        if (postReq) {
            debug('veg post request aborted');
            postReq.abort();
            postReq = null;
        }
        if (getReq) {
            debug('veg get request aborted');
            getReq.abort();
            getReq = null;
        }

        const bounds = map.getBounds();
        this.emitLoadingChange(true);
        return this.initiateDataRequest(bounds)
            .then((data) => this.receiveData(data, currentIndex))
            .then((data) => this.presentVegetationData(data, map, currentIndex))
            .catch((err) => debug('Vegetation Layer Error', err));
    }

    onLoadingChange(cb) {
        this.onLoadingChangeCallbacks.push(cb);
    }

    onDataLoaded(cb) {
        this.onDataLoadedCallbacks.push(cb);
    }

    emitLoadingChange(value) {
        this.onLoadingChangeCallbacks.forEach((cb) => {
            if (cb && cb.handle) {
                cb.handle(value);
            }
        });
    }

    emitOnDataLoaded(min, max) {
        this.onDataLoadedCallbacks.forEach((cb) => {
            if (cb) {
                cb(min, max);
            }
        });
    }

    initiateDataRequest(bounds) {
        const { minLat, maxLat, minLng, maxLng } = this.extractBounds(bounds);

        return new Promise((resolve, reject) => {
            const lats = this.dimensionRange(minLat, maxLat);
            const lngs = this.dimensionRange(minLng, maxLng);
            const payload = {
                "EnvironmentVariableName": "VegScape",
                "Domain": {
                    "SpatialRegionType": "CellGrid",
                    "Lats": lats,
                    "Lons": lngs,
                    "TimeRegion": {
                        "Years": [this.year],
                        "Days": [210, 213],
                        "Hours": [0, 24],
                        "IsIntervalsGridYears": false,
                        "IsIntervalsGridDays": true,
                        "IsIntervalsGridHours": true
                    }
                },
                "ParticularDataSources": {},
                "ReproducibilityTimestamp": 253404979199999
            };
            const url = "http://fetchclimate2-dev.cloudapp.net/api/compute";
            debug('requesting new vegetation data');
            postReq = request.post(url)
                .send(payload)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        debug("Error Requesting Veg. Data", err);
                        reject(err);
                    }
                    debug('received vegetation data info');
                    postReq = null;
                    const dataUri = res.text.replace(/"/g, '').substring('completed='.length).trim();
                    resolve(dataUri);
                });
        });
    }

    receiveData(dataUri, currentIndex) {
        if (genIndex !== currentIndex) {
            debug(`vegetation load #${currentIndex} aborted`);
            return;
        }

        debug(`retrieving vegetation data result: [${dataUri}]`);
        const url = `http://fetchclimate2-dev.cloudapp.net/jsproxy/data?uri=${encodeURIComponent(dataUri)}&variables=lat,lon,values`;
        return new Promise((resolve, reject) => {
            debug('receiving vegetation data');
            getReq = request.get(url).end((err, res) => {
                getReq = null;
                if (err) {
                    debug("Error Unpacking Veg. Data", err);
                    reject(err);
                } else {
                    debug('received vegetation data', res.body);
                    resolve(res.body);
                }
            });
        });
    }

    presentVegetationData(data, map, currentIndex) {
        if (genIndex !== currentIndex) {
            debug(`vegetation load #${currentIndex} aborted`);
            return;
        }
        const newArtifacts = [];
        let min = 255;
        let max = 0;

        for (let lngIndex = 0; lngIndex < data.values.length; lngIndex++) {
            for (let latIndex = 0; latIndex <= data.values[lngIndex].length; latIndex++) {
                const vegValue = data.values[lngIndex][latIndex];
                if (vegValue > max) {
                    max = vegValue;
                }
                if (vegValue < min) {
                    min = vegValue;
                }
            }
        }

        for (let lngIndex = 0; lngIndex < data.values.length; lngIndex++) {
            for (let latIndex = 0; latIndex <= data.values[lngIndex].length; latIndex++) {
                const vegValue = data.values[lngIndex][latIndex];
                var tileBounds = this.getTileBounds(data, latIndex, lngIndex);
                const tile = this.vegetationTile(vegValue, min, max, map, tileBounds);
                if (tile) {
                    newArtifacts.push(tile);
                }
            }
        }

        this.emitOnDataLoaded(min, max);
        this.clear();
        this.artifacts = newArtifacts;
        this.emitLoadingChange(false);
    }

    getTileBounds(data, latIndex, lngIndex) {
        return new google.maps.LatLngBounds(
            new google.maps.LatLng(data.lat[latIndex], data.lon[lngIndex]),
            new google.maps.LatLng(data.lat[latIndex + 1], data.lon[lngIndex + 1]));
    }

    vegetationTile(value, min, max, map, tileBounds) {
        if (value) {
            const color = this.getVegitationOpacity(value, min, max);
            return new ColorTile(tileBounds, map, 'rgb(77,127,23)', color * .8);
        }
    }

    getVegitationOpacity(value, min, max) {
        var diff = max - min;
        const normalize = (v) => {
            const p = ((v - min) / diff);
            return p;
        };
        return normalize(value);
    }

    dimensionRange(min, max) {
        const increment = Math.abs(max - min) / VEGETATION_GRANULARITY;
        const result = [];
        for (let v = min; v <= max; v += increment) {
            result.push(v);
        }
        return result;
    }

    extractBounds(bounds) {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        return {
            minLat: sw.lat(),
            maxLat: ne.lat(),
            minLng: sw.lng(),
            maxLng: ne.lng()
        };
    }
}

export default VegetationLayer;
