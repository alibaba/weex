//
//  NSManagedObject+PDRuntimePropertyDescriptor.h
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/7/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <CoreData/CoreData.h>


@class PDRuntimeRemoteObject;
@class PDRuntimePropertyDescriptor;


@interface NSManagedObject (PDRuntimePropertyDescriptor)

- (NSArray *)PD_propertiesForPropertyDescriptors;
- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyObject:(NSObject *)property;

- (PDRuntimeRemoteObject *)PD_propertyDescriptorValueForPropertyDescription:(NSPropertyDescription *)property;

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyDescription:(NSPropertyDescription *)property;

@end
