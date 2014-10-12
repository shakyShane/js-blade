var tfunk   = require("tfunk");

function debugOutput (string) {
    var end1 = "   ";
    var end2 = "  ";
    var end3 = " ";
    var count = 1;
    string = string.replace(/ /g, tfunk("{magenta:·"));
    var out = "\n-------------------`Output Start`------------------------\n";
    out +=    tfunk("{cyan:-------0---4---8---12--16--20--24--28--32--36--40--44--48\n");
    out += tfunk("{cyan:   1   |");
    out += string.replace(/\n/g, function () {
        count += 1;
        return tfunk("{cyan:\n   "+count+ (count > 9 ? end2 : end1) + "|");
    });
    out += tfunk("{cyan:\n--------------------`Output END`-------------------------\n");
    console.log(out);
}

module.exports.log = debugOutput;