"use strict";
import debugFactory from "debug";
const debug = debugFactory('app:data_sources:cachingDataSource');

export default class CachingDataSource {
    list() {
        const args = arguments;
        if (arguments.length > 0) {
            return this._listAgainst(args[0], arguments);
        } else {
            return this._listGlobal();
        }
    }

    _listGlobal() {
        if (this.__data) {
            return Promise.resolve(this.__data);
        }
        return new Promise((resolve, reject) => {
            this.retrieveData()
                .then((data) => {
                    this.__data = data;
                    resolve(data);
                })
                .catch((err) => {
                    this.__data = undefined;
                    reject(err);
                });
        });
    }

    _listAgainst(arg, args) {
        if (!this.__data) {
            this.__data = {};
        }
        if (this.__data[arg]) {
            return Promise.resolve(this.__data[arg]);
        }
        return new Promise((resolve, reject) => {
            this.retrieveData(...args)
                .then((data) => {
                    this.__data[arg] = data;
                    resolve(data);
                })
                .catch((err) => {
                    this.__data[arg] = undefined;
                    reject(err);
                });
        });
    }
}