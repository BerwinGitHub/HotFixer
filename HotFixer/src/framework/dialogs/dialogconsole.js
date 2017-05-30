/**
 * Created by Berwin on 2017/5/28.
 */

var dialogconsole = Dialog.extend({

    cmdHistory: null,
    fontSize: 20, // log的fontSize
    lineHeight: 0, // 先算出以上面的字号

    ctor: function () {
        // this._super(res.studio_debug_test_json);
        this._super(res.studio_debug_node_debug_json);
        // return;
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

        // historyView
        this.historyView = ccui.helper.seekNodeByName(this.node, "history_view");
        this.historyView.setVisible(false);
        var root = ccui.helper.seekNodeByName(this.historyView, "root");
        root.addTouchEventListener(() => {
            this.historyView.setVisible(false);
        });

        // historyList
        this.historyList = ccui.helper.seekNodeByName(this.node, "lv_history");

        // btnHistory
        this.btnHistory = ccui.helper.seekNodeByName(this.node, "btnHistory");
        this.btnHistory.addClickEventListener(() => {
            this.historyView.setVisible(true);
        });

        // textField
        this.cmdHistory = ["cc.winSize", "cc.visibleSize", "cc.app.configs", "cc.director.getRunningScene()"];
        this.cmdHistory.forEach((cmd) => {
            this._addHistoryToListView(cmd);
        });
        this.textField = ccui.helper.seekNodeByName(this.node, "textField");
        this.textField.setString(this.cmdHistory[this.cmdHistory.length - 1]);
        this.btnExe = ccui.helper.seekNodeByName(this.node, "btnExe");
        this.btnExe.addClickEventListener(() => {
            // 下标在最后一个 才表示是新输入的那么记录
            var txt = this.textField.getString();
            this._checkHistoryRepeat(txt);
            this.cmdHistory.push(txt);
            this._addHistoryToListView(txt);
            try {
                var result = eval(this.textField.getString());
                var i = JSON.stringify(result);
                cc.app.log.i("eval", typeof(i) == "undefined" ? result : i);
            } catch (e) {
                cc.app.log.e("eval", e);
            }
            this.dot.setVisible(false);
        });
        // btnInputCls
        this.btnInputCls = ccui.helper.seekNodeByName(this.node, "btnInputCls");
        this.btnInputCls.addClickEventListener(() => {
            this.textField.setString("");
            // 在中间清除的时候，下边到最后一个
            this.historyIdx = this.cmdHistory.length - 1;
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

        // 添加监听
        cc.app.events.on(this, cc.app.log.BROAD_CAST_LOG, this.addLog);

        // event
        this._regiserEvent("btnPrivacy", () => {
            cc.app.native.nv.showPrivacyWithURL("http://www.baidu.com");
        });

        this._regiserEvent("btnAlertDialog", () => {
            cc.app.native.nv.showAlertDialog("Test", "This is test message", "OK", "Cancel", (data) => {
                cc.app.log.i(JSON.stringify(data));
            });
        });

        this._regiserEvent("btnShareSystem", () => {
            cc.app.native.nv.systemShare("Share Title", "Share Content.", "");
        });
    },

    addLog: function (item) {
        this.dot.setVisible(!this.scrollView.isVisible());
        var str = item.time + "\t\t" + item.tag + "\t\t" + item.msg;
        var txt = new cc.LabelTTF(str, null, 20, cc.size(this.list.width, 0));
        txt.setAnchorPoint(cc.p(0, 0));
        // txt.setLineHeight(txt.getLineHeight() * 1);
        txt.color = item.color;
        var pan = new ccui.Layout();
        pan.addChild(txt);
        pan.setContentSize(cc.size(txt.width, txt.height));
        this.list.pushBackCustomItem(pan);
        this.list.jumpToBottom();// scrollToPercentVertical
    },

    _checkHistoryRepeat: function (txt) {
        for (var i = 0; i < this.cmdHistory.length; i++) {
            var item = this.cmdHistory[i];
            if (item === txt) {
                this.cmdHistory.splice(i, 1);
                this.historyList.removeItem(this.historyList.getItems().length - i - 1);
                return;
            }
        }
    },

    _addHistoryToListView: function (txt) {
        var txt = new cc.LabelTTF(txt, null, 25, cc.size(this.historyList.width, 0));
        txt.setName("txt");
        txt.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        txt.setVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        txt.setAnchorPoint(cc.p(0, 0));
        var pan = new ccui.Layout();
        pan.addChild(txt);
        pan.setContentSize(cc.size(txt.width, txt.height + 10));
        pan.setTouchEnabled(true);
        pan.addClickEventListener(() => {
            var txt = pan.getChildByName("txt").getString();
            this.textField.setString(txt);
            this.historyView.setVisible(false);
        });
        this.historyList.insertCustomItem(pan, 0);
        this.historyList.jumpToTop();
    },

    _regiserEvent: function (name, callback) {
        var btn = ccui.helper.seekNodeByName(this.node, name);
        btn.addClickEventListener(callback);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        // this.item.release();
        this._super();
    },


});