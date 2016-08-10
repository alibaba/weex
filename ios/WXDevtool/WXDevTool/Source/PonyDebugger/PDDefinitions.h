//
//  PDDefinitions.h
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/7/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <CoreData/CoreData.h>
#import <objc/runtime.h>

extern NSString *const PDDebuggerErrorDomain;
extern const NSInteger PDDebuggerUnimplementedDomainMethodErrorCode;
extern const NSInteger PDDebuggerRequiredAttributeMissingCode;

NSString *PDReturnTypeStringForEncodedType(NSString *string);

NSDictionary *PDRemoteObjectPropertyTypeDetailsForObject(id object);
NSDictionary *PDRemoteObjectPropertyTypeDetailsForValue(NSValue *value);

NSDictionary *PDRemoteObjectPropertyTypeDetailsForPropertyDescription(NSPropertyDescription *description);
NSDictionary *PDRemoteObjectPropertyTypeDetailsForAttributeDescription(NSAttributeDescription *description);
NSDictionary *PDRemoteObjectPropertyTypeDetailsForRelationshipDescription(NSRelationshipDescription *description);

NSDictionary *PDExtractPropertyAttributes(objc_property_t property);
