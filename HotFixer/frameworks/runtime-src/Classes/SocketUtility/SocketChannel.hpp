//
//  SocketChannel.hpp
//  HotFixer
//
//  Created by 唐博文 on 2017/7/2.
//
//

#ifndef SocketChannel_hpp
#define SocketChannel_hpp

#include <stdio.h>
#include "ODSocket/ODSocket.h"

#define CODE_CONNECT_SUCCESS        "1"     // 网络连接成功
#define CODE_CONNECT_FAILED         "-1"    // 链接失败
#define CODE_CONNECT_CLOSED         "0"     // 链接关闭
#define DATA_BUFFER_LENGTH          1024    // 接收数据的buffer缓冲区大小

typedef std::function<void(const std::string &keychannel, const std::string &data)> SocketCallback;

class SocketChannel {
    
public:
    SocketChannel();
    virtual ~SocketChannel();
    
private:
    int _port;                  // 端口号
    const char *_ip;            // IP地址
    ODSocket _socket;           // socket
    std::string _keyChannel;    // 当socket信道
    SocketCallback _callback;   // 所有回调
    
    std::vector<std::string>    _receiveDataQueue;  // 收到消息对列
    bool                        _receiveQueueing;   // 收到队列的分发状态
    std::vector<const char*>    _sendDataQueue;     // 收到消息对列
    bool                        _sendQueueing;      // 收到队列的分发状态
    
public:
    /**
     * 链接到指定的地址和端口
     * @param ip    需要链接的ip地址
     * @param port  需要链接的端口地址
     * @return key  返回当前ip + port的key值(因为登录和游戏的port不一样，做多通道处理)
     */
    void connect(const char *ip, int port);
    
    /**
     * 发送消息
     * @param   data        发送的内容
     */
    void sendData(const char* data);
    
    /**
     * 关闭socket通道
     */
    void close();
    
    /**
     * 设置通道消息的回到方法
     * @param callback          收到消息的回调方法
     */
    void setCallback(const SocketCallback& callback);
    
private:
    // 异步线程链接, 接收消息
    void threadConnect();
    
    // 插入收到的消息到队列，准备向Js/Lua发送
    void insertDataToReceiveQueueWaitForHandle(const char *data);
    
    // 转发队列中的消息到Js/Lua
    void handleReceiveData();
    
    // 插入收到的发送消息到发送队列，准备向服务器发送
    void insertDataToSendQueueWaitForHandle(const char *data);
    
    // 向服务器发送队列中的消息
    void handleSendData();
    
};

#endif /* SocketChannel_hpp */
