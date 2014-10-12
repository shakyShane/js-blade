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
            var content = node[2][1];
            var out  = "";
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

    ast.map(function (item, i) {

        var type = item[0];
        //console.log(item);
        console.log("AST: " + i);
        console.log("      Type:           " + item[0]);

        if (type === "section") {
            console.log("      Section Name:   " + item[1]);
            console.log("      Section Length: " + item[2].length);
            console.log("      Section Start:  " + item[3].start);
            console.log("      Section End:    " + item[3].end);
        }
        if (type === "yield") {
            console.log("      Section Name:   " + item[1]);
        }
        if (type === "buffer") {
            console.log("      Buffer length:  " + item[1].length);
            console.log("      Buffer Content: " + item[1]);
        }

        return item;

        //console.log("      Type: " + item[0]);
        //console.log("AST: " + i);

        //return ["AST: " + i].concat(item);
    });

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
//function getLast(arr) {
//    return arr[arr.length - 1];
//}

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
