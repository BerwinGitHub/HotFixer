/**
 * Created by Berwin on 2017/4/1.
 */
$include($import.framework.frame.Frame);
$include($import.game.frames.HallFrame);
$include($import.framework.game.FDirector);

$class("HomeFrame", function ($export, {Frame, HallFrame, FDirector}) {

    var HomeFrame = $use(Frame).extend({

        ctor: function () {
            this._super();
            // SocketHelper.getInstance().setUpEnvironment("127.0.0.1", "8867");
            var data = ccs.load(res.studio_HomeScene_node_HomeScene_json);
            this.addChild(data.node);

            var btn = cc.app.helper.ui.getWidgetByName(data.node, "Button_1");
            btn.addClickEventListener(this.onHallClick);

            var spr = new cc.Sprite(res.debug_info_png);
            spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.addChild(spr);
            cc.app.helper.event.addClickListener(spr, () => {
                $use(FDirector).replaceFrame(new ($use(HallFrame))());
            });
        },

        onHallClick: function (data) {
            cc.app.log.e("tag", cc.app.helper.ui.getWidgetUserData(data));
        },

        testProto: function () {
            var buffer = ProtoHelper.encode("Login", {name: "tangbowen", passwd: "password"});
            game.log("Tag", "Buffer:" + buffer);
            var msg = ProtoHelper.decode(buffer);
            console.log(msg);
            game.log("Tag", "msg:" + JSON.stringify(msg));
        },


    });

    // $export.HomeFrame = HomeFrame;
    $public("HomeFrame", HomeFrame, $export);
});