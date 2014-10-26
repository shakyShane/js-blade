var assert = require ("chai").assert;
var Context = require ("../lib/context");

describe("Context interactions", function(){
    it("simple get", function(){
        var ctx    = new Context({name: "shane"});
        var actual = ctx.get("name");
        assert.equal(actual, "shane");
    });
    it("set head", function(){
        var obj = {name: "shane"};
        var ctx    = new Context(obj);
        ctx.setHead("name");
        var actual = ctx.get(".");
        assert.equal(actual, "shane");
    });
    it("set head array", function(){
        var arr    = ["kittie", "shane"];
        var obj    = {names: arr};
        var ctx    = new Context(obj);
        ctx.setHead("names");
        var actual = ctx.get(".");
        assert.equal(actual, arr);
    });
    it("set head array", function(){
        var obj    = {
            users: {
                shane:  "awesome",
                kittie: "rubbish"
            }
        };
        var ctx    = new Context(obj);
        ctx.setHead("users");
        var actual = ctx.get(".kittie");
        assert.equal(actual, "rubbish");
    });
    it("set head array", function(){
        var obj    = {
            users: {
                shane:  "awesome",
                kittie: "rubbish"
            }
        };
        var ctx    = new Context(obj);
        ctx.setHead("users.shane");
        var actual = ctx.get(".");
        assert.equal(actual, "awesome");
        ctx.reset(obj);
        ctx.setHead("users.kittie");
        var actual = ctx.get(".");
        assert.equal(actual, "rubbish");
    });
    it("set head array", function(){
        var obj    = {
            users: {
                shane:  "awesome",
                kittie: "rubbish"
            }
        };
        var ctx    = new Context(obj);
        ctx.setHead("users.kittie");
        var actual = ctx.dropHead();
        assert.equal(actual, "users");
    });
});