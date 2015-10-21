"use strict";

class Layer {
    constructor(map, isVisible) {
        this.map_ = map;
        this.artifacts = [];
        this.isVisible = isVisible;

        map.addListener('bounds_changed', _.debounce(this.rerender.bind(this), 150));
    }

    rerender() {
        if (this.isVisible) {
            const map = this.map_;
            this.generateMapArtifacts(map, map.getBounds());
        }
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