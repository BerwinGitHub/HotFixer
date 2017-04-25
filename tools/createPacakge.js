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
    var $package = {};
    var $classes = {};
    recursiveFiles(SRC, $import, $package, $classes);
    var saves = [$import, $package, $classes];
    var header = ["var $import = ", "var $package = ", "var $classes = "];
    var footer = [";\r\n", ";\r\n", ";\r\n"];
    var content = cfgs.common.JSON_FILE_NOTE;
    for (var i = 0; i < saves.length; i++) {
        var obj = saves[i];
        var h = header[i];
        if (cfgs.packages.FORMAT_JSON) {
            content += (h + JSON.stringify(obj, null, 4)) + footer[i];
        } else {
            content += (h + JSON.stringify(obj)) + ";";
        }
    }
    content += "\r\n" + "var $require = $import;";
    file.writeToFile(path.resolve(__dirname, cfgs.packages.DATA_FILE), content, () => {
        console.log("packageData.js保存成功");
    })
})();

/**
 * 递归遍历文件夹
 * @param src
 * @param callback
 */
function recursiveFiles(src, $import, $package, $classes) {
    var hasClass = false;
    var dirs = fs.readdirSync(src);
    for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i];
        var p = src + '/' + name;
        var child = {};
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
            if (recursiveFiles(p, child, $package, $classes)) {
                $import[path.basename(p)] = child;
                hasClass = true;
            } else {
                delete $import[path.basename(p)];
            }
        } else if (fs.existsSync(p) && !isExcludeFile(p)) {
            var key = path.basename(p).replace(path.extname(p), "");
            $import[key] = child;
            if (readJsFile(p, $package, $classes, child)) {
                hasClass = true;
            } else {
                delete $import[key];
            }
        }
    }
    return hasClass;
}

function readJsFile(p, $package, $classes, child) {
    var rltFile = path.relative(SRC, p);
    var pkg = rltFile.replace(".js", "");
    pkg = pkg.replace(/\//g, ".");
    var imports = [];
    var reader = new lineReader(p);
    var line;
    var lineNum = 1;
    var hasClass = false;
    while ((line = reader.next())) {
        line = line.replace(/[\r\n]/g, ""); // 在Windows上面每行有\r或\n，在这替换掉
        if (/^\[\"package\s+(.*)(\"]|\"];)$/.test(line)) {// package
            // var pkg = /^\[\"package\s+(.*)(\"]|\"];)$/.exec(line)[1];
            // child["package"] = pkg;
        } else if (/^\$include\(.*(\)|\);)$/.test(line)) {// import
            // 先把两边括号去掉
            var content = /^\$include\((\$import.*)(\)|\);)$/.exec(line)[1].replace(/\s+/g, "");;
            var imp = content.split(",")// js语法规则只有','可行
            imports = imports.concat(imp);
        } else if (/^\$class\(\"(.*)\".*$/.test(line)) {// classes
            var clsName = /^\$class\(\"(.*)\".*$/.exec(line)[1];
            if (!isSamePkg$ClsName($classes, pkg, clsName)) {
                hasClass = true;
                child[clsName] = {_pkg: pkg, _cls: clsName};
                //
                var meta = {
                    "file": rltFile,
                    "name": clsName,
                    "package": pkg,
                    "implement": null,
                    "export": {},
                    "import": [],
                    "ref": imports,
                };
                $classes[clsName] = $classes[clsName] || [];
                $classes[clsName].push(meta);
            } else {
                console.log("跳过,同包名下不能有相同类(" + p + " => " + lineNum + "行 => " + clsName + ")");
            }
        }
        lineNum++;
    }
    if (hasClass) {
        $package[pkg] = pkg;
    }
    return hasClass;
}

function isSamePkg$ClsName($classes, pkg, cls) {
    var classes = $classes[cls];
    if (!classes) {
        return false;
    }
    for (var i = 0; i < classes.length; i++) {
        if (classes[i]["package"] === pkg) {
            return true;
        }
    }
    return false;
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