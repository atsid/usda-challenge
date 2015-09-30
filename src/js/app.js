(function (global) {
    'use strict';

    console.log('js loaded');

    var usda = {};

    usda.map = new google.maps.Map($('#map')[0], {
        center: { lat: 42, lng: -94 },
        zoom: 5
    });

    global.usda = usda;

}(this));
