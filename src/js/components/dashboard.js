"use strict";

import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import MapPane from './panes/map/main';
import CropMetricsPane from './panes/cropmetrics/main';

import debugFactory from "debug";
const debug = debugFactory('app:components:Dashboard');

let DashboardComponent = React.createClass({
    render: function() {
        return (
            <Grid style={{width: "100%"}}>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <MapPane />
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <CropMetricsPane />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = DashboardComponent;
