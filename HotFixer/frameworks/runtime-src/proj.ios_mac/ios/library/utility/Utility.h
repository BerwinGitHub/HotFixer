//
//  Utility.h
//  slotsgame
//
//  Created by admin on 2017/5/5.
//
//

#import <Foundation/Foundation.h>

#define IS_IPAD     (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)      // 当前设备是否是iPad
#define IS_IPHONE   (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)    // 当前设备是否是iPhone

@interface Utility : NSObject

/**
 * JSON 转成 Dictionary
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSDictionary *)dictionaryWithJSONString:(NSString *)json;

/**
 * JSON 转成 Array
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSArray *)arrayWithJSONString:(NSString *)jsonString;

/**
 * Dictionary 转成 String
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSString*)dictionaryToJSONString:(id)infoDict;

/**
 * Array 转成 String
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSString*)arrayToJSONString:(id)infoArr;

/**
 * 得到改应用在AppStore的连接，区分7.0已上/下系统, https://
 *
 * @param appleId
 * @return NSString url string
 */
+ (NSString*)getApplicationOnAppStoreHttpsLink:(NSString*)appleId;

/**
 * 得到改应用在AppStore的连接，区分7.0已上/下系统, items-apps://
 *
 * @param appleId
 * @return NSString url string
 */
+ (NSString*)getApplicationOnAppStoreiTunesLink:(NSString*)appleId;

+ (CGSize)screenSize;

+ (CGRect)screenRect;

+ (UIColor*)colorWithR:(float)r G:(float)g B:(float)b A:(float)a;
@end