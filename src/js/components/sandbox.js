"use strict";

import React from "react";
import Navbar from "./navbar";
import StationsChart from "./charts/stations";
import HighLowTrend from "./charts/highLowTrend";
import HighLowDataSource from "../datasources/highLow.js";
import TemperatureReports from "./charts/temperatureReports";
import TemperatureReportsDataTable from "./temperatureReportsDataTable";
import CropYieldsChart from "./charts/cropYields";
import CropYieldsDataSource from "../datasources/cropYields";
import CropYieldsBUAChart from "./charts/cropYieldsBUA";
import CropYieldsBUADataSource from "../datasources/cropYieldsBUA";
import CropYieldsBaAChart from "./charts/cropYieldsBaA";
import CropYieldsBaADataSource from "../datasources/cropYieldsBaA";
import CropYieldsCWTAChart from "./charts/cropYieldsCWTA";
import CropYieldsCWTADataSource from "../datasources/cropYieldsCWTA";
import Map from "./map";

let SandboxComponent = React.createClass({

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
                            <div className={"row"}>
                                <CropYieldsBUAChart dataSource={new CropYieldsBUADataSource()}/>
                            </div>
                            <div className={"row"}>
                                <CropYieldsBaAChart dataSource={new CropYieldsBaADataSource()}/>
                            </div>
                            <div className={"row"}>
                                <CropYieldsCWTAChart dataSource={new CropYieldsCWTADataSource()}/>
                            </div>
                            <Map dataSource={dataSource}/>
                            <TemperatureReportsDataTable dataSource={dataSource}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SandboxComponent;
