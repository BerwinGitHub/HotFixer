/**
 * Created by Berwin on 2017/3/18.
 */

/**
 * 调试模式
 * @type {boolean}
 */
var DEBUG = false;

/**
 * 最大错误重试的次数
 * @type {number}
 */
var MAX_FAIL_COUNT = 1;

/**
 * 自动更新js和资源
 */
var HotFixScene = cc.Scene.extend({
    /**
     * 资源管理对象
     */
    _assetsManager: null,
    /**
     * 进度
     */
    _percent: 0,
    /**
     * 加载完成之后的回调
     */
    _finishCallback: null,
    /**
     * 进度条
     */
    _progress: null,

    /**
     * 当前下载尝试次数
     * @param finishCallback
     */
    _tryTimes: 0,

    runWithCallback: function (manifestFile, finishCallback) {
        this._finishCallback = finishCallback;
        // 运行当前场景
        cc.director.runScene(this);
        // 初始化U
        this._initUi();
        if (!cc.sys.isNative) {
            this.loadGame();
            return;
        }
        this._initHotFixLogic(manifestFile);
    },

    _initUi: function () {
        var layer = new cc.Layer();
        this.addChild(layer);
        this._progress = new cc.LabelTTF("update 0%", "Arial", 12);
        this._progress.x = cc.winSize.width / 2;
        this._progress.y = 10;
        this.addChild(this._progress);
    },

    _updateProgress: function () {
        this._progress.string = "update:" + this._percent + "%";
    },

    _initHotFixLogic: function (manifestFile) {
        // 存储路径
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        // 创建AssertManager对象，加载manifest清单文件
        this._assetsManager = new jsb.AssetsManager(manifestFile, storagePath);
        this._assetsManager.retain();
        if (!this._assetsManager.getLocalManifest().isLoaded()) {// 加载manifest文件失败，跳过更新
            this.loadGame();
            return;
        }
        var that = this;
        // AssertManager 更新监听
        var listener = new jsb.EventListenerAssetsManager(this._assetsManager, (event) => {
            // cc.log("event:" + JSON.stringify(event));
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:// 没有找到本地清单文件
                    cc.log("HotFix:" + "ERROR_NO_LOCAL_MANIFEST");
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.UPDATE_PROGRESSION:// 更新的进度回调
                    cc.log("HotFix:" + "UPDATE_PROGRESSION");
                    that._percent = event.getPercent();
                    that._updateProgress();
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:// 下载服务器清单文件错误
                    cc.log("HotFix:" + "ERROR_DOWNLOAD_MANIFEST");
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:// 解析清单文件错误
                    cc.log("HotFix:" + "ERROR_PARSE_MANIFEST");
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:// 已经更新
                    cc.log("HotFix:" + "ALREADY_UP_TO_DATE");
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.UPDATE_FINISHED:// 本次更新成功
                    cc.log("HotFix:" + "UPDATE_FINISHED");
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.UPDATE_FAILED:// 更新失败
                    cc.log("HotFix:" + "UPDATE_FAILED");//
                    if (++that._tryTimes < MAX_FAIL_COUNT) {// 如果小于最大失败次数，再次请求更新
                        that._assetsManager.downloadFailedAssets();
                        return;
                    }
                    that._tryTimes = 0;
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.ERROR_UPDATING:// 更新中失败
                    cc.log("HotFix:" + "ERROR_UPDATING");
                    cc.log("error: " + event.getAssetId() + ", " + event.getMessage());
                    that.loadGame();
                    break;
                case jsb.EventAssetsManager.ERROR_DECOMPRESS: // 更新成功，但是解析失败
                    cc.log("HotFix:" + "ERROR_DECOMPRESS");
                    that.loadGame();
                    break;
                default:
                    break;
            }

        });
        cc.eventManager.addListener(listener, 1);
        this._assetsManager.update();
    },

    loadGame: function () {
        //jsList是jsList.js的变量，记录全部js文件。
        // 加载包含js文件的jsList.js文件 & 包含资源文件的resource.js文件
        cc.loader.loadJs("src/jsList.js", () => {
            // 1.首先加载代码到游戏中
            cc.loader.loadJs(jsList, () => {
                // 2.等待代码加载完毕，再加载图片资源
                cc.textureCache.removeAllTextures();// 加载前先移除
                cc.loader.load(g_resources, (rlt, count, loadedCount) => {
                }, () => {
                    // 3.代码和资源都加载完毕，进入游戏
                    this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this._finishCallback)));
                });
            });
        });
    },

    onExit: function () {
        if (this._assetsManager) {
            this._assetsManager.release();
        }
        this._super();
    }

});