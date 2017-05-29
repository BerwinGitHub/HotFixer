//
//  NativeManager.m
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "NativeManager.h"
#import <SystemConfiguration/SystemConfiguration.h>
#import <netinet/in.h>
#import <AdSupport/AdSupport.h>
#import "PrivacyPage.h"
#import "Utility.h"

@implementation NativeManager

static NativeManager *_instance = nil;

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
    [self setViewController:viewController];
    return YES;
}



-(BOOL)isNetworkAvaliable {
    struct sockaddr_in zeroAddress;
    bzero(&zeroAddress, sizeof(zeroAddress));
    zeroAddress.sin_len = sizeof(zeroAddress);
    zeroAddress.sin_family = AF_INET;
    
    SCNetworkReachabilityRef defaultRouteReachability = SCNetworkReachabilityCreateWithAddress(NULL, (struct sockaddr *)&zeroAddress);
    SCNetworkReachabilityFlags flags;
    
    BOOL didRetrieveFlags = SCNetworkReachabilityGetFlags(defaultRouteReachability, &flags);
    CFRelease(defaultRouteReachability);
    
    if (!didRetrieveFlags) {
        return NO;
    }
    
    BOOL isReachable = flags & kSCNetworkFlagsReachable;
    BOOL needsConnection = flags & kSCNetworkFlagsConnectionRequired;
    // = flags & kSCNetworkReachabilityFlagsIsWWAN;
    BOOL nonWifi = flags & kSCNetworkReachabilityFlagsTransientConnection;
    BOOL moveNet = flags & kSCNetworkReachabilityFlagsIsWWAN;
    
    return ((isReachable && !needsConnection) || nonWifi || moveNet) ? YES : NO;
}

- (NSString*)getDeviceUUID
{
    NSString *adId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    return adId;
}

- (void)showPrivacy:(NSString*)url
{
//    PrivacyPage *page = [[PrivacyPage alloc] initWithURL:@"http://www.baidu.com"];
    PrivacyPage *page = [[PrivacyPage alloc] initWithURL:url];
    [page showInView:[self viewController].view];
}

- (void)showInAppWeb:(NSString*)url
{
    
}

@end
