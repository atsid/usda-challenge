"use strict";
import _ from 'lodash';
import debugFactory from "debug";
const debug = debugFactory('app:data_sources:cachingDataSource');

export default class CachingDataSource {
    constructor() {
        this.__data = {};
        this._listGlobal = this._listGlobal.bind(this);
        this._listAgainst = this._listAgainst.bind(this);
        this.list = this.list.bind(this);
    }

    list() {
        const args = arguments;
        if (arguments.length > 0) {
            return this._listAgainst.call(this, args[0], arguments);
        } else {
            return this._listGlobal.call(this);
        }
    }

    getName() {
        return 'CachingDataSource';
    }

    _listGlobal() {
        const __data = this.__data;
        if (__data.result) {
            return Promise.resolve(__data.result);
        }
        return new Promise((resolve, reject) => {
            const start = new Date().getTime();
            this.retrieveData()
                .then((data) => {
                    const span = new Date().getTime() - start;
                    __data.result = data;
                    debug(`${this.getName()} - data retrieval took ${span}ms`);
                    resolve(data);
                })
                .catch((err) => {
                    debug('error retrieving data', this.getName(), err);
                    __data.result = undefined;
                    reject(err);
                });
        });
    }

    _listAgainst(arg, args) {
        const __data = this.__data;
        if (__data[arg]) {
            return Promise.resolve(__data[arg]);
        }
        return new Promise((resolve, reject) => {
            const start = new Date().getTime();
            this.retrieveData(...args)
                .then((data) => {
                    const span = new Date().getTime() - start;
                    __data[arg] = data;
                    debug(`${this.getName()}[${arg}] - data retrieval took ${span}ms`);
                    resolve(data);
                })
                .catch((err) => {
                    debug('error retrieving data', this.getName(), err);
                    __data[arg] = undefined;
                    reject(err);
                });
        });
    }
}