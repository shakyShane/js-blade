var multi   = require("multiline");
var blade   = require("../lib/blade").compile;
var assert  = require("chai").assert;

describe("@section", function(){
    it("can save content & place in @yield", function(){
        var template = multi.stripIndent(function () {/*
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
        assert.notInclude(out, "@section(\"shane\")");
    });
});

