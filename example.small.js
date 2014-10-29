var multi   = require("multiline");
var tfunk     = require("tfunk");
var dlog     = require("d-logger");
var nunjucks = require("nunjucks");
var blade     = require("./lib/blade").compile;

var hbTemplate = multi(function () {/*
<div>
    {{> shane}}
</div>
*/});

var Handlebars = require("handlebars");
Handlebars.registerPartial("shane", function () {
    return "A String";
})
console.time("hb");
var out = Handlebars.compile(hbTemplate)();
dlog(out);
console.timeEnd("hb");