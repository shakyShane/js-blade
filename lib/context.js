var objPath = require("object-path");

/**
 * @constructor
 */
var Context = function () {
    this._ = {};
    this.refs = {};
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
