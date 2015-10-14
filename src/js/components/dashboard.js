"use strict";

import React from "react";
import Navbar from "./navbar";
import StationsChart from "./charts/stations";
import HighLowTrend from "./charts/highLowTrend";
import HighLowDataSource from "../datasources/highLow.js";
import TemperatureReports from "./charts/temperatureReports";
import CropYieldsChart from "./charts/cropYields";
import CropYieldsDataSource from "../datasources/cropYields";
import Map from "./map";

let DashboardComponent = React.createClass({

    render: function() {
        let dataSource = new HighLowDataSource();

        return (
            <div>
                <Navbar />
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-sm-3 sidebar"}>
                            Sidebar content goes here
                        </div>
                        <div className={"col-sm-9 col-sm-offset-3 main"}>
                            <h2 className={"sub-header"}>Dashboard</h2>
                            <div className={"row"}>
                                <StationsChart dataSource={dataSource }/>
                                <TemperatureReports dataSource={dataSource }/>
                            </div>
                            <div className={"row"}>
                                <HighLowTrend dataSource={dataSource}/>
                            </div>
                            <div className={"row"}>
                                <CropYieldsChart dataSource={new CropYieldsDataSource()}/>
                            </div>
                            <Map dataSource={dataSource}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DashboardComponent;