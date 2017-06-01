//
//  FaceBookManager.m
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "FaceBookManager.h"
#import "ConfigManager.h"

@implementation FaceBookManager

static FaceBookManager *_instance = nil;

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
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withDebug:debug];
    return YES;
}

#pragma mark - method

- (void)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    NSString *appID = [[ConfigManager getInstance] getFacebookIdByKey:keyConfigFacebookAppId];
    [FBSDKAppEvents setLoggingOverrideAppID:appID];
    [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
    return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

- (void)loginWithPermissions:(NSArray*)permissions andHandler:(FBSDKLoginManagerRequestTokenHandler)handler
{
    if(self.viewController == nil){
        NSLog(@"_viewController is nil. Please setViewController()");
        return;
    }
    // 打开 FBSDKProfile 自动追踪 FBSDKAccessToken
    [FBSDKProfile enableUpdatesOnAccessTokenChange:YES];
    // 清空FBSDKAccessToken
    [FBSDKAccessToken setCurrentAccessToken:nil];
    
    FBSDKLoginManager *loginManager = [[FBSDKLoginManager alloc] init];
    [loginManager setDefaultAudience:[loginManager defaultAudience]];
    // 默认打开方式是应用
    [loginManager setLoginBehavior:FBSDKLoginBehaviorNative];
    [loginManager logInWithReadPermissions:permissions
                        fromViewController:self.viewController
                                   handler:handler];
    
    // 添加Facebook的广播监听
    /*
    [[NSNotificationCenter defaultCenter] addObserverForName:FBSDKProfileDidChangeNotification
                                                      object:nil
                                                       queue:nil
                                                  usingBlock:^(NSNotification * _Nonnull note) {
                                                      FBSDKAccessToken *token = [self isLogin];
                                                      if(token){
                                                          NSLog(@"userID:%@", token.userID);
                                                          NSLog(@"tokenString:%@", token.tokenString);
                                                          NSLog(@"appID:%@", token.appID);
                                                          NSLog(@"permissions:%@", token.permissions);
                                                      }
                                                  }];*/
}

- (BOOL)isLogin
{
    return [FBSDKAccessToken currentAccessToken];
}

- (void)logEvent:(NSString*)eventName withParameters:(NSDictionary*)params
{
    [FBSDKAppEvents logEvent:eventName parameters:params];
}

- (void)logEvent:(NSString*)eventName valueToSum:(double)sum
{
    [FBSDKAppEvents logEvent:eventName valueToSum:sum];
}

- (void)logEvent:(NSString*)eventName
{
    [FBSDKAppEvents logEvent:eventName];
}

- (FBSDKAccessToken*)currentAccessToken
{
    return [FBSDKAccessToken currentAccessToken];
}

- (void)shareWithLink:(NSString*)link
{
    if(self.viewController == nil){
        NSLog(@"_viewController is nil. Please setViewController()");
        return;
    }
    FBSDKShareLinkContent *shareContent = [[FBSDKShareLinkContent alloc] init];
    shareContent.contentURL = [NSURL URLWithString:link];
    
    FBSDKShareDialog *shareDialog = [[FBSDKShareDialog alloc] init];
    shareDialog.shareContent = shareContent;
    shareDialog.fromViewController = self.viewController;
    [shareDialog show];
}

- (void)graphRequest:(NSString*)graphPath parameters:(NSDictionary *)parameters handler:(FBSDKGraphRequestHandler)handler httpMethod:(NSString*)method;
{
    if([self isLogin]){
        // [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me/friendlists" parameters:parameters HTTPMethod:@"GET"] startWithCompletionHandler:handler];
        /* // 请求好友的回调block表达式
        ^(FBSDKGraphRequestConnection *connection, id result, NSError *err) {
            if (err) {
                NSLog(@"请求好友失败:%@", err);
            }
            NSLog(@"请求好友成功:%@", result);
        }*/
        
        // This will only return the list of friends who have this app installed
        FBSDKGraphRequest *friendsRequest = [[FBSDKGraphRequest alloc] initWithGraphPath:graphPath
                                                                              parameters:parameters
                                                                              HTTPMethod:method];
        FBSDKGraphRequestConnection *connection = [[FBSDKGraphRequestConnection alloc] init];
        [connection addRequest:friendsRequest
             completionHandler:handler];
        // start the actual request
        [connection start];
    }
}

- (FBSDKProfile*)getCurrentProile
{
    return [FBSDKProfile currentProfile];
}

- (void)invite:(NSString*)appLinkUrl previewImageUrl:(NSString*)imgUrl destinationIdx:(int)destIdx promotTxt:(NSString*)promotTxt promotCode:promotCode delegate:(id<FBSDKAppInviteDialogDelegate>) delegate
{
    FBSDKAppInviteDialog *dialog = [[FBSDKAppInviteDialog alloc] init];
    if(dialog.canShow){
        FBSDKAppInviteContent *content = [[FBSDKAppInviteContent alloc] init];
        NSLog(@"appLinkUrl:%@", appLinkUrl);
        content.appLinkURL = [NSURL URLWithString:appLinkUrl];
        [content setDestination: (destIdx == 0 ? FBSDKAppInviteDestinationFacebook : FBSDKAppInviteDestinationMessenger)];
        [content setPromotionText:promotTxt];
        [content setPromotionCode:promotCode];
        // [dialog setContent:content];
        // [dialog show];
        [FBSDKAppInviteDialog showFromViewController:self.viewController withContent:content delegate:delegate];
    }
}

- (void)share:(NSString*)titile description:(NSString*)desc contentUrl:(NSString*)url quote:(NSString*)quote imageUrl:(NSString*)imgUrl peopleIds:(NSArray*)peopleIds placeId:(NSString*)placeId ref:(NSString*)ref delegate:(id<FBSDKSharingDelegate>) delegate
{
    FBSDKShareDialog *dialog = [[FBSDKShareDialog alloc] init];
    if (dialog.canShow) {
        FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];
        content.contentTitle;
        [content setContentTitle:titile];
        [content setContentDescription:desc];
        [content setContentURL:[NSURL URLWithString:url]];
        if(quote){
            [content setQuote:quote];
        }
        if(imgUrl){
            [content setImageURL:[NSURL URLWithString:imgUrl]];
        }
        if (peopleIds) {
            [content setPeopleIDs:peopleIds];
        }
        if(placeId){
            [content setPlaceID:placeId];
        }
        if(ref){
            [content setRef:ref];
        }
        //[dialog setShareContent:content];
        //[dialog show];
        [FBSDKShareDialog showFromViewController:self.viewController withContent:content delegate:delegate];
    }
}

@end
