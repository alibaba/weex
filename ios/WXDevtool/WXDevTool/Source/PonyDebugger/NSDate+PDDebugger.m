//
//  NSDate+PDDebugger.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 2013-01-30.
//
//

#import "NSDate+PDDebugger.h"

@implementation NSDate (PDDebugger)

+ (NSNumber *)PD_timestamp;
{
    return [NSNumber numberWithDouble:[[NSDate date] timeIntervalSince1970]];
}

@end
