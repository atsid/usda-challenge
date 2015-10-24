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
        onSelect: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return { crops: [], selectedCrop:{}};
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
            const isSelected = this.state.selectedCrop.name === crop.name;
            return (<CropTile key={`crop${index}`} crop={crop} isSelected={isSelected} onSelect={this.handleSelect}/>);
        });
        const noData = `{localStateName} has data available for this.state.crop`;
        return (
            <div>
                <div className="cropTileContainer">
                    {crops.length === 0 ? noData : crops}
                </div>
            </div>
        );
    },
});

export default CropSelectionComponent;
