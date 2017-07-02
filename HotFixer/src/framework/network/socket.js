/**
 * Created by Berwin on 2017/4/5.
 */

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

var socket = cc.Class.extend({

    /**
     * 网络事件
     */
    Event: {
        Open: "SocketOpen", // socket 打开
        Message: "SocketMessage",// socket 收到Message
        Error: "SocketError",// socket 报错
        Close: "SocketClose"// socket 关闭
    },

    ctor: function () {
        try {
            console.log("Socket init");
            this.host = "ws://" + host + ":" + port;
            // this.host = "ws://echo.websocket.org";
            this.socket = new WebSocket(this.host);
            this.socket.onopen = (evt) => {
                console.log("Socket onopen...");
                this.isInit = true;
                var event = new cc.EventCustom(this.Event.Open);
                event.data = evt;
                cc.eventManager.dispatchEvent(event);
            };

            this.socket.onmessage = (evt) => {
                var data = evt.data;
                console.log("Socket onmessage...");
                var event = new cc.EventCustom(this.Event.Message);
                event.data = data;
                cc.eventManager.dispatchEvent(event);
            };

            this.socket.onerror = (evt) => {
                console.log("Socket onerror...");
                var event = new cc.EventCustom(this.Event.Error);
                event.data = evt;
                cc.eventManager.dispatchEvent(event);
            };

            this.socket.onclose = (evt) => {
                console.log("Socket onclose...");
                this.isInit = false;
                var event = new cc.EventCustom(this.Event.Close);
                event.data = evt;
                cc.eventManager.dispatchEvent(event);
            };
        } catch (exception) {
            console.log("Connect Error:" + exception);
        }
    },
    send: function (data) {
        if (!this.isInit) {
            console.log("Socket is not inited...");
        } else if (this.socket.readyState == WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            console.log("Socket WebSocket readState:" + this.socket.readyState);
        }
    },
    close: function () {
        if (this.socket) {
            console.log("Socket close...");
            this.socket.close();
            this.socket = null;
        }
    },
});
