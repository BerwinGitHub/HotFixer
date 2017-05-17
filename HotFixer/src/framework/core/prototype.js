/**
 * Created by Berwin on 2017/5/1.
 */

$class("prototype", function ($export) {

    var prototype = {
        setUpEnvironment: function () {
            // 给cc添加一个visibleSize
            cc.visibleSize = cc.director.getVisibleSize();
        },
    };

    $public("prototype", prototype, $export);
});
