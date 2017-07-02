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

class SocketChannel {
    
public:
    SocketChannel();
    virtual ~SocketChannel();
    
private:
    std::string _keyChannel;
    const char *_ip;
    int _port;
    ODSocket socket;
    
public:
    void connect(const char *ip, int port);
    void threadConnect();
    
    void receiveData();
    void sendData(const char *buf, int len);
    
    void close();
    
    void broadcastReceiveData(const char *data);
    
};

#endif /* SocketChannel_hpp */
