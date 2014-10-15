var blade   = require("../lib/blade");
var compile = blade.compile;
var reset   = blade.reset;
var dlog    = require("./debugger").log;

var multi   = require("multiline");
var assert  = require("chai").assert;
var sinon   = require("sinon");
var fs      = require("fs");


describe("@includes", function(){
    var existsStub;
    var fsReadStub;
    before(function () {
        existsStub = sinon.stub(fs, "exists").returns(true);
        fsReadStub = sinon.stub(fs, "readFileSync");
    });
    afterEach(function () {
        fsReadStub.reset();
        reset();
    });
    after(function () {
        existsStub.restore();
        fsReadStub.restore();
    });
    it("includes a file with indentation", function(){
        var incFile  = multi(function () {/*
Some nested
    Content
        Here
    that's
Correctly
                Indented
         */});
        var template = multi(function () {/*
Before
    @include(".travis.yml")
After
         */});
        var expected = multi(function () {/*
Before
    Some nested
        Content
            Here
        that's
    Correctly
                    Indented
After
         */});
        fsReadStub.returns(incFile);
        var out      = compile(template);
        assert.equal(out, expected);
    });
    it("can process included content", function () {
        
        var input = multi(function () {/*
@include("whateves.whatevs")
World!
*/});

        fsReadStub.returns("Hello");

        var out = compile(input);
        assert.equal(out, "Hello\nWorld!");
    });
    it("can process included content on same line", function () {

        var input = multi(function () {/*
Hello @include("whateves.whatevs")!
*/});

        fsReadStub.returns("World");

        var out = compile(input);
        assert.equal(out, "Hello World!");
    });
});

