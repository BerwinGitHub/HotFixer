//
//  JSToNativeAccess.m
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "FlurryManager.h"
#import "utility/Utility.h"
#import "JSToNativeAccess.h"
#import "native/NativeManager.h"
#import "IDManager.h"

#include "cocos2d.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"
USING_NS_CC;
USING_NS_CC_MATH;


@implementation JSToNativeAccess

#pragma mark -JSToNativeAccess 方法
static JSToNativeAccess *_instance = nil;
+ (instancetype)getInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [self new];
    });
    return _instance;
}

+ (BOOL)setUpEnvironment:(UIViewController*) vc withDebug:(BOOL)debug
{
    [[AdsManager getInstance] setUpEnvironment:vc withDebug:debug];
    [[NativeManager getInstance] setUpEnvironment:vc withDebug:debug];
    [[FaceBookManager getInstance] setUpEnvironment:vc withDebug:debug];
    [[IAPurchaseManager getInstance] setUpEnvironment:vc withDebug:debug];
    
    [[AdsManager getInstance] preloadAll];
    [[IAPurchaseManager getInstance] setDelegate:[JSToNativeAccess getInstance]];
    
    // for test
    [AdsManager getInstance].blockListener = ^(int adType, int methodType, int amount , int err){
        // 设置监听并且发送回调事件
        NSString *evalStr = [NSString stringWithFormat:@"{adType:%d, methodType:%d, amount:%d, errCode:%d}", adType, methodType, amount, err];
        [JSToNativeAccess emitEvent:@"admob_event" andData:evalStr];
    };
    
//    [[AdsManager getInstance] show:kAdTypeBanner];
    
    return YES;
}

#pragma mark -JS调用OC的统一接口
+ (NSString*)methodsAccess:(NSString*)methodName andTypes:(NSString*)types andValues:(NSString*)values
{
    if([methodName isEqualToString:@"getNetworkState"]){
        return [JSToNativeAccess getNetworkState];
    } else if([methodName isEqualToString:@"fb_login"]){// facebook登录
        return [JSToNativeAccess fb_login];
    } else if([methodName isEqualToString:@"fb_isLogin"]){ // facebook是否登录
        return [[FaceBookManager getInstance] isLogin] ? @"true" : @"false";
    } else if([methodName isEqualToString:@"fb_graghRequest"]){ // 请求好友列表
        return [JSToNativeAccess fb_graghRequest:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"fb_getCurProfile"]){
        return [JSToNativeAccess fb_getCurProfile];
    } else if([methodName isEqualToString:@"graghPostRequest"]){
        return [JSToNativeAccess graghPostRequest:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"fb_share"]){
        return [JSToNativeAccess fb_share:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"fb_invite"]){
        return [JSToNativeAccess fb_invite:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"fb_logEvent"]){
        return [JSToNativeAccess fb_logEvent:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"gp_buy"]){
        return [JSToNativeAccess gp_buy:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"gp_buySubscript"]){
        return [JSToNativeAccess gp_buy:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"getUUID"]){
        return [[NativeManager getInstance] getDeviceUUID];
    }
    // Flurry
    else if([methodName isEqualToString:@"flurry_event"]){
        return [JSToNativeAccess flurry_event:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_endEvent"]){
        return [JSToNativeAccess flurry_endEvent:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setUserId"]){
        return [JSToNativeAccess flurry_setUserId:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setVersionName"]){
        return [JSToNativeAccess flurry_setVersionName:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setAge"]){
        return [JSToNativeAccess flurry_setAge:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setLogEnabled"]){
        return [JSToNativeAccess flurry_setLogEnabled:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setLogEvents"]){
        return [JSToNativeAccess flurry_setLogEvents:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setCaptureUncaughtExceptions"]){
        return [JSToNativeAccess flurry_setCaptureUncaughtExceptions:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setContinueSessionMillis"]){
        return [JSToNativeAccess flurry_setContinueSessionMillis:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setLocation"]){
        return [JSToNativeAccess flurry_setLocation:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"flurry_setGender"]){
        return [JSToNativeAccess flurry_setGender:[types componentsSeparatedByString:@"|"] andValues:[values componentsSeparatedByString:@"|"]];
    } else if([methodName isEqualToString:@"showPrivacy"]){
        return [JSToNativeAccess showPrivacy];
    }
    // Ad
    else if([methodName isEqualToString:@"admob_preloadAll"]){
        [[AdsManager getInstance] preloadAll];
        return @"";
    } else if([methodName isEqualToString:@"admob_preload"]){
        NSArray *params = [values componentsSeparatedByString:@"|"];
        [[AdsManager getInstance] preload:[[params objectAtIndex:0] intValue]];
        return @"";
    } else if([methodName isEqualToString:@"admob_show"]){
        NSArray *params = [values componentsSeparatedByString:@"|"];
        [[AdsManager getInstance] show:[[params objectAtIndex:0] intValue]];
        return @"";
    }  else if([methodName isEqualToString:@"admob_show"]){
        NSArray *params = [values componentsSeparatedByString:@"|"];
        [[AdsManager getInstance] hide:[[params objectAtIndex:0] intValue]];
        return @"";
    } else if([methodName isEqualToString:@"admob_isAvailable"]){
        NSArray *params = [values componentsSeparatedByString:@"|"];
        BOOL a = [[AdsManager getInstance] isAvailable:[[params objectAtIndex:0] intValue]];
        return a ? @"true" : @"false";
    }
    else {
        NSLog(@"方法还没实现:%@, 参数了类型:%@, 参数值:%@", methodName, types, values);
    }
    
    return @"";
}

+ (NSString*)methodsAccessByJson:(NSString*)methodName andArgJson:(NSString*)argJson
{
    if([methodName isEqualToString:@"fb_getCurAccessToken"]){
        return [JSToNativeAccess fb_getCurAccessToken];
    } else {
        NSLog(@"ByJson方法还没实现:%@, JSON值:%@", methodName, argJson);
    }
   return @"";
}

+ (NSObject*)parseArgVal:(NSString*)argvTypeList values:(NSString*)argvValueList
{
    
    return nil;
}

#pragma mark -Native Method
+ (NSString*)getNetworkState
{
    return [[NativeManager getInstance] isNetworkAvaliable] ? @"1" : @"-1";
}

+ (NSString*)showPrivacy
{
    [[NativeManager getInstance] showPrivacy];
    return @"";
}

#pragma mark -Flurry
+ (NSString*)flurry_event:(NSArray*)types andValues:(NSArray*)values
{
    NSString *event = [values objectAtIndex:0];
    NSDictionary *params = [Utility dictionaryWithJSONString:[values objectAtIndex:1]];
    BOOL timed = [[values objectAtIndex:2] boolValue];
    [[FlurryManager getInstance] logEvent:event withParameters:params timed:timed];
    return @"";
}

+ (NSString*)flurry_endEvent:(NSArray*)types andValues:(NSArray*)values
{
    NSString *event = [values objectAtIndex:0];
    NSDictionary *params = [Utility dictionaryWithJSONString:[values objectAtIndex:1]];
    [[FlurryManager getInstance] endEvent:event withParameters:params];
    return @"";
}

+ (NSString*)flurry_setUserId:(NSArray*)types andValues:(NSArray*)values
{
    [[FlurryManager getInstance] setUserId:[values objectAtIndex:0]];
    return @"";
}

+ (NSString*)flurry_setVersionName:(NSArray*)types andValues:(NSArray*)values
{
    NSString *versionName = [values objectAtIndex:0];
    [[FlurryManager getInstance] setVersionName:versionName];
    return @"";
}

+ (NSString*)flurry_setAge:(NSArray*)types andValues:(NSArray*)values
{
    int age = [[values objectAtIndex:0] intValue];
    [[FlurryManager getInstance] setAge:age];
    return @"";
}

+ (NSString*)flurry_setLogEnabled:(NSArray*)types andValues:(NSArray*)values
{
    BOOL e = [[values objectAtIndex:0] boolValue];
    [[FlurryManager getInstance] setLogEnabled:e];
    return @"";
}

+ (NSString*)flurry_setLogEvents:(NSArray*)types andValues:(NSArray*)values
{
    BOOL e = [[values objectAtIndex:0] boolValue];
    [[FlurryManager getInstance] setLogEvents:e];
    return @"";
}

+ (NSString*)flurry_setCaptureUncaughtExceptions:(NSArray*)types andValues:(NSArray*)values
{
    BOOL e = [[values objectAtIndex:0] boolValue];
    [[FlurryManager getInstance] setCaptureUncaughtExceptions:e];
    return @"";
}

+ (NSString*)flurry_setContinueSessionMillis:(NSArray*)types andValues:(NSArray*)values
{
    long long e = [[values objectAtIndex:0] longLongValue];
    [[FlurryManager getInstance] setContinueSessionMillis:e];
    return @"";
}

+ (NSString*)flurry_setLocation:(NSArray*)types andValues:(NSArray*)values
{
    double d1 = [[values objectAtIndex:0] doubleValue];
    double d2 = [[values objectAtIndex:1] doubleValue];
    [[FlurryManager getInstance] setLocation:d1 with:d2];
    return @"";
}

+ (NSString*)flurry_setGender:(NSArray*)types andValues:(NSArray*)values
{
    int e = [[values objectAtIndex:0] intValue];
    [[FlurryManager getInstance] setGender:e > 0 ? @"male" : @"female" ];
    return @"";
}

#pragma mark -Facebook
+ (NSString*)fb_login
{
    [[FaceBookManager getInstance] loginWithPermissions:@[@"public_profile", @"user_friends", @"email"]
                                             andHandler:^(FBSDKLoginManagerLoginResult* result, NSError *err){
                                                if(err){
                                                    [JSToNativeAccess emitEvent:@"fb_login_finished" andData:@"{code:1000,data:null}"];
                                                } else {
                                                    if (result.isCancelled) {
                                                        [JSToNativeAccess emitEvent:@"fb_login_finished" andData:@"{code:1001,data:null}"];
                                                    } else {
                                                        FBSDKAccessToken *t = result.token;
                                                        NSString *tokenStr = [JSToNativeAccess accessTokenToJSONString:t];
                                                        if([tokenStr isEqualToString:@""]){
                                                            NSString *format = @"{code:1,data:{version:1,user_id:%@,token:'%@',application_id:%@}}";
                                                            NSString *data = [NSString stringWithFormat:format, t.userID, t.tokenString, t.appID];
                                                            [JSToNativeAccess emitEvent:@"fb_login_finished" andData:data];
                                                        } else{
                                                            NSString *data = [NSString stringWithFormat:@"{code:0,data:%@}", tokenStr];
                                                            [JSToNativeAccess emitEvent:@"fb_login_finished" andData:data];
                                                        }
                                                    }
                                                }
                                            }];
    [JSToNativeAccess emitEvent:@"fb_login_start" andData:@"{code:0,data:null}"];
    return @"";
}

static long _graph_request_id = 0;
+ (NSString*)fb_graghRequest:(NSArray*)types andValues:(NSArray*)values
{
    _graph_request_id++;
    //
    NSString *callbackToken = [values objectAtIndex:1];
    // NSDictionary *params = [JSToNativeAccess stringToDictionary:[values objectAtIndex:2]];
    NSDictionary *params = [Utility dictionaryWithJSONString:[values objectAtIndex:2]];
    
    //
    [[FaceBookManager getInstance] graphRequest:[values objectAtIndex:0] parameters: params handler:^(FBSDKGraphRequestConnection *connection, id result, NSError *err) {
        NSString *errstr = @"null";
        NSString *datastr = @"null";
        if (err) {
            errstr = err.domain;
            NSLog(@"请求好友失败:%@", err);
        }
        if(result){
            // datastr = [JSToNativeAccess dictionaryToJSONString:result];
            datastr = [Utility dictionaryToJSONString:result];
            // NSLog(@"=>:%@", datastr);
        }
        //NSLog(@"==>datastr:%@", datastr);
        NSString * jsData = [NSString stringWithFormat:@"{code:0,_cbId:%ld,_cbtoken:'%@',error:'%@',data:%@}" ,_graph_request_id, callbackToken, errstr, datastr];
        [JSToNativeAccess emitEvent:@"fb_graph_response" andData:jsData];
    } httpMethod:@"GET" ];
    return [NSString stringWithFormat:@"%ld", _graph_request_id];
}

+ (NSString*)graghPostRequest:(NSArray*)types andValues:(NSArray*)values
{
    _graph_request_id++;
    //
    NSString *callbackToken = [values objectAtIndex:1];
    // NSDictionary *params = [JSToNativeAccess stringToDictionary:[values objectAtIndex:2]];
    NSDictionary *params = [Utility dictionaryWithJSONString:[values objectAtIndex:2]];
    NSLog(@"请求好友参数:%@", values);
    
    //
    [[FaceBookManager getInstance] graphRequest:[values objectAtIndex:0] parameters: params handler:^(FBSDKGraphRequestConnection *connection, id result, NSError *err) {
        NSString *errstr = @"null";
        NSString *datastr = @"null";
        if (err) {
            errstr = err.domain;
            NSLog(@"请求好友失败:%@", err);
        }
        if(result){
            // datastr = [JSToNativeAccess dictionaryToJSONString:result];
            datastr = [Utility dictionaryToJSONString:result];
            // NSLog(@"=>:%@", datastr);
        }
        //NSLog(@"==>datastr:%@", datastr);
        NSString * data = [NSString stringWithFormat:@"{code:0,_cbId:%ld,_cbtoken:'%@',error:'%@',data:%@}" ,_graph_request_id, callbackToken, errstr, datastr];
        NSLog(@"请求好友成功:%@", data);
        [JSToNativeAccess emitEvent:@"fb_graph_response" andData:data];
    } httpMethod:@"GET" ];
    return [NSString stringWithFormat:@"%ld", _graph_request_id];
}

+ (NSString*)fb_share:(NSArray*)types andValues:(NSArray*)values
{
    // NSDictionary *dict = [JSToNativeAccess stringToDictionary:[values objectAtIndex:0]];
    NSDictionary *dict = [Utility dictionaryWithJSONString:[values objectAtIndex:0]];
    
    NSString *contentTitle = dict[@"contentTitle"];
    NSString *contentDescription = dict[@"contentDescription"];
    NSString *contentUrl = dict[@"contentUrl"];
    NSString *quote = dict[@"quote"];
    NSString *imageUrl = dict[@"imageUrl"];
    NSString *placeId = dict[@"placeId"];
    NSString *ref = dict[@"ref"];
    NSArray *peopleIds = [Utility arrayWithJSONString:dict[@"peopleIds"]];
    // 修改成AppStore
    NSString *appleId = [[IDManager getInstance] getAppleID];
    contentUrl = [Utility getApplicationOnAppStoreHttpsLink:appleId];
    [[FaceBookManager getInstance] share:contentTitle
                             description:contentDescription
                              contentUrl:contentUrl
                                   quote:quote
                                imageUrl:imageUrl
                               peopleIds:peopleIds
                                 placeId:placeId
                                     ref:ref
                                delegate:[JSToNativeAccess getInstance]];
    [JSToNativeAccess emitEvent:@"fb_share_show" andData:@"{code:0}"];
    return @"";
}

+ (NSString*)fb_invite:(NSArray*)types andValues:(NSArray*)values
{
    [[FaceBookManager getInstance] invite:[values objectAtIndex:0]
                          previewImageUrl:[values objectAtIndex:1]
                           destinationIdx:[[values objectAtIndex:2] intValue]
                                promotTxt:[values objectAtIndex:3]
                               promotCode:[values objectAtIndex:4]
                                 delegate:nil];
    return @"";
}

+ (NSString*)fb_getCurAccessToken
{
    return [JSToNativeAccess accessTokenToJSONString:[[FaceBookManager getInstance] currentAccessToken]];
}

+ (NSString*)fb_getCurProfile
{
    FBSDKProfile *p = [[FaceBookManager getInstance] getCurrentProile];
    NSDictionary *dict = @{
                           @"id" : p.userID,
                           @"first_name" : p.firstName,
                           @"middle_name" : p.middleName,
                           @"last_name" : p.lastName,
                           @"name" : p.name,
                           @"link_uri" : [p.linkURL absoluteString]
                           };
    return [Utility dictionaryToJSONString:dict];
}

+ (NSString*)accessTokenToJSONString:(FBSDKAccessToken*)t
{
    //FBSDKAccessToken *t = [[FaceBookManager getInstance] currentAccessToken];
    if(!t){
        return @"";
    }
    NSTimeInterval ie = [t.expirationDate timeIntervalSince1970];
    long long expires = ie * 1000 ;
    NSTimeInterval ir = [t.refreshDate timeIntervalSince1970];
    long long refresh = ir * 1000 ;
    NSArray *permissions = [t.permissions allObjects];
    NSArray *declinedPermissions = [t.declinedPermissions allObjects];
    NSDictionary *dict = @{
                           @"version": [NSNumber numberWithInteger:1],
                           @"token": t.tokenString,
                           @"expires_at": [NSNumber numberWithLong:expires],
                           @"permissions": permissions,
                           @"declined_permissions": declinedPermissions,
                           @"last_refresh": [NSNumber numberWithLong:refresh],
                           // @"source": t.sour,
                           @"application_id": t.appID,
                           @"user_id": t.userID
                           };
    NSString *token = [Utility dictionaryToJSONString:dict];
    return token;
}

+ (NSString*)fb_logEvent:(NSArray*)types andValues:(NSArray*)values
{
    NSString *eventName = [values objectAtIndex:0];
    NSString *dictJson = [values objectAtIndex:1];
    double val = [[values objectAtIndex:2] doubleValue];
    if(eventName && ![eventName isEqualToString:@""]){
        if(dictJson && ![dictJson isEqualToString:@""]){
            NSDictionary *dict = [Utility dictionaryWithJSONString:dictJson];
            [[FaceBookManager getInstance] logEvent:eventName withParameters:dict];
        } else {
            if(val != 0.0){
                [[FaceBookManager getInstance] logEvent:eventName valueToSum:val];
            } else {
                [[FaceBookManager getInstance] logEvent:eventName];
            }
        }
    }
    
    return @"";
}

#pragma mark -内付费
+ (NSString*)gp_buy:(NSArray*)types andValues:(NSArray*)values
{
    NSString *sku = [values objectAtIndex:0];
    [[IAPurchaseManager getInstance] purchase:sku];
    return @"";
}


#pragma mark -JS Eval
+ (NSString*)emitEvent:(NSString*)event andData:(NSString*)data
{
    
    std::string _data = "null";
    if(data != nil){
        _data = [data UTF8String];
    }
    std::string _event = [event UTF8String];
    std::string eval = cocos2d::StringUtils::format("nv._java_emit_event(\"%s\", %s)", _event.c_str(), _data.c_str());
    ScriptingCore::getInstance()->evalString(eval.c_str());
    return @"";
}

#pragma mark -Native Log
+ (void)log_i:(NSString*)tag info:(NSString*)info
{
    NSLog(@"log_i->tag:%@\tinfo:%@", tag, info);
}

+ (void)log_w:(NSString*)tag info:(NSString*)info
{
    NSLog(@"log_w->tag:%@\tinfo:%@", tag, info);
}

+ (void)log_e:(NSString*)tag info:(NSString*)info
{
    NSLog(@"log_e->tag:%@\tinfo:%@", tag, info);
}

#pragma mark -Facebook的一些代理回调 重写方法
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results
{
    
}

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error
{
    
}

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results
{
    [JSToNativeAccess emitEvent:@"fb_share" andData:@"{code:0}"];
}

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error
{
    [JSToNativeAccess emitEvent:@"fb_share" andData:@"{code:1000}"];
}

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer
{
    [JSToNativeAccess emitEvent:@"fb_share" andData:@"{code:1}"];
}

#pragma mark -Purchase的一些代理回调 重写方法
- (void)purchaseSuccessful:(NSString*)pid
{
    NSString *data = [NSString stringWithFormat:@"{code:0, item:{sku:'%@',productId:'%@'}}", pid, pid];
    [JSToNativeAccess emitEvent:@"pays_purchase_finished" andData:data];
    [JSToNativeAccess emitEvent:@"pays_consume_finished" andData:data];
}

- (void)purchaseFailed:(NSString*)pid withErrorCode:(int)errorCode
{
    [JSToNativeAccess emitEvent:@"pays_purchase_finished" andData:@"{code:1001}"];
}

- (void)restoreSuccessful:(NSString*)pid
{
    NSString *data = [NSString stringWithFormat:@"{code:0, item:{sku:'%@',productId:'%@'}}", pid, pid];
    [JSToNativeAccess emitEvent:@"pays_purchase_finished" andData:data];
    [JSToNativeAccess emitEvent:@"pays_consume_finished" andData:data];
}

- (void)restoreFailed:(NSString*)pid withErrorCode:(int)errorCode
{
    [JSToNativeAccess emitEvent:@"pays_purchase_finished" andData:@"{code:1001}"];
}

- (void)restoreSuccessfulNotify:(BOOL)isPurchase
{
    
}

@end
