"use strict";
const request = require('superagent');
const debug = require('debug')('app:stores:ActivityStore');
const cache = {};

const KNOWN_ACTIVITIES = {
    herbicide: 'herbicide',
    manure: 'manure',
    pesticide: 'pesticide',
    insecticide: 'pesticide'
};

export default class ActivityStore {

    getActivities(stateCode, year) {
        if (cache[stateCode]) {
            return Promise.resolve(cache[stateCode][year] || []);
        }
        return this._loadStateData(stateCode)
            .then(() => cache[stateCode][year] || []);
    }

    getYearsForState(stateCode) {
        return Object.keys(cache[stateCode]);
    }

    _loadStateData(stateCode) {
        return this._getActivitiesInState(stateCode)
            .then(this._parseCsv)
            .then((activities) => {
                cache[stateCode] = {};
                for (let i = 1; i < activities.data.length; i++) {
                    const datum = this._createActivityDatum(activities.data[i]);
                    if (datum.name) {
                        const year = datum.year;
                        if (!cache[stateCode][year]) {
                            cache[stateCode][year] = [];
                        }
                        cache[stateCode][year].push(datum);
                    }
                }
            });
    }

    _createActivityDatum(row) {
        const name = row[0];
        const year = row[1];
        const percent = parseFloat(row[2]);
        const imageUrl = this._getActivityImageUrl(name);
        return {name, percent, year, imageUrl};
    }

    _getActivityImageUrl(name) {
        const lcName = name.toLowerCase();
        const icon = KNOWN_ACTIVITIES[lcName] || 'misc';
        return `src/img/icons/activities/${icon}.png`;
    }

    _getActivitiesInState(stateCode) {
        return new Promise((resolve, reject) => {
            request.get(`/usda-challenge/data/activities/${stateCode.toUpperCase()}/activities.csv`)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.text);
                    }
                });
        });
    }

    _parseCsv(text) {
        return Papa.parse(text);
    }
}