"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
import GoogleMap from "react-google-maps/lib/GoogleMap";
const debug = debugFactory('app:components:Map');

const DEFAULT_ZOOM = 7;
const DEFAULT_CENTER = {lat: 42, lng: -94};

let MapComponent = React.createClass({
    getInitialState() {
        return {
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
        }
    },

    setCenter(center) {
        if (center) {
            debug('received new center', center);
            this.setState({center});
        }
    },

    setBounds(bounds) {
        if (bounds) {
            debug('received new bounds', bounds, this.map);
            const gbounds = new google.maps.LatLngBounds(bounds.sw, bounds.ne);
            this.refs.gmap.fitBounds(gbounds);
        }
    },

    render() {
        return (
            <div className="mapContainer">
                <GoogleMap ref="gmap" containerProps={{ style: { height: "100%", minHeight: "500px" }}}
                           defaultZoom={DEFAULT_ZOOM}
                           defaultCenter={DEFAULT_CENTER}
                           center={this.state.center}
                           zoom={this.state.zoom}>
                </GoogleMap>
            </div>
        );
    }
});
module.exports = MapComponent;