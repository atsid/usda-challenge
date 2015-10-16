"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import ReactDOM from "react-dom";
import util from "../../common/util";
import colors from "./colors";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropYieldsGeneric');


var CropYieldsGeneric = React.createClass({

    propTypes: {
        dataSource: React.PropTypes.object.isRequired,
        rainSource: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {};
    },

    componentDidMount: function () {
        let el = ReactDOM.findDOMNode(this);

        Promise.all([
            this.props.dataSource.list(),
            this.props.rainSource.list()
        ]).then((results) => {

            var yieldIndex = results[0].index;
            var rainIndex = results[1].index;

            var all = yieldIndex.groupAll();

            var yearlyYieldDim = yieldIndex.dimension((d) => d.yearTime);
            debug('yearlyYieldDim:', yearlyYieldDim.top(10));

            var yearlyYieldGroup = yearlyYieldDim.group().reduceSum((d) => d.Value);
            debug('yearlyYieldGroup:', yearlyYieldGroup.all());

            //TODO: the props here are from temperature, need to be swapped out
            var monthlyRainDim = rainIndex.dimension((d) => d3.time.month(d.date));
            var monthlyRainGroup = monthlyRainDim.group().reduceSum((d) => d.high);
            var monthlyAverageRainGroup = monthlyRainDim.group().reduceSum((d) => d.low);

            debug('monthlyRainGroup', monthlyRainGroup.all());

            var timeScale = d3.time.scale().domain([new Date(2000,1,1), new Date(2015, 12,31)]);

            var compChart = dc.compositeChart(el);
            compChart
                .width($(el).innerWidth()-30)
                .height(250)
                .margins({top: 10, left:50, right: 80, bottom:40})
                .x(timeScale)
                .xUnits(d3.time.years)
                .xAxisLabel("Date")
                .yAxisLabel("Cotton (Tons / Acre)")
                .rightYAxisLabel('Rainfall (inches)')
                .dimension(yearlyYieldDim)
                .brushOn(false)
                .compose([
                    dc.barChart(compChart)
                        .colors(colors.yield)
                        .group(yearlyYieldGroup),
                    dc.lineChart(compChart)
                        .colors(colors.monthlyRainfall)
                        .useRightYAxis(true)
                        .group(monthlyRainGroup),
                    dc.lineChart(compChart)
                        .colors(colors.monthlyAverageRainfall)
                        .useRightYAxis(true)
                        .group(monthlyAverageRainGroup)
                ]);


            dc.renderAll();
            this.state.myChart = compChart;
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
            <div className={"col-xs-12"} id="cropYieldsChartGeneric">
                <h4>Crop Yields versus Rainfall</h4>
                <span className={"text-muted"}>Crop yields in Terms of Bales / Acre</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

module.exports = CropYieldsGeneric;
