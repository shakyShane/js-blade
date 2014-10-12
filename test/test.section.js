var multi   = require("multiline");
var blade   = require("../lib/blade").compile;
var assert  = require("chai").assert;

function debugOutput (string) {
    var count = 0;
    var out = string.replace(/\n/g, function () {
        count += 1;
        return "\n~~~"+count+":   "
    });
    console.log(out);
}

describe("@section", function(){
    it("can save content & place in @yield", function(){
        var template = multi.stripIndent(function () {/*
        @section("shane")
        <p>This is within a section
            <span>And this is a nested span</span>
        </p>
        @stop

        <div>Hi there</div>
        <header>
            <h1>Page title</h1>
            @yield("shane")
        </header>
        */});
        var out = blade(template);
        debugOutput(out);
        assert.notInclude(out, "@section(\"shane\")");
    });
});

