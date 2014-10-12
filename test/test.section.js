var multi   = require("multiline");
var blade   = require("../lib/blade").compile;
var assert  = require("chai").assert;

function debugOutput (string) {
    var count = 1;
    var out = "\n-------------------`Output Start`------------------\n";
    out += "~~~1~~~|";
    out += string.replace(/\n/g, function () {
        count += 1;
        return "\n~~~"+count+"~~~|"
    });
    out += "\n--------------------`Output END`-------------------\n";
    console.log(out);
}

describe("@section", function(){
    it("can remove the lines containing tags", function(){
        var template = multi.stripIndent(function () {/*
         @section("shane")
         <p>This is within a section
         <span>And this is a nested span</span>
         </p>
         @stop
         Hi there
         */});
        var out = blade(template);
        assert.deepEqual(out, "Hi there");
    });
    it.only("can save content & place in @yield", function(){
        var template = multi.stripIndent(function () {/*
        @section("shane")
        <p>This is within a section
            <span>And this is a nested span</span>
        </p>
        @stop
        @section("ohno")
        <div>Second block</div>
        @stop
        Hi there
        @yield("shane")
        Shane is here
        @yield("ohno")
        */});
        var out = blade(template);
        debugOutput(out);
        assert.notInclude(out, "@section(\"shane\")");
    });
});

