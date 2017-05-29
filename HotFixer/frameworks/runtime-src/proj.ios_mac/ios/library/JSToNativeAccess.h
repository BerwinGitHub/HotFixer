//
//  JSToNativeAccess.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>
#import "facebook/FaceBookManager.h"
#import "purchase/IAPurchaseManager.h"
#import "ads/AdsManager.h"

@interface JSToNativeAccess : NSObject<FBSDKAppInviteDialogDelegate, FBSDKSharingDelegate, PurchasedDelegate>

+ (instancetype)getInstance;

+ (BOOL)setUpEnvironment:(UIViewController*) vc withDebug:(BOOL)debug;

+ (NSString*)methodsAccess:(NSString*)methodName andTypes:(NSString*)types andValues:(NSString*)values;

+ (NSString*)methodsAccessByJson:(NSString*)methodName andArgJson:(NSString*)argJson;

+ (NSString*)emitEvent:(NSString*)event andData:(NSString*)data;


+ (void)log_i:(NSString*)tag info:(NSString*)info;

+ (void)log_w:(NSString*)tag info:(NSString*)info;

+ (void)log_e:(NSString*)tag info:(NSString*)info;

+ (NSObject*)parseArgVal:(NSString*)argvTypeList values:(NSString*)argvValueList;

#pragma mark -Facebook的一些代理回调 重写方法
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results;

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error;

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results;

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error;

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer;

#pragma mark -Purchase的一些代理回调 重写方法
- (void)purchaseSuccessful:(NSString*)pid;

- (void)purchaseFailed:(NSString*)pid withErrorCode:(int)errorCode;

- (void)restoreSuccessful:(NSString*)pid;

- (void)restoreFailed:(NSString*)pid withErrorCode:(int)errorCode;

- (void)restoreSuccessfulNotify:(BOOL)isPurchase;

@end
