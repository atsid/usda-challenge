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
            let viewport = place.geometry.viewport;
            let location = place.geometry.location;
            let addressComponents = place.address_components;
            let stateComponents = addressComponents.filter((ac) => ac.types.indexOf("administrative_area_level_1") >= 0);
            if (stateComponents && stateComponents.length > 0) {
                let stateCode = stateComponents[0].short_name;
                let state = stateData.statesByCode[stateCode];
                if (state) {
                    let bounds;
                    if (viewport) {
                        let vpCenter = viewport.getCenter();
                        let vpNE = viewport.getNorthEast();
                        let vpSW = viewport.getSouthWest();
                        bounds = {
                            ne: {
                                lat: vpNE.lat(),
                                lng: vpNE.lng()
                            },
                            sw: {
                                lat: vpSW.lat(),
                                lng: vpSW.lng()
                            }
                        };
                    } else if (location) {
                        bounds = {
                            c: {
                                lat: location.lat(),
                                lng: location.lng()
                            }
                        };
                    }
                    this.selectState(state, bounds);
                } else {
                    debug("State not found!");
                }
            }
        });
        // Bias' the auto complete box to the bounds of the map
        // autocomplete.bindTo('bounds', map);
    },

    selectState(state, bounds) {
        this.props.onStateSelected(state, bounds);
    },

    render() {
        return (
            <input ref="stateSearchBox" className="firstAction stateSearchBox" placeholder="Enter your farm's address" type="text"></input>
        );
    }
});

export default StateSelector;