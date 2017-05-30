//
//  ConfigManager.h
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "ILibraryAccess.h"

#define keyConfigAppleId                @"appleId"
#define keyConfigDebug                  @"debug"
#define keyConfigPrivacyUrl             @"privacyUrl"
#define keyConfigAdmob                  @"admob"
#define keyConfigAdmobTestDevices       @"testDevices"
#define keyConfigAdmobAppId             @"app_id"
#define keyConfigAdmobBannerId          @"banner_unit_id"
#define keyConfigAdmobInterstitialId    @"interstitial_unit_id"
#define keyConfigAdmobRewardedVideoId   @"rewardedvideo_unit_id"
#define keyConfigAdmobNativeId          @"native_unit_id"
#define keyConfigFacebook               @"facebook"
#define keyConfigFacebookAppId          @"app_id"
#define keyConfigFlurry                 @"flurry"
#define keyConfigFlurryApiKey           @"api_key"
#define keyConfigPurchase               @"purchase"
#define keyConfigPurchaseSkus           @"skus"

@interface ConfigManager : ILibraryAccess

/**
 * 所有id dict
 */
@property(nonatomic, strong)NSDictionary *configsDict;

+ (instancetype)getInstance;
+ (void)pure;

+ (void)setUpConfigsByJaveScript:(NSString*)data;

- (BOOL)setUpEnvironment:(UIViewController*)viewController withConfigs:(NSString*)configs withDebug:(BOOL)debug;

- (NSString*)getAppleId;

- (NSString*)getPrivacyUrl;

- (NSString*)getAdmobIdByKey:(NSString*)key;

- (NSArray*)getAdmobTestDevices;

- (NSString*)getFacebookIdByKey:(NSString*)key;

- (NSString*)getFlurryIdByKey:(NSString*)key;

- (NSString*)getPurchaseIdByKey:(NSString*)key;

- (NSArray*)getPurchaseSkus;

@end
