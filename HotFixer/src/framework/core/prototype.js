/**
 * Created by Berwin on 2017/5/1.
 */

var prototype = cc.Class.extend({
    ctor: function () {
        // 给cc添加一个visibleSize
        cc.visibleSize = cc.director.getVisibleSize();
    },

});

/**
 * 得到node的中点位置
 */
cc.Node.prototype.getCenter = function () {
    return cc.p(this.width / 2, this.height / 2);
};

/**
 * 添加子节点到中点
 * @param child
 */
cc.Node.prototype.addChildToCenter = function (child) {
    child.setPosition(this.width / 2, this.height / 2);
    this.addChild(child);
};