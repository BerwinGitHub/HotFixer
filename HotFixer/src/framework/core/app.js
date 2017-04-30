/**
 * Created by Berwin on 2017/4/25.
 */

$include($import.framework.core.helper);
$include($import.framework.core.datas);
$include($import.framework.core.native);
$include($import.framework.core.log);
$include($import.framework.core.broadcast);
$include($import.framework.core.prototype);

$class("app", function ($export, {helper, datas, native, log, broadcast, prototype}) {
    /**
     *
     */
    var app = {
        // insert code here
        setUpEnvironment: function () {
            this.helper = $use(helper);
            this.datas = $use(datas);
            this.native = $use(native);
            this.log = $use(log);
            this.broadcast = $use(broadcast);
            this.prototype = $use(prototype);

            //
            this.datas.setUpEnvironment();
            this.native.setUpEnvironment();
            this.log.setUpEnvironment();
            this.broadcast.setUpEnvironment();
            this.prototype.setUpEnvironment();
        },
    };
    cc.app = app;
    // $export.app = app;
    $public("app", app, $export);
});