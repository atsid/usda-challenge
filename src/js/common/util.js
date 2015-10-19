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
                if (d.Year !== '0000') { //make sure this is not an 'annual' entry
                    //push a set of items in for every month in the row
                    Object.keys(months).forEach(function (month) {
                        output.push({
                            id: d.id1,
                            date: new Date(d.Year * 1, months[month], 1), //first day of the month
                            value: d[month] * 1 //coerce precip for that month
                        });
                    });
                }
            });

            return output;
        },

        //this function does the same as monthly, but duplicates the 30-year average '0000' readings for each year in the dataset
        monthlyAverage30: function (data) {

            var output = [];

            data.forEach(function (d) {
                if (d.Year === '0000') { //only process 'annual' entries
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
                }
            });

            return output;
        }
    };

    util.geospatial = {

        //TODO: this needs to actually hit test the passed points
        hitTestPoints: function (points, center, radius) {
            debug('hit testing points', points.length);
            debug('location', center);
            var output = {};
            points.forEach(function (point) {
                output[point.id] = point;
            });
            return output;
        }

    };

    module.exports = util;

}(this));