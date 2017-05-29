//
//  AdsManager.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"
#import "AdListener.h"
#import "IAdAccess.h"
#import "IManagerAccess.h"

/**
 * block 的回调监听
 */
typedef void(^BlockAdListener)(int adType, int methodType, int amount , int err);

@interface AdsManager : NSObject<ILibraryAccess>

+ (instancetype)getInstance;
+ (void)pure;

#pragma mark -property
/**
 * 当前是否是debug模式
 */
@property(nonatomic, readwrite)BOOL debug;

/**
 * 广告的回调监听属性
 */
@property(nonatomic, strong)id<AdListener> listener;

/**
 * 广告的回调监听属性(block)
 */
@property(nonatomic, copy)BlockAdListener blockListener;

/**
 * 各类广告的管理类集合
 */
@property(nonatomic, strong)NSArray *managerArray;

#pragma mark -method
/**
 * 预加载所有的广告项目
 */
- (void)preloadAll;

/**
 * 预加载指定的的广告项目
 * @param type  需要加载的广告类型(参考：IAdAccess->AdType)
 */
- (void)preload:(int)type;

/**
 * 显示指定的的广告项目
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否显示成功
 */
- (BOOL)show:(int)type;

/**
 * 隐藏指定的的广告项目
 * @param type  需要隐藏的广告类型(参考：IAdAccess->AdType)
 */
- (void)hide:(int)type;

/**
 * 指定的的广告项目是否可用(可以用来在游戏中展示)
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否可以展示
 */
- (BOOL)isAvailable:(int)type;

/**
 * 指定的的广告项目是否已经是展示的状态
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否是正在展示
 */
- (BOOL)isShown:(int)type;

/**
 * 得到Banner的显示的位置
 * #return BOOL Banner当前展示的位置
 */
- (int)getGravity;

/**
 * 设置Banner的显示的位置
 * @param gravity  Banner的位置枚举参数(参考：IAdAccess->AdType)
 */
- (void)setGravity:(int)gravity;

/**
 * 广告的回调，所有的广告回调都会进入到这里进行统一管理
 * @param adType        当前广告回调的是什么类型的广告
 * @param methodType    当前回调的广告是什么回调方法(参考：AdListener->MethodType)
 * @param amount        当是视屏广告看完有奖励的时候，该参数才会有具体的数值
 * @param err           广告回调是否是错误的
 */
- (void)adsCallback:(int)adType methodType:(int)methodType amount:(int)amount err:(int)err;



@end