"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:components:ActivityTile');

const ActivityTile = React.createClass({
    propTypes: {
        activity: React.PropTypes.object.isRequired
    },

    render() {
        const name = this.props.activity.name;
        const percent = Math.round(this.props.activity.percent);
        const imageUrl = this.props.activity.imageUrl;
        return (
            <div className="activityTile">
                <img src={imageUrl} />
                <div>
                    <div className="activityTilePercent">{percent}%</div>
                    <div>{name}</div>
                </div>
            </div>
        );
    },
});
export default ActivityTile;
