"use strict";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
import stateData from "./states";
const debug = debugFactory('app:components:StateSelector');
import {Link} from "react-router";

import {DropdownButton, MenuItem} from "react-bootstrap";

const StateSelector = React.createClass({
    propTypes: {
        onStateSelected: React.PropTypes.func.isRequired
    },

    contextTypes: {
        location: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    },

    componentDidMount() {
        this.props.onStateSelected(stateData.statesByCode[this.getSelectedStateCode()]);
    },

    getSelectedStateCode() {
        return this.context.location.query.state || "IA";
    },

    getSelectedState() {
        return stateData.statesByCode[this.getSelectedStateCode()];
    },

    selectState(state) {
        const newQuery = _.merge(this.context.location.query, {state: state.code});
        this.context.history.pushState(null, "/dashboard", newQuery);
        this.props.onStateSelected(state);
    },

    render() {
        const selectedState = this.getSelectedState();
        const stateSelections = stateData.states.map((state) => {
            return (
                <MenuItem key={state.code} onSelect={() => this.selectState(state)}>
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