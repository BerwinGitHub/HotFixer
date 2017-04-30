/**
 * Created by Berwin on 2017/4/30.
 */

$class("broadcast", function ($export) {

    var broadcast = {
        setUpEnvironment: function () {
        },

        /**
         * 注册事件
         * @param eventName
         * @param callback
         * @param that
         * @returns {cc.EventListener} 注册的listener，可用于移除
         */
        on: function (eventName, callback, that) {
            var listener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: eventName,
                callback: (event) => {
                    callback.apply(that, [event.getUserData()]);
                }
            });
            cc.eventManager.addListener(listener, 1);
            return listener;
        },

        /**
         * 移除事件
         * @param listener
         */
        off: function (listener) {
            cc.eventManager.removeListener(listener);
        },

        /**
         * 开始广播
         * @param eventName
         */
        emit: function (eventName, data = null) {
            var event = new cc.EventCustom(eventName);
            event.setUserData(data);
            cc.eventManager.dispatchEvent(event);
        },
    };

    $public("broadcast", broadcast, $export);
});
