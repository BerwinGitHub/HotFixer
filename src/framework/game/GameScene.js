/**
 * Created by Berwin on 2017/3/31.
 */

var RootFrame = Frame.extend({

    ctor: function () {
        this._super();

        this._initLayers();
    },

    _initLayers: function () {
        if (cc.game.config.debugMode != 0) {
            this._initDebugConsole();
        }
    },

    _initDebugConsole: function () {
        var consoleFrame = new ConsoleFrame();
        consoleFrame.setLocalZOrder(this.ZORDER.DEBUG);
        this.addChild(consoleFrame);
        consoleFrame.setVisible(false);
        game.setConsoleFrame(consoleFrame);
        // btn
        var btn = new ccui.Button(res.debug_debug_png, res.debug_debug_png);
        btn.setLocalZOrder(this.ZORDER.DEBUG);
        helper.ve.setPosition(btn, 16, 320, helper.ve.LAYOUT.RIGHT);
        this.addChild(btn);
        btn.addClickEventListener(() => {
            game.consoleFrame.setVisible(!game.consoleFrame.isVisible());
        });
    },
});

var GameScene = cc.Scene.extend({

    ctor: function () {
        this._super();
        this.rootFrame = new RootFrame();
        this.addChild(this.rootFrame);
    },

    /**
     *
     * @returns {RootFrame}
     */
    getRootFrame: function () {
        return this.rootFrame;
    },

    /**
     * onEnter 方法
     */
    onEnter: function () {
        this._super();
    }
});