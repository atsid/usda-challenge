"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:RainfallVsYieldChartComponent');

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

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