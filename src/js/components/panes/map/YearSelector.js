"use strict";
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
    },

    componentDidMount() {
    },

    render() {
        let selectedYear = parseInt(this.context.location.query.year) || 2012;

        const yearComponents = YEARS.map((year) => {
            const isSelected = (year) => selectedYear === year;
            return (
                <div key={"year" + year}
                     className={"yearbox" + (isSelected(year) ? " selected" : "")}>
                    <Link to="/dashboard" query={{year}}>{year}</Link>
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