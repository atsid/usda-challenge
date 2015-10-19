'use strict';

import debugFactory from "debug";
const debug = debugFactory('app:common:util');

(function (global) {

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

    //obviously, these should eventually be read from the data so it isn't hard-limited
    var minYear = 2000;
    var maxYear = 2015;

    var months = {
        'JanPrec': 1,
        'FebPrec': 2,
        'MarPrec': 3,
        'AprPrec': 4,
        'MayPrec': 5,
        'JunPrec': 6,
        'JulPrec': 7,
        'AugPrec': 8,
        'SepPrec': 9,
        'OctPrec': 10,
        'NovPrec': 11,
        'DecPrec': 12
    };

    util.rainfall = {

        /*
         AprPrec: "3.77"
         AugPrec: "4.63"
         DecPrec: "4.73"
         FebPrec: "5.07"
         JanPrec: "5.3"
         JulPrec: "5.94"
         JunPrec: "5.2"
         MarPrec: "5.8"
         MayPrec: "3.82"
         NovPrec: "4.61"
         OctPrec: "3.11"
         SepPrec: "3.53"
         Year: "0000"
         id1: "USC00010008"
         */
        monthly: function (data) {

            var output = [];

            data.forEach(function (d) {
                //push a set of items in for every month in the row
                Object.keys(months).forEach(function (month) {
                    output.push({
                        id: d.id1,
                        date: new Date(d.Year * 1, months[month], 1), //first day of the month
                        value: d[month] * 1 //coerce precip for that month
                    });
                });
            });

            return output;
        },

        //this function does the same as monthly, but duplicates the 30-year average '0000' readings for each year in the dataset
        monthlyAverage30: function (data) {

            var output = [];

            data.forEach(function (d) {
                //push a set of items in for every month in the row
                Object.keys(months).forEach(function (month) {
                    //replicate the data for each month for all years - this is how we compare to the regular monthly data
                    var monthNum = months[month];
                    var value = d[month] * 1;  //coerce precip for that month
                    for (var year = minYear; year <= maxYear; year++) {
                        output.push({
                            id: d.id1,
                            date: new Date(year, monthNum, 1), //first day of the month
                            value: value
                        });
                    }
                });
            });

            return output;
        }
    };

    util.geospatial = {

        deg2rad(deg) {
            var rad = deg * Math.PI/180; // radians = degrees * pi/180
            return rad;
        },

        hitTestPoints: function (points, center, radius) {
            var output = {};
            //uses Great Circle distance to check if point diff is within radius
            points.forEach(function (point) {
                //http://andrew.hedges.name/experiments/haversine/
                //dlon = lon2 - lon1
                //dlat = lat2 - lat1
                //a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
                //c = 2 * atan2( sqrt(a), sqrt(1-a) )
                //d = R * c (where R is the radius of the Earth)

                var lat1 = util.geospatial.deg2rad(center.lat);
                var lat2 = util.geospatial.deg2rad(point.lat);
                var lon1 = util.geospatial.deg2rad(center.lng);
                var lon2 = util.geospatial.deg2rad(point.lon);
                var dlon = lon2 - lon1;
                var dlat = lat2 - lat1;
                var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
                var c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
                var d = 3961 * c; //radius of earth in miles
                if (d < radius) {
                    output[point.id] = point;
                }
            });
            debug('subset station count: ' + Object.keys(output).length);
            return output;
        }

    };

    module.exports = util;

}(this));