var path = require("path");

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
     * @returns {*}
     */
    getAfterBuffer: function (node) {
        return node[2][1] + node[2][2];
    }
};

module.exports = utils;
