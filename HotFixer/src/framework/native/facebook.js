/**
 * Created by Berwin on 2017/5/27.
 */
var facebook = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/FacebookInterface";
        } else if (cc.sys.os == cc.sys.IOS) {
            this._clsName = "FacebookInterface";
        }
    },
});