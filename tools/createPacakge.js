/**
 * Created by Berwin on 2017/4/19.
 */
var fs = require("fs");
var path = require('path');
var cfgs = require("./configs").packages;
const lineReader = require('./core/lineReader');

/**
 *
 */
var SRC = path.resolve(__dirname, cfgs.SRC);
(function (callback) {
    var reader = new lineReader('E:/Workspaces/Github/HotFixer/src/framework/package/testB.js');
    var line;
    while ((line = reader.next())) {
        console.log(line);
    }
    reader.close();
    // recursiveFiles(SRC, () => {
    // });
})();

/**
 * 递归遍历文件夹
 * @param src
 * @param callback
 */
function recursiveFiles(src, callback) {
    var dirs = fs.readdirSync(src);
    for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i];
        var p = src + '/' + name;
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
            recursiveFiles(p, callback);
        } else if (fs.existsSync(p) && !isExcludeFile(p)) {
            // path.basename(p) 文件名字 | path.extname(p)扩展名
            // console.log(p.replace(SRC, ""));
            readJsFile(p);
        }
    }
    callback();
}

/**
 * 是否是排除中的文件
 * @param file
 * @returns {boolean}
 */
function isExcludeFile(file) {
    var excludes = cfgs.FILTER_EXCLUDE_SRC;
    for (var j = 0; j < excludes.length; j++) {
        if (excludes[j].test(file)) {
            return true;
        }
    }
    return false;
}

function readJsFile(path) {
    console.log(path);
    var lr = new LineByLineReader(path);
    lr.on('error', function (err) {
        // 'err' contains error object
    });
    lr.on('line', function (line) {
        // 'line' contains the current line without the trailing newline character.
        lr.pause();
        // ...do your asynchronous line processing..
        setTimeout(function () {

            console.log(line)
            // ...and continue emitting lines.
            lr.resume();
        }, 1000 * 2);
    });
    lr.on('end', function () {
        // All lines are read, file is closed now.
    });
}

function doParase(text) {
    console.log(text);
    console.log(/^.*$/.test(text));
    // if (/^\[\"package.*(\"]|\"];)$/.test(text)) {// package
    //     console.log("package");
    // } else if (/^\[\$import.*(\]|\];)$/.test(text)) {// import
    //     console.log("import");
    // } else if (/^\$class.*$/.test(text)) {// _class
    //     console.log("class");
    // }
}