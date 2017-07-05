//
//  SocketUtility.cpp
//  HotFixer
//
//  Created by 唐博文 on 2017/7/2.
//
//

#include "SocketUtility.hpp"

static SocketUtility *_socketUtility = nullptr;

SocketUtility::SocketUtility()
{
    
}

SocketUtility::~SocketUtility()
{
    for(auto it : _channelCache){
        delete it.second;
    }
    _channelCache.clear();
}

SocketUtility* SocketUtility::getInstance()
{
    if(!_socketUtility){
        _socketUtility = new SocketUtility();
    }
    return _socketUtility;
}

void SocketUtility::pure()
{
    delete _socketUtility;
}

std::string SocketUtility::connect(const char *ip, int port)
{
    return this->connectWithCallback(ip, port, nullptr);
}

std::string SocketUtility::connectWithCallback(const char *ip, int port, const SocketCallback &callback)
{
    std::string keyChannel;
    std::stringstream ss;
    ss << ip << '-' << port;
    ss >> keyChannel;
    CCLOG("SocketUtility - KeyChannel:%s", keyChannel.c_str());
    SocketChannel *channel = this->getSocketChannelByKey(keyChannel);
    if(!channel) { // 以前没有创建过，那么就新创建
        SocketChannel *channel = new SocketChannel();
        channel->setCallback(callback);
        channel->connect(ip, port); // 开始链接到指定的ip-port
        // 添加到缓存
        _channelCache.insert(std::pair<std::string, SocketChannel*>(keyChannel, channel));
    } else {
        CCLOG("%s is connected.", keyChannel.c_str());
    }
    return keyChannel;
}

void SocketUtility::setCallback(const std::string &keyChannel, const SocketCallback& callback)
{
    SocketChannel *channel = this->getSocketChannelByKey(keyChannel);
    if(channel){
        channel->setCallback(callback);
    }
}

void SocketUtility::closeChannel(const std::string &keyChannel)
{
    auto it = _channelCache.find(keyChannel);
    if(it != _channelCache.end()){
        it->second->close();
        delete it->second;
        _channelCache.erase(it);
    }
}


void SocketUtility::sendData(const std::string &keyChannel, const std::string &data)
{
    SocketChannel *channel = this->getSocketChannelByKey(keyChannel);
    if(channel){
        channel->sendData(data);
    }
}

SocketChannel* SocketUtility::getSocketChannelByKey(const std::string &key)
{
    auto it = _channelCache.find(key);
    if(it != _channelCache.end()){
        return it->second;
    }
    return nullptr;
}

