"use strict";

export default class CachingDataSource {
  constructor () {
    this.__mapListPromise = {};
  }
    list() {
        const args = arguments;
        if (!this.__mapListPromise.hasOwnProperty(args[0])) {
               const listPromise = new Promise((resolve, reject) => {

                  this.retrieveData(...args)
                      .then((data) => {
                          resolve(data);
                      })
                      .catch((err) => {
                          reject(err);
                      });
              });
              this.__mapListPromise[args[0]] = listPromise;
      }

        return this.__mapListPromise[args[0]];
    }
}
