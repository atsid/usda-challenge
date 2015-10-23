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
        state: React.PropTypes.string,
        location: React.PropTypes.object,
        crop: React.PropTypes.string,
    },

    getInitialState() {
        return {
            crop: 'CORN'
        };
    },

    handleSelect(k) {
        this.setState({crop: k});
    },

    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">What do you grow on your farm?</h4>
                    <CropSelection stateObj={this.state} onSelect={this.handleSelect}/>
                </div>
                <div>
                    <h4 className="paneHeaderContent"><small>{this.state.crop}</small></h4>
                </div>
                <div>
                    <RainfallVsYieldChart crop={this.state.crop} state={this.props.state} location={this.props.location} />
                </div>
                <div>
                    <MonthlyRainfallChart state={this.props.state} location={this.props.location} />
                </div>
            </div>
        );
    },

});
module.exports = CropMetricsPaneComponent;
