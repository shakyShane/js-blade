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
 * @param {String} item
 * @returns {*}
 */
function addExtension(item) {
    return item.match(/\.html$/)
        ? item
        : item + ".html";
}

/**
 * @param pretty
 * @returns {Function}
 */
function getUrlFormatter (pretty) {

    return function (item, date) {
        if (pretty) {
            item.filePath = addIndex(item.filePath);
        } else {
            item.filePath = addExtension(item.filePath);
            item.url      = addExtension(item.url);
        }

        // Add date
        if (date) {
            item.date     = date;
        }

        return item;
    };
}

/**
 * @param format
 * @param date
 * @param title
 */
function makeSubDirUrl(format, date, title, categories) {

    var filePath = title + ".html";
    var url      = title + ".html";
    var ext      = ".html";

    if (format) {
        filePath = replaceSections(format, title, getReplacers(date, title, categories));
        url = filePath;
    }

    return makeTopLevelUrl(filePath, url);
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