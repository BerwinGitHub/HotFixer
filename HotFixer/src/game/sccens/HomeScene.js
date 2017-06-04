/**
 * Created by Berwin on 2017/5/28.
 */
var HomeLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.bg = new cc.LayerColor(cc.mjoys.color.background);
        this.bg.setContentSize(cc.visibleSize);
        this.addChild(this.bg);

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
        cc.app.dialogmgr.dialogconsole.showWithCreate();

        //
        var dot = this._createDot();
        dot.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(dot);
    },

    _createDot: function () {
        var circleBg = new cc.Sprite("res/images/content/circle_bg.png");

        var circle = new cc.Sprite("res/images/content/circle_t" + cc.app.core.randomInt(0, 6) + ".png");
        circleBg.addChildToCenter(circle);


        var seq = cc.sequence(cc.delayTime(5.0), cc.callFunc(() => {
            var texture = cc.textureCache.addImage("res/images/content/circle_t" + cc.app.core.randomInt(0, 6) + ".png");
            circle.setTexture(texture);
        }));
        circle.runAction(seq.repeatForever());

        return circleBg;
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
        // cc.app.events.emit("abc", {test: "test", id: 1});
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
