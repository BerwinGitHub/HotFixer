//
//  NativeManager.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"

@interface NativeManager : NSObject <ILibraryAccess>

@property(nonatomic, strong)UIViewController *viewController;

+ (instancetype)getInstance;
+ (void)pure;

/**
 * 检查网络状态是否可用
 * @return BOOL 
 */
- (BOOL)isNetworkAvaliable;

/**
 * 得到设备的唯一ID(UUID)
 * @return NSString 设备的唯一ID
 */
- (NSString*)getDeviceUUID;

- (void)showPrivacy:(NSString*)url;

- (void)showInAppWeb:(NSString*)url;

@end
