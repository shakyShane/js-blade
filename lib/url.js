var path = require("path");
var _    = require("lodash");

/**
 * @type {}
 */
module.exports = {
    stripExtension:     stripExtension,
    getBaseName:        getBaseName,
    makeShortKey:       makeShortKey
};

/**
 * @param key
 * @returns {*|XML|string|void}
 */
function getBaseName(key) {
    return path.basename(key, path.extname(key));
}

/**
 * Create short keys to be used as unique Identifiers.
 * In:  _posts/post1.md
 * Out: posts/post1.md
 * @param {String} key
 * @returns {String}
 */
function makeShortKey(key) {
    return key.replace(/(.+?)?_((includes|layouts|snippets|posts|pages|data|drafts)(.+))/, "$2");
}

/**
 * @param key
 * @returns {*}
 */
function stripExtension(key) {
    return key.replace(path.extname(key), "");
}

/**
 * @param key
 * @returns {*}
 */
function getTempUrl (key) {
    return stripExtension(
        key.replace(/^posts\//, "")
    );
}
