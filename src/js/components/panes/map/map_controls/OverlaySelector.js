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
        map: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            overlays: {
                soilType: false,
                plantDensity: false,
            },
            layers: {
                plantDensity: new VegetationLayer(this.props.map),
            }
        };
    },

    render() {
        const tooltip = (text, id) => (<Tooltip id={id}>{text}</Tooltip>);
        const soilTypeTooltip = tooltip('Soil Type', 'soilType');
        const plantDensityTooltip = tooltip('Plant Density', 'plantDensity');
        const overlayStyle = (enabled) => enabled ? 'success' : 'default';
        const overlays = this.state.overlays;
        const toggleOverlay = (name) => {
            const isEnabled = this.state.overlays[name];
            this.setState(_.merge(this.state, {overlays: {[name]: !isEnabled}}));
            this.state.layers[name][(isEnabled ? 'hide' : 'show')]();
        };

        return (
            <div className="overlaySelectorGroup">
                <div>
                    <OverlayTrigger placement="right" overlay={soilTypeTooltip}>
                        <Button bsStyle={overlayStyle(overlays.soilType)} onClick={() => toggleOverlay('soilType')} className="layerButton">
                            <img className="layerIcon" src="src/img/icons/soil.png"/>
                            &nbsp;
                            <span>Soil Type</span>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div>
                    <OverlayTrigger placement="right" overlay={plantDensityTooltip}>
                        <Button bsStyle={overlayStyle(overlays.plantDensity)} onClick={() => toggleOverlay('plantDensity')} className="layerButton">
                            <img className="layerIcon" src="src/img/icons/plant_density.png"/>
                            &nbsp;
                            <span>Plant Density</span>
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
});
module.exports = OverlaySelector;