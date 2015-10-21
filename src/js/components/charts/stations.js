"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import util from "../../common/util";
import colors from "./colors";
import ReactDOM from "react-dom";

var Stations = React.createClass({

    propTypes: {
        dataSource: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {};
    },

    componentDidMount: function () {
        var el = ReactDOM.findDOMNode(this);

        let locations = {};
        this.props.dataSource.list().then((results) => {

            let locations = results.locations;
            let data = results.data;
            let index = results.index;

            var stations = index.dimension(function(d) { return d.id; });

            var stationGroup = stations.group().reduce(
                util.reducers.location.add(),
                util.reducers.location.remove(),
                util.reducers.location.init()
            );

            var stationsChart = dc.rowChart(el);

            stationsChart
                .width($(el).innerWidth() - 30)
                .height(200)
                .margins({ top: 10, left: 5, right: 10, bottom: 20 })
                .colors(colors.main)
                .group(stationGroup)
                .dimension(stations)
                .label(function (d) {
                    return d.value.label;
                })
                .valueAccessor(function (d) {
                    return d.value.count;
                })
                .elasticX(true)
                .gap(2)
                .ordering(function (i) { return -i.value; })
                .labelOffsetY(8)
                .xAxis().ticks(3);

            dc.renderAll();

            this.state.myChart = stationsChart;
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
            <div className={"col-xs-4"}>
                <h4>Stations</h4>
                <span className={"text-muted"}>Station location readings</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

module.exports = Stations;
