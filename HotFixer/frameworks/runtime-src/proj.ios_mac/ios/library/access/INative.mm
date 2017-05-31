//
//  INative.m
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "INative.h"
#import "Utility.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"

@implementation INative

+ (void)nativeCallbackToJs:(int)cbid withData:(NSDictionary*)data;
{
    NSString *dataStr = [Utility dictionaryToJSONString:data];
    NSString *js = [NSString stringWithFormat:@"cc.nativeCallback(%d, %@)", cbid, dataStr];
    std::string eval = [js UTF8String];
    ScriptingCore::getInstance()->evalString(eval.c_str());
}

@end
