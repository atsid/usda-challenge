"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallVsYieldChartComponent');

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";

let RainfallVsYieldChartComponent = React.createClass({
    render() {
        return (
            <div>
                <h1>[Rainfall vs. Yield Chart]</h1>
            </div>
        );
    }
});
module.exports = RainfallVsYieldChartComponent;