(function (global) {
    'use strict';

    var util = {};

    util.reducers = {
        average: {
            add: function (key) {
                return function (p, v) {
                    ++p.count;
                    p.sum += v[key];
                    p.avg = Math.round(p.sum / p.count);
                    return p;
                };
            },
            remove: function (key) {
                return function (p, v) {
                    --p.count;
                    p.sum -= v[key];
                    p.avg = p.count ? Math.round(p.sum / p.count) : 0;
                    return p;
                };
            },
            init: function () {
                return function () {
                    return {count: 0, sum: 0, avg: 0};
                };
            }
        },
        location: {
            add: function () {
                return function (p, v) {
                    ++p.count;
                    p.latitude = v.location.latitude;
                    p.longitude = v.location.longitude;
                    p.label = v.name; //last one wins
                    return p;
                };
            },
            remove: function () {
                return function (p, v) {
                    --p.count;
                    return p;
                };
            },
            init: function () {
                return function () {
                    return {count: 0};
                };
            }
        }
    };

    global.usda.util = util;

}(this));