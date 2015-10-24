"use strict";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import debugFactory from "debug";
const debug = debugFactory('app:components:YearSelector');

const MIN_YEAR = 2000;
const MAX_YEAR = 2014;
const YEARS = [];
for (let y = MAX_YEAR; y >= MIN_YEAR; y--) {
    YEARS.push(y);
}

const YearSelector = React.createClass({
    propTypes: {
        year: React.PropTypes.number.isRequired,
        onYearChange: React.PropTypes.func.isRequired,
    },

    render() {
        const selectedYear = this.props.year;
        const gotoYear = (year) => this.props.onYearChange(year);
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
