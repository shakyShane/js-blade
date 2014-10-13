var multi   = require("multiline");
var tfunk   = require("tfunk");
var blade   = require("./lib/blade").compile;

var File    = require("./lib/file").File;
var file    = new File(null, logger);

file.getFile(".travis.yml");
file.getFile(".travis.yml");

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

var out = blade(template);
//console.log("~~~~~~~~~~ Js Blade ~~~~~~~~~~~~");
//console.log(out.replace(/ /g, tfunk('{magenta:.}')));
//console.log("~~~~~~~~ Js Blade end ~~~~~~~~~~");
//console.log("\n\n");

var hbTemplate = multi(function () {/*
<div>Hi there</div>
<header>
    <h1>Hey you!</h1>
    {{> shane}}
</header>
*/});

var Handlebars = require("handlebars");
Handlebars.registerPartial('shane', function() {
    return multi(function () {/*
<p>Hi there from the first section
    <span>Hello</span>
</p>
*/});
});

//var out = Handlebars.compile(hbTemplate)();
//console.log("~~~~~~~~~~ Handlebars ~~~~~~~~~~~~");
//console.log(out.replace(/ /g, tfunk('{magenta:.}')));
//console.log("~~~~~~~~ Handlebars ~~~~~~~~~~");