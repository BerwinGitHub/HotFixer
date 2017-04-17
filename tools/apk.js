/**
 * 打包生成apk
 * Created by t_Ber on 2017/4/17.
 */
var cfgs = require("./configs");
var terminal = require("./core/terminal");

(function () {
    // 1.组合成命令 TODO cocos compile -s ./src -p android --android-studio --ap android-16 -m debug -j 4 --compile-script 1 -o ../build/outputs/apk --app-abi armeabi:x86:mips
    var cmd = "cocos compile -s " + cfgs.apk.SRC + " -p android " + cfgs.apk.IDE + " --ap " + cfgs.apk.ANDROID_VERSION + " -m " + cfgs.apk.MODE + " -j " + cfgs.apk.CPU_CORE
        + " -o " + cfgs.apk.DEST + " --app-abi " + cfgs.apk.ANDROID_SYS_FRAMWORKS + " --compile-script 1";
    console.log("apk\t<=\tGenerate Apk Start.");
    console.log("apk\t<=\tcmd:" + cmd);
    terminal.execCommand(cmd, (txt) => {
        console.log("apk\t<=\t" + txt);
    }, (data) => {
        console.log("apk\t<=\tGenerate Apk Finish.");
    });
})();
