//
//  PDDefinitions.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/7/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDefinitions.h"


NSString *const PDDebuggerErrorDomain = @"PDErrorDomain";
const NSInteger PDDebuggerUnimplementedDomainMethodErrorCode = 100;
const NSInteger PDDebuggerRequiredAttributeMissingCode = 101;

NSString *PDReturnTypeStringForEncodedType(NSString *string)
{
    const char *type = [string cStringUsingEncoding:NSASCIIStringEncoding];
    
    if (strcmp(type, @encode(id)) == 0) {
        return @"id";
    } else if (strcmp(type, @encode(BOOL)) == 0) {
        return @"BOOL";
    } else if (strcmp(type, @encode(NSInteger)) == 0) {
        return @"NSInteger";
    } else if (strcmp(type, @encode(NSUInteger)) == 0) {
        return @"NSUInteger";
    } else if (strcmp(type, @encode(NSTimeInterval)) == 0) {
        return @"NSTimeInterval";
    } else if (strcmp(type, @encode(char)) == 0) {
        return @"char";
    } else if (strcmp(type, @encode(int)) == 0) {
        return @"int";
    } else if (strcmp(type, @encode(short)) == 0) {
        return @"short";
    } else if (strcmp(type, @encode(float)) == 0) {
        return @"float";
    } else if (strcmp(type, @encode(double)) == 0) {
        return @"double";
    }
    
    return @"unknown";
}

NSDictionary *PDRemoteObjectPropertyTypeDetailsForObject(id object)
{
    NSString *type = nil;
    if (!object) {
        type = @"undefined";
    } else if ([object isKindOfClass:[NSNumber class]]) {
        NSNumber *number = object;
        if (strcmp(number.objCType, @encode(BOOL)) == 0) {
            type = @"boolean";
        } else {
            type = @"number";
        }
    } else if ([object isKindOfClass:[NSString class]]) {
        type = @"string";
    } else if ([object isKindOfClass:NSClassFromString(@"NSBlock")]) {
        type = @"function";
    }
    
    if (type) {
        return [NSDictionary dictionaryWithObject:type forKey:@"type"];
    }
    
    type = @"object";
    NSString *subtype = nil;
    
    if ([object isEqual:[NSNull null]]) {
        subtype = @"null";
    } else if ([object isKindOfClass:[NSArray class]] || [object isKindOfClass:[NSSet class]]) {
        subtype = @"array";
    } else if ([object isKindOfClass:[NSDate class]]) {
        subtype = @"date";
    } else if ([object isKindOfClass:[NSRegularExpression class]]) {
        subtype = @"regexp";
    }

    if (subtype) {
        return [NSDictionary dictionaryWithObjectsAndKeys:
            type, @"type",
            subtype, @"subtype",
            nil];
    }
    
    return [NSDictionary dictionaryWithObject:type forKey:@"type"];
}

NSDictionary *PDRemoteObjectPropertyTypeDetailsForPropertyDescription(NSPropertyDescription *description)
{
    if ([description isKindOfClass:[NSAttributeDescription class]]) {
        return PDRemoteObjectPropertyTypeDetailsForAttributeDescription((NSAttributeDescription *)description);
    } else if ([description isKindOfClass:[NSRelationshipDescription class]]) {
        return PDRemoteObjectPropertyTypeDetailsForRelationshipDescription((NSRelationshipDescription *)description);
    }
    
    return nil;
}

NSDictionary *PDRemoteObjectPropertyTypeDetailsForAttributeDescription(NSAttributeDescription *description)
{
    NSString *type = @"undefined";
    NSString *subtype = nil;
    
    switch (description.attributeType) {
        case NSInteger16AttributeType:
        case NSInteger32AttributeType:
        case NSInteger64AttributeType:
        case NSDecimalAttributeType:
        case NSDoubleAttributeType:
        case NSFloatAttributeType:
            type = @"number";
            break;
            
        case NSStringAttributeType:
            type = @"string";
            break;
            
        case NSBooleanAttributeType:
            type = @"boolean";
            break;
            
        case NSTransformableAttributeType:
            type = @"object";
            break;
            
        case NSDateAttributeType:
            type = @"object";
            subtype = @"date";
            break;
            
        case NSUndefinedAttributeType:
        case NSBinaryDataAttributeType:
        case NSObjectIDAttributeType:
            // Undefined.
            break;
    }
    
    if (!subtype) {
        return [NSDictionary dictionaryWithObject:type forKey:@"type"];
    }
    
    return [NSDictionary dictionaryWithObjectsAndKeys:
        type, @"type",
        subtype, @"subtype",
        nil];
}

NSDictionary *PDRemoteObjectPropertyTypeDetailsForRelationshipDescription(NSRelationshipDescription *description)
{
    // All relationships are objects.  It's an array if it's a to many relationship.
    if ([description isToMany]) {
        return [NSDictionary dictionaryWithObjectsAndKeys:
            @"object", @"type",
            @"array", @"subtype",
            nil];
    }
    
    return [NSDictionary dictionaryWithObject:@"object" forKey:@"type"];
}

NSDictionary *PDExtractPropertyAttributes(objc_property_t property)
{
    NSString *attributesString = [NSString stringWithCString:property_getAttributes(property) encoding:NSASCIIStringEncoding];
    NSArray *components = [attributesString componentsSeparatedByString:@","];

    // Find the custom getter.
    NSString *customGetter = nil;
    NSString *returnEncodeString = nil;
    for (NSString *component in components) {
        if ([component hasPrefix:@"G"]) {
            customGetter = [component substringFromIndex:1];
        } else if ([component hasPrefix:@"T"]) {
            returnEncodeString = [component substringFromIndex:1];
        }
    }

    if (!customGetter) {
        customGetter = [NSString stringWithCString:property_getName(property) encoding:NSASCIIStringEncoding];
    }

    if (!returnEncodeString) {
        return nil;
    }

    return @{
        @"getter": customGetter,
        @"return": returnEncodeString
    };
}
