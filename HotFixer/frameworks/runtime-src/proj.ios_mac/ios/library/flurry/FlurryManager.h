//
//  FlurryManager.h
//  slotsgame
//
//  Created by admin on 2017/5/6.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"

@interface FlurryManager : NSObject<ILibraryAccess>

+ (instancetype)getInstance;
+ (void)pure;

- (void)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions;

- (void)logEvent:(NSString*)name withParameters:(NSDictionary*)params timed:(BOOL)timed;

- (void)endEvent:(NSString*)event withParameters:(NSDictionary*)params;

- (void)setUserId:(NSString*)Id;

- (void)setAge:(int)age;

- (void)setLogEnabled:(BOOL)enable;

- (void)setLogEvents:(BOOL)le;

- (void)setCaptureUncaughtExceptions:(BOOL)exce;

- (void)setContinueSessionMillis:(long)millis;

- (void)setLocation:(double)d1 with:(double)d2;

- (void)setVersionName:(NSString*)v;

- (void)setGender:(NSString*)gender;

@end
