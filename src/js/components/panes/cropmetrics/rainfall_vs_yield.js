"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallVsYieldChartComponent');

import CropYieldsChart from "../../charts/cropYieldsVersusRainfall";
import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";

let RainfallVsYieldChartComponent = React.createClass({

    propTypes: {
        crop: React.PropTypes.string.isRequired,
        state: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        zoom: React.PropTypes.number.isRequired,
        radius: React.PropTypes.number.isRequired
    },

    contextTypes: {
        cropStore: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <div>
                <CropYieldsChart
                    radius={this.props.radius}
                    crop={this.context.cropStore.getCropDatum(this.props.crop)}
                    state={this.props.state}
                    lat={this.props.lat}
                    lng={this.props.lng}
                    zoom={this.props.zoom} />
            </div>
        );
    }
});
module.exports = RainfallVsYieldChartComponent;
