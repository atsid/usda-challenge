"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";
import {Panel, Jumbotron, Button, Input, ResponsiveEmbed} from "react-bootstrap";
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

    render: function () {
        return (
            <div>
                <div style={{width: 660, height: 'auto'}}>
                    <ResponsiveEmbed a16by9>
                        <embed type="image/svg+xml" src="src/img/header-bg.jpg"/>
                    </ResponsiveEmbed>
                </div>
                <h1 style={{
                            color: 'gray',
                            textAlign: 'left'
                            }}>
                    Where do you farm?</h1>
                <Input id="splashMapSearch" ref="searchInput" type="text" placeholder="Search (e.g., address)"/>

                <Button style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
        );
    },

});

module.exports = SplashPageComponent;
