/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
