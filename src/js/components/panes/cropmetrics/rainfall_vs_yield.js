"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallVsYieldChartComponent');

import CropYieldsChart from "../../charts/cropYieldsVersusRainfall";
import CropYieldsDataSource from "../../../datasources/cropYieldsByCrop";
import RainfallDataSource from "../../../datasources/rainfall.js";

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";

const cropYieldsDataSource = new CropYieldsDataSource();
const rainfallDataSource = new RainfallDataSource();

let RainfallVsYieldChartComponent = React.createClass({

    propTypes: {
        crop: React.PropTypes.object.isRequired,
        state: React.PropTypes.string.isRequired,
        location: React.PropTypes.object.isRequired,
    },

    render() {
        return (
            <div>
                <CropYieldsChart
                    cropSource={cropYieldsDataSource}
                    rainSource={rainfallDataSource}
                    radius={100}
                    crop={this.props.crop}
                    state={this.props.state}
                    location={this.props.location} />
            </div>
        );
    }
});
module.exports = RainfallVsYieldChartComponent;
