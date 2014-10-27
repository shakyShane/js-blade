var assert = require ("chai").assert;
var Context = require ("../lib/context");

describe("Context index counting", function(){
    it("Advancing the index", function() {
        var ctx    = new Context({names: ["shane", "alan", "osbourne"]});
        ctx.setHead("names");
        assert.equal(ctx._idx, 0);
        ctx.advanceIndex();
        assert.equal(ctx._idx, 1);
        ctx.advanceIndex();
        assert.equal(ctx._idx, 2);
        ctx.advanceIndex();
        assert.equal(ctx._idx, 0);
    });
    it("Having knowledge of the last item", function() {
        var ctx    = new Context({names: ["shane"]});
        ctx.setHead("names");
        assert.isTrue(ctx.isLast());
    });
    it("Having knowledge of the last item", function() {
        var ctx    = new Context({names: ["shane", "Kittie"]});
        ctx.setHead("names");
        assert.isFalse(ctx.isLast());
        ctx.advanceIndex();
        assert.isTrue(ctx.isLast());
        ctx.advanceIndex();
        assert.isFalse(ctx.isLast());
    });
});