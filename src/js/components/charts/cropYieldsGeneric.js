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
        cropSource: React.PropTypes.object.isRequired,
        rainSource: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            crop: 'COTTON'
        };
    },

    componentDidMount: function () {
        let el = ReactDOM.findDOMNode(this);

        Promise.all([
            this.props.cropSource.list(this.state.crop),
            this.props.rainSource.list()
        ]).then((results) => {

            var yieldIndex = results[0].index;
            var rainIndex = results[1].index;

            var all = yieldIndex.groupAll();

            var yearlyYieldDim = yieldIndex.dimension((d) => d3.time.month(d.date));
            debug('yearlyYieldDim:', yearlyYieldDim.top(10));

            var yearlyYieldGroup = yearlyYieldDim.group().reduceSum((d) => d.Value);
            debug('yearlyYieldGroup:', yearlyYieldGroup.all());

            //TODO: the props here are from temperature, need to be swapped out
            var yearlyRainDim = rainIndex.dimension((d) => d3.time.year(d.date));
            var yearlyAverageRainGroup = yearlyRainDim.group().reduceSum((d) => d.high);

            var timeScale = d3.time.scale().domain([new Date(2000,1,1), new Date(2015, 12,31)]);

            var compChart = dc.compositeChart(el);
            compChart
                .width($(el).innerWidth()-30)
                .height(250)
                .margins({top: 10, left:50, right: 80, bottom:40})
                .x(timeScale)
                .xUnits(d3.time.years)
                .xAxisLabel("Date")
                .yAxisLabel(this.cropLabel(this.state.crop))
                .rightYAxisLabel('Rainfall (inches)')
                .dimension(yearlyYieldDim)
                .brushOn(false)
                .compose([
                    dc.barChart(compChart)
                        .colors(colors.yearlyAverageRainfall)
                        .barPadding(0.3)
                        .useRightYAxis(true)
                        .group(yearlyAverageRainGroup),
                    dc.barChart(compChart)
                        .colors(colors.yield)
                        .barPadding(0.3)
                        .group(yearlyYieldGroup)
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
    },

    cropMap: {
        BARLEY: 'Bushels / Acre',
        BEANS: 'CWT / Acre',
        CORN: 'Bushels / Acre',
        COTTON: 'Bales / Acre',
        HAY: 'Tons / Acre',
        HAYLAGE: 'Tons / Acre',
        OATS: 'Bushels / Acre',
        RICE: 'CWT / Acre',
        SORGHUM: 'Bushels / Acre',
        SUGARBEETS: 'Tons / Acre',
        SUGARCANE: 'Tons / Acre',
        SOYBEANS: 'Bushels / Acre',
        WHEAT: 'Bushels / Acre'
    },

    //'COTTON' -> Cotton (Bales / Acre)
    cropLabel: function (crop) {
        let units = this.cropMap[crop];
        let prefix = crop.substring(0, 1) + crop.substring(1, crop.length).toLowerCase();
        return prefix + ' (' + units + ')';
    }

});

module.exports = CropYieldsGeneric;
