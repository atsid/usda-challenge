"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";
import {Panel, Jumbotron, Button, Input} from "react-bootstrap";
import debugFactory from "debug";
const debug = debugFactory('app:SplashPage');

let SplashPageComponent = React.createClass({

    componentDidMount() {
        //connect google maps input
        let input = ReactDOM.findDOMNode(this.refs.searchInput);
        let searchBox = new google.maps.places.Autocomplete(input);

        //TODO: this "functions" but not with autocomplete, so the place is undefined
        debug('maps autocomplete', searchBox);
        google.maps.event.addListener(searchBox, 'place_changed', function () {
            var places = searchBox.getPlace();
            debug('place', places);
        });

    },

    render: function() {
        return (
            <Panel>

                <Jumbotron style={{
                    backgroundImage: 'url("src/img/trees.jpg")'
                }}>
                    <h1 style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>Harness the power of data</h1>
                </Jumbotron>

                <p>Discover how densely crops grow in different soil</p>

                <Input id="splashMapSearch" ref="searchInput" type="text" placeholder="Search (e.g., address)" />

                <Button style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </Button>

            </Panel>
        );
    },

});

module.exports = SplashPageComponent;
