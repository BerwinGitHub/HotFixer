/**
 * Created by Berwin on 2017/5/28.
 */
var HomeLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        var bg = new cc.LayerColor();
        bg.color = cc.mjoys.color.background;
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
        var title = new ccui.Text("3 Cars", res.studio_com_fonts_JosefinSans_Light_ttf, 120);
        title.setPosition(cc.winSize.width / 2, cc.winSize.height - 180);
        title.color = cc.mjoys.color.subject;
        this.addChild(title);

        cc.spriteFrameCache.addSpriteFrames(res.studio_com_imgs_ui_plist, res.studio_com_imgs_ui_png);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("studio/com/imgs/ui/btn_options.png");
        var spr = new cc.Sprite(spriteFrame);
        spr.setPosition(cc.winSize.width / 2, 50);
        this.addChild(spr);
        cc.app.helper.event.addClickListener(spr, () => {
            cc.audioEngine.playEffect(res.mjoys_audio_Tick_mp3);
        });
        cc.app.dialogmgr.dialogconsole.showWithCreate();

        new eventnode(this, "abc", (data) => {
            console.log("节点收到广播数据:" + data);
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
        cc.app.events.emit("abc", {test: "test", id: 1});
    },

    onExit: function () {
        this._super();
    },

});

var HomeScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HomeLayer();
        this.addChild(layer);
    }
});
