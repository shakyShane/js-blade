/**
 * Logger
 */
var logger  = require("eazy-logger").Logger({
    level: "warn",
    prefix: "{blue:[{gray:JS Blade}] ",
    prefixes: {
        trace: "{cyan:[trace]} "
    },
    useLevelPrefixes: true,
    custom: {
        "file": function (string) {
            return this.compile("{magenta:" + string + "}");
        }
    }
});

module.exports = logger;