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
    },

    getInitialState() {
        return { crops: [], selectedCrop:"corn"};
    },

    componentDidMount() {
        this.loadCrops(this.props.state);

    },

    componentWillReceiveProps(nextProps) {
        this.loadCrops(nextProps.state);
    },

    loadCrops(state) {
        cropStore.getCrops().then((crops) => {
        this.setState({crops, state})
        debug("loading Crops");
        debug(this.state.crops);
      });
    },

    handleSelect(k) {
        this.props.onSelect(k);
        this.setState({selectedCrop: k, crops: this.state.crops})
    },



    render() {
      debug(this.props)
        const localStateName = stateData.statesByCode[this.props.state].name;
        debug(localStateName)
        const localStateCode = this.props.state;
//        const state = "{state}";
        const crops = this.state.crops.map((crop, index) => {
            const isSelected = this.state.selectedCrop === crop.name;
            return (<CropTile key={`crop${index}`} crop={crop} isSelected={isSelected} onSelect={this.handleSelect}/>);
        });
        const noData = `{localStateName} has data available for this.state.crop`;
        return (
            <div>
                <div className="cropHeader">Below are crops that grow in <span>{localStateName}</span> select one would you like to see.</div >
                <div className="cropTileContainer">
                    {crops.length === 0 ? noData : crops}
                </div>
            </div>
        );
    },
});

export default CropSelectionComponent;
