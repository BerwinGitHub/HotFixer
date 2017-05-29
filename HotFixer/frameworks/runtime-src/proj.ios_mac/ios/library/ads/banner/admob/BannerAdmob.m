//
//  BannerAdmob.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "BannerAdmob.h"
#import "Utility.h"
#import "AdmobListener.h"

@implementation BannerAdmob

// 将父类的变量重新指定一遍
@synthesize viewController  = _viewController;
@synthesize debug           = _debug;
@synthesize available       = _available;
@synthesize adType          = _adType;
@synthesize shown           = _shown;
@synthesize foreReload      = _foreReload;
@synthesize gravity         = _gravity;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [self setAdType:kAdTypeBanner];
    [self setViewController:viewController];
    [self setDebug:debug];
    // 初始化Banner
    GADAdSize size = IS_IPHONE ? kGADAdSizeBanner : kGADAdSizeFullBanner;
    self.bannerView = [[GADBannerView alloc] initWithAdSize:size];
    // 设置监听
    AdmobListener *listener = [[AdmobListener alloc] initWithAdAccess:self];
    [self.bannerView setDelegate:listener];
    // 设置ID
    NSString *unitID = [[IDManager getInstance] getAdvertisementValueWithKey:keyWithAdType(kAdTypeBanner)];
    [self showLog:[NSString stringWithFormat:@"UnitID:%@", unitID]];
    [self.bannerView setAdUnitID:unitID];
    // 设置RootViewController
    [self.bannerView setRootViewController:viewController];
    [self.viewController.view addSubview:self.bannerView];
    [self setGravity:kGravityBottom];
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
    [self.bannerView loadRequest:request];
}

- (BOOL)show
{
    [self.bannerView setHidden:NO];
    return YES;
}

- (void)hide
{
    [self.bannerView setHidden:YES];
}

- (void)setGravity:(int)gravity
{
    _gravity = gravity;
    // Banner的Size
    CGSize bs = [self.bannerView adSize].size;
    // Screen的Size
    CGSize ss = [Utility screenSize];
    float y = (gravity != kGravityTop ? (ss.height - bs.height) : 0);
    self.bannerView.frame = CGRectMake((ss.width - bs.width) / 2 , y, bs.width, bs.height);
}

- (int)getGravity
{
    return _gravity;
}

- (void)showLog:(NSString*)msg
{
    if (self.debug) {
        NSLog(@"Banner - %@", msg);
    }
}


@end
