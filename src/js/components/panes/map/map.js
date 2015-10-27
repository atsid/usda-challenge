"use strict";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:Map');

import MapControl from "./map_controls/MapControl";
import OverlaySelector from "./map_controls/OverlaySelector";
import WaitSpinner from "./map_controls/WaitSpinner";

let MapComponent = React.createClass({
    propTypes: {
        year: React.PropTypes.number.isRequired,
        onCenterChange: React.PropTypes.func.isRequired,
        onZoomChange: React.PropTypes.func.isRequired,
        onBoundsChange: React.PropTypes.func.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        zoom: React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            initialCenter: {lat: this.props.lat, lng: this.props.lng},
            initialZoom: this.props.zoom
        };
    },

    componentDidMount () {
        const map = this.map = this.createMap();
        let onLoadingChange = {handle: null};
        const registerVisibleCallback = (cb) => onLoadingChange.handle = cb;
        const waitSpinnerComponent = (<WaitSpinner visible={false} visibleCallback={registerVisibleCallback} />);

        const updateYear = (cb) => this.state.yearCallback = cb;

        const overlayComponent = (
            <OverlaySelector
                map={map}
                onLoadingChange={onLoadingChange}
                onYearUpdate={updateYear}
            />);

        const overlaySelector = new MapControl(overlayComponent);
        const waitSpinner = new MapControl(waitSpinnerComponent);
        overlaySelector.register(map, google.maps.ControlPosition.LEFT_BOTTOM, 1);
        waitSpinner.register(map, google.maps.ControlPosition.BOTTOM, 2);
    },

    componentWillReceiveProps (nextProps) {
        this.state.yearCallback(nextProps.year);
    },

    createMap() {
        const mapNode = ReactDOM.findDOMNode(this.refs.map);
        const map = new google.maps.Map($(mapNode)[0], {
            center: this.state.initialCenter,
            zoom: this.state.initialZoom,
            mapTypeControl: false,
            streetViewControl: false,
        });
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
        map.addListener('bounds_changed', _.debounce(() => {
            const bounds = map.getBounds();
            this.props.onBoundsChange({
                sw: {
                    lat: bounds.getSouthWest().lat(),
                    lng: bounds.getSouthWest().lng()
                },
                ne: {
                    lat: bounds.getNorthEast().lat(),
                    lng: bounds.getNorthEast().lng()
                }
            });
        }));
        return map;
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