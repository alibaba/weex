/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "SRWebSocket+Weex.h"
static char identifierKey;

@implementation SRWebSocket (Weex)

-(void)setIdentifier:(NSString *)identifier
{
    objc_setAssociatedObject(self, &identifierKey, identifier, OBJC_ASSOCIATION_COPY);
}

-(NSString *)identifier
{
    return objc_getAssociatedObject(self, &identifierKey);
}

@end
