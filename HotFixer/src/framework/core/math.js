/**
 * Created by Berwin on 2017/5/28.
 */
var math = cc.Class.extend({

    ctor: function () {
    },
    /**
     * 生成一个随机数{Number}(min <= {Number} < max)
     * @param n 最小值
     * @param m 最大值
     * @returns {Number} 生成的数
     */
    randomInt: function (n, m) {
        var ex = m - n;
        var num = Math.random() * ex + n;
        return parseInt(num, 10);
    },

    /**
     * 打乱数组
     */
    random_shuffle: function (arr) {
        arr.sort(() => {
            return 0.5 - Math.random();
        });
    },

    s2p: function (s) {
        return cc.p(s.width, s.height);
    },

    p2s: function (p) {
        return cc.size(p.x, p.y);
    },
});