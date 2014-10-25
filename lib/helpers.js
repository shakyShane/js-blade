/**
 * @type {logger}
 */
var logger  = require("./logger");

var context = {};
var file;

/**
 * @type {{include: Function}}
 */
module.exports.funcs = {
    /**
     * Include helper
     */
    "include": function (node) {
        node = node[1];
        console.log(node.params);
        //console.log(node);
        var content     = file.getFile(node[2]);
        return "Hi there";
    }
};

function getSrcParam (node) {

}

/**
 * @param {Object} ctx
 */
module.exports.setContext = function (ctx, getFile) {
    file = getFile;
    context = ctx;
};
