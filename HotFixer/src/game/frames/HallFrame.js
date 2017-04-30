/**
 * Created by Berwin on 2017/4/18.
 */
$include($import.framework.frame.Frame);
$include($import.framework.game.FDirector);
$include($import.game.frames.HomeFrame);

$class("HallFrame", function ($export, {Frame, FDirector, HomeFrame}) {

    var HallFrame = $use(Frame).extend({

        ctor: function () {
            this._super();

            var data = ccs.load(res.studio_HallScene_node_HallScene_json);
            this.addChild(data.node);

            var spr = new cc.Sprite(res.debug_info_png);
            spr.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.addChild(spr);
            cc.app.helper.event.addClickListener(spr, () => {
                $use(FDirector).replaceFrame(new ($use(HomeFrame))());
            });
        },

        onEnter: function () {
            this._super();

        },

        onExit: function () {

        },

    });

    // $export.HallFrame = HallFrame;
    $public("HallFrame", HallFrame, $export);
});
