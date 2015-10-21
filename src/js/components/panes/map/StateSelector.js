"use strict";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
import stateData from "./states";
const debug = debugFactory('app:components:StateSelector');

import {DropdownButton, MenuItem} from "react-bootstrap";

const StateSelector = React.createClass({
    propTypes: {
        onStateSelected: React.PropTypes.func.isRequired,
        state: React.PropTypes.string.isRequired,
    },

    contextTypes: {
        location: React.PropTypes.object.isRequired,
    },

    componentDidMount() {
        //this.props.onStateSelected(stateData.statesByCode[this.getSelectedStateCode()]);
    },


    getSelectedState() {
        return stateData.statesByCode[this.props.state];
    },

    selectState(state) {
        this.props.onStateSelected(state);
    },

    render() {
        const selectedState = this.getSelectedState();
        const stateSelections = stateData.states.map((state) => {
            return (
                <MenuItem key={state.code} onSelect={() => this.props.onStateSelected(state)}>
                    {state.name}
                </MenuItem>
            );
        });

        const stateTitle = (this.context.location.query.state ? selectedState.name : "Select State");
        return (
            <DropdownButton id="selectState" title={stateTitle}>
                {stateSelections}
            </DropdownButton>
        );
    }
});

export default StateSelector;