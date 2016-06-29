//
// Created by Simone Civetta on 01/08/14.
//

#import "NSData+PDDebugger.h"


@implementation NSData (PDDebugger)

+ (NSData *)emptyDataOfLength:(NSUInteger)length
{
    NSMutableData *theData = [NSMutableData dataWithCapacity:length];
    for (unsigned int i = 0 ; i < length/4 ; ++i) {
        u_int32_t randomBits = 0;
        [theData appendBytes:(void*)&randomBits length:4];
    }
    return theData;
}

@end