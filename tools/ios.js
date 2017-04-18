/**
 * 打包生成apk
 * Created by t_Ber on 2017/4/17.
 */
var cfgs = require("./configs");
var terminal = require("./core/terminal");

(function () {
    // 1.组合成命令 TODO cocos compile -s ./src -p ios -m debug -j 4 --compile-script 1 -o ../build/outputs/ios -t HotFixer-mobile --sign-identity
    var c = cfgs.ios;
    var cmd = "cocos compile -s " + c.SRC + " -p ios -m " + c.MODE + " -j " + c.CPU_CORE + " --compile-script 1 " +
        "-o " + c.DEST + " -t " + c.TARGET;//+ " --sign-identity " + c.SIGN;
    console.log("IOS <= Generate Apk Start.");
    console.log("IOS <= cmd:" + cmd);
    terminal.execCommand(cmd, (txt) => {
        console.log("IOS <= " + txt);
    }, (data) => {
        console.log("IOS <= Generate iOS Finish.");
    });
})();
