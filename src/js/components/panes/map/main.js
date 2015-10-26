"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:MapPane');
const stateData = require('./states');
import {Grid, Row, Col, Button, PageHeader, Input, Glyphicon, DropdownButton, MenuItem, Panel} from "react-bootstrap";

import Map from "./map";
import YearSelector from "./YearSelector";
import StateSelector from "./StateSelector";
import ActivitiesPerformed from "./ActivitiesPerformed";

let MapPaneComponent = React.createClass({

    propTypes: {
        onCenterChange: React.PropTypes.func.isRequired,
        onStateChange: React.PropTypes.func.isRequired,
        onZoomChange: React.PropTypes.func.isRequired,
        onYearChange: React.PropTypes.func.isRequired,
        state: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        zoom: React.PropTypes.number.isRequired,
        year: React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            acquiringLocation: false,
        };
    },

    componentDidMount() {
        this.initialLoadState(stateData.statesByCode[this.props.state]);
    },

    onLocateMe() {
        //TODO: need to use geocoding to lookup state from coords
        this.setState({selectedState: null});
        if (navigator.geolocation) {
            this.setState({acquiringLocation: true});
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({acquiringLocation: false});
                const center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.refs.map.setCenter(center);
                // TODO: signal state change using geocoding
                this.props.onCenterChange(center);
            });
        } else {
            this.setState({alert: "Geolocation is not supported by this browser."});
        }
    },

    initialLoadState(state) {
        debug('loading initial state', state);
        this.setState({selectedState: state});
        this.refs.map.enable(state.polygon);
        this.props.onStateChange(state.code);
    },

    loadState(state, requestedBounds) {
        debug('loading state', state);

        // Default to the state bounds
        let bounds = {
            sw: {
                lat: state.bounds.minLat,
                lng: state.bounds.minLng,
            },
            ne: {
                lat: state.bounds.maxLat,
                lng: state.bounds.maxLng,
            }
        };
        // If we have some bounds that have been requested by the state selector
        if (requestedBounds) {
            // We only have a center point, do some finagling to get it to center better
            if (requestedBounds.c) {
                bounds = {
                    // Some magic numbers to get a closer view on a given item
                    sw: {
                        lat: requestedBounds.c.lat * .9999,
                        lng: requestedBounds.c.lng * 1.0001
                    },
                    ne: {
                        lat: requestedBounds.c.lat * 1.0001,
                        lng: requestedBounds.c.lng * .9999
                    }
                }
            } else {

                // We have a rectangular bounds use that
                bounds = requestedBounds;
            }
        }

        if (this.state.selectedState) {
            this.refs.map.disable(this.state.selectedState.polygon);
        }

        this.setState({selectedState: state});
        this.refs.map.enable(state.polygon);
        this.refs.map.setBounds(bounds);

        this.props.onStateChange(state.code);
    },

    onSelectState(state, bounds) {
        if (state) {
            debug('Selected State', state);
            this.loadState(state, bounds);
            this.onStateChange(state);
        }
    },

    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">Where's your farm?</h4>
                    <StateSelector onStateSelected={this.onSelectState} />
                </div>
                <div className="yearSelectorContainer">
                    <YearSelector
                        year={this.props.year}
                        onYearChange={this.props.onYearChange}
                    />
                </div>
                <div className="mapContainer">
                    <Map ref="map"
                         year={this.props.year}
                         lat={this.props.lat}
                         lng={this.props.lng}
                         zoom={this.props.zoom}
                         onCenterChange={this.props.onCenterChange}
                         onZoomChange={this.props.onZoomChange}/>
                </div>
                <ActivitiesPerformed state={this.props.state} year={this.props.year} />
            </div>
        );
    }
});
module.exports = MapPaneComponent;