//
//  PDPageDomainController.h
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/6/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PonyDebugger.h"
#import "PDPageDomain.h"


@interface PDPageDomainController : PDDomainController

+ (PDPageDomainController *)defaultInstance;

@property (nonatomic, strong) PDPageDomain *domain;

@end
