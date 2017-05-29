//
//  RewardedVideoManager.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "RewardedVideoManager.h"
#import "IRewardedVideoAccess.h"
#import "RewardedVideoAdmob.h"

@implementation RewardedVideoManager

@synthesize adArray = _adArray;

static RewardedVideoManager *_instance = nil;

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
    id<IRewardedVideoAccess> adomb = [[RewardedVideoAdmob alloc] init];
    [adomb setUpEnvironment:viewController withDebug:debug];
    self.adArray = [NSArray arrayWithObjects:adomb, nil];
    return YES;
}

- (void)preload
{
    for (id<IRewardedVideoAccess> interstitial in _adArray) {
        [interstitial preload];
    }
}

- (BOOL)show
{
    for (id<IRewardedVideoAccess> interstitial in _adArray) {
        if([interstitial show]){
            return YES;
        }
    }
    return NO;
}

- (void)hide
{
    for (id<IRewardedVideoAccess> interstitial in _adArray) {
        [interstitial hide];
    }
}

- (BOOL)isAvailable
{
    for (id<IRewardedVideoAccess> interstitial in _adArray) {
        if([interstitial available]){
            return YES;
        }
    }
    return NO;
}

- (BOOL)isShown
{
    for (id<IRewardedVideoAccess> interstitial in _adArray) {
        if([interstitial show]){
            return YES;
        }
    }
    return NO;
}


@end
