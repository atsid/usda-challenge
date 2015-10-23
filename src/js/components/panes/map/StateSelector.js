"use strict";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
import stateData from "./states";
const debug = debugFactory('app:components:StateSelector');

const StateSelector = React.createClass({
    propTypes: {
        onStateSelected: React.PropTypes.func.isRequired
    },

    contextTypes: {
        location: React.PropTypes.object.isRequired,
    },

    componentDidMount() {
        this.loadStateAutoComplete();
    },

    loadStateAutoComplete() {
        let autoComplete = new google.maps.places.Autocomplete(this.refs.stateSearchBox);
        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace();
            let addressComponents = place.address_components;
            let stateComponents = addressComponents.filter((ac) => ac.types.indexOf("administrative_area_level_1") >= 0);
            if (stateComponents && stateComponents.length > 0) {
                let stateCode = stateComponents[0].short_name;
                let state = stateData.statesByCode[stateCode];
                if (state) {
                    this.selectState(state);
                } else {
                    debug("State not found!");
                }
            }
        });
        // Bias' the auto complete box to the bounds of the map
        // autocomplete.bindTo('bounds', map);
    },

    selectState(state) {
        this.props.onStateSelected(state);
    },

    render() {
        return (
            <input ref="stateSearchBox" className="firstAction stateSearchBox" placeholder="Enter your farm's address" type="text"></input>
        );
    }
});

export default StateSelector;