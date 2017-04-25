/**
 * Created by cwb on 2016/9/28 0028.
 */
/**

 # 模块使用

 - 每个模块必须是单独的一个文件，并且所有代码都得写在模块定义里面。




 # 元数据使用
 - 支持类型
 - import(imports imp )
 - module(mod)
 - group(grp)

 -----------------------------

 - module:模块声明。
 - 例如 ["mod modA"] ,  ["mod modB"]
 - 包内的模块  ["core.modA"],["core.utils.ArrayUtils"]

 ------------------------------

 - import: 使用模块的时候配合，用于导入其他模块.
 - 例如： ["import modA;modB;modC"]  用分号';'隔开相当于 加载 modA modB modC

 - 也可以导入包，例如： ["import core.utils.* ;extends"]
 - 以 .* 号结尾，就是导入包，


 -----------------------------
 - group : 组的声明，说明当前文件属于哪个组，==通常不与模块一起使用==
 - exp.  ["group preload"]
 - 也可以隶属多个组： ["group preloadA;preloadB;gameA"]  用分号隔开
 - 加载顺序不分
 *
 */
var $metamgr = {};
(function (data, mgr) {
    var mc = mgr.modulesConfig = {};

    var fc = mgr.fileConfig = {};

    var gc = mgr.groupConfig = {};

    var warn = function (str) {
        cc.warn("[META] WARNNING :" + str)
    }
    var err = function (str) {
        cc.error("[META] ERROR :" + str)
    }
    //是否是包 路径  类似 com.pkg.*
    var _is_pkg_path = function (str) {
        return str && str[str.length - 1] == "*";
    }

    var _create_package = function (id, parent) {
        return {id: id, modules: {}, packages: {}, parent: parent}
    }
    var rootPkg = mgr.packages = _create_package("_main_");

    var _pkg_addmod = function (pkg, mod) {
        pkg.modules[mod.id] = mod;
    }
    var _pkg_addpkg = function (pkg, pkgId) {
        return pkg.packages[pkgId] = _create_package(pkgId, pkg);
    }

    var _get_or_create_pkg = function (pkg, pkgId) {
        if (pkg.packages[pkgId]) {
            return pkg.packages[pkgId];
        } else {
            return pkg.packages[pkgId] = _pkg_addpkg(pkg, pkgId);
        }
    }

    var _seek_pkg = function (pkgPath) {
        var arr = pkgPath.split(".");
        if (arr[arr.length - 1] == "*") {
            arr.pop();
        }
        if (arr.length == 0) {
            return rootPkg;
        }
        var pkg = rootPkg;
        for (var i in arr) {
            var pkgname = arr[i];
            var cpkg = pkg.packages[pkgname];
            if (cpkg) {
                pkg = cpkg;
            } else {
                warn("寻找package失败！" + pkgPath)
            }
        }
        return pkg;
    }
    var __getpkgmdules = function (pkg, arr) {
        var mds = pkg.modules;
        var pkgs = pkg.packages;
        for (var mod_id in mds) {
            arr.push(mod_id);
        }
        for (var i in pkgs) {
            __getpkgmdules(pkgs[i], arr);
        }
    }
    //获取一个包的所有模块id
    var _get_pkg_modules = function (pkg) {
        var arr = []
        __getpkgmdules(pkg, arr);
        return arr;
    }


    function _addToPackage(mod) {
        var p = mod.id;//pkg path;
        var arr = p.split(".");
        var resPkg
        if (arr.length == 1) {
            resPkg = _pkg_addmod(rootPkg, mod);
        } else {
            var pkg = rootPkg;
            var len = arr.length - 1;
            for (var i = 0; i < len; i++) {
                var pid = arr[i];
                var cpkg = _get_or_create_pkg(pkg, pid);
                if (i == len - 1) {
                    _pkg_addmod(cpkg, mod);
                }
                pkg = cpkg;
            }
            resPkg = pkg;
        }
        return resPkg;
    }

    function _addToGroup(group, file) {
        var gp = gc[group];
        if (!gp) {
            gp = gc[group] = {};
        }
        gp[file] = true;
    }

    //===============parser==============

    function _parseMod(file, contex) {
        if (!contex) {
            warn(file + " mod 缺少模块名字");
            return;
        }
        var obj = mc[contex];
        if (!obj) {
            obj = mc[contex] = {file: file, id: contex};
        }
        fc[file].module = obj;
        obj.package = _addToPackage(obj);
    }

    function _parseImports(file, contex) {
        var mod = fc[file].module;
        if (!contex) {
            warn(file + " imports 缺少导入模块");
            return;
        }
        var str = contex.replace(/\s/g, "");
        var arr = str.split(";");
        //过滤掉空的
        arr = arr.filter((it) => it)
        var trueImports = arr;

        trueImports = trueImports.filter(it => {
            var impstr = it;
            if (mc[it]) {
                //有这个模块
                return true;
            } else if (_is_pkg_path(impstr)) {
                //说明是个包引入 import core.*;
                var pkg = _seek_pkg(impstr);
                if (pkg) {
                    trueImports = trueImports.concat(_get_pkg_modules(pkg));
                    trueImports.push(impstr);
                } else {
                    warn("未定义的导入 Package =" + impstr);
                    return false;
                }

            } else {
                warn(file + " 导入不存在的模块 [" + it + "] ");
                return false;
            }
            return true;
        })
        if (mod) {
            mod.imports = trueImports;
        }

        fc[file].imports = trueImports;
    }

    //解析 group
    function _parseGroup(file, contex) {

        if (!contex) {
            warn(file + " group 缺少组名字");
            return;
        }
        var str = contex.replace(/\s/g, "");
        var arr = str.split(";");
        for (var i in arr) {
            var gp = arr[i];
            if (gp) {
                _addToGroup(gp, file);
            }
        }

    }

    //===============parser==============

    function _parsemeta_1(file, meta) {
        meta = meta.trim();
        var arr = meta.split(" ")
        var head = arr[0];
        var contex = arr[1];
        if (head == "mod" || head == "module") {
            _parseMod(file, contex);
        } else if (head == "group" || head == "grp") {
            _parseGroup(file, contex);
        }
    }

    function _parsemeta_2(file, meta) {
        meta = meta.trim();
        var arr = meta.split(" ")
        var head = arr[0];
        var contex = arr[1];
        if (head == "imports" || head == "import" || head == "imp") {
            _parseImports(file, contex);
        }
    }


    //解析模块
    for (var file in data) {
        var metas = data[file];
        fc[file] = {imports: [], module: null, path: file};
        for (var i in metas) {
            _parsemeta_1(file, metas[i])
        }
    }
    //解析 import 模块数据
    for (var file in data) {
        var metas = data[file];
        for (var i in metas) {
            _parsemeta_2(file, metas[i])
        }
    }

    //处理组  把组变成数组
    for (var i in gc) {
        gc[i] = Object.keys(gc[i]).sort();
    }


    //创建包


    mgr.getmodule = function (id) {
        return mc[id];
    }
    //获得包里所有的模块
    mgr.getPackageAllModules = function (pkgpath) {

        return _get_pkg_modules(_seek_pkg(pkgpath));
    }
    //是否是 导入包的路径 import core.*
    mgr.isImportPackagePath = function (pkgpath) {
        return _is_pkg_path(pkgpath);
    }
    mgr.getGroup = function (id) {
        return gc[id];
    }

    //加载某个组
    mgr.loadGroup = function (id, cb, baseDir = "") {
        if (!gc[id]) {

            err("没有这个加载组 " + id);
        }
        cc.loader.loadJs(baseDir, gc[id], cb);
    }

    //加载某个组
    mgr.loadGroups = function (ids, cb, baseDir = "") {
        var loaders = [];
        for (var i in ids) {
            var id = ids[i];
            if (!gc[id]) {
                err("没有这个加载组 " + id);
            } else {
                loaders = loaders.concat(gc[id]);
            }
        }
        cc.loader.loadJs(baseDir, loaders, cb);
    }

    mgr.loadAllGroups = function () {
        var arr = []
        for (var i in gc) {
            arr.push(i);
        }
        mgr.loadGroups(arr);
    }

})(_$metadata, $metamgr);