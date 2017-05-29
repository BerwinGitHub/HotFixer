//
//  IDManager.h
//  slotsgame
//
//  Created by admin on 2017/5/7.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"

#define PATH_CONFIG         @"ids.plist"        // ID的配置文件
#define KEY_TEST_DEVICE_IDS @"TestDeviceIds"    // 测试的设备ID

// 根节点的Enum Key
typedef enum {kAppleID, kRootFacebook, kRootPurchase, kRootFlurry, kRootAdvertisement} IDRoot;
#define IDRootString(enum)  [@[@"AppleID", @"Facebook", @"Purchase", @"Flurry", @"Advertisement"] objectAtIndex:enum]

// Facebook Key
typedef enum {kFBAppID} IDFacebook;
#define IDFacebookString(enum)  [@[@"APP_ID"] objectAtIndex:enum]

// Flurry Key
typedef enum {kFlurryApiKey} IDFlurry;
#define IDFlurryString(enum)  [@[@"API_KEY"] objectAtIndex:enum]

// Purchase Key
typedef enum {kPurchaseID} IDPurchase;
#define IDPurchaseString(enum)  [@[@"PurchaseID"] objectAtIndex:enum]

// Advertisement Key
typedef enum {kAdvertisementAppID} IDAdvertisement;
#define IDAdvertisementString(enum)  [@[@"APP_ID"] objectAtIndex:enum]

@interface IDManager : NSObject<ILibraryAccess>

@property(nonatomic, retain)NSDictionary *configDict;

+ (instancetype)getInstance;
+ (void)pure;

- (BOOL)setUpEnvironment;

#pragma mark -about ids
- (NSString*)getAppleID;
- (NSString*)getFacebookValueWithKey:(NSString*)key;
- (NSString*)getFlurryValueWithKey:(NSString*)key;
- (NSString*)getPurchaseValueWithKey:(NSString*)key;
- (NSString*)getAdvertisementValueWithKey:(NSString*)key;
- (NSArray*)getAdvertisementTestDevices;


@end
