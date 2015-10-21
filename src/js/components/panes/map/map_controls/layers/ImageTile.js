"use strict";
import Tile from './Tile';

class ImageTile extends Tile {
    constructor(bounds, map, image) {
        super(bounds, map);
        this.image_ = image;
    }

    render(div) {
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';
        div.style.visibility = 'hidden';

        // Create the img element and attach it to the div.
        const img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        img.onerror = () => img.style.visibility = 'hidden';
        img.onload = () => img.style.visibility = 'visible';
        div.appendChild(img);
    }
}

export default ImageTile;