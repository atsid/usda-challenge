"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:Map');
import MapControl from "./map_controls/MapControl";
import OverlaySelector from "./map_controls/OverlaySelector";

let MapComponent = React.createClass({
    getInitialState() {
        return {
            initialCenter: {lat: 42, lng: -94},
            initialZoom: 7,
        };
    },

    componentDidMount () {
        const mapNode = ReactDOM.findDOMNode(this.refs.map);
        const map = this.map = new google.maps.Map($(mapNode)[0], {
            center: this.state.initialCenter,
            zoom: this.state.initialZoom,
        });

        const overlaySelector = new MapControl((<OverlaySelector/>));
        overlaySelector.register(map, google.maps.ControlPosition.LEFT, 1);
    },

    setCenter(center) {
        if (this.map && center) {
            this.map.setCenter(center);
        }
    },

    enable(shape) {
      shape.setMap(this.map);
    },

    disable(shape) {
      shape.setMap(null);
    },

    setBounds(bounds) {
        if (this.map && bounds) {
            const gbounds = new google.maps.LatLngBounds(bounds.sw, bounds.ne);
            this.map.fitBounds(gbounds);
        }
    },

    render() {
        return (
            <div ref="map" className="map"></div>
        );
    }
});
module.exports = MapComponent;