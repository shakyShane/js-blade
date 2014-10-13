var blade   = require("./lib/blade").compile;
var fs      = require("fs");

var content = fs.readFileSync("./templates/readme.md", "utf-8");
fs.writeFileSync("./templates/readme.out.md", blade(content));