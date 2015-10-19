"use strict";

export default class CachingDataSource {
    list() {
        const args = arguments;
        if (!this.__listPromise) {
            this.__listPromise = new Promise((resolve, reject) => {
                if (this.__data) {
                    return resolve(this.__data);
                }

                this.retrieveData(...args)
                    .then((data) => {
                        this.__data = data;
                        resolve(this.__data);
                    })
                    .catch((err) => {
                        this.__data = undefined;
                        reject(err);
                    });
            });
        }

        return this.__listPromise;
    }
}