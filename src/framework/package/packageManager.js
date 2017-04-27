/**
 * Created by Berwin on 2017/4/19.
 */

var $pm = {};

/**
 * 多个同时加载
 * @param metas
 * @param loadFinish
 */
$pm.requires = function (metas, loadFinish) {

};

/**
 * 异步加载class。会去loadJS
 * @param meta $require.xxx.xxx
 * @param loadFinish
 */
$pm.require = function (meta, loadFinish) {
    var clsMeta = this._findClassMeta(meta._cls, meta._pkg);
    if (!clsMeta) {
        loadFinish && loadFinish.apply(null, [{err: "Require不能找到:" + meta._pkg + meta._cls}]);
        return;
    }
    // 需要加载的类
    // var needImportClasses = [];
    // this._searchImports(clsMeta, needImportClasses);
    // needImportClasses.reverse(); // 逆序加载

    // 找出没有加载的Js文件
    var needLoadJs = [];
    this._requireIncludeNeedLoadJs(clsMeta, needLoadJs);

    if (needLoadJs.length > 0) { // 去加载文件
        cc.loader.loadJs(needLoadJs, (err) => {
            if (err) {
                loadFinish && loadFinish.apply(null, [{err: err}]);
                return;
            }
            // TODO 加载成功后，做引用关系处理
        });
        // this._loadClasses(needLoadJs, (err) => {
        //     if (err) {
        //         loadFinish && loadFinish.apply(null, [{err: err}]);
        //     }
        //     loadFinish && loadFinish.apply(null, this._expansionExports(clsMeta.export));
        // });
    } else {
        // TODO 做引用关系处理
    }
};

/**
 * 同步加载class。不会loadJS文件
 * @param meta $require.xxx.xxx
 * @returns {*}
 */
$pm.requireSync = function (meta) {
    var clsMeta = this._findClassMeta(meta._cls, meta._pkg);
    if (!clsMeta) {
        return {err: "Require不能找到:" + meta._pkg + meta._cls};
    }
    return clsMeta.export;
};

$pm._requireIncludeNeedLoadJs = function (meta, loadNeeds) {
    if (!meta.loaded)
        loadNeeds.push("src/" + meta.file);
    var imports = meta["ref"];
    for (var i = 0; i < imports.length; i++) {
        var importMeta = eval(imports[i]);// eval("$import.testB.TestB")
        var clsMeta = this._findClassMeta(importMeta._cls, importMeta._pkg);
        if (clsMeta) {
            // 是否已经添加过了
            var isInclude = false;
            for (var j = 0; j < loadNeeds.length; j++) {
                if (loadNeeds[j] === clsMeta.file) {
                    isInclude = true;
                    break;
                }
            }
            if (!isInclude) {
                this._searchImports(clsMeta, loadNeeds);
            }
        }
    }
};

$pm._loadClasses = function (needLoadFiles, loadFinish) {
    // 加载Classes
    // var needLoadFiles = [];
    // needImportClasses.forEach((item) => {
    //     if (!item.loaded) {// 当前的JS文件是否已经加载过了
    //         needLoadFiles.push("src/" + item.file);
    //     }
    // });
    // if (needLoadFiles.length == 0) { // 没有需要加载的文件直接返回
    //     loadFinish();
    //     return;
    // }
    // 加载JS文件
    cc.loader.loadJs(needLoadFiles, (err) => {
        if (err) {
            cc.log("加载JS文件错误 err:" + err);
            loadFinish({err: err});
            return;
        }
        // 加载完成之后，设置export和import关系
        // cc.log("JS文件夹加载完成:" + needLoadFiles);
        // // 执行类函数
        // needImportClasses.forEach((item) => {
        //     // 1.先得到该类的所有import
        //     item.import = (item.import ? item.import : []);
        //     item.ref.forEach((ref) => {
        //         var importRef = eval(ref);
        //         var refClass = this._findClassMeta(importRef._cls, importRef._pkg);
        //         item.import.push(refClass.export);
        //     });
        //     // 2.没有export对象，就新建export对象
        //     item.export = (item.export ? item.export : {});
        //     // 3.第一次加载的时候才执行类实现函数
        //     if (!item.loaded) {
        //         item.implement.apply(null, [item.export].concat(this._expansionImports(item.import)));
        //         item.loaded = true;
        //     }
        // });
        loadFinish();
    });
};

$pm._expansionImports = function (imports) {
    var data = {};
    imports.forEach(($import) => {
        for (var key in $import) {
            data[key] = $import[key]
        }
    });
    return [data];
};

$pm._expansionExports = function (exports) {
    var data = {};
    for (var key in exports) {
        data[key] = exports[key];
    }
    return [data];
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
                    // 把这个交换到最后
                    // var temp = needImportClasses.splice(j, 1);
                    // needImportClasses.push(temp[0]);
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

var $packageManager = $pm;