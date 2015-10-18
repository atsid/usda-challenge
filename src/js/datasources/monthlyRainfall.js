"use strict";

// import d3 from 'd3';
import util from "../common/util";

/**
 * A datasource wrapping the monthly average rainfall
 */
class MonthlyRainfallDataSource {
    //files are bucketed by state to reduce download size
    list(state) {
        var that = this;
        if (!this.__listPromise) {
            this.__listPromise = new Promise(function (resolve, reject) {
                if (!that.__data) {
                    d3.csv('data/weather/state/' + state.toUpperCase() + '/rain.csv',
                        function (err, data) {
                            if (err) {
                                that.__data = undefined;
                                reject(err);
                            } else {
                                //transpose and summarize the data into monthly and annual with real dates
                                var monthly = util.rainfall.monthly(data);

                                that.__data = {
                                    data: monthly,
                                    index: crossfilter(monthly)
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

module.exports = MonthlyRainfallDataSource;