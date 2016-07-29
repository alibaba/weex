//
//  PDDebugger.h
//  PonyDebugger
//
//  Created by Mike Lewis on 11/5/11.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>
#import <WeexSDK/WXBridgeProtocol.h>

#pragma mark - Preprocessor

// Remote logging definitions. Use preprocessor hackery to make this work nicely.
#ifdef DEBUG
#define PDLog(...)                  _PDLog(@"log", ##__VA_ARGS__)
#define PDLogD(...)                 _PDLog(@"debug", ##__VA_ARGS__)
#define PDLogW(...)                 _PDLog(@"warning", ##__VA_ARGS__)
#define PDLogI(...)                 _PDLog(@"info", ##__VA_ARGS__)
#define PDLogE(...)                 _PDLog(@"error", ##__VA_ARGS__)
#define PDLogObjects(...)           _PDLogObjects(@"log", ##__VA_ARGS__)
#define _PDLog(sev, ...)            _PDLogObjectsImpl(sev, @[[NSString stringWithFormat:__VA_ARGS__]]);
#define _PDLogObjects(sev, ...)     _PDLogObjectsImpl(sev, @[__VA_ARGS__]);
#else
#define PDLog(...)
#define PDLogD(...)
#define PDLogW(...)
#define PDLogI(...)
#define PDLogE(...)
#define PDLogObjects(...)
#define _PDLog(sev, ...)
#define _PDLogObjects(sev, ...)
#endif



#pragma mark - Definitions

@class SRWebSocket;
@class PDDomainController;
@protocol PDPrettyStringPrinting;


extern void _PDLogObjectsImpl(NSString *severity, NSArray *arguments);


#pragma mark - Public Interface

@interface PDDebugger : NSObject <WXBridgeProtocol>

+ (PDDebugger *)defaultInstance;
+ (id) allocWithZone:(struct _NSZone *)zone;

- (void) coutLogWithLevel:(NSString *)level arguments:(NSArray *)arguments;

- (id)domainForName:(NSString *)name;
- (void)sendEventWithName:(NSString *)string parameters:(id)params;

#pragma mark Connect/Disconnect
- (void)autoConnect;
- (void)autoConnectToBonjourServiceNamed:(NSString*)serviceName;
- (void)connectToURL:(NSURL *)url;
- (BOOL)isConnected;
- (void)disconnect;

#pragma mark Network Debugging
- (void)enableNetworkTrafficDebugging;
- (void)forwardAllNetworkTraffic;
- (void)forwardNetworkTrafficFromDelegateClass:(Class)cls;
+ (void)registerPrettyStringPrinter:(id<PDPrettyStringPrinting>)prettyStringPrinter;
+ (void)unregisterPrettyStringPrinter:(id<PDPrettyStringPrinting>)prettyStringPrinter;

#pragma mark Core Data Debugging
- (void)enableCoreDataDebugging;
- (void)addManagedObjectContext:(NSManagedObjectContext *)context;
- (void)addManagedObjectContext:(NSManagedObjectContext *)context withName:(NSString *)name;
- (void)removeManagedObjectContext:(NSManagedObjectContext *)context;

#pragma mark View Hierarchy Debugging
- (void)enableViewHierarchyDebugging;
- (void)setDisplayedViewAttributeKeyPaths:(NSArray *)keyPaths;

#pragma mark Remote Logging
- (void)enableRemoteLogging;
- (void)clearConsole;

#pragma mark Remote Debugging
- (void)enableRemoteDebugger;
- (void)remoteDebuggertest;

#pragma mark Timeline
- (void)enableTimeline;

#pragma mark CSSStyle
- (void)enableCSSStyle;

#pragma mark openDevTool Debug
- (void)enableDevToolDebug;

#pragma mark - listenning on server
//- (void)serverStartWithHost:(NSString *)host port:(NSUInteger)port;


@end
