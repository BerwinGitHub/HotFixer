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

    preloadAll: function () {
        cc.app.native.languageInterface(this._clsName, "preloadAll");
    },

    show: function (type) {
        cc.app.native.languageInterface(this._clsName, "show", {type: type});
    },

    hide: function (type) {
        cc.app.native.languageInterface(this._clsName, "hide", {type: type});
    },

    isAvailable: function (type) {
        return cc.app.native.languageInterface(this._clsName, "isAvailable", {type: type}) == "true";
    },

    isShown: function (type) {
        return cc.app.native.languageInterface(this._clsName, "isShown", {type: type}) == "true";
    },

    getGravity: function () {
        var gravity = cc.app.native.languageInterface(this._clsName, "getGravity");
        return parseInt(gravity);
    },

    setGravity: function (gravity) {
        cc.app.native.languageInterface(this._clsName, "setGravity", {gravity: gravity});
    },
});