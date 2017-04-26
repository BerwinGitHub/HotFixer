/**
 * Created by Berwin on 2017/4/16.
 */
$include($import.framework.frame.Frame);

$class("ConsoleFrame", function ($export, Frame) {

    var ConsoleFrame = Frame.extend({

        cmdHistory: null,
        historyIdx: 0,

        ctor: function () {
            this._super();
            // for debug
            this.node = ccs.load(res.debug_debug_json).node;
            this.node.setVisible(false);
            this.addChild(this.node);
            // btn
            var btn = new ccui.Button(res.debug_debug_png, res.debug_debug_png);
            btn.setLocalZOrder(this.ZORDER.DEBUG);
            cc.app.helper.ve.setPosition(btn, 16, 16, cc.app.helper.ve.LAYOUT.RIGHT, cc.app.helper.ve.LAYOUT.TOP);
            this.addChild(btn);
            btn.addClickEventListener(() => {
                this.dot.setVisible(false);
                this.node.setVisible(!this.node.isVisible());
            });
            // dot
            this.dot = new cc.Sprite(res.debug_dot_png);
            this.dot.setPosition(cc.p(10, btn.getContentSize().height - 10));
            this.dot.setVisible(false);
            btn.addChild(this.dot);

            // textField
            this.cmdHistory = ["cc.winSize"];
            this.textField = ccui.helper.seekWidgetByName(this.node, "textField");
            this.textField.setString(this.cmdHistory[this.cmdHistory.length - 1]);
            this.btnExe = ccui.helper.seekWidgetByName(this.node, "btnExe");
            this.btnExe.addClickEventListener(() => {
                // 下标在最后一个 才表示是新输入的那么记录
                if (this.historyIdx == this.cmdHistory.length - 1 || this.cmdHistory.length == 0) {
                    this.cmdHistory.push(this.textField.getString());
                    this.historyIdx = this.cmdHistory.length - 1;
                }
                var result = JSON.stringify(eval(this.textField.getString()));
                result = (result == "" ? this.textField.getString() : result);
                game.log("JavaScript Eval", result, cc.color.GREEN);
                this.dot.setVisible(false);
            });
            // pre
            this.btnPre = ccui.helper.seekWidgetByName(this.node, "btnPre");
            this.btnPre.addClickEventListener(() => {
                if (this.historyIdx - 1 >= 0) {
                    this.textField.setString(this.cmdHistory[--this.historyIdx]);
                } else {
                    this.textField.setString(this.cmdHistory[this.historyIdx]);
                }
            });
            // btnInputCls
            this.btnInputCls = ccui.helper.seekWidgetByName(this.node, "btnInputCls");
            this.btnInputCls.addClickEventListener(() => {
                this.textField.setString("");
                // 在中间清除的时候，下边到最后一个
                this.historyIdx = this.cmdHistory.length - 1;
            });
            // next
            this.btnNext = ccui.helper.seekWidgetByName(this.node, "btnNext");
            this.btnNext.addClickEventListener(() => {
                if (this.historyIdx + 1 < this.cmdHistory.length) {
                    this.textField.setString(this.cmdHistory[++this.historyIdx]);
                } else {
                    this.textField.setString(this.cmdHistory[this.historyIdx]);
                }
            });
            // cls
            this.btnCls = ccui.helper.seekWidgetByName(this.node, "btnCls");
            this.btnCls.addClickEventListener(() => {
                game.logClear();
                // this.cmdHistory.splice(0, this.cmdHistory.length);
                // this.historyIdx = 0;
                this.list.removeAllItems();
                this.textField.setString("");
                var item = {tag: "Tag", text: "Text", color: cc.color.GREEN};
                this.addLog(item);
                this.dot.setVisible(false);
            });
            // reload
            this.btnReload = ccui.helper.seekWidgetByName(this.node, "btnReload");
            this.btnReload.addClickEventListener(() => {
                cc.game.restart();
            });
            // log
            this.list = ccui.helper.seekWidgetByName(this.node, "listView");
            this.item = ccui.helper.seekWidgetByName(this.list, "item");
            this.item.retain();
            // this.item.setVisible(false);
        },

        addLog: function (item) {
            this.dot.setVisible(true);
            var cloneWidget = this.item.clone();
            cloneWidget.setVisible(true);
            var tagLbl = ccui.helper.seekWidgetByName(cloneWidget, "tag");
            var txtLbl = ccui.helper.seekWidgetByName(cloneWidget, "text");
            tagLbl.string = item.tag;
            txtLbl.string = item.text;
            tagLbl.setTextColor(item.color);
            txtLbl.setTextColor(item.color);
            this.list.pushBackCustomItem(cloneWidget);
            this.list.jumpToBottom();// scrollToPercentVertical
        },

        onEnter: function () {
            this._super();
        },

        onExit: function () {
            this.item.release();
            this._super();
        },
    });

    $export.ConsoleFrame = ConsoleFrame;
});
