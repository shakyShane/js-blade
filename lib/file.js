var utils   = require("./utils");
var fs      = require("fs");
var path    = require("path");
var _       = require("lodash");
var Cache   = require("./cache");

/**
 * @param cache
 * @returns {*|function(this:null)}
 */
module.exports = function (cache, logger) {
    return getFile.bind(null, cache || new Cache(), logger);
};

/**
 * @param filepath
 * @param transform
 * @returns {Buffer|string|*}
 * @param cache
 */
function getOneFromFileSystem(filepath, transform, cache) {

    var file = fs.readFileSync(path.join(process.cwd(), filepath), "utf-8");
    file = _.isFunction(transform) ? transform(file) : file;
    cache.populateCache(filepath, file);
    return file;
}

/**
 * @param filePath
 * @param transform
 * @returns {*}
 */
function tryFs(filePath, transform, cache) {
    return getOneFromFileSystem(filePath, transform, cache);
}

/**
 * Get a file from the cache, or alternative look it up on FS from CWD as base
 * @param {String} filePath - {short-key from cache}
 * @param {Function} [transform]
 * @param {Boolean} [allowEmpty] - should file look ups be allowed to return an empty string?
 * @param cache
 */
function getFile(cache, logger, filePath, transform, allowEmpty) {

    var content;

    logger.debug("Getting file: %s", filePath);

    if (_.isUndefined(allowEmpty)) {
        allowEmpty = true;
    }

    /**
     *
     * Try to get a file from memory first
     *
     */
    if (content = cache.findAny(filePath)) {
        logger.debug("{green:Cache access} for: {magenta:%s", filePath);
        return content.content || content;
    } else {
        logger.debug("Not found in cache: {magenta:%s", filePath);
    }

    /**
     *
     * Try to get the file from FS
     *
     */
    try {
        logger.debug("{yellow:File System access} for: {magenta:%s", filePath);
        return tryFs(filePath, transform, cache);

    } catch (e) {
        //logger.debug("Could not access:{red: %s", e.path);
        return allowEmpty
            ? ""
            : false;
    }
}