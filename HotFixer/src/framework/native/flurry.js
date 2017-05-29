/**
 * Created by Berwin on 2017/5/27.
 */
var flurry = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/FlurryInterface";
        } else {
            this._clsName = "FlurryInterface";
        }
    },

    logEvent: function (eventName, params) {

    },
});