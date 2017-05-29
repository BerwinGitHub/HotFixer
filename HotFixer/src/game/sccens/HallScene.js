/**
 * Created by Berwin on 2017/5/28.
 */
var HallLayer = cc.Layer.extend({

    ctor: function () {
        this._super();

        var data = ccs.load(res.studio_HallScene_node_HallScene_json);
        this.addChild(data.node);

        var spr = new cc.Sprite(res.debug_info_png);
        spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(spr);
        cc.app.helper.event.addClickListener(spr, () => {
            cc.director.runScene(new HomeScene());
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    },

});


var HallScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HallLayer();
        this.addChild(layer);
    }
});