"use strict";

class Layer {
    constructor(map, isVisible) {
        this.map_ = map;
        this.artifacts = [];
        this.isVisible = isVisible;

        map.addListener('bounds_changed', _.debounce(() => {
            if (this.isVisible) {
                this.generateMapArtifacts(this.map_, map.getBounds());
            }
        }, 150));
    }

    clear() {
        this.artifacts.forEach((a) => a.hide());
        this.artifacts = [];
    }

    show() {
        const map = this.map_;
        this.isVisible = true;
        this.generateMapArtifacts(map, map.getBounds());
    }

    hide() {
        this.isVisible = false;
        this.clear();
    }
}

export default Layer;