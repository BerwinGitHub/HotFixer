/**
 * Created by Berwin on 2017/4/19.
 */
var fs = require("fs");
var path = require('path');
var cfgs = require("./configs");
var file = require("./core/files/file");
const lineReader = require('./core/lineReader');

/**
 *
 */
var SRC = path.resolve(__dirname, cfgs.packages.SRC);
(function (callback) {
    var $import = {};
    recursiveFiles(SRC, $import);
    var text = "";
    if (cfgs.packages.FORMAT_JSON) {
        text = JSON.stringify($import, null, 4);
    } else {
        text = JSON.stringify($import);
    }
    text = cfgs.common.JSON_FILE_NOTE + "var $import = " + text;
    file.writeToFile(path.resolve(__dirname, cfgs.packages.DATA_FILE), text, () => {
        console.log("packageData.js保存成功");
    })
})();

/**
 * 递归遍历文件夹
 * @param src
 * @param callback
 */
function recursiveFiles(src, root) {
    var dirs = fs.readdirSync(src);
    for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i];
        var p = src + '/' + name;
        var child = {};
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
            root[path.basename(p)] = child;
            recursiveFiles(p, child);
        } else if (fs.existsSync(p) && !isExcludeFile(p)) {
            root[path.basename(p).replace(path.extname(p), "")] = child;
            var rltFile = path.relative(SRC, p);
            child["file"] = rltFile;
            var pkg = rltFile.replace(".js", "");
            pkg = pkg.replace(/\//g, ".");
            child["package"] = pkg;
            child["classes"] = {};
            readJsFile(p, child);
        }
    }
}

function readJsFile(path, child) {
    var reader = new lineReader(path);
    var line;
    while ((line = reader.next())) {
        line = line.replace(/[\r\n]/g, ""); // 在Windows上面每行有\r或\n，在这替换掉
        if (/^\[\"package\s+(.*)(\"]|\"];)$/.test(line)) {// package
            // var pkg = /^\[\"package\s+(.*)(\"]|\"];)$/.exec(line)[1];
            // child["package"] = pkg;
        } else if (/^\[\$import.*(\]|\];)$/.test(line)) {// import
            // 先把两边括号去掉
            var content = /^\[(\$import.*)(\]|\];)$/.exec(line)[1];
            var imports = content.split(",");// js语法规则只有','可行
            child["imports"] = imports;
        } else if (/^\$class\(\"(.*)\".*$/.test(line)) {// classes
            var clsName = /^\$class\(\"(.*)\".*$/.exec(line)[1];
            child[clsName] = child["package"] + ".classes." + clsName;
            child["classes"][clsName] = {"implement": null, "export": null, "import": null};
        }
    }
}

/**
 * 是否是排除中的文件
 * @param file
 * @returns {boolean}
 */
function isExcludeFile(file) {
    var excludes = cfgs.packages.FILTER_EXCLUDE_SRC;
    for (var j = 0; j < excludes.length; j++) {
        if (excludes[j].test(file)) {
            return true;
        }
    }
    return false;
}