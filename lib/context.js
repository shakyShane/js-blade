var objPath = require("object-path");

/**
 * @constructor
 */
var Context = function () {
    this._ = {};
    this.refs = {};
    this._head = false;
};

/**
 * @param name
 */
Context.prototype.reset = function (ctx) {
    this._    = ctx || {};
    this.refs = {};
    return this;
};

/**
 * @param name
 * @returns {*|string}
 */
Context.prototype.get = function (name) {
    var path = name;
    if (this._head) {
        path = [this._head, name].join(".");
    }
    return this._get(path);
};

/**
 * @param name
 * @returns {*}
 * @private
 */
Context.prototype._get = function (name) {
    return objPath.get(this._, name);
};

/**
 * @param name
 * @returns {*|string}
 */
Context.prototype.set = function (name, value) {
    return objPath.set(this._, name, value);
};

/**
 *
 * @param name
 */
Context.prototype.dropHead = function () {
    if (this._head) {

        var segs = this._head.split(".");

        segs.pop();

        if (segs.length) {
            this.setHead(segs.join("."));
        } else {
            this._head = undefined;
        }
    }
};

/**
 *
 * @param name
 */
Context.prototype.setHead = function (name) {
    if (this._head) {
        this._head = [this._head, name].join(".");
    } else {
        this._head = name;
    }
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
