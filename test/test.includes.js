var blade   = require("../lib/blade").compile;
var dlog    = require("./debugger").log;

var multi   = require("multiline");
var assert  = require("chai").assert;


describe("@includes", function(){
    it("includes a file", function(){
        var template = multi.stripIndent(function () {/*
        Before
        @include(".travis.yml")
        After
         */});
        var expected = multi.stripIndent(function () {/*
        Before
        language: node_js
        node_js:
          - '0.10'

        After
         */});
        var out = blade(template);
        //dlog(out);
        assert.equal(out, expected);
        //console.log(out);
    });
});

