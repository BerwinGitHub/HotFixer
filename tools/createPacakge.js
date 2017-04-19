/**
 * Created by Berwin on 2017/4/19.
 */
var cfgs = require("./configs").packages;
var fs = require("fs");
var path = require('path');
var liner = require('./core/liner');

/**
 *
 */
var SRC = path.resolve(__dirname, cfgs.SRC);
(function (callback) {
    recursiveFiles(SRC, () => {
    });
})();

/**
 * 递归遍历文件夹
 * @param path
 * @param fileHandler
 * @param deep
 * @param regular 正则表达式/.*(.csv|.xlsx)$/
 */
function recursiveFiles(src, callback) {
    var dirs = fs.readdirSync(src);
    for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i];
        var p = src + '/' + name;
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
            recursiveFiles(p, callback);
        } else if (fs.existsSync(p)) {
            var isExcludeFile = false;
            var excludes = cfgs.FILTER_EXCLUDE_SRC;
            for (var j = 0; j < excludes.length; j++) {
                if (excludes[j].test(p)) {
                    isExcludeFile = true;
                    break;
                }
            }
            if (!isExcludeFile) {
                // path.basename(p) 文件名字 | path.extname(p)扩展名
                // console.log(p.replace(SRC, ""));
                readJsFile(p);
            }
        }
    }
    callback();
}

function readJsFile(path) {
    console.log(p);
    var source = fs.createReadStream(path);
    source.pipe(liner);
    liner.on('readable', function () {
        var line;
        while (line = liner.read()) {
            // do something with line
            console.log(line);
        }
    })
}

function getType(text) {
    if (/^\[package.*(]|];)$/.test(text)) {// package
        return "package";
    } else if (/^\[import.*(]|];)$/.test(text)) {// import
        return "import";
    } else if (/^_class.*(]|];)$/.test(text)) {// _class
        return "_class";
    }
}