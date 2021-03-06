'use strict';

var BaseAdapter = require('./base');

class MemcachedClientAdapter extends BaseAdapter {
    get(key) {
        var memcachedClient = this.client;
        var self = this;
        return new this.promiseFactory(function(resolve, reject) {
            memcachedClient.get(key, function(error, results) {
                if (error || results === undefined) {
                    return reject(null);
                }

                resolve(self.getUnserializedData(results));
            });
        });
    }

    set(key, value, ttl) {
        var memcachedClient = this.client;
        value = JSON.stringify(value);
        return new this.promiseFactory(function(resolve, reject) {
            memcachedClient.set(key, value, ttl, function(error) {
                if (error) {
                    return reject(error);
                }
                resolve(true);
            });
        });
    }

    del(key) {
        var memcachedClient = this.client;
        return new this.promiseFactory(function(resolve, reject) {
            memcachedClient.del(key, function(error, results) {
                if (error || results === null) {
                    return reject(null);
                }

                resolve(true);
            });
        });
    }
}

module.exports = MemcachedClientAdapter;
