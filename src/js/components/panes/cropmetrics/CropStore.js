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

const stateToCrops = {
	'AK': ['barley', 'hay', 'haylage', 'oats', 'wheat'],
	'AL': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'AR': ['barley', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'wheat'],
	'AZ': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'wheat'],
	'CA': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'CO': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'CT': ['beans', 'corn', 'hay', 'haylage', 'oats', 'soybeans', 'tobacco', 'wheat'],
	'DE': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'wheat'],
	'FL': ['beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'rice', 'sorghum', 'soybeans', 'sugarcane', 'tobacco', 'wheat'],
	'GA': ['barley', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'soybeans', 'wheat'],
	'HI': ['corn', 'hay', 'haylage', 'sorghum', 'soybeans', 'sugarcane'],
	'IA': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'wheat'],
	'ID': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'sugarbeets', 'wheat'],
	'IL': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'rice', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'IN': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'KS': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'tobacco', 'wheat'],
	'KY': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'soybeans', 'wheat'],
	'LA': ['beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'sugarcane', 'tobacco', 'wheat'],
	'MA': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'soybeans', 'tobacco', 'wheat'],
	'MD': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'ME': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'MI': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'MN': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'MO': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'MS': ['beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'wheat'],
	'MT': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'soybeans', 'sugarbeets', 'wheat'],
	'NC': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'soybeans', 'wheat'],
	'ND': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'NE': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'NH': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'wheat'],
	'NJ': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'wheat'],
	'NM': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'wheat'],
	'NV': ['barley', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'wheat'],
	'NY': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'OH': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'tobacco', 'wheat'],
	'OK': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'wheat'],
	'OR': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'PA': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'RI': ['corn', 'hay', 'haylage', 'oats', 'soybeans', 'wheat'],
	'SC': ['barley', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'SD': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'TN': ['barley', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'TX': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'rice', 'sorghum', 'soybeans', 'sugarcane', 'wheat'],
	'UT': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'sugarbeets', 'wheat'],
	'VA': ['barley', 'beans', 'corn', 'cotton', 'hay', 'haylage', 'oats', 'peanuts', 'sorghum', 'soybeans', 'wheat'],
	'VT': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'WA': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat'],
	'WI': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'WV': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'tobacco', 'wheat'],
	'WY': ['barley', 'beans', 'corn', 'hay', 'haylage', 'oats', 'sorghum', 'soybeans', 'sugarbeets', 'wheat']
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

    getCropsByState(state) {
      return new Promise((resolve, reject) => {
        const stateCrops = stateToCrops[state];
        const croplen = this.crops.length;
        let retval = [];
        for (let i=0; i < croplen; ++i) {
          let c = this.crops[i];
          if (-1 !== stateCrops.indexOf(c.name)) {
            retval.push(c);
          }
        }
        resolve(retval);
      });
    }

    // getCropByName(cropName) {
    //   return new Promise
    // }
    // getForState(stateCode) {
    //     return Object.keys(cache[stateCode]);
    // }

    _createCropDatum(name) {
        const imageUrl = this._getCropImageUrl(name);
        return {name, imageUrl};
    }

    _getCropImageUrl(name) {
        const lcName = name.toLowerCase();
        const icon = KNOWN_CROPS[lcName] || 'misc';
        return `src/img/icons/crops/${icon}.png`;
    }
}
