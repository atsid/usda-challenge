"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the Cropy Yield, by Tons/Acre
 */
class CropYieldsDataSource extends CachingDataSource {

    retrieveData() {
        return new Promise((resolve, reject) => {
            d3.csv('data/nass-yield-tons-per-acre.csv', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        data: data,
                        index: crossfilter(data)
                    });
                }
            });
        });
    }
}

module.exports = CropYieldsDataSource;
