/**
 * Created by Berwin on 2017/5/27.
 */
var nv = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/NativeInterface";
        } else if (cc.sys.os == cc.sys.IOS) {
            this._clsName = "NativeInterface";
        }
    },

    isNetworkAvaliable: function () {
        return cc.app.native.languageInterface(this._clsName, "isNetworkAvaliable");
    },

    getDeviceUUID: function () {
        return cc.app.native.languageInterface(this._clsName, "getDeviceUUID");
    },

    showPrivacyWithURL: function (url) {
        cc.app.native.languageInterface(this._clsName, "showPrivacyWithURL", {url: url});
    },

    showMoreGame: function () {
        cc.app.native.languageInterface(this._clsName, "showMoreGame");
    }
});