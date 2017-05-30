/**
 * Created by Berwin on 2017/5/27.
 */
var native = cc.Class.extend({

    _callbackCache: null,

    ctor: function () {
        this.ad = new ad();
        this.facebook = new facebook();
        this.flurry = new flurry();
        this.nv = new nv();
        this.purchase = new purchase();
        this._callbackCache = [];
    },

    nativeCallback: function (cbid, data) {
        if (cbid < 0 || cbid >= this._callbackCache.length) {
            cc.app.log.e("nativeCallback cbid(CallbackID) is error arange:" + cbid);
            return;
        }
        this._callbackCache[cbid].apply(null, [data]);
        this._callbackCache.splice(cbid, 1);
    },

    addCallback: function (callback) {
        this._callbackCache.push(callback);
        return (this._callbackCache.length - 1);
    },

    /**
     *
     * @param clsName       android:org/cocos2dx/javascript/JavaScriptAllJava ios:JSToNativeAccess
     * @param methodName    android:show(int type) ios:show:(int)type 请都传入show即可
     * @param data          json对象
     */
    languageInterface: function (clsName, methodName, data = null) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(clsName, methodName,
                "(Ljava/lang/String;)Ljava/lang/String;", // 参数列表
                JSON.stringify(data));
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod(clsName,
                methodName + ":",
                data ? JSON.stringify(data) : "");
        }
    },
});