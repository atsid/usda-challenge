"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the Crop Yield, by BU/Acre
 */
class CropYieldsBUADataSource extends CachingDataSource {
    getName() {
        return "CropYieldsBUADataSource";
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            d3.csv('data/nass-yield-bu-per-acre.csv',
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

module.exports = CropYieldsBUADataSource;
