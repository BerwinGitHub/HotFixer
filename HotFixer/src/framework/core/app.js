/**
 * Created by Berwin on 2017/4/25.
 */

$include($import.framework.game.Console);
$include($import.framework.helper.helper);
$include($import.framework.core.datas);

$class("app", function ($export, {Console, helper, datas}) {
    /**
     *
     */
    var app = {
        // insert code here
        setUpEnvironment: function () {
            this.helper = $use(helper);
            this.console = $use(Console);
            this.datas = $use(datas);

            //
            this.datas.setUpEnvironment();
        },
    };
    cc.app = app;
    // $export.app = app;
    $public("app", app, $export);
});