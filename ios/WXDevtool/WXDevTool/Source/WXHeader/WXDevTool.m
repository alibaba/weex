/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDevTool.h"
#import <WeexSDK/WXSDKEngine.h>
#import "PDDebugger.h"

static BOOL WXIsConnect;

@implementation WXDevTool

+ (void)setDebug:(BOOL)isDebug {
    WXIsConnect = isDebug;
}

+ (BOOL)isDebug {
    return WXIsConnect;
}

#pragma mark weex devtool
+ (void)launchDevToolDebugWithUrl:(NSString *)url {
    PDDebugger *debugger = [[PDDebugger alloc] init];
    //    [debugger serverStartWithHost:@"localhost" port:9009];
    
    // Enable Network debugging, and automatically track network traffic that comes through any classes that implement either NSURLConnectionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate or NSURLSessionDataDelegate methods.
    [debugger enableNetworkTrafficDebugging];
    [debugger forwardAllNetworkTraffic];
    
    // Enable Core Data debugging, and broadcast the main managed object context.
    //     [debugger enableCoreDataDebugging];
    //     [debugger addManagedObjectContext:self.managedObjectContext withName:@"PonyDebugger Test App MOC"];
    
    // Enable View Hierarchy debugging. This will swizzle UIView methods to monitor changes in the hierarchy
    // Choose a few UIView key paths to display as attributes of the dom nodes
    [debugger enableViewHierarchyDebugging];
    [debugger setDisplayedViewAttributeKeyPaths:@[@"frame", @"hidden", @"alpha", @"opaque", @"accessibilityLabel", @"text"]];
    
    // Enable remote logging to the DevTools Console via PDLog()/PDLogObjects().
    [debugger enableRemoteLogging];
    
    // Enable remote logging to the DevTools source.
    [debugger enableRemoteDebugger];
    //    [debugger remoteDebuggertest];
    
    [debugger enableTimeline];
    
    [debugger enableCSSStyle];

    [debugger enableDevToolDebug];
    
    [WXSDKEngine connectDevToolServer:url];
}

@end
