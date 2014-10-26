var multi   = require("multiline");
var tfunk     = require("tfunk");
var nunjucks = require("nunjucks");
var blade     = require("./lib/blade").compile;
//var logger    = require("eazy-logger").Logger({
//    level: "info",
//    prefix: "{blue:[{gray:JS Blade}]",
//    prefixes: {
//        trace: "{cyan:[trace]} "
//    },
//    useLevelPrefixes: true,
//    custom: {
//        "file": function (string) {
//            return this.compile("{magenta:" + string + "}");
//        }
//    }
//});
//
//var File    = require("./lib/file").File;
//var file    = new File(null, logger);
//
//var trav = file.getFile("./templates/readme.md");
//

//
//console.log(out);

var template = multi(function () {/*
@section("shane")
<p>Hi there from the first section
    <span>Hello</span>
</p>
@stop

<div>Hi there</div>
<header>
    <h1>Hey you!</h1>
    @yield("shane")
</header>
*/});

//var out = blade(template);
//console.log("~~~~~~~~~~ Js Blade ~~~~~~~~~~~~");
//console.log(out.replace(/ /g, tfunk('{magenta:.}')));
//console.log("~~~~~~~~ Js Blade end ~~~~~~~~~~");
//console.log("\n\n");

var hbTemplate = multi(function () {/*
<div>\n    {{> shane}}\n</div>
*/});
var file = require("fs").readFileSync("./templates/readme.md", "utf-8");

console.time("crossbow-lang");
out = blade(file);
console.timeEnd("crossbow-lang");

var Handlebars = require("handlebars");
console.time("hb");
var out = Handlebars.compile(file)();
console.timeEnd("hb");

console.time("nunjucks");
var out = nunjucks.renderString(file, {});
console.timeEnd("nunjucks");

var dust = require("dustjs-linkedin");
console.time("dust");
var out = dust.renderSource(file, {}, function () {
    console.timeEnd("dust");
});

//console.log("~~~~~~~~~~ Handlebars ~~~~~~~~~~~~");
//console.log(out.replace(/ /g, tfunk('{magenta:.}')));
//console.log("~~~~~~~~ Handlebars ~~~~~~~~~~");

//require("d-logger")(out);