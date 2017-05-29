//
//  IManagerAccess.h
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import <Foundation/Foundation.h>

@protocol IManagerAccess <NSObject>

@property(nonatomic, strong)NSArray *adArray;

@required
/**
 * 预加载广告项目
 * @param viewController  承载广告的页面
 * @param debug 是否是调试模式
 * @return BOOL 是否初始化成功
 */
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug;

/**
 * 预加载广告项目
 * @param type  需要加载的广告类型(参考：IAdAccess->AdType)
 */
- (void)preload;

/**
 * 显示广告项目
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否显示成功
 */
- (BOOL)show;

/**
 * 隐藏广告项目
 * @param type  需要隐藏的广告类型(参考：IAdAccess->AdType)
 */
- (void)hide;

/**
 * 广告项目是否可用(可以用来在游戏中展示)
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否可以展示
 */
- (BOOL)isAvailable;

/**
 * 广告项目是否已经是展示的状态
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否是正在展示
 */
- (BOOL)isShown;

@end
