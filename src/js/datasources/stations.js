"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the stations geo data
 */
class StationsDataSource extends CachingDataSource {
    retrieveData() {
        return new Promise((resolve, reject) => {
            d3.csv('data/weather/stations.csv',
                function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({data});
                    }
                });
        });
    }
}

module.exports = StationsDataSource;