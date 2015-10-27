"use strict";

import CachingDataSource from './cachingDataSource';
import util from '../common/util';

/**
 * A datasource wrapping the hi-low data
 */
class RainfallDataSource extends CachingDataSource {
    getName() {
        return "RainfallDataSource";
    }

    retrieveData(state) {
        return new Promise((resolve, reject) => {
            d3.csv(`data/weather/state/${state.toUpperCase()}/rain.csv`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const yearly = util.rainfall.yearly(data);
                    resolve({
                        data: yearly,
                        index: crossfilter(data)
                    });
                }
            });
        });
    }
}

module.exports = RainfallDataSource;