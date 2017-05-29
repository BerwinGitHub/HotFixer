/**
 * Created by Berwin on 2017/5/27.
 */
var native = cc.Class.extend({
    ctor: function () {
        this.ad = new ad();
        this.facebook = new facebook();
        this.flurry = new flurry();
        this.nv = new nv();
        this.purchase = new purchase();
    },

    /**
     *
     * @param clsName       android:org/cocos2dx/javascript/JavaScriptAllJava ios:JSToNativeAccess
     * @param methodName    android:show(int type) ios:show:(int)type 请都传入show即可
     * @param data          json对象
     */
    languageInterface: function (clsName, methodName, data = null) {
        if (cc.sys.os == cc.sys.ANDROID) {
            return jsb.reflection.callStaticMethod(clsName, methodName,
                "(Ljava/lang/String;)Ljava/lang/String;", // 参数列表
                JSON.stringify(data));
        } else if (cc.sys.os == cc.sys.IOS) {
            return jsb.reflection.callStaticMethod(clsName,
                methodName + ":withData:",
                JSON.stringify(data));
        }
    },
});