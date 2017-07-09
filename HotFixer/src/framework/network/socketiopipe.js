/**
 * Created by Berwin on 2017/7/8.
 */

var SocketIO = SocketIO || io;

/**
 * 一个Socket通道
 * @type {Function}
 */
var SocketIoPipe = cc.Class.extend({

    _host: null,
    _port: null,
    _socket: null,

    ctor: function (host, port) {
        this._host = host;
        this._port = port;
    },

    connect: function () {
        // SocketIO
        this._socket = SocketIO.connect("http://" + this._host + ":" + this._port + "/");
        this._socket.tag = this.getSocketPipeKey();
        this._socket.on("connect", function () {
            console.log("connect");
        });
        this._socket.on("message", function (data) {
            console.log("message:" + data);
        });
        this._socket.on("error", function () {
            console.log("error:");
        });
    },

    send: function (data) {
        if (this._socket) {
            this._socket.send(data);
        }
    },
    emit: function (eventName, data) {
        if (this._socket) {
            // this._socket.emit("eventName", "{\"message\":\"Hello Server.\"}");
            this._socket.emit(eventName, data);
        }
    },

    close: function () {
        if (this._socket) {
            console.log("[WebSocket]-Close");
            this._socket.close();
            this._socket = null;
        }
    },

    _broadcastReciveData: function (eventName, data) {
        var event = new cc.EventCustom(eventName);
        event.data = data;
        cc.eventManager.dispatchEvent(event);
    },

    getSocketPipeKey: function () {
        return this._host + "-" + this._port;
    },

});