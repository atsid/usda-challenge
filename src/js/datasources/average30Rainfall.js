"use strict";

// import d3 from 'd3';
import util from "../common/util";
import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the monthly average 30-year rainfall
 */
class Average30RainfallDataSource extends CachingDataSource {
    getName() {
        return "Average30RainfallDataSource";
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            d3.csv('data/monthly-precip-avg.csv', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    //transpose and summarize the data into monthly and annual with real dates
                    var average30 = util.rainfall.monthlyAverage30(data);
                    resolve({
                        data: average30,
                        index: crossfilter(average30)
                    });
                }
            });
        });
    }
}

module.exports = Average30RainfallDataSource;