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
    it("should render inside a ref section", function(){
        var input = multi(function () {/*
Before
{#users}{.}{/users}
After
*/});
        var expected = "Before\n\nAfter";
        var actual   = compile(input);
        dlog(actual);
        assert.equal(actual, expected);
    });
});