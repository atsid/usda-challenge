"use strict";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import debugFactory from "debug";
const debug = debugFactory('app:components:YearSelector');

const MIN_YEAR = 2000;
const MAX_YEAR = 2012;
const YEARS = [];
for (let y = MAX_YEAR; y >= MIN_YEAR; y--) {
    YEARS.push(y);
}

const YearSelector = React.createClass({
    propTypes: {
    },

    contextTypes: {
        location: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    },

    getYear() {
        return parseInt(this.context.location.query.year) || 2012;
    },

    render() {
        let selectedYear = this.getYear();
        const gotoYear = (year) => {
            const newQuery = _.merge(this.context.location.query, {year});
            this.context.history.pushState(null, "/dashboard", newQuery);
        };
        const yearComponents = YEARS.map((year) => {
            const isSelected = (year) => selectedYear === year;
            return (
                <div key={"year" + year}
                     className={"yearbox" + (isSelected(year) ? " selected" : "")}
                     onClick={() => gotoYear(year)}>
                    {year}
                </div>);
        });
        for (let index = 1; index < yearComponents.length; index += 2) {
            yearComponents.splice(index, 0, (<hr key={"yearline" + index} className="interYearLine"/>));
        }

        return (
            <div className="yearSelector">
                {yearComponents}
            </div>
        );
    }
});
module.exports = YearSelector;