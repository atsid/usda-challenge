"use strict";
const states = require('./raw_states');
const stateMap = {};
states.forEach((state) => stateMap[state.code] = state);
states.forEach((state) => state.polygon = new google.maps.Polygon({
    paths: state.coords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1.2,
    fillColor: '#FF0000',
    fillOpacity: 0.0,
}));

module.exports = {
    statesByCode: stateMap,
    states: states,
};