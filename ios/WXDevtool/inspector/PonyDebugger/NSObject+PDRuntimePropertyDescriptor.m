//
//  NSObject+PDRuntimePropertyDescriptor.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/7/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "NSObject+PDRuntimePropertyDescriptor.h"

#import "PDDefinitions.h"
#import "PDRuntimeDomainController.h"
#import "PDRuntimeTypes.h"


#pragma mark - Definitions

NSDictionary *PDExtractPropertyAttributes(objc_property_t property);


#pragma mark - Implementation

@implementation NSObject (PDRuntimePropertyDescriptor)

#pragma mark - Class Methods

+ (PDRuntimeRemoteObject *)PD_remoteObjectRepresentationForObject:(id)object;
{
    id propertyValue = object;
    if ([propertyValue class] == propertyValue) {
        propertyValue = NSStringFromClass(propertyValue);
    }
    
    NSDictionary *propertyTypeDetails = PDRemoteObjectPropertyTypeDetailsForObject(propertyValue);
    
    PDRuntimeRemoteObject *remoteValueObject = [[PDRuntimeRemoteObject alloc] init];
    remoteValueObject.type = [propertyTypeDetails objectForKey:@"type"];
    remoteValueObject.subtype = [propertyTypeDetails objectForKey:@"subtype"];
    remoteValueObject.classNameString = NSStringFromClass([propertyValue class]);

    if ([remoteValueObject.type isEqualToString:@"object"]) {
        if (propertyValue) {
            if (!remoteValueObject.subtype) {
                remoteValueObject.objectId = [[PDRuntimeDomainController defaultInstance] registerAndGetKeyForObject:propertyValue];
            } else if ([remoteValueObject.subtype isEqualToString:@"array"]) {
                remoteValueObject.objectId = [[PDRuntimeDomainController defaultInstance] registerAndGetKeyForObject:propertyValue];
                remoteValueObject.objectDescription = [NSString stringWithFormat:@"%@ <count = %@>", [propertyValue class], @([propertyValue count])];
            } else if ([remoteValueObject.subtype isEqualToString:@"date"]) {
                NSDate *date = propertyValue;
                remoteValueObject.value = [date description];
                remoteValueObject.objectDescription = @"";
            } else if ([remoteValueObject.subtype isEqualToString:@"regexp"]) {
                NSRegularExpression *regEx = propertyValue;
                remoteValueObject.value = regEx.pattern;
                remoteValueObject.objectDescription = @"";
            }
            
            if (!remoteValueObject.objectDescription) {
                remoteValueObject.objectDescription = [NSString stringWithFormat:@"%@ %@", [propertyValue class], [propertyValue description]];
            }
        }
    } else {
        remoteValueObject.value = propertyValue;
    }
    
    if (!propertyValue) {
        remoteValueObject.value = [NSNull null];
        remoteValueObject.type = @"object";
        remoteValueObject.subtype = @"null";
    }
    
    return remoteValueObject;
}

#pragma mark - Instance Methods

- (id)PD_valueForKey:(NSString *)key;
{
    return [self valueForKey:key];
}

- (NSArray *)PD_propertiesForPropertyDescriptors;
{
    NSMutableArray *array = [[NSMutableArray alloc] init];
    [array addObject:@"class"];

    unsigned int outCount, i;
    objc_property_t *properties = class_copyPropertyList([self class], &outCount);
    for (i = 0; i < outCount; i++) {
    	objc_property_t property = properties[i];
    	const char *propName = property_getName(property);
    	if (propName) {
    		NSString *propertyName = [NSString stringWithCString:propName encoding:NSASCIIStringEncoding];
            [array addObject:propertyName];
    	}
    }
    
    free(properties);

    return array;
}

- (NSArray *)PD_propertyDescriptors;
{
    NSArray *properties = [self PD_propertiesForPropertyDescriptors];
    NSMutableArray *descriptors = [[NSMutableArray alloc] initWithCapacity:properties.count];
    for (NSObject *property in properties) {
        PDRuntimePropertyDescriptor *descriptor = [self PD_propertyDescriptorForPropertyObject:property];
        if (descriptor) {
            [descriptors addObject:descriptor];
        }
    }
    
    return descriptors;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyObject:(NSObject *)property;
{
    PDRuntimePropertyDescriptor *descriptor = nil;
    if ([property isKindOfClass:[NSString class]]) {
        NSString *propertyName = (NSString *)property;
        
        objc_property_t propertyDefinition = class_getProperty([self class], [propertyName cStringUsingEncoding:NSASCIIStringEncoding]);
        if (propertyDefinition != NULL) {
            descriptor = [self PD_propertyDescriptorForPropertyName:propertyName property:propertyDefinition];
        } else {
            SEL selector = NSSelectorFromString(propertyName);
            if (selector != nil) {
                descriptor = [self PD_propertyDescriptorForSelector:selector];
            }
        }
    }
    
    return descriptor;
}

- (PDRuntimeRemoteObject *)PD_propertyDescriptorValueForSelector:(SEL)selector;
{
    id value = [self PD_valueForKey:NSStringFromSelector(selector)];

    PDRuntimeRemoteObject *remoteValueObject = [self PD_propertyDescriptorValueForObject:value];
    
    // Determine the real class name.
    static const int retValueBufferSize = 32;
    char retVal[retValueBufferSize];
    
    Method method = class_getInstanceMethod([self class], selector);
    method_getReturnType(method, retVal, retValueBufferSize);
    NSString *encodedReturnType = [[NSString alloc] initWithBytes:retVal length:retValueBufferSize encoding:NSASCIIStringEncoding];
    NSString *returnType = PDReturnTypeStringForEncodedType(encodedReturnType);
    
    if ([returnType isEqualToString:@"id"]) {
        remoteValueObject.classNameString = NSStringFromClass([value class]);
    } else {
        remoteValueObject.classNameString = returnType;
    }
    
    return remoteValueObject;
}

- (PDRuntimeRemoteObject *)PD_propertyDescriptorValueForObject:(id)object;
{
    PDRuntimeRemoteObject *remoteValueObject = [[self class] PD_remoteObjectRepresentationForObject:object];
    return remoteValueObject;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForSelector:(SEL)selector;
{
    if (![self respondsToSelector:selector]) {
        return nil;
    }
    
    PDRuntimePropertyDescriptor *descriptor = [[PDRuntimePropertyDescriptor alloc] init];
    
    descriptor.name = NSStringFromSelector(selector);
    descriptor.value = [self PD_propertyDescriptorValueForSelector:selector];
    descriptor.writable = [NSNumber numberWithBool:NO];
    descriptor.configurable = [NSNumber numberWithBool:NO];
    descriptor.enumerable = [NSNumber numberWithBool:NO];
    descriptor.wasThrown = [NSNumber numberWithBool:NO];
    
    return descriptor;
}

- (PDRuntimePropertyDescriptor *)PD_propertyDescriptorForPropertyName:(NSString *)propertyName property:(objc_property_t)property
{
    id object = nil;
    @try {
        object = [self valueForKey:propertyName];
    } @catch (NSException *exception) {
        // valueForKey won't work for certain types (like selectors, pointers, blocks).
        // TODO: Make introspection for primitive types work.
        object = @"<PDDebugger: unsupported type>";
    }

    PDRuntimePropertyDescriptor *descriptor = [[PDRuntimePropertyDescriptor alloc] init];

    descriptor.name = propertyName;
    descriptor.value = [self PD_propertyDescriptorValueForObject:object];
    descriptor.writable = [NSNumber numberWithBool:NO];
    descriptor.configurable = [NSNumber numberWithBool:NO];
    descriptor.enumerable = [NSNumber numberWithBool:YES];
    descriptor.wasThrown = [NSNumber numberWithBool:NO];
    
    return descriptor;
}

@end


