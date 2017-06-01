/**
 * Created by Berwin on 2017/5/27.
 */
var ad = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/AdInterface";
        } else {
            this._clsName = "AdInterface";
        }
    },

    preload: function (type) {
        cc.callNativeStaticMethod(this._clsName, "preload", {type: type});
    },

    preloadAll: function () {
        cc.callNativeStaticMethod(this._clsName, "preloadAll");
    },

    show: function (type) {
        cc.callNativeStaticMethod(this._clsName, "show", {type: type});
    },

    hide: function (type) {
        cc.callNativeStaticMethod(this._clsName, "hide", {type: type});
    },

    isAvailable: function (type) {
        return cc.callNativeStaticMethod(this._clsName, "isAvailable", {type: type}) == "true";
    },

    isShown: function (type) {
        return cc.callNativeStaticMethod(this._clsName, "isShown", {type: type}) == "true";
    },

    getGravity: function () {
        var gravity = cc.callNativeStaticMethod(this._clsName, "getGravity");
        return parseInt(gravity);
    },

    setGravity: function (gravity) {
        cc.callNativeStaticMethod(this._clsName, "setGravity", {gravity: gravity});
    },
});