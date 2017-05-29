//
//  NativeInterface.h
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "INative.h"

@interface NativeInterface : INative

/**
 * 显示Privacy的页面
 */
+ (void)showPrivacyWithURL:(NSString*)jsonData;

@end
