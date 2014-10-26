var blade   = require("../lib/blade");
var compile = blade.compile;
var reset   = blade.reset;
var context = blade.context;
var dlog    = require("d-logger");

var multi   = require("multiline");
var assert  = require("chai").assert;

describe("Reference Section lookup {#name}", function(){
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Before
{#user}Inside ref section{/user}
After
*/});
        var expected = "Before\nInside ref section\nAfter";
        var actual   = compile(input);
        assert.equal(actual, expected);
    });
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Before
{#name}{.} Osbourne{/name}
After
         */});
        var expected = "Before\nShane Osbourne\nAfter";
        var actual   = compile(input, {name: "Shane"});
        assert.equal(actual, expected);
    });
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Hello {#user}{name}{/user}
After
         */});
        var expected = "Hello Shane\nAfter";
        var actual   = compile(input, {user: {name:"Shane"}});
        assert.equal(actual, expected);
    });
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Hello
{#user}{name}{/user}
After
         */});
        var expected = "Hello\nShane\nAfter";
        var actual   = compile(input, {user: {name:"Shane"}});
        assert.equal(actual, expected);
    });
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Hello
{#user}{name.first}{/user}
After
         */});
        var expected = "Hello\nShane\nAfter";
        var actual   = compile(input, {
            user: {
                name: {
                    first: "Shane",
                    last: "Osbourne"
                }
            }
        });
        assert.equal(actual, expected);
    });
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Hello
{#user}{#name}{first}{/name}{/user}
After
         */});
        var expected = "Hello\nShane\nAfter";
        var actual   = compile(input, {
            user: {
                name: {
                    first: "Shane",
                    last: "Osbourne"
                }
            }
        });
        assert.equal(actual, expected);
    });
});