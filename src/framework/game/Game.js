/**
 * Created by Berwin on 2017/4/1.
 */

var game = {
    logs: null,
    consoleFrame: null,

    setConsoleFrame: function (frame) {
        this.consoleFrame = frame;
    },
    /**
     * 打出log
     * @param msg
     */
    log: function (tag, msg, color = cc.color.GREEN) {
        var item = {color: color, text: msg, tag: tag};
        this.logs = this.logs || [];
        this.logs.push(item);
        if (this.consoleFrame)
            this.consoleFrame.addLog(item);
    },

    /**
     * 移除所有log
     */
    logClear: function () {
        this.logs.splice(0, this.logs.length);
    },

    makeToast: function (content, dt = 3) {
        var width = content.replace(/[^\x00-\xff]/g, "01").length * 8;
        width += 50;
        var height = 50;
        var lbl = new cc.LabelTTF(content, "Arial", 20);
        lbl.setPosition(cc.p(width * 0.5, 10));
        var bg = new cc.LayerColor(cc.color(0, 0, 0, 180));
        bg.setContentSize(width, height);
        bg.setPosition(cc.p(cc.winSize.width * 0.5, 50));
        bg.addChild(lbl);
        bg.setLocalZOrder(99999);
        FDirector.rootFrame.addChild(bg);
        bg.runAction(cc.sequence(cc.delayTime(dt), cc.removeSelf()));
    },
};