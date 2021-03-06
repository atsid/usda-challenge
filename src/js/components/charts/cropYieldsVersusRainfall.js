"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import util from "../../common/util";
import colors from "./colors";
import debugFactory from "debug";
const debug = debugFactory('app:components:CropYieldsVersusRainfall');
const stateData = require('../../components/panes/map/states');

var CropYieldsVersusRainfall = React.createClass({
    propTypes: {
        crop: React.PropTypes.object.isRequired,
        state: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        zoom: React.PropTypes.number.isRequired,
        radius: React.PropTypes.number.isRequired,
    },

    contextTypes: {
        cropYieldsDataSource: React.PropTypes.object.isRequired,
        rainfallDataSource: React.PropTypes.object.isRequired,
        stationDataSource: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {};
    },

    componentDidMount() {
        this.drawChart();
    },

    componentDidUpdate(prevProps) {
        if (prevProps.state !== this.props.state ||
            prevProps.radius !== this.props.radius ||
            prevProps.lat !== this.props.lat ||
            prevProps.lng !== this.props.lng ||
            prevProps.crop.name !== this.props.crop.name
        ) {
            this.drawChart();
        }
    },

    drawChart() {
        const start = new Date().getTime();
        //TODO: we don't need to re-get the rain data each time, only selected crop
        let el = ReactDOM.findDOMNode(this);
        Promise.all([
            this.context.cropYieldsDataSource.list(this.props.crop.name),
            this.context.rainfallDataSource.list(this.props.state),
            this.context.stationDataSource.list()
        ]).then((results) => {
            const cropData = results[0].data;
            const rainData = results[1].data;
            const stationData = results[2].data;

            var yieldIndex = results[0].index;
            var rainIndex = results[1].index;

            //subsets stations by a fixed radius, so we can constrain the plotted data to a reasonable spatial range
            const subsetStations = (stations, coords, radius) => util.geospatial.hitTestPoints(stations, coords, radius);
            //subsets the weather data to only include stations in the subset map
            const subsetWeatherData = (data, stations) => data.filter((d) => stations[d.id]);

            const stationSubset = subsetStations(stationData, {lat: this.props.lat, lng: this.props.lng}, this.props.radius);
            const rainDataSubset = subsetWeatherData(rainData, stationSubset);
            const rainDataSubsetIndex = crossfilter(rainDataSubset);

            var yearlyYieldDim = yieldIndex.dimension((d) => d3.time.month(d.date));
            var yearlyYieldGroup = yearlyYieldDim.group().reduceSum((d) => d.yield);

            var yearlyRainDim = rainDataSubsetIndex.dimension((d) => d3.time.year(d.date));
            const yearlyAverageRainGroup = yearlyRainDim.group().reduce(
                util.reducers.average.add('value'),
                util.reducers.average.remove('value'),
                util.reducers.average.init()
            );

            var timeScale = d3.time.scale().domain([new Date(2000, 1, 1), new Date(2015, 12, 31)]);

            var compChart = dc.compositeChart(el);
            compChart
                .width($(el).innerWidth() - 30)
                .height(250)
                .margins({top: 10, left: 50, right: 80, bottom: 40})
                .x(timeScale)
                .xUnits(d3.time.years)
                .yAxisLabel('Actual Rainfall (inches)')
                .rightYAxisLabel(this.cropLabel(this.props.crop))
                .dimension(yearlyYieldDim)
                .brushOn(false)
                .compose([
                    dc.barChart(compChart)
                        .colors(colors.yearlyAverageRainfall)
                        .barPadding(0.3)
                        .group(yearlyAverageRainGroup)
                        .valueAccessor((d) => d.value.avg),

                    dc.barChart(compChart)
                        .colors(colors.yield)
                        .barPadding(0.3)
                        .useRightYAxis(true)
                        .group(yearlyYieldGroup)
                ]);


            dc.renderAll();
            this.state.myChart = compChart;
            const span = new Date().getTime() - start;
            debug(`Render CropYieldsVersusRainfall - ${span}ms`);
        });
    },

    reset() {
        if (this.state && this.state.myChart) {
            this.state.myChart.filterAll();
            dc.redrawAll();
        }
    },

    cropUnits: {
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
    cropLabel(crop) {
        const units = this.cropUnits[crop.name.toUpperCase()];
        const prefix = _.capitalize(crop.name);
        return prefix + ' (' + units + ')';
    },

    render() {
        const cropName = _.capitalize(this.props.crop.name);
        const stateName = stateData.statesByCode[this.props.state].name;
        const cropImgUrl = this.props.crop.imageUrl;
        const rainImgUrl = 'src/img/icons/blue-square.png';
        return (
            <div className={"cropYieldChart"} id="cropYieldsChartGeneric">
                <div className={"graphDescription"}>
                    <span className={"first"}>
                        Historical {cropName}<img src={cropImgUrl}/> to Rainfall <img src={rainImgUrl}/> in {stateName}
                    </span>
                </div>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    },

});

module.exports = CropYieldsVersusRainfall;
