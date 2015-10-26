"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Panel, Jumbotron, Button, Input} from "react-bootstrap";

import debugFactory from "debug";
const debug = debugFactory('app:components:SplashPage');

import Navigation from './Navigation';
import Header from './Header';
import Info from './Info';
import Footer from './Footer';
import MapPane from './panes/map/main';
import CropMetricsPane from './panes/cropmetrics/main';


let SplashPageComponent = React.createClass({
    contextTypes: {
        location: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        const query = this.context.location.query;
        const state = query.state || 'IA';
        const lat = parseFloat(query.lat) || 42.0046;
        const lng = parseFloat(query.lng) || -93.214;
        const zoom = parseFloat(query.zoom) || 4;
        const year = parseInt(query.year) || 2014;
        const crop = query.crop || 'corn';
        return {state, year, lat, lng, zoom, crop};
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

    render() {
        return (
            <div>
                <Navigation />
                <Header />
                <section id="info">
                    <Info />
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
                        onCropChange={this.handleCropChange} />
                </section>
                <Footer />
            </div>);
    },
});
export default SplashPageComponent;
