"use strict";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
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

let MapPaneComponent = React.createClass({
    getInitialState() {
        return {};
    },

    onLocateMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                debug('located to position', position);
                this.refs.map.setPosition(position);
            });
        } else {
            this.setState({alert: "Geolocation is not supported by this browser."});
        }
    },

    render() {
        debug('rendering map pane', this.state);
        return (
            <div className="pane">
                <div className="paneHeader">
                    <h4 className="paneHeaderContent">Where's your farm?</h4>
                    <Button id="locateMe" className="paneHeaderContent firstAction" onClick={this.onLocateMe}>
                        <Glyphicon glyph="map-marker"/>
                        &nbsp;Locate Me&nbsp;
                    </Button>
                    <span>&nbsp;or&nbsp;</span>
                    <DropdownButton id="selectState" title="Select State">
                        <MenuItem>Alabama</MenuItem>
                        <MenuItem>Alaska</MenuItem>
                        <MenuItem>American Samoa</MenuItem>
                        <MenuItem>Arizona</MenuItem>
                        <MenuItem>Arkansas</MenuItem>
                        <MenuItem>California</MenuItem>
                        <MenuItem>Colorado</MenuItem>
                        <MenuItem>Connecticut</MenuItem>
                        <MenuItem>Delaware</MenuItem>
                        <MenuItem>District of Columbia</MenuItem>
                        <MenuItem>Florida</MenuItem>
                        <MenuItem>Georgia</MenuItem>
                        <MenuItem>Guam</MenuItem>
                        <MenuItem>Hawaii</MenuItem>
                        <MenuItem>Idaho</MenuItem>
                        <MenuItem>Illinois</MenuItem>
                        <MenuItem>Indiana</MenuItem>
                        <MenuItem>Iowa</MenuItem>
                        <MenuItem>Kansas</MenuItem>
                        <MenuItem>Kentucky</MenuItem>
                        <MenuItem>Louisiana</MenuItem>
                        <MenuItem>Maine</MenuItem>
                        <MenuItem>Maryland</MenuItem>
                        <MenuItem>Massachusetts</MenuItem>
                        <MenuItem>Michigan</MenuItem>
                        <MenuItem>Minnesota</MenuItem>
                        <MenuItem>Mississippi</MenuItem>
                        <MenuItem>Missouri</MenuItem>
                        <MenuItem>Montana</MenuItem>
                        <MenuItem>Nebraska</MenuItem>
                        <MenuItem>Nevada</MenuItem>
                        <MenuItem>New Hampshire</MenuItem>
                        <MenuItem>New Jersey</MenuItem>
                        <MenuItem>New Mexico</MenuItem>
                        <MenuItem>New York</MenuItem>
                        <MenuItem>North Carolina</MenuItem>
                        <MenuItem>North Dakota</MenuItem>
                        <MenuItem>Northern Marianas Islands</MenuItem>
                        <MenuItem>Ohio</MenuItem>
                        <MenuItem>Oklahoma</MenuItem>
                        <MenuItem>Oregon</MenuItem>
                        <MenuItem>Pennsylvania</MenuItem>
                        <MenuItem>Puerto Rico</MenuItem>
                        <MenuItem>Rhode Island</MenuItem>
                        <MenuItem>South Carolina</MenuItem>
                        <MenuItem>South Dakota</MenuItem>
                        <MenuItem>Tennessee</MenuItem>
                        <MenuItem>Texas</MenuItem>
                        <MenuItem>Utah</MenuItem>
                        <MenuItem>Vermont</MenuItem>
                        <MenuItem>Virginia</MenuItem>
                        <MenuItem>Virgin Islands</MenuItem>
                        <MenuItem>Washington</MenuItem>
                        <MenuItem>West Virginia</MenuItem>
                        <MenuItem>Wisconsin</MenuItem>
                        <MenuItem>Wyoming</MenuItem>
                    </DropdownButton>
                </div>
                <div className="mapContainer">
                    <Map ref="map" />
                </div>
            </div>
        );
    }
});
module.exports = MapPaneComponent;