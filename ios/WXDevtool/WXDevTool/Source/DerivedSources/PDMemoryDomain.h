//
//  PDMemoryDomain.h
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDDebugger.h"
#import "PDDynamicDebuggerDomain.h"

@class PDMemoryMemoryBlock;
@class PDMemoryStringStatistics;

@protocol PDMemoryCommandDelegate;

@interface PDMemoryDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDMemoryCommandDelegate, PDCommandDelegate> delegate;

@end

@protocol PDMemoryCommandDelegate <PDCommandDelegate>
@optional
- (void)domain:(PDMemoryDomain *)domain getDOMNodeCountWithCallback:(void (^)(NSArray *domGroups, PDMemoryStringStatistics *strings, id error))callback;
// Callback Param distribution: An object describing all memory allocated by the process
- (void)domain:(PDMemoryDomain *)domain getProcessMemoryDistributionWithCallback:(void (^)(PDMemoryMemoryBlock *distribution, id error))callback;

@end

@interface PDDebugger (PDMemoryDomain)

@property (nonatomic, readonly, strong) PDMemoryDomain *memoryDomain;

@end
