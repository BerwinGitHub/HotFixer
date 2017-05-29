//
//  InterstitialAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "InterstitialAdmob.h"
#import "AdmobListener.h"

@implementation InterstitialAdmob

// 将父类的变量重新指定一遍
@synthesize viewController  = _viewController;
@synthesize debug           = _debug;
@synthesize available       = _available;
@synthesize adType          = _adType;
@synthesize shown           = _shown;
@synthesize foreReload      = _foreReload;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [self setAdType:kAdTypeInterstitial];
    [self setViewController:viewController];
    [self setDebug:debug];
    // 初始化Interstitial && 设置ID
    NSString *unitID = [[IDManager getInstance] getAdvertisementValueWithKey:keyWithAdType([self adType])];
    [self showLog:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    self.interstitial = [[GADInterstitial alloc] initWithAdUnitID:unitID];
    // 设置监听
    AdmobListener *listener = [[AdmobListener alloc] initWithAdAccess:self];
    [self.interstitial setDelegate:listener];
    // 设置RootViewController
    // 默认隐藏
    [self hide];
    
    return YES;
}

- (void)preload
{
    GADRequest *request = [GADRequest request];
    if(self.debug){
        request.testDevices = [[IDManager getInstance] getAdvertisementTestDevices];
    }
    [self.interstitial loadRequest:request];
}

- (BOOL)show
{
    if(self.interstitial.isReady){
        [self.interstitial presentFromRootViewController:self.viewController];
        return YES;
    } else {
        [self showLog:@"interstitial is not ready"];
    }
    return NO;
}

- (void)hide
{
    if (self.debug) {
        NSLog(@"Interstitial hide not implements. Please hide in interstitial view");
    }
}

- (void)showLog:(NSString*)msg
{
    if (self.debug) {
        NSLog(@"Interstitial - %@", msg);
    }
}

@end
