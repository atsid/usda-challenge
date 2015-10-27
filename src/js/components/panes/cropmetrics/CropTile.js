"use strict";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:components:CropTile');

const CropTile = React.createClass({
    propTypes: {
        crop: React.PropTypes.object.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },

    handleSelect() {
        this.props.onSelect(this.props.crop.name);
    },

    render() {
        const tileClass = (this.props.isSelected ? "cropTile selectedCropTile" : "cropTile nonselectedCropTile" );
        return (
            <div className={tileClass} onClick={this.handleSelect}>
                <img src={this.props.crop.imageUrl} />
                <div className="cropName">{_.capitalize(this.props.crop.name)}</div>
            </div>
        );
    },
});
export default CropTile;
