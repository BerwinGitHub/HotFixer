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

/**
 * 显示对话框
 */
+ (void)showAlertDialog:(NSString*)jsonData;

/**
 * 调用系统分享
 */
+ (void)shareWithSystem:(NSString*)jsonData;

@end
