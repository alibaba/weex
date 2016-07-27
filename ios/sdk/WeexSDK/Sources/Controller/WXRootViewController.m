/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXRootViewController.h"
#import "WXBaseViewController.h"
#import "WXThreadSafeMutableArray.h"

typedef void(^OperationBlock)(void);

@interface WXRootViewController()

@property(nonatomic, strong) WXThreadSafeMutableArray *operationArray;
@property (nonatomic, assign) BOOL operationInProcess;

@end

@implementation WXRootViewController

- (id)initWithSourceURL:(NSURL *)sourceURL
{
    WXBaseViewController *baseViewController = [[WXBaseViewController alloc]initWithSourceURL:sourceURL];
    
    return [super initWithRootViewController:baseViewController];
}

//reduced pop/push animation in iOS 7
- (UIViewController *)popViewControllerAnimated:(BOOL)animated
{
    if (WX_SYS_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0"))
        return [super popViewControllerAnimated:animated];
    
    __weak typeof(self) weakSelf = self;
    [self addOperationBlock:^{
        if ([self.viewControllers count] > 0 ) {
            UIViewController *viewController = [super popViewControllerAnimated:NO];
            if (!viewController) {
                weakSelf.operationInProcess = NO;
            }
        }
    }];
    
    return nil;
}

- (NSArray<UIViewController *> *)popToViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    if (WX_SYS_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0"))
        return [super popToViewController:viewController animated:animated];
    
    __weak typeof(self) weakSelf = self;
    [self addOperationBlock:^{
        if ([weakSelf.viewControllers containsObject:viewController]) {
            NSArray *viewControllers = [super popToViewController:viewController animated:NO];
            if (viewControllers.count == 0) {
                weakSelf.operationInProcess = NO;
            }
        } else {
            weakSelf.operationInProcess = NO;
        }
    }];
    
    return nil;
}

- (NSArray<UIViewController *> *)popToRootViewControllerAnimated:(BOOL)animated
{
    if (WX_SYS_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0"))
        return [super popToRootViewControllerAnimated:animated];
    
    __weak typeof(self) weakSelf = self;
    [self addOperationBlock:^{
        NSArray *viewControllers = [super popToRootViewControllerAnimated:NO];
        if (viewControllers.count == 0) {
            weakSelf.operationInProcess = NO;
        }
    }];
    return nil;
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    if (WX_SYS_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0"))
        return [super pushViewController:viewController animated:animated];
    
    [self addOperationBlock:^{
        [super pushViewController:viewController animated:NO];
    }];
}

- (void)addOperationBlock:(OperationBlock)operation
{
    
    if (self.operationInProcess && [self.operationArray count]) {
        [self.operationArray addObject:[operation copy]];
    } else {
        _operationInProcess = YES;
        operation();
    }
}

- (NSMutableArray *)pendingBlocks
{
    
    if (nil == _operationArray) {
        _operationArray = [[WXThreadSafeMutableArray alloc] init];
    }
    
    return _operationArray;
}

@end
