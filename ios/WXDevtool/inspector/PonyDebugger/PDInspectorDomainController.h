//
//  PDInspectorDomainController.h
//  PonyDebugger
//
//  Created by Ryan Olson on 2012-10-27.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PonyDebugger.h"
#import "PDInspectorDomain.h"

@interface PDInspectorDomainController : PDDomainController

@property (nonatomic, strong) PDInspectorDomain *domain;

+ (instancetype)defaultInstance;

@end
