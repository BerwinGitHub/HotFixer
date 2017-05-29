//
//  NativeInterface.m
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "NativeInterface.h"
#import "NativeManager.h"
#import "Utility.h"

@implementation NativeInterface


+ (void)showPrivacyWithURL:(NSString*)jsonData
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:jsonData];
    NSString *url = [dict objectForKey:@"url"];
    [[NativeManager getInstance] showPrivacy:url];
}

@end
