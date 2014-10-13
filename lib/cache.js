var _       = require("lodash");
var Partial = require("./partial");

/**
 * @type {Cache}
 */
module.exports = Cache;

/**
 * @constructor
 */
function Cache (populate) {
    this._context  = "partials";
    this._partials = [];
}

Cache.prototype.populateCache = function (key, value, type) {

    var url = require("./url");

    var partial;

    if (partial = this.find(url.makeShortKey(key), "partials")) {

        partial.content = value;

    } else {

        partial = new Partial(key, value);

        this.addPartial(partial);
    }

    return this;
};
/**
 * @param item
 * @returns {Cache}
 */
Cache.prototype.addPartial = function (item) {

    this._context  = "partials";

    this._partials = arrayPush(this._partials, item);

    return this;
};

/**
 * Alias
 * @type {Function}
 */
Cache.prototype.addPartials = Cache.prototype.addPartial;

/**
 * @param key
 * @param [context]
 */
Cache.prototype.find = function (key, context) {

    context = context || this._context;

    var items = this["_" + context];

    var method = findPartials;

    return method(items, key);
};

/**
 * @param key
 */
Cache.prototype.findAny = function (key) {

    var content;

    _.each(["partials"], function (other) {

        var match = this.find(key, other);

        if (match) {
            content = match;
            return false;
        }
    }, this);

    return content;
};

/**
 * @returns {Cache}
 */
Cache.prototype.reset = function () {

    this._partials = [];
    return this;
};

/**
 * @returns {Array}
 */
Cache.prototype.partials = function () {
    return this._partials;
};

/**
 * @param items
 * @param property
 */
function sortItems(items, property) {

    items.sort(function (a, b) {
        return b[property] - a[property];
    });
}

/**
 * Find a partial by key
 * @param items
 * @param key
 * @returns {*}
 */
function findPartials(items, key) {

    return _.find(items, function (item) {
        return _.contains(item.shortKey, key);
    });
}

/**
 * @param arr
 * @param item
 * @returns {*|Array|string|Buffer}
 */
function arrayPush(arr, item) {

    var result = Array.isArray(item)
        ? arr = arr.concat(item)
        : arr.push(item);

    return arr;
}
