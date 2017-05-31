/**
 * Created by Berwin on 2017/5/28.
 */
var configs = cc.Class.extend({

    ctor: function () {
        // 当前是否是调试模式
        this.debug = true;
        // 隐私政策网址
        this.appleId = "9938172021";
        // 隐私政策网址
        this.privacyUrl = "https://baidu.com";
        // this.privacyUrl = "https://metrojoys.wixsite.com/home/privacy";
        // 广告Admob相关ID
        this.admob = {
            app_id: "ca-app-pub-7242779887458735~5489457609",
            banner_unit_id: "ca-app-pub-7242779887458735/6966190802",
            interstitial_unit_id: "ca-app-pub-7242779887458735/8442924009",
            rewardedvideo_unit_id: "ca-app-pub-7242779887458735/9919657209",
            native_unit_id: "ca-app-pub-7242779887458735/3873123607",
            testDevices: [
                "360bba314fc22465aabcef6274555c2719866d29",
                "e0923bbd23d41521fde1db204b5ce35d3597172b"
            ]
        };
        // facebook相关的ID信息
        this.facebook = {
            app_id: "i892idu283bu52hn"
        };
        // flurry分析统计
        this.flurry = {
            api_key: "1238990102321"
        };
        // 内购的相关信息
        this.purchase = {
            skus: ["com.mjoys.circle.removeAds", "com.mjoys.circle.buyCoins"]
        };

        // 将数据发送给本地代码
        var clsName = cc.sys.os == cc.sys.OS_ANDROID ? "org/cocos2dx/javascript/ConfigManager" : "ConfigManager";
        cc.callNativeStaticMethod(clsName, "setUpConfigsByJaveScript", this);
    },
});