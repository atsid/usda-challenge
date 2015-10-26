"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropMetricsPane');

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";
import RainfallVsYieldChart from './rainfall_vs_yield';
import MonthlyRainfallChart from './monthly_rainfall';
import CropSelection from "./CropSelection";


let CropMetricsPaneComponent = React.createClass({
    propTypes: {
        state: React.PropTypes.string.isRequired,
        location: React.PropTypes.object.isRequired,
        crop: React.PropTypes.string.isRequired,
        onCropChange: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">What do you grow?</h4>
                    <CropSelection state={this.props.state} onSelect={this.props.onCropChange} crop={this.props.crop} />
                </div>
                <div>
                    <RainfallVsYieldChart crop={this.props.crop} state={this.props.state} location={this.props.location} />
                </div>
                <div>
                    <MonthlyRainfallChart state={this.props.state} location={this.props.location} />
                </div>
            </div>
        );
    },

});
module.exports = CropMetricsPaneComponent;
