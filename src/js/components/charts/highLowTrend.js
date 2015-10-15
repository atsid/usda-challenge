"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import util from "../../common/util";
import colors from "./colors";
import ReactDOM from "react-dom";

var HighLowTrend = React.createClass({

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
            let index = results.index;
            let dates = index.dimension((d) => {
                return d3.time.day(d.date);
            });
            var highGroup = dates.group().reduce(
                util.reducers.average.add('high'),
                util.reducers.average.remove('high'),
                util.reducers.average.init()
            );
            var lowGroup = dates.group().reduce(
                util.reducers.average.add('low'),
                util.reducers.average.remove('low'),
                util.reducers.average.init()
            );
            //composite chart - set shared values, then use `compose` to add individual graphs
            let tempChart = dc.compositeChart(el);
            tempChart
                .width($(el).innerWidth() - 30)
                .height(200)
                .margins({ top: 10, left: 30, right: 10, bottom: 20 })
                .x(d3.time.scale().domain([startDate, endDate]))
                .dimension(dates)
                .compose([
                    dc.lineChart(tempChart)
                        .group(highGroup)
                        .colors(colors.highTemp)
                        .elasticX(true)
                        .valueAccessor(function (d) {
                            return d.value.avg;
                        }),
                    dc.lineChart(tempChart)
                        .group(lowGroup)
                        .colors(colors.lowTemp)
                        .elasticX(true)
                        .valueAccessor(function (d) {
                            return d.value.avg;
                        })
                ]);
            this.state.myChart = tempChart;
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
            <div className={"col-xs-12"} id="hilowtrend">
                <h4>Temperature</h4>
                <span className={"text-muted"}>High and low per day, degrees C</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

module.exports = HighLowTrend;
