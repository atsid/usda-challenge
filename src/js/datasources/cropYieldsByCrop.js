"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the Cropy Yield, by Ba/Acre
 */
class CropYieldsByCropDataSource extends CachingDataSource {
    retrieveData(crop) {
        return new Promise((resolve, reject) => {
            d3.csv('data/crops/' + crop.toUpperCase() + '-yield.csv',
                function (d) {
                    d.date = new Date(d.year, 1, 1); // coerce to date object
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

module.exports = CropYieldsByCropDataSource;
