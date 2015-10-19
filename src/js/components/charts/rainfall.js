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
        stationSource: React.PropTypes.object.isRequired,
        state: React.PropTypes.string.isRequired,
        location: React.PropTypes.object.isRequired,
        radius: React.PropTypes.number.isRequired,
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

    //subsets stations by a fixed radius, so we can constrain the plotted data to a reasonable spatial range
    subsetStations(stations, coords, radius) {
        return util.geospatial.hitTestPoints(stations, coords, radius);
    },

    //subsets the weather data to only include stations in the subset map
    subsetWeatherData(data, stations) {
        var output = data.filter(function (d) {
            return stations[d.id];
        });
        return output;
    },

    drawChart: function () {
        let el = ReactDOM.findDOMNode(this);

        Promise.all([
            //TODO: push the state/location into all of these functions, so results are already filtered
            //if this was done, we could reduce iteration of the monthly by 12, since each station has one row per year
            this.props.monthlySource.list(this.props.state),
            this.props.average30Source.list(),
            this.props.stationSource.list()
        ]).then((results) => {

            var monthlyData = results[0].data;
            var average30Data = results[1].data;


            var stationSubset = this.subsetStations(results[2].data, this.props.location, this.props.radius);

            var monthlySubset = this.subsetWeatherData(monthlyData, stationSubset);
            var average30Subset = this.subsetWeatherData(average30Data, stationSubset);

            var monthlyIndex = crossfilter(monthlySubset);
            var average30Index = crossfilter(average30Subset);

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
