//
//  PDDatabaseDomainController.h
//  PonyDebugger
//
//  Created by Mike Lewis on 2/29/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDomainController.h"
#import "PDIndexedDBDomain.h"
#import "PDIndexedDBTypes.h"

@class NSManagedObjectContext;

@interface PDIndexedDBDomainController : PDDomainController <PDIndexedDBCommandDelegate>

@property (nonatomic, strong) PDIndexedDBDomain *domain;

+ (PDIndexedDBDomainController *)defaultInstance;

- (void)addManagedObjectContext:(NSManagedObjectContext *)context;
- (void)addManagedObjectContext:(NSManagedObjectContext *)context withName:(NSString *)name;

- (void)removeManagedObjectContext:(NSManagedObjectContext *)context;

@end
