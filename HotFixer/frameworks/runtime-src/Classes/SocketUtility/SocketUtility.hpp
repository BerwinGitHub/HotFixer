//
//  SocketUtility.hpp
//  HotFixer
//
//  Created by 唐博文 on 2017/7/2.
//
//

#ifndef SocketUtility_hpp
#define SocketUtility_hpp

//#include "cocos2d.h"
#include <stdio.h>
#include "SocketChannel.hpp"

//using namespace cocos2d;

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
    std::string connect(const char *ip, int port);
    
    void receiveData();
    
    
};

#endif /* SocketUtility_hpp */
