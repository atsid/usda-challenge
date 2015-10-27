"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the Cropy Yield, by Ba/Acre
 */
class CropYieldsBaADataSource extends CachingDataSource {
    getName() {
        return "CropYieldsBaADataSource";
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            d3.csv('data/nass-yield-bales-per-acre.csv',
                function (d) {
                    d.yearTime = d3.time.year(new Date(d.Year, 1, 1)); // coerce to date object
                    d.monthTime = d3.time.month(new Date(d.Year, 1, 1)); // coerce to date object
                    return d;
                },
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

module.exports = CropYieldsBaADataSource;
