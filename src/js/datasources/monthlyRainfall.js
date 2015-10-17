"use strict";

// import d3 from 'd3';
import util from "../common/util";

/**
 * A datasource wrapping the monthly average rainfall
 */
class MonthlyRainfallDataSource {
    list() {
        var that = this;
        if (!this.__listPromise) {
            this.__listPromise = new Promise(function (resolve, reject) {
                if (!that.__data) {
                    d3.csv('data/monthly-precip-avg-tmp.csv',
                        function (err, data) {
                            if (err) {
                                that.__data = undefined;
                                reject(err);
                            } else {
                                //transpose and summarize the data into monthly and annual with real dates
                                var monthly = util.rainfall.monthly(data);
                                var average30 = util.rainfall.monthlyAverage30(data);

                                that.__data = {
                                    monthly: monthly,
                                    monthlyIndex: crossfilter(monthly),
                                    average30: average30,
                                    average30Index: crossfilter(average30)
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