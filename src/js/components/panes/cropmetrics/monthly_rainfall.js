"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallChartComponent');

import RainfallChart from "../../charts/rainfall";
import MonthlyRainfallDataSource from "../../../datasources/monthlyRainfall.js";
import Average30RainfallDataSource from "../../../datasources/average30Rainfall.js";
import StationDataSource from "../../../datasources/stations.js";

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";

let RainfallChartComponent = React.createClass({

    propTypes: {
        state: React.PropTypes.string.isRequired,
        location: React.PropTypes.object.isRequired,
    },

    render() {
        return (
            <div>
                <RainfallChart
                    monthlySource={new MonthlyRainfallDataSource()}
                    average30Source={new Average30RainfallDataSource()}
                    stationSource={new StationDataSource()}
                    radius={100}
                    state={this.props.state}
                    location={this.props.location} />
            </div>
        );
    }
});
module.exports = RainfallChartComponent;