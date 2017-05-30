//
//  ConfigManager.m
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "ConfigManager.h"
#import "NativeManager.h"
#import "FaceBookManager.h"
#import "AdsManager.h"
#import "FlurryManager.h"
#import "IAPurchaseManager.h"

@implementation ConfigManager

static ConfigManager *_instance = nil;

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

#pragma mark - override
- (BOOL)setUpEnvironment:(UIViewController*)viewController withConfigs:(NSString*)configs withDebug:(BOOL)debug
{
    // 解析configs数据
    self.configsDict = [Utility dictionaryWithJSONString:configs];
    [super setUpEnvironment:viewController withDebug:[[self.configsDict objectForKey:keyConfigDebug] boolValue]];
    
    if(self.debug) {
        NSLog(@"getAppleId:%@",[self getAppleId]);
        NSLog(@"getPrivacyUrl:%@",[self getPrivacyUrl]);
        NSLog(@"keyConfigAdmobAppId:%@",[self getAdmobIdByKey:keyConfigAdmobAppId]);
        NSLog(@"keyConfigAdmobBannerId:%@",[self getAdmobIdByKey:keyConfigAdmobBannerId]);
        NSLog(@"keyConfigAdmobInterstitialId:%@",[self getAdmobIdByKey:keyConfigAdmobInterstitialId]);
        NSLog(@"keyConfigAdmobRewardedVideoId:%@",[self getAdmobIdByKey:keyConfigAdmobRewardedVideoId]);
        NSLog(@"keyConfigAdmobNativeId:%@",[self getAdmobIdByKey:keyConfigAdmobNativeId]);
        NSLog(@"getAdmobTestDevices:%@",[self getAdmobTestDevices]);
        NSLog(@"keyConfigFacebookAppId:%@",[self getFacebookIdByKey:keyConfigFacebookAppId]);
        NSLog(@"keyConfigFlurryApiKey:%@",[self getFlurryIdByKey:keyConfigFlurryApiKey]);
        NSLog(@"getPurchaseSkus:%@",[self getPurchaseSkus]);
    }
    return YES;
}

+ (void)setUpConfigsByJaveScript:(NSString*)data
{
    // 初始化所有Manager viewController 在AppController里面设置过了
    UIViewController *controller = [ConfigManager getInstance].viewController;
    [[ConfigManager getInstance] setUpEnvironment:controller withConfigs:data withDebug:NO];
    //
    BOOL debug = [ConfigManager getInstance].debug;
    [[NativeManager getInstance] setUpEnvironment:controller withDebug:debug];
    [[FlurryManager getInstance] setUpEnvironment:controller withDebug:debug];
    [[FaceBookManager getInstance] setUpEnvironment:controller withDebug:debug];
    [[IAPurchaseManager getInstance] setUpEnvironment:controller withDebug:debug];
    [[AdsManager getInstance] setUpEnvironment:controller withDebug:debug];
}

- (NSString*)getAppleId
{
    return [self.configsDict objectForKey:keyConfigAppleId];
}

- (NSString*)getPrivacyUrl
{
    return [self.configsDict objectForKey:keyConfigPrivacyUrl];
}

- (NSString*)getAdmobIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:keyConfigAdmob];
    return [dict objectForKey:key];
}

- (NSArray*)getAdmobTestDevices
{
    NSDictionary *dict = [self.configsDict objectForKey:keyConfigAdmob];
    return [dict objectForKey:keyConfigAdmobTestDevices];
}

- (NSString*)getFacebookIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:keyConfigFacebook];
    return [dict objectForKey:key];
}

- (NSString*)getFlurryIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:keyConfigFlurry];
    return [dict objectForKey:key];
}

- (NSString*)getPurchaseIdByKey:(NSString*)key
{
    NSDictionary *dict = [self.configsDict objectForKey:keyConfigPurchase];
    return [dict objectForKey:key];
}

- (NSArray*)getPurchaseSkus
{
    NSDictionary *dict = [self.configsDict objectForKey:keyConfigPurchase];
    return [dict objectForKey:keyConfigPurchaseSkus];
}

@end
