//
//  IDManager.m
//  slotsgame
//
//  Created by admin on 2017/5/7.
//
//

#import "IDManager.h"

@implementation IDManager

static IDManager *_instance = nil;

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

- (void)dealloc
{
    self.configDict = nil;
    [super dealloc];
}

#pragma mark - override
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    
    return YES;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.configDict = [NSDictionary dictionaryWithContentsOfFile:[[NSBundle mainBundle] pathForResource:PATH_CONFIG ofType:nil]];
    }
    return self;
}


- (NSString*)getAppleID
{
    return [self.configDict objectForKey:IDRootString(kAppleID)];
}

- (NSString*)getFacebookValueWithKey:(NSString*)key
{
    NSDictionary *dict = [self.configDict objectForKey:IDRootString(kRootFacebook)];
    return [dict objectForKey:key];
}

- (NSString*)getFlurryValueWithKey:(NSString*)key
{
    NSDictionary *dict = [self.configDict objectForKey:IDRootString(kRootFlurry)];
    return [dict objectForKey:key];
}

- (NSString*)getPurchaseValueWithKey:(NSString*)key
{
    NSDictionary *dict = [self.configDict objectForKey:IDRootString(kRootPurchase)];
    return [dict objectForKey:key];
}

- (NSString*)getAdvertisementValueWithKey:(NSString*)key
{
    NSDictionary *dict = [self.configDict objectForKey:IDRootString(kRootAdvertisement)];
    return [dict objectForKey:key];
}


- (NSArray*)getAdvertisementTestDevices
{
    NSDictionary *dict = [self.configDict objectForKey:IDRootString(kRootAdvertisement)];
    return [dict objectForKey:KEY_TEST_DEVICE_IDS];
}

@end
