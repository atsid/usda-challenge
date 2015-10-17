"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallChartComponent');

import RainfallChart from "../../charts/rainfall";
import MonthlyRainfallDataSource from "../../../datasources/monthlyRainfall.js";

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";

let RainfallChartComponent = React.createClass({
    render() {
        return (
            <div>
                <RainfallChart monthlySource={new MonthlyRainfallDataSource()} />
            </div>
        );
    }
});
module.exports = RainfallChartComponent;