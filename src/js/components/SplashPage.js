"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Panel, Jumbotron, Button, Input} from "react-bootstrap";

import debugFactory from "debug";
const debug = debugFactory('app:SplashPage');

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
        const zoom = parseFloat(query.zoom) || 7;
        const year = parseInt(query.year) || 2012;
        return {state, year, location: {lat, lng, zoom}};
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
            lat: state.location.lat,
            lng: state.location.lng,
            zoom: state.location.zoom,
        };
        const newQuery = _.merge(this.context.location.query, query);
        this.context.history.pushState(null, "/", newQuery);
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
        return (
            <div>
                <Navigation />
                <Header />
                <section id="info">
                    <Info />
                </section>
                <section id="map" className="container">
                    <MapPane
                        onCenterChange={this.handleCenterChange}
                        onZoomChange={this.handleZoomChange}
                        onStateChange={this.handleStateChange}
                        onYearChange={this.handleYearChange}
                        year={this.state.year}
                        state={this.state.state}
                        location={this.state.location}/>
                </section>
                <section id="metrics" className="container">
                    <CropMetricsPane state={this.state.state} location={this.state.location}/>
                </section>
                <Footer />
            </div>);
    },
});
export default SplashPageComponent;
