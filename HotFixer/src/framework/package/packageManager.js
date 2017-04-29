/**
 * Created by Berwin on 2017/4/19.
 */

var $pm = {};

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

    // 找出没有加载的Js文件
    var needLoadJs = [];
    this._requireIncludeNeedLoadJs(clsMeta, needLoadJs);
    needLoadJs.forEach((item, idx) => {
        needLoadJs[idx] = "src/" + item;
    });

    if (needLoadJs.length > 0) { // 去加载文件
        cc.loader.loadJs(needLoadJs, (err) => {
            if (err) {
                loadFinish && loadFinish.apply(null, [{err: err}]);
                return;
            }
            this._handleIncludesRelationship(clsMeta, []);
            loadFinish && loadFinish.apply(null, this._expansionExports(clsMeta.export));
        });
    } else {
        this._handleIncludesRelationship(clsMeta, []);
        loadFinish && loadFinish.apply(null, this._expansionExports(clsMeta.export));
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

/**
 * 多个同时加载
 * @param metas
 * @param loadFinish
 */
$pm.requires = function (metas, loadFinish) {

};

$pm.loadGroup = function (name, cb) {
    var group = $groups[name];
    if (!group) {
        cc.log("loadGroup失败，没有找到group:" + name);
        return;
    }
    cc.loader.loadJs(group, cb);
};

/**
 * 引入需要加载js文件
 * @param meta
 * @param loadNeeds
 * @private
 */
$pm._requireIncludeNeedLoadJs = function (meta, loadNeeds) {
    if (!meta.loaded)
        loadNeeds.push(meta.file);
    var imports = meta.ref;
    for (var i = 0; i < imports.length; i++) {
        var importMeta = eval(imports[i]);// eval("$import.testB.TestB")
        var clsMeta = this._findClassMeta(importMeta._cls, importMeta._pkg);
        if (clsMeta) {
            // 是否已经添加过了
            var exist = loadNeeds.some((item) => {
                return item == clsMeta.file;
            });
            if (!exist)
                this._requireIncludeNeedLoadJs(clsMeta, loadNeeds);
        }
    }
};

/**
 * 处理引入关系
 * @param meta
 * @param cache
 * @private
 */
$pm._handleIncludesRelationship = function (meta, cache) {
    if (!meta || meta._$_inCircle)
        return;
    meta._$_inCircle = true;
    var refs = meta.ref;
    for (var i = 0; i < refs.length; i++) {
        var importRef = eval(refs[i]);
        var refMeta = this._findClassMeta(importRef._cls, importRef._pkg);
        var exist = cache.some((item) => {
            return item.file == refMeta.file;
        });
        if (!exist)
            this._handleIncludesRelationship(refMeta, cache);
        meta.import.push(refMeta.export);
        cache.push(refMeta);
    }
    if (!meta.loaded) {
        meta.loaded = true;
        console.log("loaded:" + meta.file);
        meta.factory.apply(null, [meta.export].concat(this._expansionImports(meta)));
    }
    delete meta._$_inCircle;
};

// 展开引入数据
$pm._expansionImports = function (meta) {
    var imports = meta.import;
    var data = {};
    imports.forEach(($import) => {// [{},{}]
        for (var key in $import) {
            // data[key] = $import[key];
            (function ($import, data, key) {
                data[key] = function () {
                    return $import[key];
                };
            })($import, data, key);
        }
    });
    return [data];
};

// 展开导出数据
$pm._expansionExports = function (exports) {
    var data = {};
    for (var key in exports) {
        data[key] = exports[key];
    }
    return [data];
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