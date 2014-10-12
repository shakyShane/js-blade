var parser = require("../src/parser");

var refs    = {};
var lastEnd = 0;

var actions = {
    /**
     * @param node
     * @returns {string}
     */
    "section": function (node) {
        lastEnd = node[3].end + 1;
        var sectionName = node[1];
        if (!refs[sectionName]) {
            var content = node[2][1];
            var out  = "";
            content.shift(); // remove first buffer that contains newline
            content.forEach(function (item) {
                out += actions.buffer(item);
            });
            refs[sectionName] = out;
        }
        return "";
    },
    /**
     * @param node
     * @returns {*}
     */
    "yield": function (node) {
        if (refs[node[1]]) {
            return paddLines(refs[node[1]], getPadding(node[2].start));
        }
    },
    /**
     *
     * @param node
     * @returns {*}
     */
    "buffer": function (node) {
        if (getLast(node) !== lastEnd) {
            return node.length === 3 ? node[1] : node[1] + node[2];
        }
        return "";
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

var compile = function (string) {
    return processAst(parser.parse(string));
};

function processAst (ast) {

    //console.log(ast.map(function (item, i) {
    //    return ["AST: "+i].concat(item);
    //}));

    return ast.reduce(function (joined, item) {
        var nodeType = item[0];
        if (actions[nodeType]) {
            return joined += actions[nodeType](item);
        }
    }, "");
}

/**
 *
 * @param arr
 * @returns {*}
 */
function getLast(arr) {
    return arr[arr.length - 1];
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

module.exports.compile = compile;
