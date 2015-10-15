"use strict";

// import dc from 'dc';
// import d3 from 'd3';
import React from "react";
import util from "../../common/util";
import colors from "./colors";
import debugFactory from "debug";
import ReactDOM from "react-dom";
const debug = debugFactory('app:components:CropYields');

let COMMODITIES = ['SUGARBEETS', 'CORN', 'SUGARCANE', 'HAY', 'HAYLAGE'];

var CropYields = React.createClass({

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
            //TODO: remove me
            debug('receiving data');

            var yearFormat = d3.time.format("%Y");
            var data = results.data;
            var ndx = results.index;

            data.forEach(function (item) {
                item.yearTime = d3.time.year(new Date(item.Year,1,1)); // coerce to date object
            });

            var yearlyDim = ndx.dimension((d) => d.yearTime);
            debug('yearlyDim', yearlyDim.top(10));

            var yearlyYieldGroup = yearlyDim.group().reduceSum((d) => d.Value);
            debug('yearlyYieldGroup: ', yearlyYieldGroup.all());

            var commodityDim = ndx.dimension((d) => d.Commodity);
            var stateDim = ndx.dimension((d) => d.State);
            var productionPracticeDim = ndx.dimension((d) => d.ProdPractice);

            var yieldTimeScale = d3.time.scale().domain([new Date(2000,1,1), new Date(2015, 1,1)])
            //var yieldTimeScale = d3.scale.linear().domain([2000, 2015])
            yieldTimeScale.ticks(d3.time.year)

            var gap = 80, translate = 10;
            var yearlyYieldGroupByCommodity = yearlyDim.group().reduce(
                function (p, v) {
                    p[v.Commodity].count++;
                    p[v.Commodity].total += parseFloat(v.Value);
                    return p;
                },
                function reduceRemove(p, v) {
                    p[v.Commodity].count--;
                    p[v.Commodity].total -= parseFloat(v.Value);
                    return p;
                },
                function reduceInitial() {
                    var initial = {
                        commodities: {}
                    };
                    COMMODITIES.forEach((c) => initial[c] = {
                        count: 0,
                        total: 0
                    });
                    return initial;
                });

            let tempChart = dc.compositeChart(el);
            tempChart
                .width($(el).innerWidth()-30)
                .height(250)
                .margins({top: 10, left:50, right: 10, bottom:40})
                .x(yieldTimeScale)
                .xUnits(d3.time.years)
                .yAxisLabel("Tons / Arce")
                .xAxisLabel("Survey Year")
                // .colors(colors.main)
                .dimension(yearlyDim)
                .brushOn(false)
                .compose(
                    COMMODITIES.map((c) => {
                        return dc.barChart(tempChart)
                            .group(yearlyYieldGroupByCommodity)
                            .gap(gap)
                            .brushOn(false)
                            .colors(["#" + intToRGB(hashCode(c))])
                            .valueAccessor((d) => {
                                return d.value[c].total;
                            });
                    }))
                .renderlet(function (chart) {
                    COMMODITIES.forEach((c, i) => {
                        var tip = d3.tip()
                            .attr('class', 'd3-tip')
                            .offset([-10, 0])
                            .html(function (d) {
                                return "<span style='color: #f0027f'>(" + d.data.key.getFullYear() + ") " +  c + ": " + d.data.value[c].total.toFixed(2) + " Tons/Acre " + "</span>";
                            });
                        var rect = chart.selectAll("g._" + i + " rect");
                        rect.attr("transform", "translate(" + (i * translate) + ", 0)");

                        rect.call(tip);
                        rect.on('mouseover', tip.show)
                            .on('mouseout', tip.hide);
                        });
                });
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
            <div className={"col-xs-12"} id="cropYieldsChart">
                <h4>Crop Yields</h4>
                <span className={"text-muted"}>Crop yields in Terms of Tons / Acre</span>
                <a className={"reset"} onClick={this.reset} style={{display: "none"}}>reset</a>
            </div>
        );
    }
});

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

module.exports = CropYields;
