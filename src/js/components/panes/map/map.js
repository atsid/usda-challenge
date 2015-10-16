"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:Map');

let MapComponent = React.createClass({
    getInitialState() {
        return {
            initialCenter: {lat: 42, lng: -94},
            initialZoom: 7,
        };
    },

    componentDidMount () {
        const mapNode = ReactDOM.findDOMNode(this.refs.map);
        const map = new google.maps.Map($(mapNode)[0], {
            center: this.state.initialCenter,
            zoom: this.state.initialZoom,
        });
        this.map = map;
    },

    setPosition(geoPosition) {
        if (this.map && geoPosition && geoPosition.coords) {
            const coords = geoPosition.coords;
            const newCenter = {lat: coords.latitude, lng: coords.longitude};
            this.map.setCenter(newCenter);
        }
    },

    render() {
        return (
            <div className="mapContainer">
                <div ref="map" className="map"></div>
            </div>
        );
    }
});
module.exports = MapComponent;