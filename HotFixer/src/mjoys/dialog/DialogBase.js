/**
 * Created by Berwin on 2017/5/18.
 */

// $include(\$import.xxxx.xxx)

$class("DialogBase", function ($export /*, {data}*/) {

    var DialogBase = cc.Node.extend({

        _visibleSize: null,

        ctor: function () {
            this._super();
            this._visibleSize = cc.director.getVisibleSize();

        },

        showSelf: function () {

        },

        hideSelf: function () {

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