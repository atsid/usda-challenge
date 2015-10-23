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
        location: React.PropTypes.object.isRequired,
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

    loadState(state) {
        debug('loading state', state);
        const bounds = {
            sw: {
                lat: state.bounds.minLat,
                lng: state.bounds.minLng,
            },
            ne: {
                lat: state.bounds.maxLat,
                lng: state.bounds.maxLng,
            },
        };

        if (this.state.selectedState) {
            this.refs.map.disable(this.state.selectedState.polygon);
        }

        this.setState({selectedState: state});
        this.refs.map.enable(state.polygon);
        this.refs.map.setBounds(bounds);
        this.props.onStateChange(state.code);
    },

    onSelectState(state) {
        if (state) {
            debug('Selected State', state);
            this.loadState(state);
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
                         location={this.props.location}
                         onCenterChange={this.props.onCenterChange}
                         onZoomChange={this.props.onZoomChange}/>
                </div>
                <ActivitiesPerformed state={this.props.state} year={this.props.year} />
            </div>
        );
    }
});
module.exports = MapPaneComponent;