"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:Map');

let MapComponent = React.createClass({
    getInitialState() {
        return {
            center: {lat: 42, lng: -94},
            zoom: 7,
        };
    },

    componentDidMount () {
        const mapNode = ReactDOM.findDOMNode(this.refs.map);
        const map = new google.maps.Map($(mapNode)[0], {
            center: this.state.center,
            zoom: this.state.zoom,
        });
        map.addListener('bounds_changed', () => { debug('bounds changed'); });
        map.addListener('center_changed', () => { debug('center changed'); });
        this.map = map;
    },

    onGeoLocate(geoPosition) {
        const coords = geoPosition.coords;
        const newCenter = {lat: coords.latitude, lng: coords.longitude};
        this.setState({center: newCenter});
    },

    render() {
        debug('rendering map view', this.state);
        const map = this.map;
        if (map) {
            if (this.state.center) {
                map.setCenter(this.state.center);
            }
        }
        return (
            <div className="mapContainer">
                <div ref="map" className="map"></div>
            </div>
        );
    }
});
module.exports = MapComponent;