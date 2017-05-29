//
//  ILibraryAccess.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>

//typedef NS_ENUM(NSInteger, ShownType){
//    kNORMAL     = 0x00000DF0,
//    kDIALOG     = 0x00000DF1,
//    kSTORE      = 0x00000DF2
//};

@protocol ILibraryAccess <NSObject>

// 默认是必须实现的方法

@required // 必须实现的方法
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug;

@optional // 可选实现的方法

@end
