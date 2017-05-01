/**
 * Created by Berwin on 2017/4/25.
 */

$include($import.framework.core.helper);
$include($import.framework.core.datas);
$include($import.framework.core.native);
$include($import.framework.core.log);
$include($import.framework.core.broadcast);
$include($import.framework.core.prototype);
$include($import.framework.core.proto);

$class("app", function ($export, {helper, datas, native, log, broadcast, prototype, proto}) {
    /**
     *
     */
    var app = {
        // insert code here
        setUpEnvironment: function () {
            this.log = $use(log);
            this.helper = $use(helper);
            this.datas = $use(datas);
            this.native = $use(native);
            this.broadcast = $use(broadcast);
            this.proto = $use(proto);

            //
            $use(prototype).setUpEnvironment();
            this.log.setUpEnvironment();
            this.datas.setUpEnvironment();
            this.native.setUpEnvironment();
            this.broadcast.setUpEnvironment();
            this.proto.setUpEnvironment();
        },
    };
    cc.app = app;
    // $export.app = app;
    $public("app", app, $export);
});