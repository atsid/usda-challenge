"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import util from "../../common/util";
import colors from "./colors";
import debugFactory from "debug";
const debug = debugFactory('app:components:MonthlyRainfall');

var Rainfall = React.createClass({

    propTypes: {
        state: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        radius: React.PropTypes.number.isRequired,
    },

    contextTypes: {
        monthlyRainfallDataSource: React.PropTypes.object.isRequired,
        average30RainfallDataSource: React.PropTypes.object.isRequired,
        stationDataSource: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {};
    },

    componentDidMount() {
        this.drawChart();
    },

    componentDidUpdate(nextProps) {
        const isRedrawn =
            nextProps.state !== this.props.state ||
            nextProps.radius !== this.props.radius ||
            nextProps.lat !== this.props.lat ||
            nextProps.lng !== this.props.lng;
        if (isRedrawn) {
            this.drawChart();
        }
    },

    drawChart() {
        const start = new Date().getTime();
        const el = ReactDOM.findDOMNode(this);

        Promise.all([
            //TODO: push the state/location into all of these functions, so results are already filtered
            //if this was done, we could reduce iteration of the monthly by 12, since each station has one row per year
            this.context.monthlyRainfallDataSource.list(this.props.state),
            this.context.average30RainfallDataSource.list(),
            this.context.stationDataSource.list()
        ]).then((results) => {
            //subsets stations by a fixed radius, so we can constrain the plotted data to a reasonable spatial range
            const subsetStations = (stations, coords, radius) => util.geospatial.hitTestPoints(stations, coords, radius);
            //subsets the weather data to only include stations in the subset map
            const subsetWeatherData = (data, stations) => data.filter((d) => stations[d.id]);

            function groupify(data) {
                const index = crossfilter(data);
                const dim = index.dimension((d) => d3.time.month(d.date));
                const group = dim.group().reduce(
                    util.reducers.average.add('value'),
                    util.reducers.average.remove('value'),
                    util.reducers.average.init()
                );
                return {data, index, dim, group};
            }

            const monthlyData = results[0].data;
            const average30Data = results[1].data;
            const stationData = results[2].data;
            const stationSubset = subsetStations(stationData, {lat: this.props.lat, lng: this.props.lng}, this.props.radius);
            const monthlySubset = subsetWeatherData(monthlyData, stationSubset);
            const average30Subset = subsetWeatherData(average30Data, stationSubset);
            const monthlyRain = groupify(monthlySubset);
            const average30Rain = groupify(average30Subset);
            const timeScale = d3.time.scale().domain([new Date(2000, 1, 1), new Date(2015, 12, 31)]);
            const compChart = dc.compositeChart(el);
            compChart
                .width($(el).innerWidth() - 30)
                .height(250)
                .margins({top: 10, left: 50, right: 80, bottom: 40})
                .x(timeScale)
                .xUnits(d3.time.months)
                .yAxisLabel('Rainfall (inches)')
                .dimension(monthlyRain.dim)
                .brushOn(false)
                .compose([
                    dc.lineChart(compChart)
                        .colors(colors.monthlyAverageRainfall)
                        .group(average30Rain.group)
                        .renderArea(true)
                        .valueAccessor((d) => d.value.avg),

                    dc.lineChart(compChart)
                        .colors(colors.monthlyRainfall)
                        .group(monthlyRain.group)
                        .valueAccessor((d) => d.value.avg)
                ]);


            dc.renderAll();
            this.state.myChart = compChart;
            const span = new Date().getTime() - start;
            debug(`Render Rainfall - ${span}ms`);
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
                <span className={"graphDescription"}>
                    Historical Rainfall<div className={"graphLabel"}> Average
                    <img src="src/img/icons/grey-square.png"/></div> <div className={"graphLabel"}>Actual <img
                    src="src/img/icons/blue-line.png"/></div></span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }

});

module.exports = Rainfall;
