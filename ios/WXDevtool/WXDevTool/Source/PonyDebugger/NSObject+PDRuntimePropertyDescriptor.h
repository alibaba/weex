//
//  NSObject+PDRuntimePropertyDescriptor.h
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/7/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>
#import <objc/runtime.h>


@class PDRuntimeRemoteObject;
@class PDRuntimePropertyDescriptor;


@interface NSObject (PDRuntimePropertyDescriptor)

+ (PDRuntimeRemoteObject *)PD_remoteObjectRepresentationForObject:(id)object;

- (id)PD_valueForKey:(NSString *)key;

- (NSArray *)PD_propertiesForPropertyDescriptors;
- (NSArray *)PD_propertyDescriptors;

- (PDRuntimeRemoteObject *)PD_propertyDescriptorValueForSelector:(SEL)selector;
- (PDRuntimeRemoteObject *)PD_propertyDescriptorValueForObject:(id)object;

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyObject:(NSObject *)property;

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForSelector:(SEL)selector;
- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyName:(NSString *)propertyName property:(objc_property_t)property;

@end
