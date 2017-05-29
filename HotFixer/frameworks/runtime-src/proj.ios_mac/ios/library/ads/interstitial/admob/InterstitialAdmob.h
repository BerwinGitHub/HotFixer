//
//  InterstitialAdmob.h
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "IInterstitialAccess.h"
@import GoogleMobileAds;

@class GADInterstitial;

@interface InterstitialAdmob : NSObject<IInterstitialAccess>

@property(nonatomic, strong)GADInterstitial *interstitial;

@end
