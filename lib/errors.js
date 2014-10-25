/**
 * @type {logger|exports}
 */
var logger = require("./logger");

var errorTemplate = '\n<span class="__blade__error__">%s</span>\n';
var inline = false;

module.exports = {
    include: function (node, options) {
        var msg = "@include failed: `%s` not found.".replace("%s", node[2]);
        return errorTemplate.replace("%s", msg);
    }
}

/**
 * Perform an error - extracted here as we may include errors in page
 */
module.exports.doError = function (err, node) {
    logger.warn(err);
};