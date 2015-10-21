"use strict";

export default class ActivityStore {

    getActivities(stateCode, year) {
        // TODO: XHR
        return Promise.resolve([
            {name: "Pesticide", percent: 91.455},
            {name: "Manure", percent: 50},
            {name: "Herbicide", percent: 25.5},
        ]);
    }
}

