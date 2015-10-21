"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import ReactDOM from "react-dom";
import util from "../../common/util";
import colors from "./colors";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropYieldsBaA');


var CropYieldsBaA = React.createClass({

    propTypes: {
        dataSource: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {};
    },

    componentDidMount: function () {
        let el = ReactDOM.findDOMNode(this);
        let startDate = new Date('2015-01-01');
        let endDate = new Date('2015-12-31');
        this.props.dataSource.list().then((results) => {

            var data = results.data;
            var ndx = results.index;

            data.forEach(function (item) {
                item.yearTime = d3.time.year(new Date(item.Year,1,1)); // coerce to date object
            });

            var yearlyDim = ndx.dimension((d) => d.yearTime);
            debug('yearlyDim:', yearlyDim.top(10));

            var yearlyYieldGroup = yearlyDim.group().reduceSum((d) => d.Value);
            debug('yearlyYieldGroup:', yearlyYieldGroup.all());

            var yieldTimeScale = d3.time.scale().domain([new Date(2000,1,1), new Date(2015, 1,1)]);

            yieldTimeScale.ticks(d3.time.year);

            var yieldTonsChart = dc.barChart(el);
                yieldTonsChart
                    .width($(el).innerWidth()-30)
                    .height(200)
                    .margins({top: 10, left:90, right: 10, bottom:20})
                    .x(yieldTimeScale)
                    .xUnits(d3.time.years)
                    .colors(colors.main)
                    .dimension(yearlyDim)
                    .group(yearlyYieldGroup)
                    ;
            dc.renderAll();
            this.state.myChart = yieldTonsChart;
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
            <div className={"col-xs-12"} id="cropYieldsChartBaA">
                <h4>Crop Yields</h4>
                <span className={"text-muted"}>Crop yields in Terms of Bales / Acre</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

module.exports = CropYieldsBaA;
