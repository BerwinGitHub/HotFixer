/**
 * Created by Berwin on 2017/4/18.
 */

var HallFrame = Frame.extend({

    ctor: function () {
        this._super();
        var bg = new cc.LayerColor(cc.color(0, 0, 0));
        bg.setContentSize(cc.director.getVisibleSize());
        this.addChild(bg);

        var spr = new cc.Sprite(res.debug_info_png);
        spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(spr);
        helper.event.addClickListener(spr, () => {
            FDirector.replaceFrame(new HomeFrame());
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {

    },

});
