/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "UIViewController+WXDemoNaviBar.h"
#import "WXScannerVC.h"
#import "WXScannerHistoryVC.h"
#import "WXDefine.h"
#import <objc/runtime.h>

@implementation UIViewController (WXDemoNaviBar)

- (void)setupNaviBar
{
    UIScreenEdgePanGestureRecognizer *edgePanGestureRecognizer = [[UIScreenEdgePanGestureRecognizer alloc] initWithTarget:self action:@selector(edgePanGesture:)];
    edgePanGestureRecognizer.delegate = self;
    edgePanGestureRecognizer.edges = UIRectEdgeLeft;
    [self.view addGestureRecognizer:edgePanGestureRecognizer];
    
    NSArray *ver = [[UIDevice currentDevice].systemVersion componentsSeparatedByString:@"."];
    if ([[ver objectAtIndex:0] intValue] >= 7) {
        // iOS 7.0 or later
        self.navigationController.navigationBar.barTintColor = WEEX_COLOR;
        self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
        [self.navigationController.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]}];
        self.navigationController.navigationBar.translucent = NO;
    }
    if (!self.navigationItem.leftBarButtonItem) {
        UIBarButtonItem *leftItem;
        if(![[self.navigationController.viewControllers objectAtIndex:0] isEqual:self]) {
            leftItem = [self backButtonItem];
        } else {
            leftItem = [self leftBarButtonItem];
        }
        self.navigationItem.leftBarButtonItems = @[leftItem];
    }
    if ([self isKindOfClass:[WXScannerVC class]]) {
        UIBarButtonItem *historyItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"scan_history"]
                                                          style:UIBarButtonItemStylePlain
                                                         target:self
                                                         action:@selector(historyButtonClicked:)];
        self.navigationItem.rightBarButtonItems = @[historyItem];
    }
    if([self isKindOfClass:[WXScannerHistoryVC class]]) {
        UIBarButtonItem *historyItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"delete"]
                                                                        style:UIBarButtonItemStylePlain
                                                                       target:self
                                                                       action:@selector(clearScannerHistory:)];
        self.navigationItem.rightBarButtonItems = @[historyItem];
    }
}

- (void)edgePanGesture:(UIScreenEdgePanGestureRecognizer*)edgePanGestureRecognizer
{
    [self.navigationController popViewControllerAnimated:YES];
}

#pragma mark- UIGestureRecognizerDelegate
- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
{
    if (self.navigationController && [self.navigationController.viewControllers count] == 1) {
        return NO;
    }
    return YES;
}

#pragma mark -
#pragma mark - UIBarButtonItems

- (UIBarButtonItem *)leftBarButtonItem
{
    UIBarButtonItem *leftItem = objc_getAssociatedObject(self, _cmd);
    
    if (!leftItem) {
        leftItem = [[UIBarButtonItem alloc]
                    initWithImage:[UIImage imageNamed:@"scan"]
                     style:UIBarButtonItemStylePlain
                    target:self
                    action:@selector(scanQR:)];
        leftItem.accessibilityHint = @"click to scan qr code";
        leftItem.accessibilityValue = @"scan qr code";
        objc_setAssociatedObject(self, _cmd, leftItem, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return leftItem;
}

- (UIBarButtonItem *)backButtonItem
{
    UIBarButtonItem *backButtonItem = objc_getAssociatedObject(self, _cmd);
    if (!backButtonItem) {
        backButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"back"]
                                                          style:UIBarButtonItemStylePlain
                                                         target:self
                                                         action:@selector(backButtonClicked:)];
        objc_setAssociatedObject(self, _cmd, backButtonItem, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return backButtonItem;
}

#pragma mark -
#pragma mark - UIBarButtonItem actions

- (void)scanQR:(id)sender {
    
    WXScannerVC * scanViewController = [[WXScannerVC alloc] init];
    [self.navigationController pushViewController:scanViewController animated:YES];
}

- (void)backButtonClicked:(id)sender {
    
    [self.navigationController popViewControllerAnimated:YES];
}

- (void)historyButtonClicked:(id)sender {
    
    [self.navigationController pushViewController:[WXScannerHistoryVC new] animated:YES];
}

- (void)clearScannerHistory:(id)sender {
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:WX_SCANNER_HISTORY];
}

@end
