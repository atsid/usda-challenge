"use strict";
import Layer from './Layer';
import ImageTile from './ImageTile';

class VegetationLayer extends Layer {

    generateMapArtifacts(map) {
        const zoom = map.getZoom();
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        for (let lat = Math.floor(sw.lat()); lat <= Math.ceil(ne.lat()); lat++) {
            // This loop only works in the western hemisphere
            for (let lng = Math.floor(ne.lng()); lng >= Math.floor(sw.lng()); lng--) {
                const tileUrl = `data/plantdensity/6/${lat}/${lng}.png`;
                const tileBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(lat, lng - 1),
                    new google.maps.LatLng(lat + 1, lng));
                this.artifacts.push(new ImageTile(tileBounds, tileUrl, map));
            }
        }

    }
}

export default VegetationLayer;