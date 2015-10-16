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

    setCenter(center) {
        if (this.map && center) {
            debug('received new center', center);
            this.map.setCenter(center);
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