/**
 * Created by Berwin on 2017/4/21.
 */
var meta = require("./packageMeta");
var pkg = require("./package");
var pm = require("./packageManager");

(function () {
    var $require = meta.$require;
    var $import = meta.$import;
    var $pm = pm;
    pm.requireCls($require.testA.TestA);
})();
