/**
 * Created by Berwin on 2017/4/16.
 */

var ConsoleFrame = Frame.extend({

    ctor: function () {
        this._super();
        // for debug
        this.node = ccs.load(res.debug_debug_json).node;
        this.addChild(this.node);

        this.textField = ccui.helper.seekWidgetByName(this.node, "textField");
        this.btnExe = ccui.helper.seekWidgetByName(this.node, "btnExe");
        this.btnReload = ccui.helper.seekWidgetByName(this.node, "btnReload");
        this.btnExe.addClickEventListener(() => {
            var result = eval(this.textField.getString());
            game.log("JavaScript Eval", JSON.stringify(result), cc.color.GREEN);
        });
        // reload
        this.btnReload.addClickEventListener(() => {
            //load resources
            var hotFixScene = new HotFixScene();
            // cc.sys.cleanScript("src/framework/hotfix/HotFixScene.js");
            hotFixScene.runWithCallback("res/project.manifest", () => {
                var appDelegate = new AppDelegate();
                appDelegate.applicationDidFinishLaunching();
            });
        });
        // log
        this.list = ccui.helper.seekWidgetByName(this.node, "listView");
        this.item = ccui.helper.seekWidgetByName(this.list, "item");
        // this.item.setVisible(false);
    },

    addLog: function (item) {
        var cloneWidget = this.item.clone();
        cloneWidget.setVisible(true);
        var tagLbl = ccui.helper.seekWidgetByName(cloneWidget, "tag");
        var txtLbl = ccui.helper.seekWidgetByName(cloneWidget, "text");
        tagLbl.string = item.tag;
        txtLbl.string = item.text;
        tagLbl.setTextColor(item.color);
        txtLbl.setTextColor(item.color);
        this.list.pushBackCustomItem(cloneWidget);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },
});