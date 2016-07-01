//
//  PDConsoleDomain.h
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

@class PDConsoleConsoleMessage;

@protocol PDConsoleCommandDelegate;

// Console domain defines methods and events for interaction with the JavaScript console. Console collects messages created by means of the <a href='http://getfirebug.com/wiki/index.php/Console_API'>JavaScript Console API</a>. One needs to enable this domain using <code>enable</code> command in order to start receiving the console messages. Browser collects messages issued while console domain is not enabled as well and reports them using <code>messageAdded</code> notification upon enabling.
@interface PDConsoleDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDConsoleCommandDelegate, PDCommandDelegate> delegate;

// Events

// Issued when new console message is added.
// Param message: Console message that has been added.
- (void)messageAddedWithMessage:(PDConsoleConsoleMessage *)message;

// Issued when subsequent message(s) are equal to the previous one(s).
// Param count: New repeat count value.
- (void)messageRepeatCountUpdatedWithCount:(NSNumber *)count;

// Issued when console is cleared. This happens either upon <code>clearMessages</code> command or after page navigation.
- (void)messagesCleared;

@end

@protocol PDConsoleCommandDelegate <PDCommandDelegate>
@optional

// Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
- (void)domain:(PDConsoleDomain *)domain enableWithCallback:(void (^)(id error))callback;

// Disables console domain, prevents further console messages from being reported to the client.
- (void)domain:(PDConsoleDomain *)domain disableWithCallback:(void (^)(id error))callback;

// Clears console messages collected in the browser.
- (void)domain:(PDConsoleDomain *)domain clearMessagesWithCallback:(void (^)(id error))callback;

// Toggles monitoring of XMLHttpRequest. If <code>true</code>, console will receive messages upon each XHR issued.
// Param enabled: Monitoring enabled state.
- (void)domain:(PDConsoleDomain *)domain setMonitoringXHREnabledWithEnabled:(NSNumber *)enabled callback:(void (^)(id error))callback;

// Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
// Param nodeId: DOM node id to be accessible by means of $x command line API.
- (void)domain:(PDConsoleDomain *)domain addInspectedNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(id error))callback;
- (void)domain:(PDConsoleDomain *)domain addInspectedHeapObjectWithHeapObjectId:(NSNumber *)heapObjectId callback:(void (^)(id error))callback;

@end

@interface PDDebugger (PDConsoleDomain)

@property (nonatomic, readonly, strong) PDConsoleDomain *consoleDomain;

@end
