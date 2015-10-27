"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Panel, Jumbotron, Button, Input} from "react-bootstrap";

import debugFactory from "debug";
const debug = debugFactory('app:components:SplashPage');

import Navigation from './Navigation';
import MapPane from './panes/map/main';
import CropMetricsPane from './panes/cropmetrics/main';
import stateData from './panes/map/states';

import CropStore from '../stores/CropStore';
import ActivityStore from '../stores/ActivityStore';
import MonthlyRainfallDataSource from "../datasources/monthlyRainfall";
import Average30RainfallDataSource from "../datasources/average30Rainfall";
import StationDataSource from "../datasources/stations";
import CropYieldsDataSource from "../datasources/cropYieldsByCrop";
import RainfallDataSource from "../datasources/rainfall";

let SplashPageComponent = React.createClass({
    contextTypes: {
        location: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    },

    childContextTypes: {
        cropStore: React.PropTypes.object,
        activityStore: React.PropTypes.object,
        monthlyRainfallDataSource: React.PropTypes.object,
        average30RainfallDataSource: React.PropTypes.object,
        stationDataSource: React.PropTypes.object,
        cropYieldsDataSource: React.PropTypes.object,
        rainfallDataSource: React.PropTypes.object,
    },

    getInitialState() {
        const query = this.context.location.query;
        const state = query.state || 'IA';
        const lat = parseFloat(query.lat) || 42.0046;
        const lng = parseFloat(query.lng) || -93.214;
        const zoom = parseFloat(query.zoom) || 4;
        const year = parseInt(query.year) || 2014;
        const radius = 100;
        const crop = query.crop || 'corn';
        return {state, year, lat, lng, zoom, crop, radius};
    },

    getChildContext() {
        return {
            cropStore: new CropStore(),
            activityStore: new ActivityStore(),
            monthlyRainfallDataSource: new MonthlyRainfallDataSource(),
            average30RainfallDataSource: new Average30RainfallDataSource(),
            stationDataSource: new StationDataSource(),
            cropYieldsDataSource: new CropYieldsDataSource(),
            rainfallDataSource: new RainfallDataSource(),
        };
    },

    componentDidMount() {
        //connect google maps input
        let input = ReactDOM.findDOMNode(this.refs.searchInput);
        let searchBox = new google.maps.places.Autocomplete(input);

        //TODO: this "functions" but not with autocomplete, so the place is undefined
        debug('maps autocomplete', searchBox);
        google.maps.event.addListener(searchBox, 'place_changed', function () {
            var places = searchBox.getPlace();
            debug('place', places);
        });
    },

    pushLocation() {
        const state = this.state;
        const query = {
            year: state.year,
            state: state.state,
            lat: state.lat,
            lng: state.lng,
            zoom: state.zoom,
            radius: state.radius,
        };
        const newQuery = _.merge(this.context.location.query, query);
        this.context.history.pushState(null, "/", newQuery);
    },

    handleCenterChange(center) {
        debug('handling center change');
        this.setState(_.merge(this.state, {lat: center.lat, lng: center.lng}));
        this.pushLocation();
    },

    handleZoomChange(zoom) {
        debug('handling zoom change');
        this.setState(_.merge(this.state, {zoom}));
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

    handleCropChange(crop) {
        debug('handling crop change');
        this.setState(_.merge(this.state, {crop}));
        this.pushLocation();
    },

    handleBoundsChange(bounds) {
        debug('handling bounds change');
        // Roughly calculate the bounding box's width and height in miles
        const mLat = 69.0 * Math.abs(bounds.ne.lat - bounds.sw.lat);
        const mLng = 54.6 * Math.abs(bounds.ne.lat - bounds.sw.lng);
        const radius = parseFloat(Math.max(Math.min(mLat, mLng), 100).toFixed(2));
        this.setState(_.merge(this.state, {radius}));
        this.pushLocation();
    },

    render() {
        return (
            <div>
                <Navigation />
                <header>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in">Harness the power of data to feed the world</div>
                            <div className="intro-heading">We make USDA data meaningful to you.</div>
                        </div>
                    </div>
                </header>
                <section id="info">
                    <div className={"mainDescriptionContainer"}>
                        <div className={"mainDescription"}>See how soil type and crop growth are related on a map of your farm land.
                            <img src="src/img/icons/soil.png"/>
                        </div>
                        <div className={"mainDescription"}>
                            <img src="src/img/icons/drop2.png"/>
                            Get a sense for how much your farm produces in different rainfall conditions.
                        </div>
                    </div>
                </section>
                <div className={"delimeterBar"}>
                    <section id="delimeterBar1" className="container">
                        <div className={"headingNumber"}>1</div>
                        <div className={"headingText"}>Get a bird’s eye view of the land in your community. Discover how
                            densely
                            crops grow in different soil types and what activities are performed in your state.
                        </div>
                    </section>
                </div>
                <section id="map" className="container">
                    <MapPane
                        onCenterChange={this.handleCenterChange}
                        onZoomChange={this.handleZoomChange}
                        onStateChange={this.handleStateChange}
                        onYearChange={this.handleYearChange}
                        onBoundsChange={this.handleBoundsChange}
                        year={this.state.year}
                        state={this.state.state}
                        lat={this.state.lat}
                        lng={this.state.lng}
                        zoom={this.state.zoom} />
                </section>
                <div className={"delimeterBar"}>
                    <section id="delimeterBar2" className="container">
                        <div className={"headingNumber"}>2</div>
                        <div className={"headingText"}>Learn from experience how your crops and your grandparents’
                            crops performed in tough weather conditions.
                        </div>
                    </section>
                </div>

                <section id="metrics" className="container">
                    <CropMetricsPane
                        state={this.state.state}
                        lat={this.state.lat}
                        lng={this.state.lng}
                        zoom={this.state.zoom}
                        crop={this.state.crop}
                        radius={this.state.radius}
                        onCropChange={this.handleCropChange} />
                </section>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4"><a href="datasource.html" target="_blank">Data Source Credits</a></div>
                            <div className="col-md-4">
                                <span className="copyright">All content copyright &copy; ATS & EchoUser 2015</span>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-inline quicklinks">
                                    <li><a href="#"> </a>
                                    </li>
                                    <li><a href="#"> </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>);
    },
});
export default SplashPageComponent;
