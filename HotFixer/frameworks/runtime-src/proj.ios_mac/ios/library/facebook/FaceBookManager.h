//
//  FaceBookManager.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <FBSDKShareKit/FBSDKShareKit.h>

@interface FaceBookManager : ILibraryAccess
{
}

+ (instancetype)getInstance;
+ (void)pure;

- (void)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions;
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation;

- (void)loginWithPermissions:(NSArray*)permissions andHandler:(FBSDKLoginManagerRequestTokenHandler)handler;

- (BOOL)isLogin;

- (void)logEvent:(NSString*)eventName withParameters:(NSDictionary*)params;

- (void)logEvent:(NSString*)eventName valueToSum:(double)sum;

- (void)logEvent:(NSString*)eventName;

- (void)shareWithLink:(NSString*)link;

- (void)graphRequest:(NSString*)graphPath parameters:(NSDictionary *)parameters handler:(FBSDKGraphRequestHandler)handler httpMethod:(NSString*)method;

- (FBSDKProfile*)getCurrentProile;

- (void)invite:(NSString*)appLinkUrl previewImageUrl:(NSString*)imgUrl destinationIdx:(int)destIdx promotTxt:(NSString*)promotTxt promotCode:promotCode delegate:(id<FBSDKAppInviteDialogDelegate>) delegate;

- (void)share:(NSString*)titile description:(NSString*)desc contentUrl:(NSString*)url quote:(NSString*)quote imageUrl:(NSString*)imgUrl peopleIds:(NSArray*)peopleIds placeId:(NSString*)placeId ref:(NSString*)ref delegate:(id<FBSDKSharingDelegate>) delegate;

- (FBSDKAccessToken*)currentAccessToken;
    
@end
