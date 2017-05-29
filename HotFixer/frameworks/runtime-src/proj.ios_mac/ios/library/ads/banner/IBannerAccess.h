//
//  IBannerAccess.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "IAdAccess.h"

@protocol IBannerAccess <NSObject, IAdAccess>

// Banner的位置类型
typedef NS_ENUM(NSInteger, Gravity){
    kGravityTop     = 0,    // Banner(横幅)广告在顶<🔼>部显示
    kGravityBottom  = 1,    // Banner(横幅)广告在底<🔽>部显示
};

/**
 * 广告的位置信息，
 */
@property(nonatomic, readwrite)int gravity;

@required
/**
 * 设置Banner在应用中显示的位置
 * @param   gravity Banner显示的位置(参考：IBannerAccess->Gravity)
 */
- (void)setGravity:(int)gravity;

/**
 * 得到Banner在当前应用中的位置
 * @return gravity Banner显示的位置(参考：IBannerAccess->Gravity)
 */
- (int)getGravity;

@end
