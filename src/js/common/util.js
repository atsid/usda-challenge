'use strict';

import debugFactory from "debug";
const debug = debugFactory('app:common:util');

//obviously, these should eventually be read from the data so it isn't hard-limited
const minYear = 2000;
const maxYear = 2015;
const months = {
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

const deg2rad = (deg) =>deg * Math.PI / 180; // radians = degrees * pi/180

module.exports = {
    reducers: {
        average: {
            add(key) {
                return function (p, v) {
                    ++p.count;
                    p.sum += (v[key] || 0);
                    p.avg = Math.round(p.sum / p.count);
                    return p;
                };
            },
            remove(key) {
                return function (p, v) {
                    --p.count;
                    p.sum -= (v[key] || 0);
                    p.avg = p.count ? Math.round(p.sum / p.count) : 0;
                    return p;
                };
            },
            init() {
                return function () {
                    return {count: 0, sum: 0, avg: 0};
                };
            }
        },
        location: {
            add() {
                return function (p, v) {
                    ++p.count;
                    p.latitude = v.location.latitude;
                    p.longitude = v.location.longitude;
                    p.label = v.name; //last one wins
                    return p;
                };
            },
            remove() {
                return function (p, v) {
                    --p.count;
                    return p;
                };
            },
            init() {
                return function () {
                    return {count: 0};
                };
            }
        }
    },
    rainfall: {
        monthly(data) {
            const output = [];
            data.forEach((d) =>{
                //push a set of items in for every month in the row
                Object.keys(months).forEach((month) => {
                    output.push({
                        id: d.id1,
                        date: new Date(d.Year * 1, months[month], 1), //first day of the month
                        value: d[month] * 1 //coerce precip for that month
                    });
                });
            });
            return output;
        },

        yearly(data) {
            const output = [];
            data.forEach((d) =>{
                //push a set of items in for every month in the row
                let totalRainInYear = 0;
                Object.keys(months).forEach((month) => totalRainInYear += parseFloat(d[month]));
                output.push({
                    id: d.id1,
                    date: new Date(d.Year * 1, 1, 1), //first day of the year
                    value: totalRainInYear
                });
            });
            return output;
        },

        //this function does the same as monthly, but duplicates the 30-year average '0000' readings for each year in the dataset
        monthlyAverage30(data) {
            const output = [];
            data.forEach((d) => {
                //push a set of items in for every month in the row
                Object.keys(months).forEach((month) => {
                    //replicate the data for each month for all years - this is how we compare to the regular monthly data
                    const monthNum = months[month];
                    const value = d[month] * 1;  //coerce precip for that month
                    for (let year = minYear; year <= maxYear; year++) {
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
    },
    geospatial: {
        deg2rad,
        hitTestPoints(points, center, radius) {
            const output = {};
            //uses Great Circle distance to check if point diff is within radius
            points.forEach((point) => {
                //http://andrew.hedges.name/experiments/haversine/
                //dlon = lon2 - lon1
                //dlat = lat2 - lat1
                //a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
                //c = 2 * atan2( sqrt(a), sqrt(1-a) )
                //d = R * c (where R is the radius of the Earth)

                const lat1 = deg2rad(center.lat);
                const lat2 = deg2rad(point.lat);
                const lon1 = deg2rad(center.lng);
                const lon2 = deg2rad(point.lon);
                const dlon = lon2 - lon1;
                const dlat = lat2 - lat1;
                const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = 3961 * c; //radius of earth in miles
                if (d < radius) {
                    output[point.id] = point;
                }
            });
            debug(`${points.length} subset count => ${Object.keys(output).length}`);
            return output;
        }
    }
};