"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:Map');

let MapComponent = React.createClass({
    propTypes: {
        geoPosition: React.PropTypes.object,
    },

    componentDidMount () {
        const mapNode = ReactDOM.findDOMNode(this.refs.map);
        const map = new google.maps.Map($(mapNode)[0], {
            center: this.getCenter(),
            zoom: this.getZoom()
        });
        google.maps.event.addListener(map, 'bounds_changed', () => {
            var bounds = map.getBounds();
        });
        this.map = map;
    },

    getCenter() {
        const geoPosition = this.props.geoPosition;
        if (geoPosition) {
            const coords = geoPosition.coords;
            debug('coords: ', coords);
            return {lat: coords.latitude, lng: coords.longitude};
        } else {
            return {lat: 42, lng: -94};
        }
    },

    getZoom() {
        return 7;
    },


    render() {
        debug('rendering map view', this.state);
        const map = this.map;
        if (map) {
            map.setCenter(this.getCenter());
        }
        return (
            <div className="mapContainer">
                <div ref="map" className="map"></div>
            </div>
        );
    }
});
module.exports = MapComponent;