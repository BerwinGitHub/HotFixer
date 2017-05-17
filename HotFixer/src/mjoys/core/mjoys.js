/**
 * Created by Berwin on 2017/5/17.
 */

// $include(\$import.xxxx.xxx)

$class("mjoys", function ($export /*, {data}*/) {
    // $use(data)  use import var like this
    var mjoys = {
        color: {
            blue: cc.hexToColor("1e3058"), // 深蓝
            orange: cc.hexToColor("fc9c12"), // 橘色
            green: cc.hexToColor("438a08"), // 绿色
            red: cc.hexToColor("f84b4d"), // 淡红
            blood: cc.hexToColor("ca1524"), // 血红
        }
    };
    cc.mjoys = mjoys;
    $public("mjoys", mjoys, $export);
});