/**
 * Created by Berwin on 2017/4/29.
 */

$class("datas", function ($export) {

    var datas = {
        setUpEnvironment: function () {
            $loadGroup("datas", (err) => {
                if (err) {
                    cc.log("loadGroup datas 错误：" + err);
                    return;
                }
                cc.log("loadGroup datas 成功.");
            });
        },
    };

    $public("datas", datas, $export);
});