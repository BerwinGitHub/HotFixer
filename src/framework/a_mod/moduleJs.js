/**
 * Created by cwb on 2016/9/28 0028.
 */

var ccmo = {};
(function (g, m, ccmo) {
    var DEBUG = ccmo.debug = true;
    var srcpath = "";
    var mods = ccmo.modules = {};//已加载 Mod
    var file_mods = {};
    var pkgs = ccmo.pakages = {};//包

    //初始化模块
    for (var i in m.modulesConfig) {
        var mc = m.modulesConfig[i];
        var mod = new Mod(i, mc.file, mc.imports, null)
        _addmod(mod)
    }
    //添加包
    function _addpkg(mod) {
        var p = mod.id;//pkg path;
        var arr = p.split(".");
        var resPkg

        if (arr.length == 1) {
            pkgs[p] = mod.export;
            mod.package = pkgs;
        } else {
            var pkg = pkgs;
            var len = arr.length - 1;
            for (var i = 0; i < len; i++) {
                var pid = arr[i];
                var cpkg = pkg[pid]
                if (!cpkg) {
                    cpkg = pkg[pid] = {};
                }
                if (i == len - 1) {
                    var modname = arr[len];
                    cpkg[modname] = mod.export;
                    mod.package = cpkg;
                }
                pkg = cpkg;
            }

        }
    }

    function _seek_pkg(pkgPath) {
        var arr = pkgPath.split(".");
        if (arr[arr.length - 1] == "*") {
            arr.pop();
        }
        if (arr.length == 0) {
            return pkgs;
        }
        var pkg = pkgs;
        var res = null;
        for (var i in arr) {
            var pkgname = arr[i];
            var cpkg = pkg[pkgname];
            if (!_isexport(cpkg)) {
                res = pkg = cpkg;
            } else {
                res = null;
            }
        }
        return res;
    }

    var _ispkgpath = m.isImportPackagePath
    var _getfile = function (modid) {
        var mod = m.getmodule(modid);
        if (mod) {
            return mod.file
        }
    }
    var _getimports = function (modid) {
        var mod = m.getmodule(modid);
        if (mod) {
            return mod.imports
        }
    }
    var _getmod = function (modid) {
        return mods[modid];
    };
    var _getmodbyfile = function (file) {
        return file_mods[file];
    }
    var _modisdef = function (id) {
        return mods[id] && mods[id].state == MS_COMPLETE;
    }

    function _addmod(mod) {
        mods[mod.id] = mod;
        file_mods[mod.file] = mod;
        _addpkg(mod);
    }

    var _checkmod = function (mod) {
        if (mod.export.__$mod__) {
        } else {
            err("模块导出被非法修改 id=" + mod.id)
        }
    }

    var log = function (str) {
        cc.log("[module]      : " + str)
    }
    var err = function (str) {
        cc.error("[module]ERROR : " + str)
    }

    var _str2arr = function (str) {
        if (cc.isArray(str)) {
            return str;
        }
        if (typeof str === "string") {
            return str.split(";");
        }
        return [str];
    }
    var MS_FAIL = -1;//加载失败
    var MS_PRE = 0;//才声明的
    var MS_LOADING = 1;//加载中
    var MS_LOADED = 2;//加载完成
    var MS_DEF = 3;//定义
    var MS_COMPLETE = 4;//定义，执行完成

    function Mod(id, file, imports, factroy) {
        return {
            _isdefine: false,
            id: id,
            file: file,
            imports: imports,
            factory: factroy,
            state: MS_PRE,
            package: null,
            export: {__$mod__: id}
        };
    }

    function _isexport(obj) {
        return obj.hasOwnProperty("__$mod__");
    }


    //定义模块
    function _def(id) {
        if (!_getmod(id)) {
            return;
        }
        var mod = _getmod(id);
        if(mod.state >= MS_COMPLETE){return}
        mod.factory.apply(null, [mod.export].concat(_getmodsexport(mod.imports)))
        _checkmod(mod);
        mod.state = MS_COMPLETE;
    }

    //获得导出的模块
    function _getmodsexport(mods) {
        var arr = [];
        for (var i in mods) {
            var id = mods[i];
            var mod = _getmod(id);
            if (mod) {
                arr[i] = mod.export;

            } else if (_ispkgpath(id)) {
                arr.push(_seek_pkg(id));
            } else {
                err("Not exist this module="+id)
                arr.push({__$mod__:"Not exist this module="+id})
            }
        }
        return arr;
    }


    var _loadedlisteners = {};
    var __loadedlistenersid__ = 1;
    var _addloadedlistener = function (func) {
        if (!func.__$temp_id__) {
            func.__$temp_id__ = __loadedlistenersid__++;
        }
        _loadedlisteners[func.__$temp_id__] = func;

    }
    var _removeloadedlistener = function (func) {
        if (func.__$temp_id__) {

            delete _loadedlisteners[func.__$temp_id__];
        }
    }
    var _dispathloaded = function (modid) {

        for (var i in _loadedlisteners) {

            _loadedlisteners[i](modid);
        }
    }

    //开始加载这些模块
    var _addloadlist = function (modlist) {
        var loadqueue = [];

        for (var i in modlist) {
            var modid = modlist[i];
            var mod = _getmod(modid);
            if (mod) {
                if (mod.state >= MS_COMPLETE) {
                    //如果模块已加载，就不用推入加载列表
                    _dispathloaded(modid);
                } else if (mod.state >= MS_LOADING) {
                    //正在加载  就不用推入加载列表
                } else {

                    loadqueue.push(mod.file);
                    mod.state = MS_LOADING;
                }
            }else{
                err("can't load module,no regist "+modid);

            }

        }
        loadqueue.map(function (it) {
            var load = cc.sys.isNative ? [it] : it;
            cc.loader.loadJs("", load, function (iserr) {

                if (iserr) {
                    err("加载模块失败 :" + it);
                } else {

                    var mod = _getmodbyfile(it);
                    if (mod) {

                        mod.state = MS_LOADED;
                        _dispathloaded(mod.id);
                    }

                }
            });
        })

    }

    //等待列表中的全部加载完成
    var _waitloadedlist = function (modlist, cb) {
        var total = modlist.length;
        var count = 0;
        var oncomplete = function (modid) {
            var id = modlist.indexOf(modid);
            if (id >= 0) {
                count++;
            }
            if (count >= total) {
                _removeloadedlistener(oncomplete);
                cb && cb();
            }
        }
        _addloadedlistener(oncomplete);
    }


    var _planarImports = function (imports, hasmods, queue) {

        for (var i in imports) {
            var id = imports[i];
            if (hasmods[id]) {
                continue;
            } else {
                hasmods[id] = true;
                queue.push(id);
                var _imports = _getimports(id)
                if (_imports) {
                    _planarImports(_planarPkg(_imports), hasmods, queue);
                }
            }
        }

    }

    function _planarPkg(imports) {
        var loadlist = [];
        for (var i in imports) {
            var path = imports[i];
            if (_ispkgpath(path)) {
                loadlist = loadlist.concat(m.getPackageAllModules(path))
            } else {
                loadlist.push(path);
            }
        }
        return loadlist;
    }

    var planarImportModule = function (imports) {
        var testQueue = []

        //处理 包导入 core.*  core.utils.*
        var loadlist = _planarPkg(imports);
        _planarImports(loadlist, {}, testQueue);
        return testQueue;
    }

    var _reqmod = function (mods, cb) {
        var imports = planarImportModule(mods)
        cc.log("拍平=" + imports)
        var deflist = imports.concat().reverse();//待定义列表,和拍平后的相反；

        _waitloadedlist(imports, function () {
            cc.log("模块require完成:" + imports);
            //开始定义
            deflist.map((modid)=>_def(modid));
            //调用
            cb && cb.apply(null, _getmodsexport(mods))
        })
        _addloadlist(imports);
    }


    var reqmod = function (imports, cb) {
        _reqmod(_str2arr(imports), cb)
    }

    var defmod = function (id, factory) {
        var mod = _getmod(id);
        if (!mod) {
            //已经定义了
            err("模板定义出错，未声明模板 " + id)
            return;
        }
        if (mod.state >= MS_COMPLETE) {
            warning("模板定义重复 " + mod.file + "   mod=" + mod.id)
            return;
        }
        mod.factory = factory;

    }

    g.defmod = defmod;
    g.reqmod = reqmod;


})(window, $metamgr, ccmo);

//mod 取到名字的方法
var __get_mod_name__ = function (arr) {
    var str = arr[0];
    str.match(/mod \s*([^\s]*).*$/g);
    return RegExp.$1;
}