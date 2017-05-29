//
//  RewardedVideoManager.h
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//
#import "IManagerAccess.h"

@interface RewardedVideoManager : NSObject<IManagerAccess>


+ (instancetype)getInstance;
+ (void)pure;

@end
