//
//  NSDictionary+PDRuntimePropertyDescriptor.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 2013-02-02.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "NSDictionary+PDRuntimePropertyDescriptor.h"
#import "NSObject+PDRuntimePropertyDescriptor.h"

#import "PDRuntimeTypes.h"


#pragma mark - Private Classes

@interface _PDDictionaryPropertyKey : NSObject

- (id)initWithKey:(id <NSCopying>)key stringRepresentation:(NSString *)stringKey;

@property (nonatomic, copy) id <NSCopying> key;
@property (nonatomic, copy) NSString *stringKey;

@end


#pragma mark - Implementation

@implementation NSDictionary (PDRuntimePropertyDescriptor)

- (NSArray *)PD_propertiesForPropertyDescriptors;
{
    NSMutableArray *properties = [[NSMutableArray alloc] initWithCapacity:self.count];
    
    [self enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        NSString *stringKey = [NSString stringWithFormat:@"%@", key];
        
        _PDDictionaryPropertyKey *containerIndex = [[_PDDictionaryPropertyKey alloc] initWithKey:key stringRepresentation:stringKey];
        [properties addObject:containerIndex];
    }];
    
    return properties;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyObject:(NSObject *)property;
{
    PDRuntimePropertyDescriptor *descriptor = [super PD_propertyDescriptorForPropertyObject:property];
    if (!descriptor) {
        if ([property isKindOfClass:[_PDDictionaryPropertyKey class]]) {
            descriptor = [self PD_propertyDescriptorForDictionaryContainerKey:(_PDDictionaryPropertyKey *)property];
        }
    }
    
    return descriptor;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForDictionaryContainerKey:(_PDDictionaryPropertyKey *)containerKey;
{
    PDRuntimePropertyDescriptor *descriptor = [[PDRuntimePropertyDescriptor alloc] init];
    
    id propertyValue = [self objectForKey:containerKey.key];
    
    descriptor.name = containerKey.stringKey;
    descriptor.value = [self PD_propertyDescriptorValueForObject:propertyValue];
    descriptor.writable = [NSNumber numberWithBool:NO];
    descriptor.configurable = [NSNumber numberWithBool:NO];
    descriptor.enumerable = [NSNumber numberWithBool:YES];
    descriptor.wasThrown = [NSNumber numberWithBool:NO];
    
    return descriptor;
}

@end


#pragma mark - _PDDictionaryPropertyKey

@implementation _PDDictionaryPropertyKey

@synthesize stringKey = _stringKey;
@synthesize key = _key;

- (id)initWithKey:(id<NSCopying>)key stringRepresentation:(NSString *)stringKey;
{
    if (!(self = [super self])) {
        return nil;
    }
    
    self.key = key;
    self.stringKey = stringKey;
    
    return self;
}

@end
