var gulp        = require("gulp");
var jshint      = require("gulp-jshint");
var jscs        = require("gulp-jscs");

gulp.task("lint", function () {
    gulp.src([
        "lib/*.js",
        "!lib/parser.js"
    ])
        .pipe(jscs(".jscs.json"))
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});