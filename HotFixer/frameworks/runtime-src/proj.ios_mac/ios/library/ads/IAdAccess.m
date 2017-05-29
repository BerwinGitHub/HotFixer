//
//  IAdAccess.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "IAdAccess.h"

@implementation IAdAccess

- (BOOL)setUpEnvironment:(BOOL)debug
{
    
    return NO;
}

- (void)preload
{
    
}

- (BOOL)show
{

    return NO;
}

- (void)hide
{
    
}

- (void)showLog:(NSObject*) msg
{
    if ([self debug]) {
        NSLog(@"Ads\t:%@", msg);
    }
}

@end
