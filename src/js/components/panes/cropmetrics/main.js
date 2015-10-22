"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropMetricsPane');

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";
import RainfallVsYieldChart from './rainfall_vs_yield';
import MonthlyRainfallChart from './monthly_rainfall';

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

    handleSelect(e, k) {
        this.setState({crop: k});
    },

    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">What do you grow on your farm?</h4>
                    <DropdownButton className="firstAction" id="selectCrop" title="+" noCaret onSelect={this.handleSelect}>
                        <MenuItem eventKey="BARLEY">Barley</MenuItem>
                        <MenuItem eventKey="BEANS">Beans</MenuItem>
                        <MenuItem eventKey="CORN">Corn</MenuItem>
                        <MenuItem eventKey="COTTON">Cotton</MenuItem>
                        <MenuItem eventKey="HAY">Hay</MenuItem>
                        <MenuItem eventKey="HAYLAGE">Haylage</MenuItem>
                        <MenuItem eventKey="OATS">Oats</MenuItem>
                        <MenuItem eventKey="RICE">Rice</MenuItem>
                        <MenuItem eventKey="SORGHUM">Sorghum</MenuItem>
                        <MenuItem eventKey="SUGARBEETS">Sugarbeets</MenuItem>
                        <MenuItem eventKey="SUGARCANE">Sugarcane</MenuItem>
                        <MenuItem eventKey="SOYBEANS">Soybeans</MenuItem>
                        <MenuItem eventKey="WHEAT">Wheat</MenuItem>
                    </DropdownButton>
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
