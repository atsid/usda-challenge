"use strict";
const request = require('superagent');
const debug = require('debug')('app:stores:ActivityStore');
const cache = {};
export default class ActivityStore {

    getActivities(stateCode, year) {
        if (cache[stateCode]) {
            return Promise.resolve(cache[stateCode][year] || []);
        }
        return this._loadStateData(stateCode)
            .then(() => cache[stateCode][year] || []);
    }

    _loadStateData(stateCode) {
        return this._getActivitiesInState(stateCode)
            .then(this._parseCsv)
            .then((activities) => {
                debug('received activity data', activities);
                cache[stateCode] = {};
                for (let i = 1; i < activities.data.length; i++) {
                    const currentActivity = activities.data[i];
                    const name = currentActivity[0];
                    const year = parseInt(currentActivity[1]);
                    const percent = parseFloat(currentActivity[2]);
                    const datum = {name, percent};
                    if (!cache[stateCode][year]) {
                        cache[stateCode][year] = [];
                    }
                    cache[stateCode][year].push(datum);
                }
            });
    }

    _getActivitiesInState(stateCode) {
        return new Promise((resolve, reject) => {
            request.get(`/usda-challenge/data/activities/${stateCode.toUpperCase()}/activities.csv`)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.text);
                    }
                });
        });
    }

    _parseCsv(text) {
        return Papa.parse(text);
    }
}