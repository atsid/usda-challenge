"use strict";

import React from "react";
import Grid from "react-bootstrap/lib/Col";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import MapPane from './panes/map/main';
import CropMetricsPane from './panes/cropmetrics/main';

let DashboardComponent = React.createClass({
    render: function() {
        return (
            <Grid>
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
