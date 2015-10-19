"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:MapPane');

import {Grid, Row, Col, Button, PageHeader, Input, Glyphicon, DropdownButton, MenuItem, Panel} from "react-bootstrap";
import Map from "./map";
import YearSelector from "./YearSelector";
import StateSelector from "./StateSelector";

let MapPaneComponent = React.createClass({

    propTypes: {
        onLocationChange: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            acquiringLocation: false,
        };
    },

    componentDidMount() {
        if (this._initialState) {
            this.loadState(this._initialState);
            delete this._initialState;
        }
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
                this.props.onLocationChange({
                    state: this.selectedState ? this.selectedState.code : 'IA', //TEMP to handle missing state
                    location: center
                });
            });
        } else {
            this.setState({alert: "Geolocation is not supported by this browser."});
        }
    },

    loadState(state) {
        const center = {lat: state.lat, lng: state.lng};
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
        this.refs.map.setCenter(center);
        this.refs.map.setBounds(bounds);
        this.props.onLocationChange({
            state: state.code,
            location: center
        });
    },

    onSelectState(state) {
        debug('Selected State', state);
        if (state) {
            if (!this.refs.map) {
                this._initialState = state;
            } else {
                this.loadState(state);
            }
        }
    },


    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">Where's your farm?</h4>
                    <Button
                        id="locateMe"
                        className="paneHeaderContent firstAction"
                        onClick={this.onLocateMe}
                        disabled={this.state.acquiringLocation}>
                        <Glyphicon glyph="map-marker"/>
                        &nbsp;{this.state.acquiringLocation ? "Locating..." : "Locate Me"}&nbsp;
                    </Button>
                    <span>&nbsp;or&nbsp;</span>
                    <StateSelector onStateSelected={this.onSelectState}/>
                </div>
                <div className="yearSelectorContainer">
                    <YearSelector/>
                </div>
                <div className="mapContainer">
                    <Map ref="map" />
                </div>
                <Panel>
                    <h4>Activities Performed</h4>
                </Panel>
            </div>
        );
    }
});
module.exports = MapPaneComponent;