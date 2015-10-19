"use strict";

import _ from "lodash";
import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import MapPane from './panes/map/main';
import CropMetricsPane from './panes/cropmetrics/main';

import debugFactory from "debug";
const debug = debugFactory('app:components:Dashboard');

let DashboardComponent = React.createClass({

    contextTypes: {
        location: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        const query = this.context.location.query;
        debug('getting initial state from query: ', query);
        const state = query.state || 'IA';
        const lat = parseFloat(query.lat) || 42.0046;
        const lng = parseFloat(query.lng) || -93.214;
        const zoom = parseFloat(query.zoom) || 7;
        const year = parseInt(query.year) || 2012;
        return {state, year, location: {lat, lng, zoom}};
    },

    pushLocation() {
        const state = this.state;
        const query = {
            year: state.year,
            state: state.state,
            lat: state.location.lat,
            lng: state.location.lng,
            zoom: state.location.zoom,
        };
        const newQuery = _.merge(this.context.location.query, query);
        this.context.history.pushState(null, "/dashboard", newQuery);
    },

    handleCenterChange(center) {
        debug('handling center change');
        this.setState(_.merge(this.state, {location: center}));
        this.pushLocation();
    },

    handleZoomChange(zoom) {
        debug('handling zoom change');
        this.setState(_.merge(this.state, {location: {zoom}}));
        this.pushLocation();
    },

    handleStateChange(state) {
        debug('handling state change');
        this.setState(_.merge(this.state, {state}));
        this.pushLocation();
    },

    handleYearChange(year) {
        debug('handling year change');
        this.setState(_.merge(this.state, {year}));
        this.pushLocation();
    },

    render() {
        debug('rendering dashboard', this.state);
        return (
            <Grid style={{width: "100%"}}>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <MapPane
                            onCenterChange={this.handleCenterChange}
                            onZoomChange={this.handleZoomChange}
                            onStateChange={this.handleStateChange}
                            onYearChange={this.handleYearChange}
                            year={this.state.year}
                            state={this.state.state}
                            location={this.state.location}/>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <CropMetricsPane state={this.state.state} location={this.state.location}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = DashboardComponent;
