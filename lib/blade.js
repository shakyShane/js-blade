var parser = require("./parser");

var refs = {};

var actions = {
    /**
     * @param node
     * @returns {string}
     */
    "section": function (node) {
        if (!refs[node[1]]) {
            var item = node[2][1];
            var out  = "";
            item.forEach(function (item) {
                out += actions.buffer(item);
            });
            refs[node[1]] = out;
        }
        return "";
    },
    "yield": function (node) {
        var stripped = refs[node[1]].replace(/^\n/, "");
        if (refs[node[1]]) {
            return stripped;
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

var compile = function (string) {
    return processAst(parser.parse(string));
};

function processAst (ast) {
    return ast.reduce(function (joined, item) {
        var nodeType = item[0];
        if (actions[nodeType]) {
            return joined += actions[nodeType](item);
        }
    }, "");
}

module.exports.compile = compile;
