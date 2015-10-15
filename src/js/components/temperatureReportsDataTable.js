"use strict";

import React from "react";
// import dc from "dc";

let TemperatureReportsDataTable = React.createClass({

    propTypes: {
        dataSource: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {};
    },

    componentDidMount: function () {
        let el = this.getDOMNode();
        this.props.dataSource.list().then((results) => {
            var dataTable = dc.dataTable($(el).find(".data-table")[0]);
            var index = results.index;
            var dates = index.dimension((d) => d3.time.day(d.date));
            dataTable
                .dimension(dates)
                .group((d) => d.name)
                .size(100) // (optional) max number of records to be shown, :default = 25
                .columns([
                    (d) => d.date,
                    (d) => d.high,
                    (d) => d.low,
                    (d) => d.lat,
                    (d) => d.lon,
                    (d) => d.elevation
                ])
                .sortBy((d) => d.date)
                .order(d3.descending);

            dc.renderAll();
        });
    },

    render: function() {
        return (
            <div>
                <h2 className="sub-header">Raw Data</h2>
                <span className="text-muted">(Last 100 readings)</span>
                <div className="row">
                    <div className="col-xs-12">
                        <table className="table table-bordered table-hover table-striped table-condensed data-table" id="temperatureDataTable">
                            <thead>
                            <th className="col-xs-2">Date</th>
                            <th className="col-xs-1">High T</th>
                            <th className="col-xs-1">Low T</th>
                            <th className="col-xs-1">Lat</th>
                            <th className="col-xs-1">Long</th>
                            <th className="col-xs-3">Elev</th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TemperatureReportsDataTable;