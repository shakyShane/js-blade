var multi   = require("multiline");
var tfunk   = require("tfunk");
var blade   = require("../lib/blade").compile;
var assert  = require("chai").assert;

function debugOutput (string) {
    var end1 = "~~~";
    var end2 = "~~";
    var end3 = "~";
    var count = 1;
    string = string.replace(/ /g, tfunk("{magenta:·"));
    var out = "\n-------------------`Output Start`------------------------\n";
    out +=    tfunk("{cyan:-------0---4---8---12--16--20--24--28--32--36--40--44--48\n");
    out += tfunk("{cyan:~~~1~~~|");
    out += string.replace(/\n/g, function () {
        count += 1;
        return tfunk("{cyan:\n~~~"+count+ (count > 9 ? end2 : end1) + "|");
    });
    out += tfunk("{cyan:\n--------------------`Output END`-------------------------\n");
    console.log(out);
}

describe("@section", function(){
    it("removes all lines in section + lines with tags", function(){
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
    it("can save `indented` content & place in @yield", function(){
        var template = multi.stripIndent(function () {/*
        @section("name")
            Shane
            Osbourne
        @stop
        <main>
        @yield("name")
        </main>
        */});
        var expected = multi.stripIndent(function () {/*
         <main>
             Shane
             Osbourne
         </main>
         */});
        var actual = blade(template);
        assert.equal(actual, expected);
    });
    it("can save indented content & place in indented @yield", function() {

        var input = multi.stripIndent(function () {/*
        @section("firstblock")
        <header>
            <h1>Title</h1>
        </header>
        @stop
        <main>
            @yield("firstblock")
        </main>
        */});

        var expected = multi.stripIndent(function () {/*
         <main>
             <header>
                 <h1>Title</h1>
             </header>
         </main>
         */});
        var out = blade(input);
        assert.equal(out, expected);
    });
});

