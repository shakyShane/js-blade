var multi   = require("multiline");
var blade   = require("../lib/blade").compile;
var assert  = require("chai").assert;

function debugOutput (string) {
    var count = 0;
    var out = "~~~~~~~~~`Output Start`~~~~~~~~\n";
    out += "~~~~~~~|";
    out += string.replace(/\n/g, function () {
        count += 1;
        return "\n~~~"+count+"~~~|"
    });
    out += "\n~~~~~~~~~`Output END`~~~~~~~~\n";
    console.log(out);
}

describe("@section", function(){
    it.only("can remove the lines containing tags", function(){
        var template = multi.stripIndent(function () {/*
         @section("shane")
         <p>This is within a section
         <span>And this is a nested span</span>
         </p>
         @stop
         Hi there
         */});
        var out = blade(template);
        debugOutput(out);
        assert.notInclude(out, "@section(\"shane\")");
    });
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
        assert.notInclude(out, "@section(\"shane\")");
    });
});

