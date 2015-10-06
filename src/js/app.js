(function (global) {
    'use strict';

    var usda = global.usda;
    var url = 'data/iowa-hi-lo-clipped.csv';

    var map = new usda.Map();
    usda.map = map;

    var dashboard = new usda.Dashboard(url, map);
    usda.dashboard = dashboard;


}(this));
