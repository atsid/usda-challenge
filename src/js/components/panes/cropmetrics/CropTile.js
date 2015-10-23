"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:components:CropTile');

const CropTile = React.createClass({
    propTypes: {
        crop: React.PropTypes.object.isRequired,
        isLast: React.PropTypes.bool.isRequired
    },

    handleSelect(e, k) {
        this.props.onSelect(this.props.crop.name);
    },


    render() {
        const name = this.props.crop.name;
        const imageUrl = this.props.crop.imageUrl;
        const tileClass = (this.props.isLast ? "cropTile" : "cropTile innerCropTile");
        return (
            <div className={tileClass} onClick={this.handleSelect}>
                <img src={imageUrl} />
                <div>
                    <div>{name}</div>
                </div>
            </div>
        );
    },
});
export default CropTile;
