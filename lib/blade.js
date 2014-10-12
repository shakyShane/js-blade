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
            var item = node[2][1];
            var out  = "";
            item.forEach(function (item) {
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
            return refs[node[1]];
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
    "stop": function (node) {
        return "";
    }
};

var compile = function (string) {
    return processAst(parser.parse(string));
};

function processAst (ast) {
    console.log(ast);
    return ast.reduce(function (joined, item) {
        var nodeType = item[0];
        if (actions[nodeType]) {
            return joined += actions[nodeType](item);
        }
    }, "");
}

function getLast(arr) {
    return arr[arr.length-1];
}
module.exports.compile = compile;
