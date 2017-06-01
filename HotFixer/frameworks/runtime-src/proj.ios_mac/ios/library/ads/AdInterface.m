//
//  AdInterface.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/1.
//
//

#import "AdInterface.h"
#import "AdsManager.h"

@implementation AdInterface

+ (void)preloadAll:(NSString*)data;
{
    [[AdsManager getInstance] preloadAll];
}

+ (void)preload:(NSString*)data
{
    int type = [[[Utility dictionaryWithJSONString:data] objectForKey:@"type"] intValue];
    [[AdsManager getInstance] preload:type];
}

+ (void)show:(NSString*)data
{
    int type = [[[Utility dictionaryWithJSONString:data] objectForKey:@"type"] intValue];
    [[AdsManager getInstance] show:type];
}

+ (void)hide:(NSString*)data
{
    int type = [[[Utility dictionaryWithJSONString:data] objectForKey:@"type"] intValue];
    [[AdsManager getInstance] hide:type];
}

+ (NSString*)isAvailable:(NSString*)data
{
    int type = [[[Utility dictionaryWithJSONString:data] objectForKey:@"type"] intValue];
    BOOL available = [[AdsManager getInstance] isAvailable:type];
    return available ? @"true" : @"false";
}

+ (NSString*)isShown:(NSString*)data
{
    int type = [[[Utility dictionaryWithJSONString:data] objectForKey:@"key"] intValue];
    BOOL available = [[AdsManager getInstance] isShown:type];
    return available ? @"true" : @"false";
}

+ (void)setGravity:(NSString*)data
{
    int gravity = [[[Utility dictionaryWithJSONString:data] objectForKey:@"gravity"] intValue];
    [[AdsManager getInstance] setGravity:gravity];
}

+ (NSString*)getGravity:(NSString*)data
{
    int gravity = [[AdsManager getInstance] getGravity];
    return [NSString stringWithFormat:@"%d", gravity];
}

@end
