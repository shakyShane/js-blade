var parser      = require("../src/parser");
var utils       = require("./utils");

var refs       = {};

var actions = {
    /**
     * @param node
     * @returns {string}
     */
    "section": function (node) {
        var sectionName = node[1];
        if (!refs[sectionName]) {
            refs[sectionName] = processAst(utils.stripLastNewline(node[2][1]));
        }
        return "";
    },
    /**
     * @param node
     * @returns {*}
     */
    "yield": function (node) {
        if (refs[node[1]]) {
            var out = utils.paddLines(refs[node[1]], utils.getPadding(node[2].start));
            return out + "\n"; // add newline to end of yield
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
    return ast.reduce(function (joined, item) {
        var nodeType = item[0];
        if (actions[nodeType]) {
            return joined += actions[nodeType](item);
        }
    }, "");
}

/**
 * @param {String} string
 * @returns {String}
 */
module.exports.compile = function (string) {
    return processAst(parser.parse(string));
};
