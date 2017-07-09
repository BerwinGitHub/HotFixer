/**
 * Created by Berwin on 2017/4/5.
 */

var SOCKET_EVENT = {
    OPENE: "socket_open", // soccket 打开
    MESSAGE: "socket_message", // socket 收到Message
    ERROR: "socket_error", // socket 报错
    CLOSE: "socket_close", // socket 关闭
};

var SocketUtility = cc.Class.extend({

    _socketPipes: null,

    ctor: function () {
        this._socketPipes = {};
    },

    connect: function (host, port) {
        var key = host + "-" + port;
        var pipe = this._socketPipes[key];
        if (!pipe) {
            pipe = new SocketPipe(host, port);
            this._socketPipes[key] = pipe;
        }
        pipe.connect();
        return key;
    },

    send: function (key, data) {
        var pipe = this._socketPipes[key];
        if (pipe) {
            pipe.send(data);
        }
    },
    close: function (key) {
        var pipe = this._socketPipes[key];
        if (pipe) {
            pipe.close();
        }
    },
});
