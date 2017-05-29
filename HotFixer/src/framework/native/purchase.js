/**
 * Created by Berwin on 2017/5/27.
 */
var purchase = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/PurchaseInterface";
        } else if (cc.sys.os == cc.sys.IOS) {
            this._clsName = "PurchaseInterface";
        }
    },

    purchase: function (sku) {
        cc.app.native.languageInterface(this._clsName, "purchase", {sku: sku});
    },

    purchaseUnmanaged: function (sku) {
        cc.app.native.languageInterface(this._clsName, "purchaseUnmanaged", {sku: sku});
    },

    restore: function () {
        cc.app.native.languageInterface(this._clsName, "restore");
    },
});