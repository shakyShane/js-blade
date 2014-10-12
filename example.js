var multi   = require("multiline");
var blade   = require("./lib/blade").compile;


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

console.log(out.replace(/\n/g, '\n~nl:   '));