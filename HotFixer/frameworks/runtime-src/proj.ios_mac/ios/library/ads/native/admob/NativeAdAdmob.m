//
//  NativeAdAdmob.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "NativeAdAdmob.h"

@implementation NativeAdAdmob

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
    NSString *unitID = [[ConfigManager getInstance] getAdmobIdByKey:kConfigAdmobNativeId];
    self.nativeAdView = [[GADNativeExpressAdView alloc] initWithAdSize:GADAdSizeFromCGSize([Utility screenSize])];
    self.nativeAdView.adUnitID = unitID;
    self.nativeAdView.rootViewController = self.viewController;
    self.nativeAdView.delegate = self;
    [self.rootView addSubview:self.nativeAdView];
    
    GADVideoOptions *videoOptions = [[GADVideoOptions alloc] init];
    videoOptions.startMuted = true;
    [self.nativeAdView setAdOptions:@[ videoOptions ]];
    self.nativeAdView.videoController.delegate = self;
    
    // 设置RootViewController
    // 默认隐藏
    [self preload];
    
    //
    [self show];
    
    return YES;
}

- (void)preload
{
    GADRequest *request = [GADRequest request];
    if(self.debug){
        request.testDevices = [[ConfigManager getInstance] getAdmobTestDevices];
    }
    [self.nativeAdView loadRequest:request];
}

- (BOOL)show
{
    self.timer = [NSTimer scheduledTimerWithTimeInterval:15.0 repeats:NO block:^(NSTimer * _Nonnull timer) {
        [self preload];
        [timer invalidate];
        [self.rootView removeFromSuperview];
    }];
    
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

#pragma mark Ad Request Lifecycle Notifications
- (void)nativeExpressAdViewDidReceiveAd:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self showLog:@"nativeExpressAdViewDidReceiveAd"];
}

- (void)nativeExpressAdView:(GADNativeExpressAdView *)nativeExpressAdView
didFailToReceiveAdWithError:(GADRequestError *)error
{
    [self showLog:@"didFailToReceiveAdWithError"];
}
#pragma mark Click-Time Lifecycle Notifications
- (void)nativeExpressAdViewWillPresentScreen:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self showLog:@"nativeExpressAdViewWillPresentScreen"];
}

- (void)nativeExpressAdViewWillDismissScreen:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self showLog:@"nativeExpressAdViewWillDismissScreen"];
}

- (void)nativeExpressAdViewDidDismissScreen:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self preload];
    [self showLog:@"nativeExpressAdViewDidDismissScreen"];
}

- (void)nativeExpressAdViewWillLeaveApplication:(GADNativeExpressAdView *)nativeExpressAdView
{
    [self showLog:@"nativeExpressAdViewWillLeaveApplication"];
}

#pragma mark Native Video
- (void)videoControllerDidPlayVideo:(GADVideoController *)videoController
{
    [self showLog:@"videoControllerDidPlayVideo"];
}

- (void)videoControllerDidPauseVideo:(GADVideoController *)videoController
{
    [self showLog:@"videoControllerDidPauseVideo"];
}

- (void)videoControllerDidEndVideoPlayback:(GADVideoController *)videoController
{
    [self showLog:@"videoControllerDidEndVideoPlayback"];
}

- (void)videoControllerDidMuteVideo:(GADVideoController *)videoController
{
    [self showLog:@"videoControllerDidMuteVideo"];
}

- (void)videoControllerDidUnmuteVideo:(GADVideoController *)videoController
{
    [self showLog:@"videoControllerDidUnmuteVideo"];
}

@end
