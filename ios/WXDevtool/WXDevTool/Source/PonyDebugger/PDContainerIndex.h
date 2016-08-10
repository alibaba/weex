//
//  PDContainerIndex.h
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 2013-04-28.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <Foundation/Foundation.h>


#pragma mark - Public Interface

@interface PDContainerIndex : NSObject

- (id)initWithName:(NSString *)name index:(NSInteger)index;

@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) NSInteger index;

@end

