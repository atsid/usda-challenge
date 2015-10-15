"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropMetricsPane');

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import RainfallVsYieldChart from './rainfall_vs_yield';

let CropMetricsPaneComponent = React.createClass({
    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">What do you grow in your farm?</h4>
                    <DropdownButton className="firstAction" id="selectCrop" title="+" noCaret>
                        <MenuItem>Barley</MenuItem>
                        <MenuItem>Beans</MenuItem>
                        <MenuItem>Corn</MenuItem>
                        <MenuItem>Cotton</MenuItem>
                        <MenuItem>Hay</MenuItem>
                        <MenuItem>Haylage</MenuItem>
                        <MenuItem>Oats</MenuItem>
                        <MenuItem>Rice</MenuItem>
                        <MenuItem>Sorghum</MenuItem>
                        <MenuItem>Sugarbeets</MenuItem>
                        <MenuItem>Sugarcane</MenuItem>
                        <MenuItem>Soybeans</MenuItem>
                        <MenuItem>Wheat</MenuItem>
                    </DropdownButton>
                </div>
                <div>
                    <h4 className="paneHeaderContent"><small>wheat, corn, and barley</small></h4>
                </div>
                <div className="mapContainer">
                    <RainfallVsYieldChart />
                </div>
            </div>
        );
    }
});
module.exports = CropMetricsPaneComponent;