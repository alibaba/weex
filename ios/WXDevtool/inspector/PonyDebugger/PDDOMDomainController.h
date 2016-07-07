//
//  PDDOMDomainController.h
//  PonyDebugger
//
//  Created by Ryan Olson on 2012-09-19.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PonyDebugger.h"
#import "PDDOMDomain.h"
#import "PDDOMTypes.h"
#import <UIKit/UIKit.h>

@interface PDDOMDomainController : PDDomainController <PDDOMCommandDelegate>

@property (nonatomic, strong) PDDOMDomain *domain;

@property (nonatomic, strong) PDDOMNode *rootDomNode;

+ (PDDOMDomainController *)defaultInstance;
+ (void)startMonitoringUIViewChanges;

// The key paths will be reflected as attributes of the DOM node
// Note that support is currently limited to CGPoint, CGSize, CGRect, and numeric types (including BOOL).
// ex @[@"frame", @"bounds", @"alpha", @"hidden"]
@property (nonatomic, strong) NSArray *viewKeyPathsToDisplay;

// These should only be used by the swizzled UIView observing methods
- (void)removeView:(UIView *)view;
- (void)addView:(UIView *)view;

- (PDDOMNode *)rootNode;

@end
