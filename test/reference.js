var blade   = require("../lib/blade");
var compile = blade.compile;
var reset   = blade.reset;
var context = blade.context;
var dlog    = require("d-logger");

var multi   = require("multiline");
var assert  = require("chai").assert;

describe("Reference lookup", function(){
    it("should replace simple variables", function(){
        var input    = "Hello {greeting}!";
        var expected = "Hello World!";
        var actual   = compile(input, {greeting: "World"});
        assert.equal(actual, expected);
    });
    it("should replace simple with newlines following", function(){
        var input    = "Hello {greeting}!\nNew line";
        var expected = "Hello World!\nNew line";
        var actual   = compile(input, {greeting: "World"});
        assert.equal(actual, expected);
    });
    it("should replace simple with newlines following", function(){
        var input = multi(function () {/*
Before
{greeting}
After
*/});
        var expected = "Before\nHello\nAfter";
        var actual   = compile(input, {greeting: "Hello"});
        assert.equal(actual, expected);
    });
    it("should replace simple with newlines following", function(){
        var input = multi(function () {/*
Before {greeting}
After
*/});
        var expected = "Before Hello\nAfter";
        var actual   = compile(input, {greeting: "Hello"});
        assert.equal(actual, expected);
    });
    it("should remove the variable if not exists", function(){
        var input = multi(function () {/*
Before {greeting2}
After
*/});
        var expected = "Before \nAfter";
        var actual   = compile(input, {greeting: "Hello"});
        assert.equal(actual, expected);
    });
    it("should remove the variable if not exists", function(){
        var input = multi(function () {/*
Before
{greeting2}
After
*/});
        var expected = "Before\n\nAfter";
        var actual   = compile(input, {greeting: "Hello"});
        assert.equal(actual, expected);
    });
});