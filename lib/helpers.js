/**
 * @type {logger}
 */
var logger  = require("./logger");
var error  = require("./errors").doError;
var utils   = require("./utils");
var _       = require("lodash");

var context = {};
var file;

/**
 * @type {{include: Function}}
 */
var funcs = {
    /**
     *
     */
    sep: function (node, params, ctx, process) {
        var out = "";
        if (!ctx.isLast()) {
            out = process(node[1].body);
        }
        return out;
    },
    /**
     * Include helper
     */
    "include": function (node, params, ctx) {

        var content;

        if (!params.src) {
            return error("`src` must be provided", node);
        }

        /**
         * Get the file
         */
        content = file.getFile(params.src);

        if (!content) {
            return error("File not found", node);
        }

        var padded      = utils.paddLines(content, utils.getPadding(node[1].column));

        var out         = padded + node[1].after;

        return out;
    }
};

module.exports.funcs = funcs;
/**
 * @param {Object} ctx
 */
module.exports.setContext = function (ctx, getFile) {
    file = getFile;
    context = ctx;
};
