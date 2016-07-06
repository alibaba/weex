//
//  NSArray+PD_JSONObject.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/6/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "NSArray+PD_JSONObject.h"

@implementation NSArray (PD_JSONObject)

- (NSArray *)PD_JSONObject;
{
    NSMutableArray *ret = [[NSMutableArray alloc] initWithCapacity:self.count];
    
    for (id obj in self) {
        [ret addObject:[obj PD_JSONObject]];
    }
    
    return ret;
}

@end
