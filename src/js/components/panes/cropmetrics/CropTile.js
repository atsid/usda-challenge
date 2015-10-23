"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:components:CropTile');

const CropTile = React.createClass({
    propTypes: {
        crop: React.PropTypes.object.isRequired,
//        isLast: React.PropTypes.bool.isRequired
        isSelected: React.PropTypes.bool.isRequired
    },

    handleSelect(e, k) {
        this.props.onSelect(this.props.crop.name);
    },


    render() {
        const name = this.props.crop.name;
        const imageUrl = this.props.crop.imageUrl;
//        const tileClass = (this.props.isLast ? "cropTile" : "cropTile innerCropTile");
        const tileClass = (this.props.isSelected ? "cropTile selectedCropTile" : "cropTile" );
        return (
            <div className={tileClass} onClick={this.handleSelect}>
                <img src={imageUrl} />
                <div className="cropName">{name}</div>
            </div>
        );
    },
});
export default CropTile;