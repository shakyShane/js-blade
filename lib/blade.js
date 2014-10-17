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
        /**
         * 
         * Get a files contents
         * 
         */
        var content     = file.getFile(node[1]);

        /**
         * 
         * Pad the content to maintain format
         * 
         */
        var padded      = utils.paddLines(content, utils.getPadding(node[3].start));

        /**
         * 
         * Append any after-tag buffers
         * 
         */
        var out         = padded + utils.getAfterBuffer(node);

        /**
         * 
         * Recursively parse the included content
         * 
         */
        return processAst(parser.parse(out));
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
        var sectionName = node[1];

        /**
         * 
         * Process the included content
         * @type {String}
         */
        var processed = processAst(utils.stripLastNewline(node[2][1]));

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
    var fs = require("fs").writeFileSync("./ast.json", JSON.stringify(ast, null, 4));
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
    return processString(string);
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
