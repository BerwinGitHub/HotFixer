/**
 * Created by Berwin on 2017/3/18.
 *
 * #1.helper.ui
 * #2.helper.action
 * #3.helper.audio
 * #4.helper.math
 * #5.helper.broadcast
 * #6.helper.http
 * #7.helper.socket
 *
 */
// $include($import.xxxx.xxx)

$class("helper", function($export){

    var helper = {};

    /**
     * ui 相关助理方法
     */
    helper.ui = {
        /**
         * 根据名字找到节点(没有意义的方法，只是改个名字)
         * @param parent
         * @param name
         */
        getWidgetByName: function (parent, name) {
            return ccui.helper.seekWidgetByName(parent, name);
        },

        /**
         * 得到Cocosstudio里面的数据
         * @param node
         * @returns {*|String}
         */
        getWidgetUserData: function (node) {
            var customProperty = node.getComponent("ComExtensionData");
            return customProperty.getCustomProperty();
        },

        /**
         *
         * @param jsonFile
         * @returns {*}
         */
        loadCCS: function (jsonFile) {
            return ccs.load(jsonFile).node;
        },
    };


    /**
     * 动画相关助理方法
     */
    helper.action = {
        /**
         * 播放studio导出来的动画
         * @param json 动画文件
         * @param parent 父类节点
         * @param pos 位置
         * @param loop 是否循环播放
         */
        playCCSA: function (json, parent, pos, loop = false) {
            var data = ccs.load(json);
            data.node.setPosition(pos);
            parent.addChild(data.node);
            parent.runAction(data.action);
            data.action.gotoFrameAndPlay(0, data.action.getDuration(), 0, loop);
            return helper.animation;
        },
    };

    helper.event = {

        /**
         * 添加点击事件
         * @param node
         * @param callback
         */
        addClickListener: function (node, callback) {
            var listener = new cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: (t, e) => {
                    var target = e.getCurrentTarget();
                    var realPos = target.getParent().convertToNodeSpace(t.getLocation());
                    if (cc.rectContainsPoint(target.getBoundingBox(), realPos)) {
                        return true;
                    }
                    return false;
                },
                onTouchEnded: (t, e) => {
                    var target = e.getCurrentTarget();
                    var realPos = target.getParent().convertToNodeSpace(t.getLocation());
                    if (cc.rectContainsPoint(target.getBoundingBox(), realPos)) {
                        callback(target);
                    }
                }
            });
            cc.eventManager.addListener(listener, node);
        },
    };

    /**
     * audio 相关助理方法
     */
    helper.audio = {
        /**
         * 延迟播放声音
         * @param dt 延迟时间
         * @param file 声音文件
         */
        playEffectWithDelay: function (dt, file) {
            var n = new cc.Node();
            cc.director.getRunningScene().addChild(n);
            n.runAction(cc.sequence(cc.delayTime(dt), cc.callFunc(() => {
                cc.audioEngine.playEffect(file);
            }), cc.removeSelf()));
        },
    };

    /**
     * 数学计算相关助理方法
     */
    helper.math = {
        /**
         * 生成一个随机数{Number}(min < {Number} < max)
         * @param min 最小值
         * @param max 最大值
         * @returns {Number} 生成的数
         */
        randomInt: function (min, max) {
            var ex = max - min;
            var num = Math.random() * ex + min;
            return parseInt(num, 10);
        },
    };

    /**
     * 广播
     * @type {{}}
     */
    helper.broadcast = {
        _broadCache: [],
        /*
         [
         "eventName": [callback1, callback2],
         ]
         */

        /**
         * 注册用户
         * @param eventName eventName
         * @param callback 回调方法
         */
        register: function (eventName, callback) {
            var cache = this._broadCache[eventName];
            if (!cache) {
                cache = [];
                this._broadCache[eventName] = cache;
            }
            cache.push(callback);
        },

        /**
         * 广播消息
         * @param eventName 关键字
         * @param data 传递数据
         */
        post: function (eventName, data) {
            var cache = this._broadCache[eventName];
            if (cache) {
                cache.forEach((callback) => {
                    callback({eventName: eventName, data: data});
                });
            }
        },

        /**
         * 移除消息，当有callback的时候，移除指定的eventName && callback；只有eventName时会移除所有eventName的callback
         * @param eventName 关键字
         * @param callback 回调方法
         */
        unRegister: function (eventName, callback = null) {
            var cache = this._broadCache[eventName];
            if (!callback && cache) {
                cache.splice(0, cache.length);
            } else if (cache) {
                cache.forEach((item, idx) => {
                    if (item == callback) {
                        cache.splice(idx, 1);
                    }
                });
            }
        },

    };

    /**
     * http 請求相關
     */
    helper.http = {};

    /**
     * socket 强联网
     */
    helper.socket = {};

    /**
     * VisibleRect
     * @type {{offsetX: number, offsetY: number, LAYOUT: {NONE: number, LEFT: number, RIGHT: number, TOP: number, BOTTOM: number}, setupVisibleRect: helper.ve.setupVisibleRect, setPosition: helper.ve.setPosition, getPosition: helper.ve.getPosition}}
     */
    helper.ve = {
        offsetX: 0, // x的偏移量
        offsetY: 0, // y的偏移量

        LAYOUT: {
            NONE: 0,    // 没有布局
            LEFT: 1,    // 靠左对齐
            RIGHT: 2,   // 靠右对齐
            TOP: 3,     // 靠上对齐
            BOTTOM: 4,  // 靠下对齐
        },

        /**
         * 设置适配模式
         * @param width
         * @param height
         */
        setupVisibleRect: function (width, height) {
            var ds = cc.size(width, height);
            // var glView = cc.director.getOpenGLView();
            var frameSize = cc.view.getFrameSize();
            var sx = frameSize.width / ds.width;
            var sy = frameSize.height / ds.height;
            var ms = Math.min(sx, sy);

            var rds = cc.size(frameSize.width / ms, frameSize.height / ms);
            this.offsetX = (rds.width - ds.width) * 0.5;
            this.offsetY = (rds.height - ds.height) * 0.5;
            cc.view.setDesignResolutionSize(rds.width, rds.height, cc.ResolutionPolicy.NO_BORDER);
        },

        /**
         * 设置位置
         * @param node
         * @param x
         * @param y
         * @param borderX
         * @param borderY
         */
        setPosition: function (node, x, y, borderX = this.LAYOUT.NONE, borderY = this.LAYOUT.NONE) {
            var vSize = cc.director.getVisibleSize();
            var nSize = node.getContentSize();
            var anchor = node.getAnchorPoint();

            if (borderX == this.LAYOUT.NONE) {
                x = this.offsetX + x;
            } else if (borderX == this.LAYOUT.LEFT) {
                x = x + nSize.width * anchor.x;
            } else if (borderX == this.LAYOUT.RIGHT) {
                x = vSize.width - x - nSize.width * (1 - anchor.x);
            }

            if (borderY == this.LAYOUT.NONE) {
                y = this.offsetY + y;
            } else if (borderY == this.LAYOUT.BOTTOM) {
                y = y + nSize.height * anchor.y;
            } else if (borderY == this.LAYOUT.TOP) {
                y = vSize.height - y - nSize.height * (1 - anchor.y);
            }
            node.setPosition(x, y);
        },

        /**
         * 得到适配模式的位置
         * @param node
         * @param x
         * @param y
         * @param borderX
         * @param borderY
         * @returns {cc.Point|{x, y}}
         */
        getPosition: function (node, x, y, borderX = this.LAYOUT.NONE, borderY = this.LAYOUT.NONE) {
            var posX = x + this.offsetX;
            var posY = y + this.offsetY;

            if (borderX == this.LAYOUT.LEFT) {
                posX = this.offsetX - posX;
            } else if (borderX == this.LAYOUT.RIGHT) {
                posX = this.offsetX + posX;
            }
            if (borderY == this.LAYOUT.TOP) {
                posY = this.offsetY + posY;
            } else if (borderY == this.LAYOUT.BOTTOM) {
                posY = this.offsetY - posY;
            }
            return cc.p(posX, posY);
        },
    };
    // $export.helper = helper;
    $public("helper", helper, $export);
});