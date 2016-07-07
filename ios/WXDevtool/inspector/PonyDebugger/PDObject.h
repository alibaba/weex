//
//  PDObject.h
//  PonyDebugger
//
//  Created by Mike Lewis on 11/6/11.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <Foundation/Foundation.h>
#import "PDDefinitions.h"


@interface NSObject (PD_JSONObject)

- (id)PD_JSONObjectCopy;
- (id)PD_JSONObject;

@end


/**
 * Subclasses must implement the copying and mutable copying protocols
 */
@interface PDObject : NSObject <NSCopying>

@property (nonatomic, copy, readonly) NSDictionary *store;

+ (NSDictionary *)keysToEncode;

- (id)PD_JSONObject;

- (BOOL)validate:(NSError **)error;
- (id)valueForKey:(NSString *)key;
- (void)setValue:(id)value forKey:(NSString *)key;

@end


