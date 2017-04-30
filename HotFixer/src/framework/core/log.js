/**
 * Created by Berwin on 2017/4/30.
 */

$class("log", function ($export) {

    var log = {
        BROAD_CAST_LOG: "log_broadcast",
        HEX_COLOR: {
            "assert": "FF6B68",
            "debug": "BBBBBB",
            "error": "FF6B68",
            "info": "BBBBBB",
            "warn": "BBBBBB",
            "verbose": "BBBBBB"
        },

        logCache: null,

        setUpEnvironment: function () {
            this.logCache = [];
            this.v = this.verbose;
            this.i = this.info;
            this.a = this.assert;
            this.d = this.debug;
            this.e = this.error;
        },

        clear: function () {
            // 清空数组
            this.logCache.splice(0, this.logCache.length);
        },

        /**
         * 信息级别
         * @param tag
         * @param msg
         */
        info: function (tag, msg) {
            var d = new Date();
            var time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.info)};
            this._insertLog(log);
        },

        /**
         * 调试级别
         * @param tag
         * @param msg
         */
        debug: function (tag, msg) {
            var d = new Date();
            var time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.debug)};
            this._insertLog(log);
        },

        /**
         * 警告级别
         * @param tag
         * @param msg
         */
        warn: function (tag, msg) {
            var d = new Date();
            var time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.warn)};
            this._insertLog(log);
        },

        /**
         * 错误级别
         * @param tag
         * @param msg
         */
        error: function (tag, msg) {
            var d = new Date();
            var time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.error)};
            this._insertLog(log);
        },

        /**
         * 详细信息级别
         * @param tag
         * @param msg
         */
        verbose: function (tag, msg) {
            var d = new Date();
            var time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.verbose)};
            this._insertLog(log);
        },

        /**
         * 断言级别
         * @param tag
         * @param msg
         */
        assert: function (tag, msg) {
            var d = new Date();
            var time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.assert)};
            this._insertLog(log);
        },

        _insertLog: function (log) {
            this.logCache.push(log);
            cc.app.broadcast.emit(this.BROAD_CAST_LOG, log);
        },

    };

    $public("log", log, $export);
});