/**
 * Created by Berwin on 2017/4/16.
 */
$include($import.framework.frame.Frame);

$class("ConsoleFrame", function ($export, {Frame}) {

    var ConsoleFrame = $use(Frame).extend({

        cmdHistory: null,
        historyIdx: 0,
        fontSize: 20, // log的fontSize
        lineHeight: 0, // 先算出以上面的字号

        ctor: function () {
            this._super();
            // for debug
            this.node = ccs.load(res.studio_debug_debug_json).node;
            this.addChild(this.node);

            // var arrayRootChildren = this.node.getChildren();
            // var length = arrayRootChildren.length;
            // for (var i = 0; i < length; i++) {
            //     cc.log("===>:" + arrayRootChildren[i].getName());
            //     if(arrayRootChildren[i].getName() === "nodeConsole"){
            //         this.consoleView = arrayRootChildren[i];
            //     }
            // }
            //
            this.scrollView = ccui.helper.seekNodeByName(this.node, "scrollView");
            this.consoleView = ccui.helper.seekNodeByName(this.node, "nodeConsole");
            this.scrollView.setVisible(false);
            this.consoleView.setVisible(false);

            // btn
            var btn = ccui.helper.seekNodeByName(this.node, "btnDebug");
            // btn.setLocalZOrder(this.ZORDER.DEBUG);
            btn.addClickEventListener(() => {
                this.scrollView.setVisible(!this.scrollView.isVisible());
            });
            // dot
            this.dot = ccui.helper.seekNodeByName(this.node, "dot");
            this.dot.setVisible(false);

            // console
            var btnConsole = ccui.helper.seekNodeByName(this.node, "btnConsole");
            btnConsole.addClickEventListener(() => {
                this.dot.setVisible(false);
                this.consoleView.setVisible(true);
            });

            // close
            var btnClose = ccui.helper.seekNodeByName(this.node, "btnClose");
            btnClose.addClickEventListener(() => {
                this.consoleView.setVisible(false);
            });

            // textField
            this.cmdHistory = ["cc.winSize"];
            this.textField = ccui.helper.seekNodeByName(this.node, "textField");
            this.textField.setString(this.cmdHistory[this.cmdHistory.length - 1]);
            this.btnExe = ccui.helper.seekNodeByName(this.node, "btnExe");
            this.btnExe.addClickEventListener(() => {
                // 下标在最后一个 才表示是新输入的那么记录
                if (this.historyIdx == this.cmdHistory.length - 1 || this.cmdHistory.length == 0) {
                    this.cmdHistory.push(this.textField.getString());
                    this.historyIdx = this.cmdHistory.length - 1;
                }
                var result = "";
                try {
                    result = eval(this.textField.getString());
                    var i = JSON.stringify(result);
                    cc.app.log.i("js eval", typeof(i) == "undefined" ? result : i);
                } catch (e) {
                    cc.app.log.e("js eval", e);
                }
                this.dot.setVisible(false);
            });
            // pre
            this.btnPre = ccui.helper.seekNodeByName(this.node, "btnPre");
            this.btnPre.addClickEventListener(() => {
                if (this.historyIdx - 1 >= 0) {
                    this.textField.setString(this.cmdHistory[--this.historyIdx]);
                } else {
                    this.textField.setString(this.cmdHistory[this.historyIdx]);
                }
            });
            // btnInputCls
            this.btnInputCls = ccui.helper.seekNodeByName(this.node, "btnInputCls");
            this.btnInputCls.addClickEventListener(() => {
                this.textField.setString("");
                // 在中间清除的时候，下边到最后一个
                this.historyIdx = this.cmdHistory.length - 1;
            });
            // next
            this.btnNext = ccui.helper.seekNodeByName(this.node, "btnNext");
            this.btnNext.addClickEventListener(() => {
                if (this.historyIdx + 1 < this.cmdHistory.length) {
                    this.textField.setString(this.cmdHistory[++this.historyIdx]);
                } else {
                    this.textField.setString(this.cmdHistory[this.historyIdx]);
                }
            });
            // cls
            this.btnCls = ccui.helper.seekNodeByName(this.node, "btnClear");
            this.btnCls.addClickEventListener(() => {
                cc.app.log.clear();
                this.list.removeAllItems();
                this.textField.setString("");
                this.dot.setVisible(false);
            });
            // reload
            this.btnReload = ccui.helper.seekNodeByName(this.node, "btnReload");
            this.btnReload.addClickEventListener(() => {
                cc.game.restart();
            });
            // log
            this.list = ccui.helper.seekNodeByName(this.node, "listView");
        },

        addLog: function (item) {
            this.dot.setVisible(!this.scrollView.isVisible());
            var str = item.time + "\t\t" + item.tag + "\t\t" + item.msg;
            var txt = new cc.LabelTTF(str, null, 20, cc.size(this.list.width, 0));
            txt.setAnchorPoint(cc.p(0, 0));
            txt.setLineHeight(txt.getLineHeight() * 1);
            txt.color = item.color;
            var pan = new ccui.Layout();
            pan.addChild(txt);
            pan.setContentSize(cc.size(txt.width, txt.height));
            this.list.pushBackCustomItem(pan);
            this.list.jumpToBottom();// scrollToPercentVertical
        },

        onEnter: function () {
            this._super();
            this.listener = cc.app.broadcast.on(cc.app.log.BROAD_CAST_LOG, this.addLog, this);
        },

        onExit: function () {
            // this.item.release();
            this._super();
            cc.app.broadcast.off(this.listener);
        },
    });

    // $export.ConsoleFrame = ConsoleFrame;
    $public("ConsoleFrame", ConsoleFrame, $export);
});
