var blade   = require("../lib/blade").compile;
var dlog    = require("./debugger").log;

var multi   = require("multiline");
var assert  = require("chai").assert;


describe("@section", function(){
    it("removes all lines in section + lines with tags", function(){
        var template = multi.stripIndent(function () {/*
         @include(".travis.yml")
         */});
        var out = blade(template);
        assert.deepEqual(out, "Hi there");
    });
});

