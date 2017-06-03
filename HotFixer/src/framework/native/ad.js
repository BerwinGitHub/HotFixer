/**
 * Created by Berwin on 2017/5/27.
 */
var ad = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this._clsName = "org/cocos2dx/javascript/AdInterface";
        } else {
            this._clsName = "AdInterface";
        }
    },

    preload: function preload(type) {
        cc.callNativeStaticMethod(this._clsName, preload);
    },

    preloadAll: function preloadAll() {
        cc.callNativeStaticMethod(this._clsName, preloadAll);
        cc.app.native.nv.makeToast("Please check log.")
    },

    show: function show(type) {
        cc.callNativeStaticMethod(this._clsName, show);
    },

    hide: function hide(type) {
        cc.callNativeStaticMethod(this._clsName, hide);
    },

    isAvailable: function isAvailable(type) {
        return cc.callNativeStaticMethod(this._clsName, isAvailable);
    },

    isShown: function isShown(type) {
        return cc.callNativeStaticMethod(this._clsName, isShown) == "true";
    },

    getGravity: function getGravity() {
        var gravity = cc.callNativeStaticMethod(this._clsName, getGravity);
        return parseInt(gravity);
    },

    setGravity: function setGravity(gravity) {
        cc.callNativeStaticMethod(this._clsName, setGravity);
    },

    setDelegate: function setDelegate(delegate) {
        cc.callNativeStaticMethod(this._clsName, setDelegate);
    },
});