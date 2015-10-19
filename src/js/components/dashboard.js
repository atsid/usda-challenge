"use strict";

import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import MapPane from './panes/map/main';
import CropMetricsPane from './panes/cropmetrics/main';

import debugFactory from "debug";
const debug = debugFactory('app:components:Dashboard');

let DashboardComponent = React.createClass({

    getInitialState() {
        return {
            state: 'IA',
            location: {
                "lat": 42.0046,
                "lng": -93.214,
            }
        };
    },

    handleLocationChange(e) {
        console.log('location changed');
        console.log(e);
        this.setState({
            state: e.state,
            location: e.location
        });
    },

    render: function() {
        return (
            <Grid style={{width: "100%"}}>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <MapPane onLocationChange={this.handleLocationChange}/>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <CropMetricsPane state={this.state.state} location={this.state.location}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = DashboardComponent;
