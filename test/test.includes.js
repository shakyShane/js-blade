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
        assert.equal(out, expected);
    });
    it("includes a file with indentation", function(){
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
        var out      = blade(template);
        assert.equal(out, expected);
    });
    it.skip("can process included content", function () {

        var myFile = multi.stripIndent(function () {/*
         Hello
         @section("shane")
         Hello
         @stop
         There
         */
        });

        var input = multi.stripIndent(function () {/*
         @section("shane") 
         After @stop
         Before
         @yield("shane")
         I Am awesome
         */
        });

        var existsStub = sinon.stub(fs, "exists").returns(true);
        var fsReadStub = sinon.stub(fs, "readFileSync")
            .onFirstCall()
            .returns(myFile)

        var out = blade(input);
        dlog(out);
    });
});

