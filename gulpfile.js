var gulp        = require("gulp");
var jshint      = require("gulp-jshint");
var jscs        = require("gulp-jscs");
var gutil       = require("gulp-util");
var Multistream = require('multistream');

var src  = [
    "lib/*.js",
    "!lib/parser.js"
];

gulp.task("lint", function () {
    gulp.src(src)
        .pipe(jscs(".jscs.json"))
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("lint-watch", function () {
    gulp.src(src)
        .pipe(jscs(".jscs.json")).on("error", function (err) {
            gutil.beep();
            console.log(err.message);
        });
});

gulp.task("watch", function () {
    gulp.watch(src, ["lint-watch"]);
});