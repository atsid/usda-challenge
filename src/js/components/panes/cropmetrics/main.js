"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropMetricsPane');

import {Glyphicon, Button, DropdownButton, MenuItem} from "react-bootstrap";
import RainfallVsYieldChart from './rainfall_vs_yield';
import MonthlyRainfallChart from './monthly_rainfall';
import CropSelection from "./CropSelection";


let CropMetricsPaneComponent = React.createClass({
    propTypes: {
        state: React.PropTypes.string,
        location: React.PropTypes.object,
        crop: React.PropTypes.object
    },

    getInitialState() {
        return {
            crop: {name:'corn', imageUrl: 'src/img/icons/crops/corn.png'},
            state: 'IA'
        };
    },

    componentWillReceiveProps(nextProps) {
      this.setState( {crop: this.state.crop, state: nextProps.state })

    },

    handleSelect(k) {
      debug("main: " + k + ", st:" + this.state.state)
        this.setState({crop: k, state: this.state.state});
    },

    render() {
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">What do you grow on your farm?</h4>
                    <CropSelection state={this.state.state} onSelect={this.handleSelect}/>
                </div>
                <div>
                    <RainfallVsYieldChart crop={this.state.crop} state={this.props.state} location={this.props.location} />
                </div>
                <div>
                    <MonthlyRainfallChart state={this.props.state} location={this.props.location} />
                </div>
            </div>
        );
    },

});
module.exports = CropMetricsPaneComponent;
