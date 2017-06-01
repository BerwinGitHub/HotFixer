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
 * 整个程序中统一的的Native方法调用接口。
 * 对应实现静态方法为: public static String staticMethod(String jsonData); - Android
 * 对应实现静态方法为: +(NSString*)staticMethod:(NSString*)jsonData; - iOS
 *
 * @param clsName
 * @param methodName
 * @param data
 * @returns {*}
 */
cc.callNativeStaticMethod = function (clsName, methodName, data = null) {
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        return jsb.reflection.callStaticMethod(clsName, methodName,
            "(Ljava/lang/String;)Ljava/lang/String;", // 参数列表
            JSON.stringify(data));
    } else if (cc.sys.os == cc.sys.OS_IOS) {
        return jsb.reflection.callStaticMethod(clsName,
            methodName + ":",
            data ? JSON.stringify(data) : "");
    }
};

/**
 * 回调的缓存
 * @type {Array}
 */
cc.nativeCallbackCache = [];

/**
 * native执行到js里面的入口
 * @param cbid
 * @param data
 */
cc.nativeCallback = function (cbid, data) {
    if (cbid < 0 || cbid >= cc.nativeCallbackCache.length) {
        cc.app.log.e("nativeCallback cbid(CallbackID) is error arange:" + cbid);
        return;
    }
    cc.nativeCallbackCache[cbid].apply(null, [data]);
};

cc.addCallback = function (callback) {
    cc.nativeCallbackCache.push(callback);
    return (cc.nativeCallbackCache.length - 1);
};