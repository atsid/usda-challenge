"use strict";

// import d3 from 'd3';
import util from "../common/util";
import debugFactory from "debug";
const debug = debugFactory('app:data_sources:MonthlyRainfall');

/**
 * A datasource wrapping the monthly average rainfall
 */
class MonthlyRainfallDataSource {
    constructor() {
        debug('constructing monthly rainfall data source');
    }
    //files are bucketed by state to reduce download size
    list(state) {
        if (!this.__listPromise) {
            this.__listPromise = new Promise((resolve, reject) => {
                if (this.__data) {
                    return resolve(this.__data);
                }

                debug('retrieving rainfall data for ', state, this);
                const dataUrl = `data/weather/state/${state.toUpperCase()}/rain.csv`;
                d3.csv(dataUrl, (err, data) => {
                    if (err) {
                        this.__data = undefined;
                        reject(err);
                    } else {
                        //transpose and summarize the data into monthly and annual with real dates
                        const monthly = util.rainfall.monthly(data);
                        this.__data = {
                            data: monthly,
                            index: crossfilter(monthly)
                        };
                        resolve(this.__data);
                    }
                });
            });
        }

        return this.__listPromise;
    }
}

module.exports = MonthlyRainfallDataSource;