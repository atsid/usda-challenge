"use strict";

import React from "react";
import debugFactory from "debug";
import stateData from '../map/states';
const debug = debugFactory('app:components:panes:cropmetrics:cropSelection');
import CropStore from './CropStore';
import CropTile from './CropTile';

const cropStore = new CropStore();

const CropSelectionComponent = React.createClass({
    propTypes: {
        state: React.PropTypes.string.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        crop: React.PropTypes.string.isRequired,
    },

    getInitialState() {
        return {crops: []};
    },

    componentDidMount() {
        this.loadCrops(this.props.state);

    },

    componentWillReceiveProps(nextProps) {
        this.loadCrops(nextProps.state);
    },

    loadCrops(state) {
        cropStore.getCropsByState(state).then((crops) => {
            this.setState({crops, state});
        });
    },

    getStateName() {
        return stateData.statesByCode[this.props.state].name;
    },

    render() {
        const crops = this.state.crops.map((crop, index) => {
            const isSelected = this.props.crop === crop.name;
            return (<CropTile key={`crop${index}`} crop={crop} isSelected={isSelected} onSelect={this.props.onSelect}/>);
        });

        const noData = `${this.getStateName()} has no data available for ${this.props.crop}`;
        const cropTiles = (<div className="cropTileContainer">{crops}</div>);
        return (<div>{crops.length === 0 ? noData : cropTiles}</div>);
    },
});

export default CropSelectionComponent;
