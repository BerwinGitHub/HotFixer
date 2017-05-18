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

            this.setContentSize(this._visibleSize);

            this._bg = new cc.LayerColor();
            this._bg.color = cc.mjoys.color.blue;
            this._bg.ignoreAnchorPointForPosition(false);
            this._bg.setContentSize(this._visibleSize.width, this._visibleSize.height - 50);
            this._bg.setAnchorPoint(0.5, 1);
            this._bg.setPosition(this._visibleSize.width / 2, 0);
            this.addChild(this._bg);

            this._shadow = new cc.Sprite(res.studio_common_imgs_shadow_png);
            this._shadow.setPosition(this._visibleSize.width / 2, this._bg.getContentSize().height);
            this._shadow.setAnchorPoint(0.5, 0);
            this._bg.addChild(this._shadow);

            var close = new cc.Sprite(res.studio_common_imgs_btn_close_png);
            close = cc.mjoys.color.orange;
            close.setPosition(this._visibleSize.width / 2, 50);
            this._bg.addChild(close);
            cc.app.helper.event.addClickListener(close, () => {
                this.hideSelf();
            });

        },

        showSelf: function () {
            this._bg.runAction(cc.sequence(cc.moveBy(.3, 0, this._bg.getContentSize().height)));
        },

        hideSelf: function () {
            this._bg.runAction(cc.sequence(cc.moveBy(.3, 0, -this._bg.getContentSize().height)));
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
