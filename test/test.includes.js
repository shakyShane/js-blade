var blade   = require("../lib/blade");
var compile = blade.compile;
var reset   = blade.reset;
var context = blade.context;
var dlog    = require("d-logger");

var multi   = require("multiline");
var assert  = require("chai").assert;
var sinon   = require("sinon");
var fs      = require("fs");

describe("@includes", function() {
    var existsStub;
    var fsReadStub;
    before(function () {
        existsStub = sinon.stub(fs, "existsSync").returns(true);
        fsReadStub = sinon.stub(fs, "readFileSync");
    });
    afterEach(function () {
        fsReadStub.reset();
        existsStub.reset();
        reset();
    });
    after(function () {
        existsStub.restore();
        fsReadStub.restore();
    });
//    it("includes a file with indentation", function(){
//        var incFile  = multi(function () {/*
//Some nested
//    Content
//        Here
//    that's
//Correctly
//                Indented
//         */});
//        var template = multi(function () {/*
//Before
//    {@include src="shkitane.yml{shane}" /}
//After
//         */});
//        var expected = multi(function () {/*
//Before
//    Some nested
//        Content
//            Here
//        that's
//    Correctly
//                    Indented
//After
//         */});
//        fsReadStub.returns(incFile);
//        var out      = compile(template);
//        //dlog(out);
//        assert.equal(out, expected);
//    });
//    it("can process included content", function () {
//
//        var input = multi(function () {/*
//@include("whateves.whatevs")
//World!
//*/});
//
//        fsReadStub.returns("Hello");
//
//        var out = compile(input);
//        assert.equal(out, "Hello\nWorld!");
//    });
//    it("can process included content on same line", function () {
//
//        var input = 'Hello @include("whateves.whatevs")!';
//
//        fsReadStub.returns("World");
//
//        var out = compile(input);
//        assert.equal(out, "Hello World!");
//    });
//    it("can process multiple includes side-by-side", function () {
//        var input = 'Hello @include("whateves.whatevs")@include("whatevbooya")!';
//        fsReadStub.returns("World");
//        var out = compile(input);
//        assert.equal(out, "Hello WorldWorld!");
//    });
//    it("can process recursive includes", function () {
//
//        var input = 'Hello @include("first")';
//        fsReadStub
//            .onFirstCall()
//            .returns('there @include("second")!')
//            .onSecondCall()
//            .returns("Shane");
//
//        var out = compile(input);
//        assert.equal(out, "Hello there Shane!");
//    });
//    it("Gives good errors when include not found", function () {
//
//        var input = 'Hello @include("first")';
//        existsStub.returns(false);
//        var out = compile(input);
//        assert.equal(out, 'Hello <span class="__blade__error__">@include failed: `first` not found.</span>');
//    });
});