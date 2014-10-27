var blade   = require("../lib/blade");
var compile = blade.compile;
var reset   = blade.reset;
var context = blade.context;
var dlog    = require("d-logger");

var multi   = require("multiline");
var assert  = require("chai").assert;

describe("Reference Section lookup {#name}", function(){
    afterEach(function () {
        reset();
    })
    it("should render inside a ref section loop", function(){
        var input = multi(function () {/*
Before
{name} - {job}
After
*/});
        var expected = "Before\nshane - dev\nAfter";
        var actual   = compile(input, {
            name: "shane",
            "job": "dev"
        });
        assert.equal(actual, expected);
    });
    it("should render inside a ref section loop", function(){
        var input = multi(function () {/*
Before
{greeting}
{#names}{.}{/names}
After
*/});
        var expected = "Before\nHello\nShaneOsbourne\nAfter";
        var actual   = compile(input, {
            names: ["Shane", "Osbourne"],
            greeting: "Hello"
        });
        assert.equal(actual, expected);
    });
    it("should render inside a ref section loop", function(){
        var input = multi(function () {/*
Before
{greeting} {#names}{first} {last}{/names}
After
*/});
        var expected = "Before\nWelcome Shane Osbourne\nAfter";
        var actual   = compile(input, {
            names: [{
                first: "Shane",
                last: "Osbourne"
            }],
            greeting: "Welcome"
        });
        assert.equal(actual, expected);
    });
    it("should render inside a ref section loop", function(){
        var input = multi(function () {/*
Before
{greeting} {names[0].first} {names[0].last}
After
*/});
        var expected = "Before\nWelcome Shane Osbourne\nAfter";
        var actual   = compile(input, {
            names: [{
                first: "Shane",
                last: "Osbourne"
            }],
            greeting: "Welcome"
        });
        assert.equal(actual, expected);
    });
});