"use strict";

import React from "react";
import HighLowDataSource from "../datasources/highLow.js";
import TemperatureReportsDataTable from "./temperatureReportsDataTable";
import Map from "./map";
import Grid from "react-bootstrap/lib/Col";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

let DashboardComponent = React.createClass({
    render: function() {
        let dataSource = new HighLowDataSource();

        return (
            <Grid>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Map dataSource={dataSource}/>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <TemperatureReportsDataTable dataSource={dataSource}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = DashboardComponent;
