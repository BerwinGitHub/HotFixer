//
//  NativeAdAdmob.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "INativeAdAccess.h"
@import GoogleMobileAds;

@interface NativeAdAdmob : NSObject<INativeAdAccess, GADNativeExpressAdViewDelegate, GADVideoControllerDelegate>

@property(nonatomic, strong)GADNativeExpressAdView *nativeAdView;
@property(nonatomic, strong)UIView *rootView;
@property(nonatomic, strong)NSTimer *timer;

@end
