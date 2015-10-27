"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the Crop Yield, by CWT/Acre
 */
class CropYieldsCWTADataSource extends CachingDataSource {
    getName() {
        return "CropYieldsCWTADataSource";
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            d3.csv('data/nass-yield-cwt-per-acre.csv',
                function (err, data) {
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

module.exports = CropYieldsCWTADataSource;
