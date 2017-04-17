/**
 * 打包生成apk
 * Created by t_Ber on 2017/4/17.
 */
var cfgs = require("./configs");
var iconv = require("iconv-lite");
var exec = require('child_process').exec;

(function () {
    // 1.组合成命令 TODO cocos compile -s ./src -p android --android-studio --ap android-16 -m debug -j 4 --compile-script 1 -o ../build/outputs/apk --app-abi armeabi:x86:mips
    var cmd = "cocos compile -s " + cfgs.apk.SRC + " -p android " + cfgs.apk.IDE + " --ap " + cfgs.apk.ANDROID_VERSION + " -m " + cfgs.apk.MODE + " -j " + cfgs.apk.CPU_CORE
        + " -o " + cfgs.apk.DEST + " --app-abi " + cfgs.apk.ANDROID_SYS_FRAMWORKS + " --compile-script 1";
    console.log(cmd);
    var last = exec(cmd, {
        encoding: "binary"
    });
    console.log("apk\t<=\tGenerate Apk Start.");
    last.stdout.on('data', function (stdout) {
        var txt = iconv.decode(new Buffer(stdout, 'binary'), "cp936");
        console.log("apk\t<=\t" + txt.replace(/\r|\n/ig, ""));
    });

    last.on('exit', function (data) {
        console.log("apk\t<=\tGenerate Apk Finish.");
    });
})();
