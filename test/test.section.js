//var blade   = require("../lib/blade").compile;
//var dlog    = require("./debugger").log;
//
//var multi   = require("multiline");
//var assert  = require("chai").assert;
//
//
//describe("@section", function(){
//    it("removes all lines in section + lines with tags", function(){
//        var template = multi.stripIndent(function () {/*
//         @section("shane")
//         <p>This is within a section
//         <span>And this is a nested span</span>
//         </p>
//         @stop
//         Hi there
//         */});
//        var out = blade(template);
//        assert.deepEqual(out, "Hi there");
//    });
//    it("can save `indented` content & place in @yield", function(){
//        var template = multi.stripIndent(function () {/*
//        @section("name")
//            Shane
//            Osbourne
//        @stop
//        <main>
//        @yield("name")
//        </main>
//        */});
//        var expected = multi.stripIndent(function () {/*
//         <main>
//             Shane
//             Osbourne
//         </main>
//         */});
//        var actual = blade(template);
//        assert.equal(actual, expected);
//    });
//    it("can save indented content & place in indented @yield", function() {
//
//        var input = multi.stripIndent(function () {/*
//        @section("firstblock")
//        <header>
//            <h1>Title</h1>
//        </header>
//        @stop
//        <main>
//            @yield("firstblock")
//        </main>
//        */});
//
//        var expected = multi.stripIndent(function () {/*
//         <main>
//             <header>
//                 <h1>Title</h1>
//             </header>
//         </main>
//         */});
//        var out = blade(input);
//        assert.equal(out, expected);
//    });
//    it("can save content & place in @yield that has nothing following", function() {
//
//        var input = multi.stripIndent(function () {/*
//        @section("name")
//        Shane
//        @stop
//            Hi there
//            @yield("name")
//        */});
//
//        var expected = multi(function () {/*
//    Hi there
//    Shane
//        */});
//        var out = blade(input);
//        assert.equal(out, expected);
//    });
//    it("can save content from multiple sections with the same name & place in @yield ", function() {
//
//        var input = multi.stripIndent(function () {/*
//        @section("name")
//        Shane
//        @stop
//        @section("name")
//        Osbourne
//        @stop
//        Other Content
//
//        @yield("name")
//        */});
//
//        var expected = multi.stripIndent(function () {/*
//        Other Content
//
//        Shane
//        Osbourne
//        */});
//        var out = blade(input);
//        assert.equal(out, expected);
//    });
//});
//
