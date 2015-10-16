"use strict";
import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:OverlaySelector');

import {Button, Glyphicon, Tooltip, Overlay, OverlayTrigger} from "react-bootstrap";

const OverlaySelector = React.createClass({
    getInitialState() {
        return {
            overlays: {
                soilType: false,
                weather: false,
                plantDensity: false,
            },
        };
    },

    render() {
        const tooltip = (text, id) => (<Tooltip id={id}>{text}</Tooltip>);
        const soilTypeTooltip = tooltip('Soil Type', 'soilType');
        const weatherTooltip = tooltip('Weather', 'weather');
        const plantDensityTooltip = tooltip('Plant Density', 'plantDensity');
        const overlayStyle = (enabled) => enabled ? 'warning' : 'default';
        const overlays = this.state.overlays;
        const toggleOverlay = (name) => {
            const isEnabled = this.state.overlays[name];
            this.setState(_.merge(this.state, {overlays: {[name]: !isEnabled}}));
        };

        return (
            <div className="overlaySelectorGroup">
                <div>
                    <OverlayTrigger placement="right" overlay={soilTypeTooltip}>
                        <Button bsStyle={overlayStyle(overlays.soilType)} onClick={() => toggleOverlay('soilType')}>
                            <Glyphicon glyph="apple"/>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div>
                    <OverlayTrigger placement="right" overlay={weatherTooltip}>
                        <Button bsStyle={overlayStyle(overlays.weather)} onClick={() => toggleOverlay('weather')}>
                            <Glyphicon glyph="cloud"/>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div>
                    <OverlayTrigger placement="right" overlay={plantDensityTooltip}>
                        <Button bsStyle={overlayStyle(overlays.plantDensity)} onClick={() => toggleOverlay('plantDensity')}>
                            <Glyphicon glyph="leaf"/>
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
});
module.exports = OverlaySelector;