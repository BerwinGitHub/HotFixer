/**
 * Created by Berwin on 2017/3/31.
 */

var FDirector = {};

/**
 * 开始主游戏界面
 * @returns {GameScene}
 */
FDirector.runFrame = function (frame) {
    FDirector.runningScene = new GameScene();
    FDirector.rootFrame = FDirector.runningScene.getRootFrame();
    cc.director.runScene(FDirector.runningScene);
    FDirector.runningFrames = [];
    FDirector.replaceFrame(frame());
    return FDirector.runningScene;
};

/**
 * 替换界面
 * @param frame
 */
FDirector.replaceFrame = function (frame) {
    // 1.先加入
    FDirector.rootFrame.addChild(frame);
    FDirector.runningFrames.push(frame);
    // 2.再移除
    for (var i = 0; i < FDirector.runningFrames.length - 2; i++) {
        var frame = FDirector.runningFrames[i];
        if (frame)
            frame.removeFromParent();
    }
};

/**
 * 弹出界面
 */
FDirector.popFrame = function () {
    if (FDirector.runningFrames.length > 0) {
        // 弹出最后一个，也就是最上层
        var pop = FDirector.runningFrames.splice(FDirector.runningFrames.length - 1, 1);
        pop.removeFromParent();
    }
};

/**
 * 叠入界面
 * @param frame
 */
FDirector.pushFrame = function (frame) {
    FDirector.rootFrame.addChild(frame);
    FDirector.runningFrames.push(frame);
};

/**
 * 得到当前运行的Frame
 * @returns {*}
 */
FDirector.getRunningFrame = function () {
    return FDirector.runningFrames[FDirector.runningFrames.length - 1];
};

/**
 * 结束游戏
 */
FDirector.endGame = function () {
    cc.director.end();
};
