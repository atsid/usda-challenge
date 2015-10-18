"use strict";

// import d3 from 'd3';

/**
 * A datasource wrapping the stations geo data
 */
class StationsDataSource {
    list() {
        var that = this;
        if (!this.__listPromise) {
            this.__listPromise = new Promise(function (resolve, reject) {

                if (!that.__data) {

                    d3.csv('data/weather/stations.csv',
                        function (err, data) {
                            if (err) {
                                that.__data = undefined;
                                reject(err);
                            } else {
                                that.__data = {
                                    data: data
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

module.exports = StationsDataSource;