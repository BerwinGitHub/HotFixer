/**
 * Created by Berwin on 2017/4/19.
 */

var $pm = {};

/**
 *
 * @type {{}}
 */
$pm.loaderCache = {};

$pm.requireCls = function (requireMeta, loadFinish) {
    var clsMeta = this._findClassMeta(requireMeta._cls, requireMeta._pkg);
    if (!clsMeta) {
        loadFinish && loadFinish("Require不能找到:" + requireMeta._pkg + requireMeta._cls, null);
        return;
    }
    // 需要加载的类
    var needImportClasses = [];
    this._searchImports(clsMeta, needImportClasses);
    needImportClasses.reverse(); // 逆序加载
    // 加载Classes
    var needLoadFiles = [];
    needImportClasses.forEach((item) => {
        if (!this.isJsLoaded(item.file))
            needLoadFiles.push("src/" + item.file);
    });
    if (needLoadFiles.length == 0) {
        loadFinish && loadFinish(null, clsMeta.export);
        return;
    }

    // 加载JS文件
    cc.loader.loadJs(needLoadFiles, (err) => {
        if (err) {
            cc.log("加载JS文件错误 err:" + err);
            loadFinish && loadFinish(err, null);
            return;
        }
        // 执行类函数
        needImportClasses.forEach((item) => {
            // 1.先得到该类的所有import
            item.import = (item.import ? item.import : []);
            item.ref.forEach((im) => {
                var importRef = eval(im);
                var imClass = this._findClassMeta(importRef._cls, importRef._pkg);
                item.import.push(imClass.export);
            });
            // 2.新建export对象
            item.export = (item.export ? item.export : {});
            // 3.第一次加载的时候才执行类实现函数
            if (!this.isJsLoaded(item.file)) {
                item.implement(item.export, item.import);
                $pm.loaderCache[item.file] = true;
            }
        });
        loadFinish && loadFinish(null, clsMeta.export);
    });
};

/**
 * 遍历查找引入该类需要的其他索引类
 * @param clsMeta
 * @param needImportClasses
 * @returns {*}
 * @private
 */
$pm._searchImports = function (clsMeta, needImportClasses) {
    needImportClasses.push(clsMeta);
    var imports = clsMeta["ref"];
    for (var i = 0; i < imports.length; i++) {
        var importMeta = eval(imports[i]);// eval("$import.testB.TestB")
        var clsMeta2 = this._findClassMeta(importMeta._cls, importMeta._pkg);
        if (clsMeta2) {
            // 是否已经添加过了
            var isInclude = false;
            for (var j = 0; j < needImportClasses.length; j++) {
                if (needImportClasses[j]["name"] == clsMeta2["name"] &&
                    needImportClasses[j]["package"] == clsMeta2["package"]) {
                    isInclude = true;
                    break;
                }
            }
            if (!isInclude) {
                this._searchImports(clsMeta2, needImportClasses);
            }
        }
    }
    return needImportClasses;
};

/**
 * 找到Class的Meta
 * @private
 */
$pm._findClassMeta = function (clsName, pkg) {
    var classes = $classes[clsName];
    if (!classes) {
        cc.log("没有找到 " + clsName + "类。如果确定有声明该类，请尝试执行:node ./tools/createPackage.js");
        return null;
    }
    if ("" === pkg) {
        if (classes.length > 1) {
            cc.log(clsName + "类在多个包中包含，请在该类声明($class)中指定package参数(第三个参数:$package.xxx.xxx)");
            return null;
        }
        return classes[0];
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i]["package"] == pkg) {
                return classes[i];
            }
        }
        return null;
    }
};

$pm.isJsLoaded = function (file) {
    if ($pm.loaderCache[file])
        return true;
    return false;
};

var $packageManager = $pm;