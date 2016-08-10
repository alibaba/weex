//
//  NSDate+PD_JSONObject.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/9/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "NSDate+PD_JSONObject.h"

@implementation NSDate (PD_JSONObject)

- (NSString *)PD_JSONObject;
{
    return self.description;
}

@end
