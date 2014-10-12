var parser = require("../src/parser");

var refs       = {};

var actions = {
    /**
     * @param node
     * @returns {string}
     */
    "section": function (node) {
        var sectionName = node[1];
        if (!refs[sectionName]) {
            refs[sectionName] = processAst(stripLastNewline(node[2][1]));
        }
        return "";
    },
    /**
     * @param node
     * @returns {*}
     */
    "yield": function (node) {
        if (refs[node[1]]) {
            var out = paddLines(refs[node[1]], getPadding(node[2].start));
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
 * @param string
 * @param padding
 */
function paddLines(string, padding) {
    return string.split("\n").reduce(function (combined, item, index) {
        if (index) {
            return combined + "\n" + padding + item;
        }
        return item;
    }, "");
}

/**
 * @param start
 */
function getPadding(start) {
    var padding = "";
    for (var i = 0, n = start - 1; i < n; i += 1) {
        padding += " ";
    }
    return padding;
}

/**
 *
 */
function stripLastNewline (nodes) {

    var stripped;

    for (var i = nodes.length - 1, n = 0; i >= n; i -= 1) {
        if (stripped) {
            continue;
        }
        if (nodes[i][0] === "buffer") {
            nodes[i][1] = nodes[i][1].replace(/\n$/, "");
            stripped = true;
        }
    }
    return nodes;
}

module.exports.compile = function (string) {
    return processAst(parser.parse(string));
};
