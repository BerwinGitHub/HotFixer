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
    std::vector<std::string>    _dataQueue; // 消息对列
    bool                        _queueing;  // 队列的分发状态
    
public:
    void connect(const char *ip, int port);
    
    void sendData(const char *buf, int len);
    
    void close();
    
    void setCallback(const SocketCallback& callback);
    
private:
    void threadConnect(); // 异步线程链接
    
    void insertDataToQueueWaitForHandle(const char *data);
    
    void handleData();
    
};

#endif /* SocketChannel_hpp */
