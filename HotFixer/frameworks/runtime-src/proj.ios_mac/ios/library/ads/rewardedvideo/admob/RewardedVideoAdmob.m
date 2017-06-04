//
//  RewardedVideoAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "RewardedVideoAdmob.h"
#import "AdsManager.h"

@implementation RewardedVideoAdmob

// 将父类的变量重新指定一遍
@synthesize viewController  = _viewController;
@synthesize debug           = _debug;
@synthesize available       = _available;
@synthesize adType          = _adType;
@synthesize shown           = _shown;
@synthesize foreReload      = _foreReload;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [self setAdType:kAdTypeRewardedVideo];
    [self setViewController:viewController];
    [self setDebug:debug];
    // 初始化RewardedVideo && 设置ID
    [GADRewardBasedVideoAd sharedInstance];
    // 设置监听
    [[GADRewardBasedVideoAd sharedInstance] setDelegate:self];
    // 设置RootViewController
    // 默认隐藏
    [self hide];
    
    return YES;
}

- (void)preload
{
    GADRequest *request = [GADRequest request];
    if(self.debug){
        request.testDevices = [[ConfigManager getInstance] getAdmobTestDevices];
    }
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:kConfigAdmobRewardedVideoId];
    [self showLog:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    [[GADRewardBasedVideoAd sharedInstance] loadRequest:request
                                           withAdUnitID:unitID];
}

- (BOOL)show
{
    if ([[GADRewardBasedVideoAd sharedInstance] isReady]) {
        [[GADRewardBasedVideoAd sharedInstance] presentFromRootViewController:self.viewController];
    } else {
        [self showLog:@"RewardedVideo is not ready"];
    }
    return NO;
}

- (void)hide
{
    if (self.debug) {
        NSLog(@"RewardedVideo hide not implements. Please hide in interstitial view");
    }
}

- (void)showLog:(NSString*)msg
{
    if (self.debug) {
//        [Utility evalJaveScript:[NSString stringWithFormat:@"cc.app.log.i('%@')", msg]];
    }
}

#pragma mark ----------------RewardedVideo----------------
- (void)rewardBasedVideoAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
   didRewardUserWithReward:(GADAdReward *)reward
{
    [self showLog:@"RewardedVideo rewardBasedVideoAd:didRewardUserWithReward"];
    self.shown = NO;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeRewarded available:self.available amount:[reward.amount intValue] err:-1];
    
}

- (void)rewardBasedVideoAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
    didFailToLoadWithError:(NSError *)error
{
    [self showLog:[NSString stringWithFormat:@"RewardedVideo didFailToLoadWithError:%d", (int)error.code]];
    self.available = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeFailedToLoad available:self.available amount:-1 err:(int)[error code]];
}

- (void)rewardBasedVideoAdDidReceiveAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidReceiveAd"];
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLoaded available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidOpen:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidOpen"];
    self.shown = YES;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeOpen available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidStartPlaying:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidStartPlaying"];
    self.shown = YES;
    self.available = [[GADRewardBasedVideoAd sharedInstance] isReady];
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeStarted available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidClose:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidClose"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeClosed available:self.available amount:-1 err:-1];
}

- (void)rewardBasedVideoAdWillLeaveApplication:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdWillLeaveApplication"];
    self.shown = NO;
    [[AdsManager getInstance] adsCallback:self.adType methodType:kMethodTypeLeftApplication available:self.available amount:-1 err:-1];
}

@end
