var parser      = require("../src/parser");
var utils       = require("./utils");
var Context     = require("./context");

var context;

var actions = {
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

        var next   = ast[index + 1];
        var suffix = "";

        // Add new line if next item is a buffer
        if (next && next[0] === "buffer") {
            suffix = "\n";
        }

        // Get Matching sections
        var sections = context.sections(node[1]);

        // Pad all buffers based on column position of @yield
        if (sections && sections.length) {
            return sections.map(function (item) {
                return utils.paddLines(item, utils.getPadding(node[2].start));
            }).join("\n") + suffix;
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
    "stop": function () {
        return "";
    }
};

/**
 * @param {Array} ast
 * @returns {String}
 */
function processAst (ast) {
    console.log(ast);
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

    context = new Context();
    return processAst(parser.parse(string));
};
