/**
 * Created by Berwin on 2017/5/27.
 */
var nv = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/NativeInterface";
        } else {
            this._clsName = "NativeInterface";
        }
    },

    makeToast: function (content, time = 3000) {
        cc.callNativeStaticMethod(this._clsName, "makeToast", {
            content: content,
            time: time
        });
    },

    systemShare: function (title, content, imgUrl) {
        cc.callNativeStaticMethod(this._clsName, "systemShare", {
            title: title,
            content: content,
            imgUrl: imgUrl
        });
    },

    showAlertDialog: function (title, content, positive, negative, callback) {
        var id = -1;
        if (callback) {
            id = cc.addCallback(callback);//arguments
        }
        cc.callNativeStaticMethod(this._clsName, "showAlertDialog", {
            title: title,
            content: content,
            positive: positive,
            negative: negative,
            cbid: id
        });
    },

    isNetworkAvaliable: function () {
        return cc.callNativeStaticMethod(this._clsName, "isNetworkAvaliable");
    },

    getDeviceUUID: function () {
        return cc.callNativeStaticMethod(this._clsName, "getDeviceUUID");
    },

    showPrivacyWithURL: function (url) {
        cc.callNativeStaticMethod(this._clsName, "showPrivacyWithURL", {url: url});
    },

    showMoreGame: function () {
        cc.callNativeStaticMethod(this._clsName, "showMoreGame");
    }
});