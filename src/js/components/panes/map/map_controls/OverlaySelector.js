"use strict";
import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:OverlaySelector');

import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Tooltip from "react-bootstrap/lib/Tooltip";
import Overlay from "react-bootstrap/lib/Overlay";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";

const OverlaySelector = React.createClass({
    getInitialState() {
        return {
            overlays: {
                soilType: true,
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
            debug('toggling', name);
            const isEnabled = this.state.overlays[name];
            this.setState(_.merge(this.state, {overlays: {[name]: !isEnabled}}));
        };

        debug('state', this.state);

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