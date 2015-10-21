"use strict";

import CachingDataSource from './cachingDataSource';

/**
 * A datasource wrapping the hi-low data
 */
class RainfallDataSource extends CachingDataSource {
    retrieveData() {
        return new Promise((resolve, reject) => {
            let dateFormat = d3.time.format("%m/%d/%y");
            let numeric = ['lat', 'lon', 'high', 'low', 'elevation'];
            let locations = {};

            d3.csv('data/temp-rain.csv',
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

module.exports = RainfallDataSource;