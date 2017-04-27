/**
 * Created by Berwin on 2017/4/25.
 */

$include($import.framework.game.Console);
$include($import.framework.helper.helper);

$class("app", function ($export, {Console, helper}) {
    /**
     *
     */
    var app = {
        // insert code here
        init: function () {
            this.helper = helper;
            this.console = Console;
        },
    };
    app.init();
    cc.app = app;
    $export.app = app;
});