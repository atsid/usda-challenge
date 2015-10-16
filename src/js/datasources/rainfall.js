"use strict";

// import d3 from 'd3';

/**
 * A datasource wrapping the hi-low data
 */
class RainfallDataSource {
    list() {
        var that = this;
        if (!this.__listPromise) {
            this.__listPromise = new Promise(function (resolve, reject) {
                let dateFormat = d3.time.format("%m/%d/%y");
                let numeric = ['lat', 'lon', 'high', 'low', 'elevation'];
                if (!that.__data) {
                    let locations = {};

                    d3.csv('data/temp-rain.csv',
                        //accessor function cleans up each row as it is read from csv
                        function (d) {

                            var row = {
                                id: d.id,
                                name: d.name,
                                date: dateFormat.parse(d.date)
                            };
                            numeric.forEach(function (key) {
                                row[key] = parseFloat(d[key]);
                            });
                            row.location = {
                                latitude: row.lat,
                                longitude: row.lon
                            };

                            locations[d.id] = row.location;

                            return row;
                        },
                        function (err, data) {
                            if (err) {
                                that.__data = undefined;
                                reject(err);
                            } else {
                                that.__data = {
                                    locations: locations,
                                    data: data,
                                    index: crossfilter(data)
                                };
                                resolve(that.__data);
                            }
                        });
                } else {
                    resolve(that.__data);
                }
            });
        }

        return this.__listPromise;
    }
}

module.exports = RainfallDataSource;