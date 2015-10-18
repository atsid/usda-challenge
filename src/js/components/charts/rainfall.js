"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import ReactDOM from "react-dom";
import util from "../../common/util";
import colors from "./colors";
import debugFactory from "debug";
const debug = debugFactory('app:components:MonthlyRainfall');

var Rainfall = React.createClass({

    propTypes: {
        monthlySource: React.PropTypes.object.isRequired,
        average30Source: React.PropTypes.object.isRequired,
        state: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {};
    },

    componentDidMount: function () {
        this.drawChart();
    },

    componentDidUpdate: function () {
        this.drawChart();
    },

    drawChart: function () {
        let el = ReactDOM.findDOMNode(this);

        Promise.all([
            this.props.monthlySource.list(this.props.state),
            this.props.average30Source.list()
        ]).then((results) => {

            var monthlyIndex = results[0].index;
            var average30Index = results[1].index;

            var monthlyRainDim = monthlyIndex.dimension((d) => d3.time.month(d.date));
            var average30RainDim = average30Index.dimension((d) => d3.time.month(d.date));

            //this group averages all the selected stations for a monthly reading
            var monthlyRainGroup = monthlyRainDim.group().reduce(
                util.reducers.average.add('value'),
                util.reducers.average.remove('value'),
                util.reducers.average.init()
            );

            var average30RainGroup = average30RainDim.group().reduce(
                util.reducers.average.add('value'),
                util.reducers.average.remove('value'),
                util.reducers.average.init()
            );

            var timeScale = d3.time.scale().domain([new Date(2000,1,1), new Date(2015, 12,31)]);

            var compChart = dc.compositeChart(el);
            compChart
                .width($(el).innerWidth()-30)
                .height(250)
                .margins({top: 10, left:50, right: 80, bottom:40})
                .x(timeScale)
                .xUnits(d3.time.months)
                .xAxisLabel("Date")
                .yAxisLabel('Rainfall (inches)')
                .dimension(monthlyRainDim)
                .brushOn(false)
                .compose([
                    dc.lineChart(compChart)
                        .colors(colors.monthlyRainfall)
                        .group(monthlyRainGroup)
                        .valueAccessor((d) => d.value.avg),
                    dc.lineChart(compChart)
                        .colors(colors.monthlyAverageRainfall)
                        .group(average30RainGroup)
                        .valueAccessor((d) => d.value.avg)
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
            <div className={"col-xs-12"} id="monthlyRainfallChart">
                <h4>Monthly Rainfall</h4>
                <span className={"text-muted"}>Total rainfall per month versus 30-year average monthly rainfall</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }

});

module.exports = Rainfall;