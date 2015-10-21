"use strict";
import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:OverlaySelector');

import {Button, Glyphicon, Tooltip, Overlay, OverlayTrigger} from "react-bootstrap";

import VegetationLayer from './layers/VegetationLayer';

const OverlaySelector = React.createClass({
    propTypes: {
        visibleCallback: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return { visible: false };
    },

    componentDidMount() {
        this.props.visibleCallback((visible) => this.setState({visible}));
    },

    render() {
        debug('rendering waitspinner', this.state);
        return (
            <div style={{
                visibility: (this.state.visible ? 'visible' : 'hidden'),
                marginBottom: "15px"
            }}>
                <img src="src/img/wait-spinner.gif" style={{
                    height: "45px",
                    width: "45px",
                }}/>
            </div>
        );
    }
});
module.exports = OverlaySelector;