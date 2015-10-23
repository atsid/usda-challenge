"use strict";

import React from "react";
import debugFactory from "debug";
//import stateData from '../map/states';
const debug = debugFactory('app:components:panes:cropmetrics:cropSelection');
import CropStore from './CropStore';
import CropTile from './CropTile';

const cropStore = new CropStore();
const CropSelectionComponent = React.createClass({
    propTypes: {
        stateObj: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return { crops: []};
    },

    componentDidMount() {
        this.loadCrops(this.props.stateObj);

    },

    componentWillReceiveProps(nextProps) {
        this.loadCrops(nextProps.stateObj);
    },

    loadCrops(state) {
        cropStore.getCrops().then((crops) => {
        this.setState({crops})
        debug("loading Crops");
        debug(this.state.crops);
      });
    },

    handleSelect(k) {
        this.props.onSelect(k);
    },



    render() {
//        const stateName = stateData.statesByCode[this.props.stateObj].name;
        const stateName = "CONST STATE FOR NOW";
        const crops = this.state.crops.map((crop, index) => {
            const isLast = index === this.state.crops.length - 1;
            return (<CropTile key={`crop${index}`} crop={crop} isLast={isLast} onSelect={this.handleSelect}/>);
        });
        const noData = `ZZZZZ has data available for CORNNN`;
        return (
            <div>
                <div className="cropHeader">Below are crops that grow in <span>{stateName}</span> select one would you like to see.</div >
                <div className="cropTileContainer">
                    {crops.length === 0 ? noData : crops}
                </div>
            </div>
        );
    },
});

export default CropSelectionComponent;
