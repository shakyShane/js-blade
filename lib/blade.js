/**
 * Parser
 * @type {exports}
 */
var parser      = require("../src/parser");

/**
 * Utils
 * @type {utils}
 */
var utils       = require("./utils");

/**
 * Context Object
 * @type {Context|exports}
 */
var Context     = require("./context");

/**
 * Logger
 */
var logger  = require("eazy-logger").Logger({
    level: "info",
    prefix: "{blue:[{gray:JS Blade}]",
    prefixes: {
        trace: "{cyan:[trace]} "
    },
    useLevelPrefixes: true,
    custom: {
        "file": function (string) {
            return this.compile("{magenta:" + string + "}");
        }
    }
});

/**
 * Safe file retrieval
 * @type {exports.File}
 */
var File        = require("./file").File;
var file        = new File(null, logger);

/**
 * Local context
 */
var context;

var actions = {
    /**
     * @param node
     */
    "include": function (node) {
        var content     = file.getFile(node[1]);
        var padded      = utils.paddLines(content, utils.getPadding(node[3].start));
        return padded   + utils.getAfterBuffer(node);
    },
    /**
     * @param node
     * @returns {string}
     */
    "section": function (node) {
        var sectionName = node[1];
        var processed = processAst(utils.stripLastNewline(node[2][1]));
        context.addSection(sectionName, processed);
        return "";
    },
    /**
     * @param node
     * @returns {*}
     */
    "yield": function (node, index, ast) {
        // Get Matching sections
        var sections = context.sections(node[1]);

        // Pad all buffers based on column position of @yield
        if (sections && sections.length) {
            return sections.map(function (item) {
                return utils.paddLines(item, utils.getPadding(node[3].start));
            }).join("\n") + utils.getAfterBuffer(node);
        }
    },
    /**
     *
     * @param node
     * @returns {*}
     */
    "buffer": function (node) {
        return node.length === 3 ? node[1] : node[1] + node[2];
    },

    /**
     * Return nothing for the stop point
     * @param node
     * @returns {string}
     */
    "stop": function (node) {
        return node[1][1] + node[1][2];
    }
};

/**
 * @param {Array} ast
 * @returns {String}
 */
function processAst (ast) {
    return ast.reduce(function (joined, item, index) {
        var nodeType = item[0];
        if (actions[nodeType]) {
            return joined += actions[nodeType](item, index, ast);
        }
    }, "");
}

/**
 * @param {String} string
 * @returns {String}
 */
module.exports.compile = function (string) {
    /**
     * Create a fresh context when this function runs
     * @type {Context}
     */
    context = new Context();

    /**
     * Process a string
     */
    return processAst(parser.parse(string));
};

/**
 * Reset any contexts or caches
 */
module.exports.reset = function () {
    /**
     * Reset any file caches
     */
    file.reset();
};
