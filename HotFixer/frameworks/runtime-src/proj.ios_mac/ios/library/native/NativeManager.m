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
#import "InAppWebView.h"
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

- (void)showInAppWeb:(NSString*)url
{
    InAppWebView *web = [[InAppWebView alloc] initWithURL:url];
    [web showInView:[self viewController].view];
}

- (void)showAlertDialog:(NSString*)titile withContent:(NSString*)content positiveName:(NSString*)positive negativeName:(NSString*)negative listener:(AlertCompleteBlock)listener
{
    [self setAlertCompleteBlock:listener];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:titile message:content delegate:self cancelButtonTitle:negative otherButtonTitles:positive, nil];
    [alert show];
    [alert release];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (self.alertCompleteBlock != nil) {
        self.alertCompleteBlock(buttonIndex);
    }
}

- (void)systemShareWithTitile:(NSString*)title content:(NSString*)content imageUrl:(NSString*)imgUrl;
{
    NSMutableArray *arr = [[NSMutableArray alloc] init];
    if(![title isEqualToString:@""]){
        [arr addObject:title];
    }
    if(![content isEqualToString:@""]){
        [arr addObject:content];
    }
    if(![imgUrl isEqualToString:@""]){
        UIImage *img = [[UIImage alloc] initWithContentsOfFile:imgUrl];
        [arr addObject:img];
    }
    
    UIViewController *controller = [self viewController];
    UIActivityViewController *activityViewController = [[UIActivityViewController alloc] initWithActivityItems:arr applicationActivities:nil];
    //    activityViewController.excludedActivityTypes = @[UIActivityTypeAirDrop,UIActivityTypePrint, UI25ActivityTypeCopyToPasteboard, UIActivityTypeSaveToCameraRoll,UIActivityTypeAssignToContact];
    
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        [controller presentViewController:activityViewController animated:YES completion:nil];
    } else {
        float x = [UIScreen mainScreen].bounds.size.width / 2;
        float y = [UIScreen mainScreen].bounds.size.height / 2;
        if (![self.activityPopover isPopoverVisible]) {
            self.activityPopover = [[UIPopoverController alloc] initWithContentViewController:activityViewController];
            [self.activityPopover presentPopoverFromRect:CGRectMake(x, y,0, 0) inView:((UIViewController *)controller).view permittedArrowDirections:UIPopoverArrowDirectionAny animated:YES];
        } else {
            [self.activityPopover dismissPopoverAnimated:YES];
        }
    }
}

@end
