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
        game.setConsoleFrame(consoleFrame);
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