/**
 * Created by Berwin on 2017/7/8.
 */

var GameView = cc.View.extend({

    ctor: function () {
        this._super();

        var data = ccs.load(res.studio_HallScene_node_HallScene_json);
        this.addChild(data.node);

        var spr = new cc.Sprite("res/HelloWorld.png");
        spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(spr);
        cc.app.helper.event.addClickListener(spr, () => {
            cc.app.viewmgr.replaceView(new HomeView());
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});