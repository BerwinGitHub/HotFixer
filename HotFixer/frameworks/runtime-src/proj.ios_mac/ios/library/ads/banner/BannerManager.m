//
//  BannerManager.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "BannerManager.h"
#import "BannerAdmob.h"

@implementation BannerManager

@synthesize adArray = _adArray;

static BannerManager *_instance = nil;

+ (instancetype)getInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[self alloc] init];
    });
    
    return _instance;
}

+ (void)pure
{
    if(_instance){
        [_instance release];
        _instance = nil;
    }
}

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    id<IBannerAccess> adomb = [[BannerAdmob alloc] init];
    [adomb setUpEnvironment:viewController withDebug:debug];
    self.adArray = [NSArray arrayWithObjects:adomb, nil];
    return YES;
}

- (void)preload
{
    for (id<IBannerAccess> banner in _adArray) {
        [banner preload];
    }
}

- (BOOL)show
{
    for (id<IBannerAccess> banner in _adArray) {
        if([banner show]){
            return YES;
        }
    }
    return NO;
}

- (void)hide
{
    for (id<IBannerAccess> banner in _adArray) {
        [banner hide];
    }
}

- (BOOL)isAvailable
{
    for (id<IBannerAccess> banner in _adArray) {
        if([banner available]){
            return YES;
        }
    }
    return NO;
}

- (BOOL)isShown
{
    for (id<IBannerAccess> banner in _adArray) {
        if([banner show]){
            return YES;
        }
    }
    return NO;
}

- (int)getGravity
{
    for (id<IBannerAccess> banner in _adArray) {
        return [banner getGravity];
    }
    return kGravityBottom;
}

- (void)setGravity:(int)gravity
{
    for (id<IBannerAccess> banner in _adArray) {
        [banner setGravity:gravity];
    }
}

@end
