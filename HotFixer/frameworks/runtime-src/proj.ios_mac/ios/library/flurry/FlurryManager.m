//
//  FlurryManager.m
//  slotsgame
//
//  Created by admin on 2017/5/6.
//
//

#import "FlurryManager.h"
#import "Flurry.h"
#import "ConfigManager.h"

@implementation FlurryManager

static FlurryManager *_instance = nil;

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


- (void)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    NSString *API_KEY = [[ConfigManager getInstance] getFlurryIdByKey:kConfigFlurryApiKey];
    // FlurryLogLevelNone
    FlurrySessionBuilder* builder = [[[[[FlurrySessionBuilder new]
                                        withLogLevel:FlurryLogLevelNone]
                                       withCrashReporting:NO]
                                      withSessionContinueSeconds:10]
                                     withAppVersion:@"1.0"];
    [Flurry startSession:API_KEY withSessionBuilder:builder];
    
}

- (void)logEvent:(NSString*)name withParameters:(NSDictionary*)params timed:(BOOL)timed
{
    [Flurry logEvent:name withParameters:params timed:timed];
}

- (void)endEvent:(NSString*)event withParameters:(NSDictionary*)params
{
    [Flurry endTimedEvent:event withParameters:params];
}

- (void)setUserId:(NSString*)Id
{
    [Flurry setUserID:Id];
}

- (void)setAge:(int)age
{
    [Flurry setAge:age];
}

- (void)setLogEnabled:(BOOL)enable
{
    [Flurry setShowErrorInLogEnabled:enable];
}

- (void)setLogEvents:(BOOL)le
{
    // for android
}

- (void)setCaptureUncaughtExceptions:(BOOL)exce
{
    // for android
}

- (void)setContinueSessionMillis:(long)millis
{
    // for android
}

- (void)setLocation:(double)d1 with:(double)d2
{
    [Flurry setLatitude:d1 longitude:d2 horizontalAccuracy:0 verticalAccuracy:0];
}

- (void)setVersionName:(NSString*)v
{
    [Flurry setAppVersion:v];
}

- (void)setGender:(NSString*)gender
{
    [Flurry setGender:gender];
}

@end
