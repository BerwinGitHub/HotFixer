//
//  SocketChannel.cpp
//  HotFixer
//
//  Created by 唐博文 on 2017/7/2.
//
//

#include "SocketChannel.hpp"
#include "cocos2d.h"
#include <string.h>

SocketChannel::SocketChannel():
_port(0),
_socket(0),
_keyChannel(""),
_ip(nullptr),
_queueing(false),
_callback(nullptr)
{
    
}

SocketChannel::~SocketChannel()
{
    this->close();
}

void SocketChannel::connect(const char *ip, int port)
{
    std::stringstream ss;
    ss << ip << '-' << port;
    ss >> _keyChannel;
    
    _ip = ip;
    _port = port;
    _socket.Init();
    _socket.Create(AF_INET, SOCK_STREAM, 0);
    std::thread socketThread = std::thread(&SocketChannel::threadConnect, this);
    // 在子线程中做链接网络的操作
    socketThread.detach();// 从线程中剥离 出来
}

void SocketChannel::threadConnect()
{
    CCLOG("SocketUtility - Prepare connect. IP Address:%s  Port:%d", _ip, _port);
    bool res = _socket.Connect(_ip, _port);
    _socket.Send("connect", 7);
    
    if (res) {
        CCLOG("SocketUtility - Connect Successfully.");
        insertDataToQueueWaitForHandle("1");
        // 因为是强联网,所以可以一直检测服务端是否有数据传来
        while (true) {
            // 接收数据 Recv
            char data[512] = "";
            int result = _socket.Recv(data, 512, 0);
//            CCLOG("SocketUtility - Receive data is:%s", data);
//            CCLOG("SocketUtility - Receive result is:%d", result);
            insertDataToQueueWaitForHandle(data);
            // 与服务器的连接断开了
            if (result <= 0) break;
        }
        // 关闭连接
        this->close();
        CCLOG("SocketUtility - Close socket.");
    } else {
        insertDataToQueueWaitForHandle("-1");
        CCLOG("SocketUtility - Connect Failed.");
    }
}

void SocketChannel::sendData(const char *buf, int len)
{
    _socket.Send(buf, len);
}

void SocketChannel::close()
{
    _socket.Close();
    insertDataToQueueWaitForHandle("0");
}

void SocketChannel::insertDataToQueueWaitForHandle(const char *data)
{
    std::string tmpStr(data);
    _dataQueue.push_back(tmpStr);
    this->handleData();
}

void SocketChannel::handleData()
{
    if(_queueing)
        return;
    _queueing = true;
    cocos2d::Director::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
        // 在主线程中访问，不然会死得很惨
        auto iter = _dataQueue.begin();
        while (iter != _dataQueue.end()) {
            if(_callback)
                _callback(_keyChannel, *iter);
            _dataQueue.erase(iter);
            iter = _dataQueue.begin();
        }
        _queueing = false;
    });
}

void SocketChannel::setCallback(const SocketCallback &callback)
{
    _callback = callback;
}
