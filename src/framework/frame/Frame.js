/**
 * Created by Berwin on 2017/3/31.
 */
var Frame = cc.Layer.extend({

    ZORDER: {
        BACKGROUND: 0,
        CONTENT: 10,
        UI: 20,
        DEBUG: 1000,
    },

    /**
     * create函数
     */
    ctor: function () {
        this._super();
    },

    /**
     * 进入方法
     */
    onEnter: function () {
        this._super();
    },

    /**
     * 退出方法
     */
    onExit: function () {
        this._super();
    },

});