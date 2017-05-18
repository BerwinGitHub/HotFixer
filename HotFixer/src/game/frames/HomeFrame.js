/**
 * Created by Berwin on 2017/4/1.
 */
$include($import.framework.frame.Frame);
$include($import.game.frames.HallFrame);
$include($import.framework.game.FDirector);
$include($import.mjoys.dialog.DialogOptions);

$class("HomeFrame", function ($export, {Frame, HallFrame, FDirector, DialogOptions}) {

    var HomeFrame = $use(Frame).extend({

        ctor: function () {
            this._super();
            var bg = new cc.LayerColor();
            bg.color = cc.mjoys.color.blue;
            bg.setContentSize(cc.visibleSize);
            this.addChild(bg);


            // SocketHelper.getInstance().setUpEnvironment("127.0.0.1", "8867");
            // var data = ccs.load(res.studio_HomeScene_node_HomeScene_json);
            // this.addChild(data.node);
            //
            // var btn = cc.app.helper.ui.findNodeByName(data.node, "Button_1");
            // btn.addClickEventListener(this.onHallClick);
            //
            // this.nodeAmt = cc.app.helper.ui.findNodeByName(data.node, "amtNode");
            // this.nodeAmt.action.play("ani", true);
            //
            var spr = new cc.Sprite(res.debug_info_png);
            spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 100);
            this.addChild(spr);
            cc.app.helper.event.addClickListener(spr, () => {
                // $use(FDirector).replaceFrame(new ($use(HallFrame))());
                // var ABC = $use(DialogOptions);
                var diaOption = new ($use(DialogOptions))();
                this.addChild(diaOption);
                diaOption.showSelf();
            });
        },

        onHallClick: function (data) {
            var buffer = cc.app.proto.encode("Login", {name: "tangbowen", passwd: "password"});
            cc.app.log.i("Tag", "Buffer:" + buffer);
            var msg = cc.app.proto.decode(buffer);
            console.log(msg);
            cc.app.log.i("Tag", "msg:" + JSON.stringify(msg));
        },

        testProto: function () {
            var buffer = cc.app.proto.encode("Login", {name: "tangbowen", passwd: "password"});
            cc.app.log.i("proto", "Buffer:" + buffer);
            var msg = cc.app.proto.decode(buffer);
            console.log(msg);
            cc.app.log.i("proto", "msg:" + JSON.stringify(msg));
        },

        onEnter: function () {
            this._super();
        },

        onExit: function () {
            this._super();
        },

    });

    // $export.HomeFrame = HomeFrame;
    $public("HomeFrame", HomeFrame, $export);
});