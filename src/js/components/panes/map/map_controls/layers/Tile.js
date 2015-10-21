"use strict";

class Tile extends google.maps.OverlayView {
    constructor(bounds, map) {
        super();
        this.bounds_ = bounds;
        this.map_ = map;
        this.div_ = null;
        this.setMap(map);
    }

    /**
     * Hides the Tile from view
     */
    hide() {
        this.setMap(undefined);
    }

    /**
     * Shows the tile in view
     */
    show() {
        this.setMap(this.map_);
    }

    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    onAdd() {
        const div = document.createElement('div');
        this.render(div);
        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
    }

    draw() {
        const overlayProjection = this.getProjection();
        const sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        const ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
        const div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
    }

    onRemove() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
}

export default Tile;