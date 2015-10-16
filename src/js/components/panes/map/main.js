"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
import stateData from "./states";
const debug = debugFactory('app:components:MapPane');

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import PageHeader from "react-bootstrap/lib/PageHeader";
import Input from "react-bootstrap/lib/Input";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Panel from "react-bootstrap/lib/Panel";
import Map from "./map";
import YearSelector from "./YearSelector";

let MapPaneComponent = React.createClass({
    getInitialState() {
        return {
            acquiringLocation: false,
        };
    },

    componentDidMount() {
      this.onSelectState(stateData.statesByCode.IA);
    },

    onLocateMe() {
        this.setState({selectedState: null});
        if (navigator.geolocation) {
            this.setState({acquiringLocation: true});
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({acquiringLocation: false});
                const center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.refs.map.setCenter(center);
            });
        } else {
            this.setState({alert: "Geolocation is not supported by this browser."});
        }
    },

    onSelectState(state) {
        debug('Selected State', state);
        if (state) {
            const center = {lat: state.lat, lng: state.lng};
            const bounds = {
                sw: {
                    lat: state.bounds.minLat,
                    lng: state.bounds.minLng,
                },
                ne: {
                    lat: state.bounds.maxLat,
                    lng: state.bounds.maxLng,
                },
            };
            if (this.state.selectedState) {
                this.refs.map.disable(this.state.selectedState.polygon);
            }
            this.setState({selectedState: state});

            this.refs.map.enable(state.polygon);
            this.refs.map.setCenter(center);
            this.refs.map.setBounds(bounds);
        }
    },

    render() {
        debug('rendering map pane', this.state);
        const stateSelections = stateData.states.map((state) => {
          return (<MenuItem key={state.code} onSelect={() => this.onSelectState(state)}>{state.name}</MenuItem>)
        });
        let stateTitle = "Select State";
        if (this.state.selectedState) {
            stateTitle = this.state.selectedState.name;
        }

        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">Where's your farm?</h4>
                    <Button
                        id="locateMe"
                        className="paneHeaderContent firstAction"
                        onClick={this.onLocateMe}
                        disabled={this.state.acquiringLocation}>
                        <Glyphicon glyph="map-marker"/>
                        &nbsp;{this.state.acquiringLocation ? "Locating..." : "Locate Me"}&nbsp;
                    </Button>
                    <span>&nbsp;or&nbsp;</span>
                    <DropdownButton id="selectState" title={stateTitle}>
                        {stateSelections}
                    </DropdownButton>
                </div>
                <div className="yearSelectorContainer">
                    <YearSelector/>
                </div>
                <div className="mapContainer">
                    <Map ref="map" />
                </div>
                <Panel>
                    <h4>Activities Performed</h4>
                </Panel>
            </div>
        );
    }
});
module.exports = MapPaneComponent;