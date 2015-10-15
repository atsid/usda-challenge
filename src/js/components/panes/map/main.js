"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:MapPane');

let MapPaneComponent = React.createClass({
    render() {
        return (
            <div>
                <h1>Mapping Pane Placeholder</h1>
            </div>
        );
    }
});
module.exports = MapPaneComponent;