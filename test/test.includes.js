var blade   = require("../lib/blade").compile;
var dlog    = require("./debugger").log;

var multi   = require("multiline");
var assert  = require("chai").assert;


describe("@includes", function(){
    it("includes a file", function(){
        var template = multi.stripIndent(function () {/*
        Shane
        @include(".travis./ss.sas//as/asasssss/ss/2345678jhewgerfyml")
        is ace
         */});
        var out = blade(template);
        console.log(out);
    });
});

