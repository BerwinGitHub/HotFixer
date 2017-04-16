/**
 * Created by Berwin on 2017/4/1.
 */

var HomeFrame = Frame.extend({

    ctor: function () {
        this._super();
        // SocketHelper.getInstance().setUpEnvironment("127.0.0.1", "8867");

        var bg = new cc.LayerColor(cc.color(255, 0, 0));
        bg.setContentSize(cc.director.getVisibleSize());
        this.addChild(bg);

        var spr = new cc.Sprite(res.debug_info_png);
        spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(spr);
        helper.event.addClickListener(spr, () => {
            this.testProto();
        });
        game.log("TAG", "Enter HomeScene.",  cc.color.RED);
    },

    testProto: function () {
        var buffer = ProtoHelper.encode("Login", {name: "tangbowen", passwd: "password"});
        console.log("Buffer:" + buffer);
        var msg = ProtoHelper.decode(buffer);
        console.log(msg);
        game.makeToast("");
    },


});