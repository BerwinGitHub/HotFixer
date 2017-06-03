/**
 * Created by Berwin on 2017/4/25.
 */
var app = cc.Class.extend({

    ctor: function () {
        this.core = new core();
        this.log = new log();
        this.prototype = new prototype();
        this.configs = new configs();
        this.datas = new datas();
        this.native = new native();
        this.events = new events();
        this.helper = new helper();
        this.visiblerect = new visiblerect();
        this.dialogmgr = new dialogmgr();
        this.proto = new proto();
    },
});