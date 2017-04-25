/**
 * Created by Berwin on 2017/4/5.
 */

$class("SocketHelper", function ($export) {

    var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

    var SocketHelper = {

        /**
         * 网络事件
         */
        Event: {
            Open: "SocketOpen", // socket 打开
            Message: "SocketMessage",// socket 收到Message
            Error: "SocketError",// socket 报错
            Close: "SocketClose"// socket 关闭
        },

        /**
         * 单例类对象
         */
        instance: null,

        /**
         * 得到Instance对象
         * @returns {null}
         */
        getInstance: function () {
            if (this.instance == null) {
                this.instance = this.getSocketInstance();
            }
            return this.instance;
        },

        getSocketInstance: function () {
            var socketInstance = {
                socket: null,
                isInit: false,
                /**
                 * 初始化
                 * @param host
                 * @param port
                 */
                setUpEnvironment: function (host, port) {
                    try {
                        cc.log("Socket init");
                        this.host = "ws://" + host + ":" + port;
                        // this.host = "ws://echo.websocket.org";
                        this.socket = new WebSocket(this.host);
                        this.socket.onopen = (evt) => {
                            cc.log("Socket onopen...");
                            this.isInit = true;
                            var event = new cc.EventCustom(SocketHelper.Event.Open);
                            event.data = evt;
                            cc.eventManager.dispatchEvent(event);
                        };

                        this.socket.onmessage = (evt) => {
                            var data = evt.data;
                            cc.log("Socket onmessage...");
                            var event = new cc.EventCustom(SocketHelper.Event.Message);
                            event.data = data;
                            cc.eventManager.dispatchEvent(event);
                        };

                        this.socket.onerror = (evt) => {
                            cc.log("Socket onerror...");
                            var event = new cc.EventCustom(SocketHelper.Event.Error);
                            event.data = evt;
                            cc.eventManager.dispatchEvent(event);
                        };

                        this.socket.onclose = (evt) => {
                            cc.log("Socket onclose...");
                            this.isInit = false;
                            var event = new cc.EventCustom(SocketHelper.Event.Close);
                            event.data = evt;
                            cc.eventManager.dispatchEvent(event);
                        };
                    } catch (exception) {
                        console.log("Connect Error:" + exception);
                    }
                },
                send: function (data) {
                    if (!this.isInit) {
                        cc.log("Socket is not inited...");
                    } else if (this.socket.readyState == WebSocket.OPEN) {
                        this.socket.send(data);
                    } else {
                        cc.log("Socket WebSocket readState:" + this.socket.readyState);
                    }
                },
                close: function () {
                    if (this.socket) {
                        cc.log("Socket close...");
                        this.socket.close();
                        this.socket = null;
                    }
                },
            };
            return socketInstance;
        }

    };

    $export.SocketHelper = SocketHelper;
});