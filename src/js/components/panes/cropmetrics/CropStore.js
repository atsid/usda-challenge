"use strict";
const request = require('superagent');
const debug = require('debug')('components:panes:cropmetrics:CropStore');

const KNOWN_CROPS = {
    barley: 'barley',
    beans: 'beans',
    corn: 'corn',
    cotton: 'cotton',
    hay: 'hay',
    haylage: 'haylage',
    oats: 'oats',
    rice: 'rice',
    sorghum: 'sorghum',
    soybeans: 'soybeans',
    sugarbeets: 'sugarbeets',
    sugarcane: 'sugarcane',
    wheat: 'wheat'
};

export default class CropStore {

  constructor () {
    const localCrops = [];
    for (let key in KNOWN_CROPS) {
      if (KNOWN_CROPS.hasOwnProperty(key)) {
        const datum = this._createCropDatum(KNOWN_CROPS[key]);
        localCrops.push(datum)
      }
    }
    this.crops = localCrops;
  }

    getCrops() {
      return new Promise((resolve, reject) => {
        resolve(this.crops);
      });
    }
    // getForState(stateCode) {
    //     return Object.keys(cache[stateCode]);
    // }

    _createCropDatum(name) {
      debug(name)
        const imageUrl = this._getCropImageUrl(name);
        debug("name: " + name + " image: " + imageUrl);
        return {name, imageUrl};
    }

    _getCropImageUrl(name) {
        const lcName = name.toLowerCase();
        const icon = KNOWN_CROPS[lcName] || 'misc';
        return `src/img/icons/crops/${icon}.png`;
    }
}
