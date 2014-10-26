var objPath = require("object-path");

/**
 * @constructor
 */
var Context = function (ctx) {
    this._ = ctx || {};
    this.refs = {};
    this._head = undefined;
};

/**
 * @param name
 */
Context.prototype.reset = function (ctx) {
    this._     = ctx || {};
    this._head = undefined;
    this.refs  = {};
    return this;
};

/**
 * @param name
 * @returns {*}
 */
Context.prototype._getPath = function (name) {
    // If there's ANY DOT
    if (name.length > 1 && name.indexOf(".") > -1) {
        // if a head exists
        if (this._head) {
            // if there's a leading dot
            if (name.charAt(0) === ".") {
                name = [this._head, name.slice(1)].join(".")
            }
        }
    }
    return name;
}

/**
 * @param name
 * @returns {*|string}
 */
Context.prototype.get = function (path) {

    path = this._getPath(path);

    return this._get(this._, path);
};

/**
 * @param name
 * @returns {*}
 * @private
 */
Context.prototype._get = function (coll, name) {
    return objPath.get(coll, name);
};

/**
 * @param name
 * @returns {*|string}
 */
Context.prototype.set = function (name, value) {
    return objPath.set(this._, name, value);
};

/**
 * @param name
 */
Context.prototype.dropHead = function () {
    if (this._head) {
        var out = this._head.split(".");
        out.pop();
        if (out.length) {
            return this._head = out.join(".");
        }
    }
    this._head = undefined;
};

/**
 *
 * @param name
 */
Context.prototype.setHead = function (path) {

    var item = this.get(path);

    if (item) {
        this.set(".", item);
    }

    this._head = path;
};

/**
 * @param {String} name - Name of the section
 * @returns {String}
 */
Context.prototype.sections = function (name) {
    return this.refs[name];
};

/**
 * Save a section
 * @param {String} name
 * @param {String} content
 * @returns {Context}
 */
Context.prototype.addSection = function (name, content) {
    if (!this.refs[name]) {
        this.refs[name] = [content];
    } else {
        this.refs[name].push(content);
    }
    return this;
};

module.exports = Context;
