//
//  InterstitialManager.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "InterstitialManager.h"
#import "IInterstitialAccess.h"
#import "InterstitialAdmob.h"

@implementation InterstitialManager

@synthesize adArray = _adArray;

static InterstitialManager *_instance = nil;

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
    id<IInterstitialAccess> adomb = [[InterstitialAdmob alloc] init];
    [adomb setUpEnvironment:viewController withDebug:debug];
    self.adArray = [NSArray arrayWithObjects:adomb, nil];
    return YES;
}

- (void)preload
{
    for (id<IInterstitialAccess> interstitial in _adArray) {
        [interstitial preload];
    }
}

- (BOOL)show
{
    for (id<IInterstitialAccess> interstitial in _adArray) {
        if([interstitial show]){
            return YES;
        }
    }
    return NO;
}

- (void)hide
{
    for (id<IInterstitialAccess> interstitial in _adArray) {
        [interstitial hide];
    }
}

- (BOOL)isAvailable
{
    for (id<IInterstitialAccess> interstitial in _adArray) {
        if([interstitial available]){
            return YES;
        }
    }
    return NO;
}

- (BOOL)isShown
{
    for (id<IInterstitialAccess> interstitial in _adArray) {
        if([interstitial show]){
            return YES;
        }
    }
    return NO;
}

@end
