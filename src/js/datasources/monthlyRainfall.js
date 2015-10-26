"use strict";

import CachingDataSource from './cachingDataSource';

import util from "../common/util";
import debugFactory from "debug";
const debug = debugFactory('app:data_sources:MonthlyRainfall');

/**
 * A datasource wrapping the monthly average rainfall
 */
class MonthlyRainfallDataSource extends CachingDataSource {
    retrieveData(state) {
        debug('retrieving monthly rainfall data for ', state, this);
        const dataUrl = `data/weather/state/${state.toUpperCase()}/rain.csv`;

        return new Promise((resolve, reject) => {
            d3.csv(dataUrl, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    //transpose and summarize the data into monthly and annual with real dates
                    const monthly = util.rainfall.monthly(data);
                    resolve({
                        data: monthly,
                        index: crossfilter(monthly)
                    });
                }
            });
        });
    }
}

module.exports = MonthlyRainfallDataSource;