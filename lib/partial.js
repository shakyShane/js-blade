var utils = require("./utils");
var url   = require("./url");

/**
 * @type {Partial}
 */
module.exports = Partial;

/**
 * @param filePath
 * @param content
 * @param config
 * @returns {Partial}
 * @constructor
 */
function Partial (filePath, content, config) {

    this.shortKey   = url.makeShortKey(filePath);
    this.content    = content;

    return this;
}
