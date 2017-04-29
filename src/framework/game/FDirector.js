/**
 * Created by Berwin on 2017/3/31.
 */
$include($import.framework.frame.Frame);
$include($import.framework.game.GameScene);

$class("FDirector", function ($export, {Frame, GameScene}) {

    var FDirector = {

        /**
         * 开始主游戏界面
         * @returns {GameScene}
         */
        runFrame: function (frame) {
            var s = $use(GameScene);
            this.runningScene = new s();
            this.rootFrame = this.runningScene.getRootFrame();
            cc.director.runScene(this.runningScene);
            this.runningFrames = [];
            this.replaceFrame(frame());
            return this.runningScene;
        },

        /**
         * 替换界面
         * @param frame
         */
        replaceFrame: function (frame) {
            // 1.先加入
            this.rootFrame.addChild(frame);
            this.runningFrames.push(frame);
            // 2.再移除
            while (this.runningFrames.length > 1) {
                var f = this.runningFrames.splice(0, 1)[0];
                if (f)
                    f.removeFromParent();
            }
        },

        /**
         * 弹出界面
         */
        popFrame: function () {
            if (this.runningFrames.length > 0) {
                // 弹出最后一个，也就是最上层
                var pop = this.runningFrames.splice(this.runningFrames.length - 1, 1);
                pop.removeFromParent();
            }
        },

        /**
         * 叠入界面
         * @param frame
         */
        pushFrame: function (frame) {
            this.rootFrame.addChild(frame);
            this.runningFrames.push(frame);
        },

        /**
         * 得到当前运行的Frame
         * @returns {*}
         */
        getRunningFrame: function () {
            return this.runningFrames[this.runningFrames.length - 1];
        },

        /**
         * 结束游戏
         */
        endGame: function () {
            cc.director.end();
        },

    };

    // $export.FDirector = FDirector
    $public("FDirector", FDirector, $export);
});
