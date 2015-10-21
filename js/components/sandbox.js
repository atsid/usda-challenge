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

const dataSource = new HighLowDataSource();
const cropYieldsDataSource = new CropYieldsDataSource();
const cropYieldsBUADataSource = new CropYieldsBUADataSource();
const cropYieldsBaADataSource = new CropYieldsBaADataSource();
const cropYieldsCWTADataSource = new CropYieldsCWTADataSource();

let SandboxComponent = React.createClass({
    render: function() {
        return (
            <div>
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
                                <CropYieldsChart dataSource={cropYieldsDataSource}/>
                            </div>
                            <div className={"row"}>
                                <CropYieldsBUAChart dataSource={cropYieldsBUADataSource}/>
                            </div>
                            <div className={"row"}>
                                <CropYieldsBaAChart dataSource={cropYieldsBaADataSource}/>
                            </div>
                            <div className={"row"}>
                                <CropYieldsCWTAChart dataSource={cropYieldsCWTADataSource}/>
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
