"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallVsYieldChartComponent');

import CropYieldsChart from "../../charts/cropYieldsGeneric";
import CropYieldsDataSource from "../../../datasources/cropYieldsBaA";

import HighLowDataSource from "../../../datasources/highLow.js";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

let RainfallVsYieldChartComponent = React.createClass({
    render() {
        return (
            <div>
                <CropYieldsChart dataSource={new CropYieldsDataSource()} rainSource={new HighLowDataSource()} />
            </div>
        );
    }
});
module.exports = RainfallVsYieldChartComponent;