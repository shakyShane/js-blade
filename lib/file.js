var fs      = require("fs");
var path    = require("path");
var _       = require("lodash");
var Cache   = require("./cache");

/**
 * @param {Object|Null} cache
 * @param {Object} logger
 * @returns {File}
 * @constructor
 */
var File = function (cache, logger) {
    this.cache = cache || new Cache();
    this.logger = logger;
    return this;
};

/**
 * Get a file from the cache, or alternative look it up on FS from CWD as base
 * @param {String}   filePath     - short-key from cache
 * @param {Function} [transform]  - Pass the result through a transform function
 * @param {Boolean}  [allowEmpty] - should file look ups be allowed to return an empty string?
 * @param cache
 */
File.prototype.getFile = function (filePath, transform, allowEmpty) {

    var content;

    this.logger.trace("Attempting to retrieve: {file:%s", filePath);

    /**
     *
     * Should this function be allowed to return
     * an empty string?
     *
     */
    if (_.isUndefined(allowEmpty)) {
        allowEmpty = true;
    }

    /**
     *
     * Try to get a file from memory first
     *
     */
    if (content = this.cache.findAny(filePath)) {
        this.logger.debug("{green:Cache access} for: {file:%s", filePath);
        return content.content || content;
    } else {
        this.logger.debug("Not found in cache: {file:%s", filePath);
    }

    /**
     *
     * Try to get the file from FS
     *
     */
    try {
        this.logger.debug("{yellow:File-system access} for: {file:%s", filePath);
        return this.tryFs(filePath, transform);
    } catch (e) {
        this.logger.error("Could not access:{red: %s", e.path);
        return allowEmpty
            ? ""
            : false;
    }
};

/**
 * @param filepath
 * @param transform
 * @returns {*}
 */
File.prototype.getOneFromFileSystem = function (filepath, transform) {

    var absolutePath = path.join(process.cwd(), filepath);

    /**
     *
     * Try to read a file relative to CWD
     *
     */
    var file = fs.readFileSync(absolutePath, "utf-8");

    this.logger.debug("File retrieved successfully: {file:%s", absolutePath);

    /**
     *
     * Apply any provided transformations
     *
     */
    file     = _.isFunction(transform) ? transform(file) : file;

    /**
     *
     * Add the result to the cache
     *
     */
    this.cache.populateCache(filepath, file);

    /**
     *
     * Return the file contents for immediate use
     *
     */
    return file;
};

/**
 * @param filePath
 * @param transform
 * @returns {*}
 */
File.prototype.tryFs = function (filePath, transform) {
    return this.getOneFromFileSystem(filePath, transform);
};

/**
 * @param cache
 * @returns {*|function(this:null)}
 */
module.exports.File = File;
