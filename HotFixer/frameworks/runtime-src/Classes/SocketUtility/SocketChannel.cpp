//
//  SocketChannel.cpp
//  HotFixer
//
//  Created by 唐博文 on 2017/7/2.
//
//

#include "SocketChannel.hpp"
#include "scripting/js-bindings/manual/ScriptingCore.h"

SocketChannel::SocketChannel()
{
    
}

SocketChannel::~SocketChannel()
{
    this->close();
}

void SocketChannel::connect(const char *ip, int port)
{
    std::stringstream ss;
    ss << ip << port;
    ss >> _keyChannel;
    
    _ip = ip;
    _port = port;
    socket.Init();
    socket.Create(AF_INET, SOCK_STREAM, 0);
    std::thread socketThread = std::thread(&SocketChannel::threadConnect, this);
    // 在子线程中做链接网络的操作
    socketThread.detach();// 从线程中剥离 出来
}

void SocketChannel::threadConnect()
{
    CCLOG("SocketUtility - Prepare connect. IP Address:%s  Port:%d", _ip, _port);
    bool result = socket.Connect(_ip, _port);
    socket.Send("login", 5);
    
    if (result) {
        CCLOG("SocketUtility - Connect Successfully.");
        // 因为是强联网
        // 所以可以一直检测服务端是否有数据传来
        while (true) {
            // 接收数据 Recv
            char data[512] = "";
            int result = socket.Recv(data, 512, 0);
            CCLOG("SocketUtility - Receive data is:%s", data);
            broadcastReceiveData(data);
            CCLOG("SocketUtility - Receive result is:%d", result);
            // 与服务器的连接断开了
            if (result <= 0) break;
        }
        // 关闭连接
        this->close();
        CCLOG("SocketUtility - Close socket.");
    } else {
        CCLOG("SocketUtility - Connect Failed.");
    }
}

void SocketChannel::receiveData()
{
    
}

void SocketChannel::sendData(const char *buf, int len)
{
    socket.Send(buf, len);
}

void SocketChannel::close()
{
    socket.Close();
}

void SocketChannel::broadcastReceiveData(const char *data)
{
    // 发送js事件
    ScriptingCore::getInstance()->evalString("");
    
}
