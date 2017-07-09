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
_callback(nullptr),
_sendQueueing(false),
_receiveQueueing(false)
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
        this->insertDataToReceiveQueueWaitForHandle(CODE_CONNECT_SUCCESS);
        // 因为是强联网,所以可以一直检测服务端是否有数据传来 直到传来的数据长度小于等于0
        while (true) {
            // 接收数据 Recv
            char data[DATA_BUFFER_LENGTH] = "";
            int result = _socket.Recv(data, DATA_BUFFER_LENGTH, 0);
//            CCLOG("SocketUtility - Receive data is:%s", data);
//            CCLOG("SocketUtility - Receive result is:%d", result);
            this->insertDataToReceiveQueueWaitForHandle(data);
            // 与服务器的连接断开了
            if (result <= 0) break;
        }
        // 关闭连接
        this->close();
        CCLOG("SocketUtility - Close socket.");
    } else {
        this->insertDataToReceiveQueueWaitForHandle(CODE_CONNECT_FAILED);
        CCLOG("SocketUtility - Connect Failed.");
    }
}

void SocketChannel::sendData(const char* data)
{
    this->insertDataToSendQueueWaitForHandle(data);
}

void SocketChannel::close()
{
    _socket.Close();
    this->insertDataToReceiveQueueWaitForHandle(CODE_CONNECT_CLOSED);
}

void SocketChannel::insertDataToReceiveQueueWaitForHandle(const char *data)
{
    std::string tmpStr(data);
    _receiveDataQueue.push_back(tmpStr);
    this->handleReceiveData();
}

void SocketChannel::handleReceiveData()
{
    if(_receiveQueueing)
        return;
    _receiveQueueing = true;
    cocos2d::Director::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
        // 在Cocos线程中处理队列回调，不然会死得很惨
        auto iter = _receiveDataQueue.begin();
        while (iter != _receiveDataQueue.end()) {
            if(_callback)
                _callback(_keyChannel, *iter);
            _receiveDataQueue.erase(iter);
            iter = _receiveDataQueue.begin();
        }
        _receiveQueueing = false;
    });
}

void SocketChannel::insertDataToSendQueueWaitForHandle(const char *data)
{
    _sendDataQueue.push_back(data);
    this->handleSendData();
}

void SocketChannel::handleSendData()
{
    if(_sendQueueing)
        return;
    _sendQueueing = true;
    auto iter = _sendDataQueue.begin();
    while (iter != _sendDataQueue.end()) {
        _socket.Send(*iter, sizeof(*iter));
        _sendDataQueue.erase(iter);
        iter = _sendDataQueue.begin();
    }
    _sendQueueing = false;
}

void SocketChannel::setCallback(const SocketCallback &callback)
{
    _callback = callback;
}
