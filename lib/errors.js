var errorTemplate = '\n<span class="__blade__error__">%s</span>\n';

module.exports = {
    include: function (node, options) {
        var msg = "@include failed: `%s` not found.".replace("%s", node[2]);
        return errorTemplate.replace("%s", msg);
    }
}