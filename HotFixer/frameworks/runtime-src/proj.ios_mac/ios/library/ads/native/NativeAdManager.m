//
//  NativeAdManager.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "NativeAdManager.h"
#import "INativeAdAccess.h"
#import "NativeAdAdmob.h"

@implementation NativeAdManager

//@synthesize adArray = _adArray;

static NativeAdManager *_instance = nil;

+ (instancetype)getInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[self alloc] init];
    });
    
    return _instance;
}

+ (void)pure
{
    if(_instance){
        [_instance release];
        _instance = nil;
    }
}

- (BOOL)setUpEnvironment:(UIViewController*)viewController withQueue:(NSArray*)queue andDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withQueue:queue andDebug:debug];
    INativeAdAccess *adomb = [[NativeAdAdmob alloc] init];
    [(NativeAdAdmob*)adomb setRootView:self.rootView];
    [adomb setUpEnvironment:viewController withDebug:debug];
    [self.adArray addObject:adomb];
    return YES;
}

- (void)showNativeRoot:(UIViewController*)viewController
{
    [self setViewController:viewController];
    if(self.rootView == nil){
        self.rootView = [[UIView alloc] initWithFrame:[Utility screenRect]];
        self.rootView.backgroundColor = [UIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:0.8];
        [viewController.view addSubview:self.rootView];
    }
    
}

@end
