"use strict";

// import d3 from 'd3';

/**
 * A datasource wrapping the Cropy Yield, by CWT/Acre
 */
class CropYieldsCWTADataSource {
    list() {
        var that = this;
        if (!this.__listPromise) {
            this.__listPromise = new Promise(function (resolve, reject) {
                if (!that.__data) {
                    let locations = {};

                    d3.csv('data/nass-yield-cwt-per-acre.csv',
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

module.exports = CropYieldsCWTADataSource;