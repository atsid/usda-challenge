"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the hi-low data
 */
class HighLowDataSource extends CachingDataSource {
    getName() {
        return "HighLowDataSource";
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            const dateFormat = d3.time.format("%m/%d/%y");
            const numeric = ['lat', 'lon', 'high', 'low', 'elevation'];
            const locations = {};

            d3.csv('data/iowa-hi-lo-clipped.csv',
                //accessor function cleans up each row as it is read from csv
                function (d) {
                    var row = {
                        id: d.id,
                        name: d.name,
                        date: dateFormat.parse(d.date)
                    };
                    numeric.forEach(function (key) {
                        row[key] = parseFloat(d[key]);
                    });
                    row.location = {
                        latitude: row.lat,
                        longitude: row.lon
                    };

                    locations[d.id] = row.location;

                    return row;
                },
                function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            locations: locations,
                            data: data,
                            index: crossfilter(data)
                        });
                    }
                });
        });
    }
}

module.exports = HighLowDataSource;