/**
 * Created by Berwin on 2017/5/28.
 */
var configs = cc.Class.extend({

    ctor: function () {
        // 当前是否是调试模式
        this.debug = true;
        // 广告Admob相关ID
        this.admob = {
            app_id: "ca-app-pub-7242779887458735~5489457609",
            banner_unit_id: "ca-app-pub-7242779887458735/8442924009",
            interstitial_unit_id: "ca-app-pub-7242779887458735/9919657209",
            rewardedvideo_unit_id: "ca-app-pub-7242779887458735/9919657209",
            native_unit_id: "ca-app-pub-7242779887458735/3873123607"
        };
        // facebook相关的ID信息
        this.facebook = {
            app_id: "i892idu283bu52hn"
        };
        // 内购的相关信息
        this.skus = {
            removeAds: "com.mjoys.circle.removeAds",
            buyCoins: "com.mjoys.circle.buyCoins"
        };
        // 隐私政策网址
        this.privacyUrl = "https://baidu.com";
        // this.privacyUrl = "https://metrojoys.wixsite.com/home/privacy";
    },
});