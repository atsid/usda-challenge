"use strict";

// import d3 from 'd3';

/**
 * A datasource wrapping the Cropy Yield, by Ba/Acre
 */
class CropYieldsByCropDataSource {
    list(crop) {
        var that = this;
        if (!this.__listPromise) {
            this.__listPromise = new Promise(function (resolve, reject) {
                if (!that.__data) {
                    d3.csv('data/nass-yield-bales-per-acre.csv',
                        function (d) {
                            d.date = new Date(d.Year,1,1); // coerce to date object
                            return d;
                        },
                        function (err, data) {
                            if (err) {
                                that.__data = undefined;
                                reject(err);
                            } else {
                                that.__data = {
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

module.exports = CropYieldsByCropDataSource;
