var path = require("path");
var _    = require("lodash");


var utils = {
    /**
     * @param string
     * @param padding
     */
    paddLines: function (string, padding) {
        return string.split("\n").reduce(function (combined, item, index) {
            if (index) {
                return combined + "\n" + padding + item;
            }
            return item;
        }, "");
    },
    /**
     * @param start
     */
    getPadding: function (start) {
        var padding = "";
        for (var i = 0, n = start - 1; i < n; i += 1) {
            padding += " ";
        }
        return padding;
    },
    /**
     * Inside sections, always remove the last new line
     */
    stripLastNewline: function (nodes) {

        var stripped;

        for (var i = nodes.length - 1, n = 0; i >= n; i -= 1) {
            if (stripped) {
                continue;
            }
            if (nodes[i][0] === "buffer") {
                nodes[i][2] = nodes[i][2].replace(/\n$/, "");
                stripped = true;
            }
        }
        return nodes;
    },
    /**
     * @param {String} filePath
     * @returns {String}
     */
    makeFsPath: function (filePath) {
        return path.join(process.cwd(), filePath);
    },
    /**
     * @param node
     * @returns {{}}
     */
    compileParams: function (node, ctx) {

        var params = {};
        var _name  = "";

        _.each(node, function (node) {
            _name = node[1][1];
            _.each(node[2], function (node) {
                if (node[0] === "buffer") {
                    if (params[_name]) {
                        params[_name] += node[1];
                    } else {
                        params[_name] = node[1];
                    }
                }
                if (node[0] === "reference") {
                    if (params[_name]) {
                        params[_name] += ctx.get(node[1].name);
                    } else {
                        params[_name] = ctx.get(node[1].name);
                    }
                }
            });
        });

        return params;
    }
};

function isBuffer(node) {
    return node[0] === "buffer";
}

function isInclude(node) {
    return node[0] === "include";
}

function isYield(node) {
    return node[0] === "yield";
}
module.exports = utils;
