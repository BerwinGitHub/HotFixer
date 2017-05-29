//
//  AdmobListener.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "AdmobListener.h"
#import "AdsManager.h"

@implementation AdmobListener

- (instancetype)initWithAdAccess:(id<IAdAccess>)adAccess
{
    self = [super init];
    if (self) {
        self.adAccess = adAccess;
    }
    return self;
}

#pragma mark ----------------Banner----------------
#pragma mark Ad Request Lifecycle Notifications
- (void)adViewDidReceiveAd:(GADBannerView *)bannerView
{
    [self showLog:@"Banner adViewDidReceiveAd"];
    [self setShown:[self.adAccess shown] andAvailable:YES];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeLoaded amount:-1 err:-1];
}

- (void)adView:(GADBannerView *)bannerView didFailToReceiveAdWithError:(GADRequestError *)error
{
    [self showLog:[NSString stringWithFormat:@"Banner didFailToReceiveAdWithError:%d", (int)error.code]];
    [self setShown:[self.adAccess shown] andAvailable:NO];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeFailedToLoad amount:-1 err:(int)[error code]];
}

#pragma mark Click-Time Lifecycle Notifications
- (void)adViewWillPresentScreen:(GADBannerView *)bannerView
{
    [self showLog:@"Banner adViewWillPresentScreen"];
    [self setShown:YES andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeOpen amount:-1 err:-1];
}

- (void)adViewWillDismissScreen:(GADBannerView *)bannerView
{
    [self showLog:@"Banner adViewWillDismissScreen"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeWillClose amount:-1 err:-1];
}

- (void)adViewDidDismissScreen:(GADBannerView *)bannerView
{
    [self showLog:@"Banner adViewDidDismissScreen"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeClosed amount:-1 err:-1];
}

- (void)adViewWillLeaveApplication:(GADBannerView *)bannerView
{
    [self showLog:@"Banner adViewWillLeaveApplication"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeLeftApplication amount:-1 err:-1];
}

#pragma mark ----------------Interstitial----------------
#pragma mark Ad Request Lifecycle Notifications
- (void)interstitialDidReceiveAd:(GADInterstitial *)ad
{
    [self showLog:@"Interstitial interstitialDidReceiveAd"];
    [self setShown:[self.adAccess shown] andAvailable:YES];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeLoaded amount:-1 err:-1];
}

- (void)interstitial:(GADInterstitial *)ad didFailToReceiveAdWithError:(GADRequestError *)error
{
    [self showLog:[NSString stringWithFormat:@"Interstitial didFailToReceiveAdWithError:%d", (int)error.code]];
    [self setShown:[self.adAccess shown] andAvailable:NO];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeFailedToLoad amount:-1 err:(int)[error code]];
}

#pragma mark Display-Time Lifecycle Notifications
- (void)interstitialWillPresentScreen:(GADInterstitial *)ad
{
    [self showLog:@"Interstitial interstitialWillPresentScreen"];
    [self setShown:YES andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeOpen amount:-1 err:-1];
}

- (void)interstitialDidFailToPresentScreen:(GADInterstitial *)ad
{
    [self showLog:@"Interstitial interstitialDidFailToPresentScreen"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeFailedOpen amount:-1 err:-1];
}


- (void)interstitialWillDismissScreen:(GADInterstitial *)ad
{
    [self showLog:@"Interstitial interstitialWillDismissScreen"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeWillClose amount:-1 err:-1];
}

- (void)interstitialDidDismissScreen:(GADInterstitial *)ad
{
    [self showLog:@"Interstitial interstitialDidDismissScreen"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeClosed amount:-1 err:-1];
}

- (void)interstitialWillLeaveApplication:(GADInterstitial *)ad
{
    [self showLog:@"Interstitial interstitialWillLeaveApplication"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeLeftApplication amount:-1 err:-1];
}

#pragma mark ----------------RewardedVideo----------------
- (void)rewardBasedVideoAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
   didRewardUserWithReward:(GADAdReward *)reward
{
    [self showLog:@"RewardedVideo rewardBasedVideoAd:didRewardUserWithReward"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeRewarded amount:reward.amount err:-1];
    
}

- (void)rewardBasedVideoAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
    didFailToLoadWithError:(NSError *)error
{
    [self showLog:[NSString stringWithFormat:@"RewardedVideo didFailToLoadWithError:%d", (int)error.code]];
    [self setShown:[self.adAccess shown] andAvailable:NO];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeFailedToLoad amount:-1 err:(int)[error code]];
}

- (void)rewardBasedVideoAdDidReceiveAd:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidReceiveAd"];
    [self setShown:[self.adAccess shown] andAvailable:YES];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeLoaded amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidOpen:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidOpen"];
    [self setShown:YES andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeOpen amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidStartPlaying:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidStartPlaying"];
    [self setShown:YES andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeStarted amount:-1 err:-1];
}

- (void)rewardBasedVideoAdDidClose:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdDidClose"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeClosed amount:-1 err:-1];
}

- (void)rewardBasedVideoAdWillLeaveApplication:(GADRewardBasedVideoAd *)rewardBasedVideoAd
{
    [self showLog:@"RewardedVideo rewardBasedVideoAdWillLeaveApplication"];
    [self setShown:NO andAvailable:[self.adAccess available]];
    [[AdsManager getInstance] adsCallback:[self.adAccess adType] methodType:kMethodTypeLeftApplication amount:-1 err:-1];
}


#pragma mark ----------------Private----------------
- (void)setShown:(BOOL)shown andAvailable:(BOOL)available
{
    [self.adAccess setAvailable:available];
    [self.adAccess setShown:shown];
}

- (void)showLog:(NSString*)msg
{
    if([self.adAccess debug]){
        NSLog(@"AdmobListener - AdType:%@\t%@", keyWithAdType([self.adAccess adType]), msg);
    }
}

@end
