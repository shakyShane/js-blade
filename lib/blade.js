var parser      = require("../src/parser");
var utils       = require("./utils");
var Context     = require("./context");
var helpers     = require("./helpers");
var errors      = require("./errors");
var logger      = require("./logger");
var _           = require("lodash");

/**
 * Safe file retrieval/caching
 * @type {exports.File}
 */
var File        = require("./file").File;
var file        = new File(null, logger);

/**
 * Create a fresh context when this function runs
 * @type {Context}
 */
var context = new Context();

var actions = {
    /**
     * @param node
     */
    "@": function (node) {

        var helper = helpers.funcs[node[1].name];

        /**
         * If the helper exists, process it.
         * Also, pass along pre-compiled params
         */
        if (helper) {
            return helper(node, utils.compileParams(node[1].params, context));
        }

        /**
         * Warn about missing helper
         */
        logger.warn("You tried to use the helper {cyan:%s}, but it doesn't exist", node[1].name);

        /**
         * Return empty string if helper does not exist
         */
        return "";
    },
    "#": function (node) {

        var item;
        var out = "";

        item = context.get(node[1].name);

        console.log(item);

        //context.setHead(item);
        //context.set(".", item);
        //out = processAst(node[1].body);
        //
        //context.dropHead();
        //
        //return out + node[1].after;
    },
    /**
     * @param node
     */
    "reference": function (node) {

        var item;
        item = context.get(node[1].name);

        var after = node[1].after || "";

        if (!_.isUndefined(item)) {
            return item + after;
        }

        return after;

        /**
         *
         * Get a files contents
         *
         */
        //var content     = file.getFile(node[2]);

        /**
         *
         * Handle a file not found error
         *
         */
        //if (!content) {
        //    return errors.include(node, config);
        //}

        /**
         *
         * Pad the content to maintain format
         *
         */
        //var padded      = utils.paddLines(content, utils.getPadding(node[1].column));

        /**
         *
         * Append any after-tag buffers
         *
         */
        //var out         = padded + utils.getAfterBuffer(node);

        /**
         *
         * Recursively parse the included content
         *
         */
        //return processAst(parser.parse(out));
    },
    /**
     * @param node
     * @returns {string}
     */
    "section": function (node) {

        /**
         *
         * Get the section name
         *
         */
        var sectionName = node[2];

        /**
         *
         * Process the included content
         * @type {String}
         */
        var processed = processAst(utils.stripLastNewline(node[3][1]));

        /**
         *
         * Save this sections content
         *
         */
        context.addSection(sectionName, processed);

        /**
         *
         * Never return any actual content here
         *
         */
        return "";
    },
    /**
     * @param node
     * @returns {*}
     */
    "yield": function (node, index, ast) {

        // Get Matching sections
        var sections = context.sections(node[2]);

        // Pad all buffers based on column position of @yield
        if (sections && sections.length) {
            return sections.map(function (item) {
                return utils.paddLines(item, utils.getPadding(node[1].column));
            }).join("\n") + utils.getAfterBuffer(node);
        }
    },
    /**
     *
     * @param node
     * @returns {*}
     */
    "buffer": function (node) {
        return node.length === 3 ? node[2] : node[2] + node[3];
    }
};

/**
 * @param {Array} ast
 * @returns {String}
 */
function processAst (ast) {
    require("fs").writeFileSync("./ast.json", JSON.stringify(ast, null, 4));
    return ast.reduce(function (joined, item, index) {
        var nodeType = item[0];
        if (actions[nodeType]) {
            return joined += actions[nodeType](item, index, ast);
        }
    }, "");
}

/**
 * Stateless string processing
 * @param {String} string
 * @returns {String}
 */
function processString (string) {
    return processAst(parser.parse(string));
}

/**
 * Expose the context
 * @type {Context}
 */
module.exports.context = context;

/**
 * @param {String} string
 * @returns {String}
 */
module.exports.compile = function (string, ctx, cb) {

    /**
     * Set context for render
     */
    if (ctx) {
        context.reset(ctx);
    }

    /**
     *
     */
    helpers.setContext(context, file);

    /**
     * @type {String}
     */
    var out = processString(string);

    /**
     * CB on next tick
     */
    if (cb) {
        process.nextTick(function () {
            cb(out);
        });
    }

    /**
     * Process a string
     */
    return out;
};

/**
 * Reset any contexts or caches
 */
module.exports.reset = function () {
    /**
     * Reset any file caches
     */
    file.reset();
    context = context.reset();
    helpers.setContext(context, file);
};