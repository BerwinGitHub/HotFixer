//
//  NativeAdManager.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "IManagerAccess.h"

@interface NativeAdManager : NSObject<IManagerAccess>

@property(nonatomic, strong)UIView *rootView;

+ (instancetype)getInstance;
+ (void)pure;

- (void)showNativeRoot:(UIViewController*)viewController;

@end
