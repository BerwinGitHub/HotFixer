//
//  SocketUtility.hpp
//  HotFixer
//
//  Created by 唐博文 on 2017/7/2.
//
//

#ifndef SocketUtility_hpp
#define SocketUtility_hpp

#include <stdio.h>
#include "SocketChannel.hpp"

class SocketUtility {
    
private:
    std::map<std::string, SocketChannel*> _channelCache;
    
private:
    SocketUtility();
    
public:
    static SocketUtility *getInstance();
    static void pure();
    virtual ~SocketUtility();
    
public:
    /**
     * 链接到指定的地址和端口
     * @param ip    需要链接的ip地址
     * @param port  需要链接的端口地址
     * @return key  返回当前ip + port的key值(因为登录和游戏的port不一样，做多通道处理)
     */
    std::string connect(const char *ip, int port);
    
    /**
     * 链接到指定的地址和端口，并设置收到消息回调方法
     * @param ip        需要链接的ip地址
     * @param port      需要链接的端口地址
     * @param callback  收到消息的回调方法
     * @return key      返回当前ip + port的key值(因为登录和游戏的port不一样，做多通道处理)
     */
    std::string connectWithCallback(const char *ip, int port, const SocketCallback& callback);
    
    /**
     * 发送消息
     * @param   keyChannel  向哪个通道发送消息
     * @param   buf         发送的内容
     * @param   len         发送内容的长度
     */
    void sendData(const std::string &keyChannel, const char *buf, int len);
    
    /**
     * 关闭通道
     * @param   keyChannel  关闭通道的key
     */
    void closeChannel(const std::string &keyChannel);
    
    /**
     * 设置通道消息的回到方法
     * @param keyChannel        通道的key
     * @param callback          收到消息的回调方法
     */
    void setCallback(const std::string &keyChannel, const SocketCallback& callback);
    
private:
    SocketChannel* getSocketChannelByKey(const std::string &key);
    
    
};

#endif /* SocketUtility_hpp */
