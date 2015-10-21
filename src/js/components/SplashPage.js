"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Panel, Jumbotron, Button, Input} from "react-bootstrap";
import Navbar from './navbar';
import debugFactory from "debug";
const debug = debugFactory('app:SplashPage');
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

    render: function () {
        return (
            <div>
                <Navbar />

                <header>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in">Harness the power of data to feed the world</div>
                            <div className="intro-heading">We make USDA data meaningful to you.</div>
                        </div>
                    </div>
                </header>

                <section id="where">
                    <div className="container">
                        <div className="col-md-3 col-md-offset-3">
                            <span className="fa-stack fa-2x">
                                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                <i className="fa fa-search fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Do you know your soil?</h4>
                            <p className="text-muted">See how soil type and crop growth are related on a map of your farm land.</p>
                        </div>

                        <div className="col-md-3">
                            <span className="fa-stack fa-2x">
                                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                <i className="fa fa-tint fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Rainfall</h4>
                            <p className="text-muted">Get a sense for how much your farm can produce per year compared to detailed historical precipitation data.</p>
                        </div>
                    </div>
                </section>

                <section id="map">
                    <div className="container">
                        <MapPane
                            onCenterChange={this.handleCenterChange}
                            onZoomChange={this.handleZoomChange}
                            onStateChange={this.handleStateChange}
                            onYearChange={this.handleYearChange}
                            year={this.state.year}
                            state={this.state.state}
                            location={this.state.location}/>
                    </div>
                </section>

                <section id="metrics">
                    <div className="container">
                        <CropMetricsPane state={this.state.state} location={this.state.location}/>
                    </div>
                </section>

                <footer>
                    <div className="container">
                        <div className="row">
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
