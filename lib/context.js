var objPath = require("object-path");
var _       = require("lodash");

/**
 * @constructor
 */
var Context = function (ctx) {
    this._      = ctx || {};
    this._idx   = 0;
    this._of    = 0;
    this.refs   = {};
    this._head  = undefined;
};

/**
 * @param name
 */
Context.prototype.reset = function (ctx) {
    this._     = ctx || {};
    this._idx  = 0;
    this._of   = 0;
    this._head = undefined;
    this.refs  = {};
    return this;
};

/**
 *
 */
Context.prototype.isLast = function () {
    if (this._of) {
        if (this._idx < this._of - 1) {
            return false;
        }
    }
    return true;
};

/**
 * Set the current item being iterated over
 */
Context.prototype.setCurrent = function (coll) {

    if (_.isUndefined(coll)) {
        return false;
    }

    if (_.isString(coll)) {
        coll = this.get(coll);
    }

    if (coll && coll.length) {
        this._of = coll.length;
    }
}

/**
 *
 */
Context.prototype.advanceIndex = function () {

    if (this._of > 0) {
        if (this._idx >= (this._of - 1)) {
            return this._idx = 0;
        }
    }

    this._idx += 1;
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
            } else {
                name = [this._head, name].join(".")
            }
        }
    } else {
        if (this._head) {
            if (name === ".") {
                name = this._head;
            } else {
                name = [this._head, name].join(".");
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

Context.prototype.advanceHead = function (name) {
    var tmp = this._head.split(".");
    tmp.push(name);
    this._head = tmp.join(".");
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
        this.setCurrent(item);
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
