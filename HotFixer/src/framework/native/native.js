/**
 * Created by Berwin on 2017/5/27.
 */
var native = cc.Class.extend({

    _callbackCache: null,

    ctor: function () {
        this.ad = new ad();
        this.facebook = new facebook();
        this.flurry = new flurry();
        this.nv = new nv();
        this.purchase = new purchase();
        this._callbackCache = [];
    },


});