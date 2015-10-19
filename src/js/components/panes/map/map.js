"use strict";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:Map');
import MapControl from "./map_controls/MapControl";
import OverlaySelector from "./map_controls/OverlaySelector";

let MapComponent = React.createClass({
    propTypes: {
        onCenterChange: React.PropTypes.func.isRequired,
        onZoomChange: React.PropTypes.func.isRequired,
        location: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            initialCenter: {lat: this.props.location.lat, lng: this.props.location.lng},
            initialZoom: this.props.location.zoom
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

        map.addListener('center_changed', _.debounce(() => {
            const newCenter = {
                lat: map.center.lat(),
                lng: map.center.lng()
            };
            this.props.onCenterChange(newCenter);
        }, 150));

        map.addListener('zoom_changed', _.debounce(() => {
            const zoom = map.zoom;
            this.props.onZoomChange(zoom);
        }, 150));
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