/**
 * Created by Berwin on 2017/4/1.
 */
$include($import.game.frames.HomeFrame);
$include($import.framework.game.FDirector);

$class("AppDelegate", function ($export, HomeFrame, FDirector) {

    var AppDelegate = cc.Class.extend({

        /**
         * 游戏启动
         */
        applicationDidFinishLaunching: function () {
            FDirector.runFrame(() => {
                return new HomeFrame();
            });


            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, this.applicationDidEnterBackground);
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, this.applicationWillEnterForeground);
        },

        /**
         * 游戏进入后台
         */
        applicationDidEnterBackground: function () {
            console.log("applicationDidEnterBackground");
        },

        /**
         * 游戏从后台进入
         */
        applicationWillEnterForeground: function () {
            console.log("applicationWillEnterForeground");
        },
    });

    $export.AppDelegate = AppDelegate;
});