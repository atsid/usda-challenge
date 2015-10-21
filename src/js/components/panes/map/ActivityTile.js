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
        const percent = this.props.activity.percent;
        const imageUrl = this.props.activity.imageUrl;
        return (
            <div style={{display: 'flex', marginLeft: '20px'}}>
                <img src={imageUrl} style={{
                    height: "75px",
                    width: "75px",
                    display: "inline"
                }}/>
                <div>
                    <div style={{fontSize: '20pt'}}>{Math.round(percent)}%</div>
                    <div>{name}</div>
                </div>
            </div>
        );
    },
});
export default ActivityTile;
