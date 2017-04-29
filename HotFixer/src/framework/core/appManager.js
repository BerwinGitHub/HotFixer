/**
 * Created by Berwin on 2017/4/25.
 */

$include($import.framework.game.Console);
$include($import.framework.helper.helper);

$class("appManager", function ($export, {Console, helper}) {
    /**
     *
     */
    var appManager = {
        // insert code here
        init: function () {
            this.helper = $use(helper);
            this.console = $use(Console);
        },
    };
    appManager.init();
    cc.am = appManager;
    // $export.app = app;
    $public("appManager", appManager, $export);
});