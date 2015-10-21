"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:components:ActivityTile');

const ActivityTile = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        percent: React.PropTypes.number.isRequired,
    },

    render() {
        const name = this.props.name;
        const percent = this.props.percent;
        return (
            <div>
                {name} - {percent}%
            </div>
        );
    },
});
export default ActivityTile;
