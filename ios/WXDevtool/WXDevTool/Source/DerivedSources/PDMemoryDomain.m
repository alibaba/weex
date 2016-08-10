//
//  PDMemoryDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDMemoryDomain.h"
#import "PDObject.h"
#import "PDMemoryTypes.h"


@interface PDMemoryDomain ()
//Commands

@end

@implementation PDMemoryDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Memory";
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"getDOMNodeCount"] && [self.delegate respondsToSelector:@selector(domain:getDOMNodeCountWithCallback:)]) {
        [self.delegate domain:self getDOMNodeCountWithCallback:^(NSArray *domGroups, PDMemoryStringStatistics *strings, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (domGroups != nil) {
                [params setObject:domGroups forKey:@"domGroups"];
            }
            if (strings != nil) {
                [params setObject:strings forKey:@"strings"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getProcessMemoryDistribution"] && [self.delegate respondsToSelector:@selector(domain:getProcessMemoryDistributionWithCallback:)]) {
        [self.delegate domain:self getProcessMemoryDistributionWithCallback:^(PDMemoryMemoryBlock *distribution, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (distribution != nil) {
                [params setObject:distribution forKey:@"distribution"];
            }

            responseCallback(params, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDMemoryDomain)

- (PDMemoryDomain *)memoryDomain;
{
    return [self domainForName:@"Memory"];
}

@end
