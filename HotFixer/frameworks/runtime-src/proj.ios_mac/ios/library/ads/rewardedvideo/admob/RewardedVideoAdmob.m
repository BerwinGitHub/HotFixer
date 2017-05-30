//
//  RewardedVideoAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "RewardedVideoAdmob.h"
#import "AdmobListener.h"

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
    AdmobListener *listener = [[AdmobListener alloc] initWithAdAccess:self];
    [[GADRewardBasedVideoAd sharedInstance] setDelegate:listener];
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
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:keyConfigAdmobRewardedVideoId];
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
        NSLog(@"RewardedVideo - %@", msg);
    }
}

@end
