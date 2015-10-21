"use strict";
import Tile from './Tile';

class ColorTile extends Tile {
    constructor(bounds, map, color, opacity=1.0) {
        super(bounds, map);
        this.color_ = color;
        this.opacity_ = opacity;
    }

    render(div) {
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';
        div.style.backgroundColor = this.color_;
        div.style.opacity = this.opacity_;
    }
}

export default ColorTile;