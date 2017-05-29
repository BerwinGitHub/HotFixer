/**
 * Created by Berwin on 2017/4/25.
 */
var app = cc.Class.extend({

    ctor: function () {
        this.proto = new proto();
        this.prototype = new prototype();
        this.configs = new configs();
        this.datas = new datas();
        this.native = new native();
        this.log = new log();
        this.events = new events();
        this.math = new math();
        this.helper = new helper();
        this.visiblerect = new visiblerect();
        this.dialogmgr = new dialogmgr();
    },
});