/**
 * Created by Berwin on 2017/5/27.
 */
var purchase = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.ANDROID) {
            this._clsName = "org/cocos2dx/javascript/PurchaseInterface";
        } else {
            this._clsName = "PurchaseInterface";
        }
    },

    purchase: function (sku) {
        cc.callNativeStaticMethod(this._clsName, "purchase", {sku: sku});
    },

    purchaseUnmanaged: function (sku) {
        cc.callNativeStaticMethod(this._clsName, "purchaseUnmanaged", {sku: sku});
    },

    restore: function () {
        cc.callNativeStaticMethod(this._clsName, "restore");
    },
});