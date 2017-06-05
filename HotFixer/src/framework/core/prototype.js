/**
 * Created by Berwin on 2017/5/1.
 */

var prototype = cc.Class.extend({
    ctor: function () {
        // 给cc添加一个visibleSize
        cc.visibleSize = cc.director.getVisibleSize();
    },

});

/**
 * 得到node的中点位置
 */
cc.Node.prototype.getCenter = function () {
    return cc.p(this.width / 2, this.height / 2);
};

/**
 * 添加子节点到中点
 * @param child
 */
cc.Node.prototype.addChildToCenter = function (child) {
    child.setPosition(this.width / 2, this.height / 2);
    this.addChild(child);
};

/**
 * 将形参和形参值封装成对象
 * @returns {Array.<*>}
 */
Function.prototype.getArguments = function () {
    var argstr = this.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    var args = argstr.replace(/\/\*.*\*\//, "").split(",");
    var data = {};
    for (var i = 0; i < args.length; i++) {
        var arg = args[i].split("=")[0].trim();
        data[arg] = this.arguments[i];
    }
    return data;
};

/**
 * 整个程序中统一的的Native方法调用接口。
 * 对应实现静态方法为: public static String staticMethod(String jsonData); - Android
 * 对应实现静态方法为: +(NSString*)staticMethod:(NSString*)jsonData; - iOS
 *
 * @param clsName
 * @param methodName
 * @param data
 * @returns {*}
 */
cc.callNativeStaticMethod = function (clsName, func, data = null) {
    var methodName = func;
    if (typeof func === "function") { // 如果是个方法就执行 方法的参数解析
        data = cc.handleArgsFunction(func);
        methodName = func.name;
    }
    var datastringify = data ? JSON.stringify(data) : "";
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        return jsb.reflection.callStaticMethod(clsName, methodName,
            "(Ljava/lang/String;)Ljava/lang/String;", // 参数列表
            datastringify);
    } else if (cc.sys.os == cc.sys.OS_IOS) {
        return jsb.reflection.callStaticMethod(clsName, methodName + ":", datastringify);
    }
};

/**
 * 回调的缓存
 * @type {Array}
 */
cc.nativeCallbackCache = {};

/**
 * native执行到js里面的入口
 * @param cbkey
 * @param data
 */
cc.nativeCallback = function (cbkey, data) {
    if (!cc.nativeCallbackCache[cbkey]) {
        cc.app.log.w("nativeCallbackCache cbkey(Callback Key) not found:" + cbkey);
        return;
    }
    cc.nativeCallbackCache[cbkey].apply(null, [data]);
};

/**
 * 注册回调方法
 * @param callback
 * @returns {*|number}
 */
cc.registerCallback = function (callback) {
    var key = new Date().getTime() + "";
    cc.nativeCallbackCache[key] = callback;
    return key;
};

/**
 * 封装方法的数据
 * @param func
 * @param args
 * @returns {{}}
 */
cc.handleArgsFunction = function (func) {
    var args = func.getArguments();
    for (var key in args) {
        if (typeof args[key] === "function") {
            var cbkey = cc.registerCallback(args[key]);
            args[key] = cbkey;
        }
    }
    return args;
};