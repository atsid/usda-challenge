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

const CropStore = require('./CropStore');
const cropStore = new CropStore();

let RainfallVsYieldChartComponent = React.createClass({

    propTypes: {
        crop: React.PropTypes.string.isRequired,
        state: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        zoom: React.PropTypes.number.isRequired,
    },

    render() {
        return (
            <div>
                <CropYieldsChart
                    cropSource={cropYieldsDataSource}
                    rainSource={rainfallDataSource}
                    radius={100}
                    crop={cropStore.getCropDatum(this.props.crop)}
                    state={this.props.state}
                    lat={this.props.lat}
                    lng={this.props.lng}
                    zoom={this.props.zoom} />
            </div>
        );
    }
});
module.exports = RainfallVsYieldChartComponent;
