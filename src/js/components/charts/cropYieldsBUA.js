"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import util from "../../common/util";
import colors from "./colors";

var CropYieldsBUA = React.createClass({

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
            //TODO: remove me
            console.log("Beginning");

            var yearFormat = d3.time.format("%Y");
            var data = results.data;
            var ndx = results.index;

            data.forEach(function (item) {
                item.yearTime = d3.time.year(new Date(item.Year,1,1)); // coerce to date object
            });

            var all = ndx.groupAll();

            var yearlyDim = ndx.dimension((d) => d.yearTime);
            console.log(yearlyDim.top(10));

            var yearlyYieldGroup = yearlyDim.group().reduceSum((d) => d.Value);
            console.log(yearlyYieldGroup.all())

            var commodityDim = ndx.dimension((d) => d.Commodity);
            var stateDim = ndx.dimension((d) => d.State);
            var productionPracticeDim = ndx.dimension((d) => d.ProdPractice);

            var yieldTimeScale = d3.time.scale().domain([new Date(2000,1,1), new Date(2015, 1,1)])
            //var yieldTimeScale = d3.scale.linear().domain([2000, 2015])
            yieldTimeScale.ticks(d3.time.year)

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
            <div className={"col-xs-12"} id="cropYieldsChartBUA">
                <h4>Crop Yields</h4>
                <span className={"text-muted"}>Crop yields in Terms of BU / Acre</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

module.exports = CropYieldsBUA;
