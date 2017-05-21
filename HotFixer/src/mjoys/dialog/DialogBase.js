/**
 * Created by Berwin on 2017/5/18.
 */

// $include(\$import.xxxx.xxx)

$class("DialogBase", function ($export /*, {data}*/) {

    var DialogBase = cc.Node.extend({

        _visibleSize: null,

        _touchMask: null,

        ctor: function () {
            this._super();
            this._visibleSize = cc.director.getVisibleSize();
            this.setContentSize(this._visibleSize);

            this._touchMask = new ccui.Layout();
            this._touchMask.setTouchEnabled(false);
            this._touchMask.setContentSize(this._visibleSize);
            this.addChild(this._touchMask);

        },

        showSelf: function () {

        },

        hideSelf: function () {

        },

        setTouchEnabled: function (e) {
            this._touchMask.setTouchEnabled(e);
        },

        onEnter: function () {
            this._super();

        },

        onExit: function () {
            this._super();

        },
    });
    $public("DialogBase", DialogBase, $export);
});