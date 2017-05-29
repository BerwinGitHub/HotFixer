/**
 * Created by Berwin on 2017/5/1.
 */
var proto = cc.Class.extend({

    roots: null,

    ctor: function () {
        // register loader *.proto
        this.roots = [];
        var loader = {
            load: (realUrl, url, res, cb) => {
                if (/*cc.sys.isNative &&*/ !this.isFristLoad) {
                    this.isFristLoad = true;
                    protobuf.util.fetch = fetch;
                }
                cc.loader.loadTxt(url, (err, source) => {
                    if (err) {
                        cc.log("loadTxt err:" + err + "\turl:" + url);
                        return;
                    }
                    // 1.先将这个放入到缓存中
                    delete cc.loader.cache[url];
                    cc.loader.cache[url] = source;
                    // 2.再加载
                    protobuf.load(url, (err, root) => {
                        if (err) {
                            cb(err, null);
                            return;
                        }
                        this.roots.push(root);
                        cb(err, root);
                    });
                });
            }
        };

        /**
         * 将其指定给protobuf.util.fetch方法，将加载文件的方法改成coocos的
         * @param filename
         * @param cb
         */
        var fetch = function (filename, cb) {
            var data = cc.loader.cache[filename];
            if (!data) {
                cc.loader.loadTxt(filename, (err, source) => {
                    if (err) {
                        cc.log("loadTxt err:" + err + "\turl:" + url);
                        cb(err, source);
                        return;
                    }
                    cb(err, source);
                });
            } else {
                cb(null, data);
            }
        };
        cc.loader.register(["proto"], loader);
    },
    /**
     * 转换到DataTransferProto Buffer用于网络传输
     * @param messageName
     * @param payload
     * @returns {*}
     */
    encode: function (messageName, payload, errorCode = 0) {
        // 1.先创建目标对象proto
        var buffer = this._toBuffer(messageName, payload);
        // 2.创建dtp对象
        var dtpPayload = {
            messageName: messageName,
            errorCode: errorCode,
            data: buffer
        };
        var dtpBuffer = this._toBuffer("DataTransferProto", dtpPayload);
        return dtpBuffer;
    },

    /**
     * 将网络上的数据 转成对应的Message
     * @param messageName
     * @param buffer
     * @returns {*}
     */
    decode: function (buffer) {
        var data = this._toMessage("DataTransferProto", buffer);
        var msg = this._toMessage(data.messageName, data.data);
        return msg;
    },

    /**
     * 得到MessageType的枚举类
     * @returns {*}
     */
    getEnum: function (enumName) {
        for (var i = 0; i < this.roots.length; i++) {
            var findEnum = null;
            try {
                findEnum = this.roots[i].lookupTypeOrEnum(enumName);
                return findEnum.values; // 如果不throw err就表明找到了，并返回
            } catch (e) {
            }
        }
        cc.log("Not find proto Enum:" + name);
        return null;
    },

    /**
     * 将Message转成Buffer
     * @param messageName
     * @param payload
     * @returns {*}
     * @private
     */
    _toBuffer: function (messageName, payload) {
        var Msg = this._getMessage(messageName);
        var errMsg = Msg.message.verify(payload);
        if (errMsg) {
            console.log("Message:(" + messageName + ") verify payload err:" + errMsg);
            return null;
        }
        var message = Msg.message.create(payload);
        var buffer = Msg.message.encode(message).finish();
        return buffer;
    },

    /**
     * 将buffer转成Message对象
     * @param messageName
     * @param buffer
     * @returns {*|{}|number|String|T|Message.<{}>}
     * @private
     */
    _toMessage: function (messageName, buffer) {
        var Msg = this._getMessage(messageName);
        var msg = Msg.message.decode(buffer);
        return msg;
    },

    /**
     * 在缓存中找到Message
     * @param name
     * @returns {*}
     * @private
     */
    _getMessage: function (name) {
        for (var i = 0; i < this.roots.length; i++) {
            var msg = null;
            try {
                msg = this.roots[i].lookupType(name);
                return {root: this.roots[i], message: msg}; // 如果不throw err就表明找到了，并返回
            } catch (e) {
            }
        }
        cc.log("Not find proto message:" + name + "\tlenght:" + this.roots.length);
        return null;
    },

});