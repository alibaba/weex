/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "SRWebSocket+Weex.h"
static char wx_IdentifierKey;
static char wx_WebSocketDelegateKey;


@implementation SRWebSocket (Weex)

-(void)setWx_Identifier:(NSString *)wx_Identifier
{
    objc_setAssociatedObject(self, &wx_IdentifierKey, wx_Identifier, OBJC_ASSOCIATION_COPY);
}

-(NSString *)wx_Identifier
{
    return objc_getAssociatedObject(self, &wx_IdentifierKey);
}

-(void)setWx_WebSocketDelegate:(id<WXWebSocketDelegate>)wx_WebSocketDelegate
{
    objc_setAssociatedObject(self, &wx_WebSocketDelegateKey, wx_WebSocketDelegate, OBJC_ASSOCIATION_COPY);
}

-(NSString *)wx_WebSocketDelegate
{
    return objc_getAssociatedObject(self, &wx_WebSocketDelegateKey);
}

@end
