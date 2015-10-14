"use strict";

import dc from 'dc';
import d3 from 'd3';
import React from "react";
import util from "../../common/util";
import colors from "./colors";

var TemperatureReports = React.createClass({

    propTypes: {
        dataSource: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {};
    },

    componentDidMount: function () {
        let el = this.getDOMNode();
        let startDate = new Date('2015-01-01');
        let endDate = new Date('2015-12-31');
        this.props.dataSource.list().then((results) => {
            var index = results.index;
            var dates = index.dimension((d) => d3.time.day(d.date));
            var dateGroup = dates.group();

            var dateChart = dc.lineChart(el);
            dateChart
                .width($(el).innerWidth()-30)
                .height(200)
                .margins({top: 10, left:30, right: 10, bottom:20})
                .x(d3.time.scale().domain([startDate, endDate]))
                .colors(colors.main)
                .dimension(dates)
                .controlsUseVisibility(false)
                .group(dateGroup)
                .renderArea(true)
                .xAxis().ticks(6);

            this.state.myChart = dateChart;
            dc.renderAll();
        });
    },
    reset() {
        if (this.state && this.state.myChart) {
            this.state.myChart.filterAll();
            dc.redrawAll();
        }
    },
    render() {
        return (
            <div className={"col-xs-8"}>
                <h4>Readings per day</h4>
                <span className={"text-muted"}>readings</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

module.exports = TemperatureReports;
