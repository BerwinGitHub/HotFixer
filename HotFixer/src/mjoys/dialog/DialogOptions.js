/**
 * Created by Berwin on 2017/5/18.
 */

$include($import.mjoys.dialog.DialogBase)

$class("DialogOptions", function ($export, {DialogBase}) {
    // $use(data)  use import var like this
    var DialogOptions = $use(DialogBase).extend({

        _bg: null,
        _shadow: null,

        ctor: function () {
            this._super();

            this._bg = new cc.LayerColor();
            this._bg.color = cc.mjoys.color.blue;
            this._bg.setOpacity(248);
            this._bg.ignoreAnchorPointForPosition(false);
            this._bg.setContentSize(this._visibleSize.width, this._visibleSize.height * 0.95);
            this._bg.setAnchorPoint(0.5, 1);
            this._bg.setPosition(this._visibleSize.width / 2, 0);
            this.addChild(this._bg);

            this._shadow = new cc.Sprite(res.studio_common_imgs_shadow_png);
            this._shadow.setPosition(this._visibleSize.width / 2, this._bg.getContentSize().height);
            this._shadow.setAnchorPoint(0.5, 0);
            this._bg.addChild(this._shadow);

            // 添加一个按钮
            var btnBg = new cc.Sprite(res.studio_common_imgs_btn_bg_png);
            btnBg.setPosition(this._visibleSize.width / 2, 150);
            btnBg.color = cc.mjoys.color.orange;
            this._bg.addChild(btnBg);

            var txt = new ccui.Text("Rate 3 Cars", res.studio_common_fonts_JosefinSans_Light_ttf, 40);
            txt.setPosition(btnBg.width / 2, btnBg.height / 2);
            btnBg.addChild(txt);


            var close = new cc.Sprite(res.studio_common_imgs_btn_close_png);
            close.color = cc.mjoys.color.orange;
            close.setPosition(this._visibleSize.width / 2, 50);
            this._bg.addChild(close);
            cc.app.helper.event.addClickListener(close, () => {
                cc.audioEngine.playEffect(res.mjoys_audio_Tick_mp3);
                this.hideSelf();
            });

        },

        showSelf: function () {
            this.setTouchEnabled(true);
            var move = cc.sequence(cc.moveBy(.65, 0, this._bg.getContentSize().height));
            this._bg.runAction(move.easing(cc.easeElasticOut(3.0)));
        },

        hideSelf: function () {
            this.setTouchEnabled(false);
            this._bg.runAction(cc.sequence(cc.moveBy(.3, 0, -this._bg.getContentSize().height), cc.callFunc(() => {
                this.removeFromParent();
            })));
        },

        onEnter: function () {
            this._super();
        },

        onExit: function () {
            this._super();

        },

    });

    $public("DialogOptions", DialogOptions, $export);
});
