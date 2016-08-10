//
//  NSSet+PDRuntimePropertyDescriptor.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 2013-02-03.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "NSSet+PDRuntimePropertyDescriptor.h"
#import "NSObject+PDRuntimePropertyDescriptor.h"

#import "PDContainerIndex.h"
#import "PDRuntimeTypes.h"
#import "PDRuntimeDomainController.h"


#pragma mark - Implementation

@implementation NSSet (PDRuntimePropertyDescriptor)

- (id)PD_objectAtIndex:(NSUInteger)index;
{
    return [[self PD_sortedArrayRepresentation] objectAtIndex:index];
}

/**
 * Use this to get a consistent array ordering. Just sort by pointer value, since this won't change, and is 
 * cheap to access.
 */
- (NSArray *)PD_sortedArrayRepresentation;
{
    return [[self allObjects] sortedArrayUsingComparator:^NSComparisonResult(id obj1, id obj2) {
        if ((int)obj1 > (int)obj2) {
            return NSOrderedDescending;
        } else if ((int)obj1 < (int)obj2) {
            return NSOrderedAscending;
        }

        return NSOrderedSame;
    }];
}

/**
 * valueForKey behaves differently for NSArray/NSSet, so define our own behaviour to actually grab the 
 * array's value for a key.
 */
- (id)PD_valueForKey:(NSString *)key;
{
    if ([key isEqualToString:@"class"]) {
        return NSStringFromClass([self class]);
    } else if ([key isEqualToString:@"count"]) {
        return @(self.count);
    }

    return nil;
}

- (NSArray *)PD_propertiesForPropertyDescriptors;
{
    NSMutableArray *properties = [[NSMutableArray alloc] initWithCapacity:self.count];
    
    for (NSInteger index = 0; index < self.count; ++index) {
        NSString *name = [NSString stringWithFormat:@"%ld", (long)index];
        
        PDContainerIndex *containerIndex = [[PDContainerIndex alloc] initWithName:name index:index];
        [properties addObject:containerIndex];
    }

    [properties addObject:@"class"];
    [properties addObject:@"count"];

    return properties;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyObject:(NSObject *)property;
{
    PDRuntimePropertyDescriptor *descriptor = [super PD_propertyDescriptorForPropertyObject:property];
    if (!descriptor) {
        if ([property isKindOfClass:[PDContainerIndex class]]) {
            descriptor = [self PD_propertyDescriptorForSetContainerIndex:(PDContainerIndex *)property];
        }
    }
    
    return descriptor;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForSetContainerIndex:(PDContainerIndex *)containerIndex;
{
    PDRuntimePropertyDescriptor *descriptor = [[PDRuntimePropertyDescriptor alloc] init];
    
    id propertyValue = [self PD_objectAtIndex:containerIndex.index];
    
    PDRuntimeRemoteObject *remoteValueObject = [[PDRuntimeRemoteObject alloc] init];
    
    NSDictionary *propertyTypeDetails = PDRemoteObjectPropertyTypeDetailsForObject(propertyValue);
    remoteValueObject.type = [propertyTypeDetails objectForKey:@"type"];
    remoteValueObject.subtype = [propertyTypeDetails objectForKey:@"subtype"];
    remoteValueObject.classNameString = NSStringFromClass([propertyValue class]);
    if ([remoteValueObject.type isEqualToString:@"object"] && !remoteValueObject.subtype) {
        remoteValueObject.objectId = [[PDRuntimeDomainController defaultInstance] registerAndGetKeyForObject:propertyValue];
        remoteValueObject.objectDescription = remoteValueObject.classNameString;
    } else {
        remoteValueObject.value = propertyValue;
    }
    
    descriptor.name = containerIndex.name;
    descriptor.value = remoteValueObject;
    descriptor.writable = [NSNumber numberWithBool:NO];
    descriptor.configurable = [NSNumber numberWithBool:NO];
    descriptor.enumerable = [NSNumber numberWithBool:YES];
    descriptor.wasThrown = [NSNumber numberWithBool:NO];
    
    return descriptor;
}

@end
