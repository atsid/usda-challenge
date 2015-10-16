"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

function MapControl(reactComponent) {
    this.element = document.createElement('div');
    ReactDOM.render(reactComponent, this.element);
    this.register = (map, position, index) => {
        this.element.index = index;
        map.controls[position].push(this.element);
    }
}

module.exports = MapControl;