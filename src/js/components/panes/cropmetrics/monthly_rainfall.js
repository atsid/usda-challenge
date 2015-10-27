"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallChartComponent');

import RainfallChart from "../../charts/rainfall";
import MonthlyRainfallDataSource from "../../../datasources/monthlyRainfall";
import Average30RainfallDataSource from "../../../datasources/average30Rainfall";
import StationDataSource from "../../../datasources/stations";

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";

// Rainfall Data
const monthlyRainfallData = new MonthlyRainfallDataSource();
const average30Source = new Average30RainfallDataSource();
const stationData = new StationDataSource();

let RainfallChartComponent = React.createClass({

    propTypes: {
        state: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        zoom: React.PropTypes.number.isRequired,
        radius: React.PropTypes.number.isRequired
    },

    render() {
        return (
            <div>
                <RainfallChart
                    monthlySource={monthlyRainfallData}
                    average30Source={average30Source}
                    stationSource={stationData}
                    radius={this.props.radius}
                    state={this.props.state}
                    lat={this.props.lat}
                    lng={this.props.lng}
                    zoom={this.props.zoom} />
            </div>
        );
    }
});
module.exports = RainfallChartComponent;