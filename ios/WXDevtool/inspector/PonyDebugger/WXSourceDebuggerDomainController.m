/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSourceDebuggerDomainController.h"

@implementation WXSourceDebuggerDomainController
@dynamic domain;

+ (WXSourceDebuggerDomainController *)defaultInstance {
    static WXSourceDebuggerDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[WXSourceDebuggerDomainController alloc] init];
    });
    return defaultInstance;
}

- (void)remoteDebuggerControllerTest {
    [self.domain globalObjectCleared];
}

- (void)getScriptSourceTreeWithId:(NSString *)scriptId
                              url:(NSString *)url
                  isContentScript:(NSNumber *)isContentScript
                     sourceMapURL:(NSString *)sourceMapURL {
    [self.domain scriptParsedWithScriptId:scriptId url:url startLine:[NSNumber numberWithInt:0] startColumn:[NSNumber numberWithInt:0] endLine:[NSNumber numberWithInt:0] endColumn:[NSNumber numberWithInt:0] isContentScript:isContentScript sourceMapURL:sourceMapURL];
}

+ (Class)domainClass {
    return [PDDebuggerDomain class];
}

#pragma mark - PDDebuggerCommandDelegate
- (void)domain:(PDDebuggerDomain *)domain causesRecompilationWithCallback:(void (^)(NSNumber *result, id error))callback {
    callback([NSNumber numberWithBool:YES],nil);
}

// Tells whether debugger supports separate script compilation and execution.
// Callback Param result: True if debugger supports separate script compilation and execution.
- (void)domain:(PDDebuggerDomain *)domain supportsSeparateScriptCompilationAndExecutionWithCallback:(void (^)(NSNumber *result, id error))callback {
    callback([NSNumber numberWithBool:YES],nil);
}

// Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received.
- (void)domain:(PDDebuggerDomain *)domain enableWithCallback:(void (^)(id error))callback {
    callback(nil);
//    [self.domain scriptParsedWithScriptId:@"100"
//                                      url:@"index.js"
//                                startLine:[NSNumber numberWithInteger:0]
//                              startColumn:nil
//                                  endLine:nil
//                                endColumn:nil
//                          isContentScript:[NSNumber numberWithInteger:1]
//                             sourceMapURL:[[NSURL URLWithString:@"http://30.10.216.186:12580/examples/build/index.js"] absoluteString]];
}

// Disables debugger for given page.
- (void)domain:(PDDebuggerDomain *)domain disableWithCallback:(void (^)(id error))callback {
    
}

// Activates / deactivates all breakpoints on the page.
// Param active: New value for breakpoints active state.
- (void)domain:(PDDebuggerDomain *)domain setBreakpointsActiveWithActive:(NSNumber *)active callback:(void (^)(id error))callback {
    
}

// Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
// Param lineNumber: Line number to set breakpoint at.
// Param url: URL of the resources to set breakpoint on.
// Param urlRegex: Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified.
// Param columnNumber: Offset in the line to set breakpoint at.
// Param condition: Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
// Callback Param breakpointId: Id of the created breakpoint for further reference.
// Callback Param locations: List of the locations this breakpoint resolved into upon addition.
- (void)domain:(PDDebuggerDomain *)domain setBreakpointByUrlWithLineNumber:(NSNumber *)lineNumber url:(NSString *)url urlRegex:(NSString *)urlRegex columnNumber:(NSNumber *)columnNumber condition:(NSString *)condition callback:(void (^)(NSString *breakpointId, NSArray *locations, id error))callback {
    
}

// Sets JavaScript breakpoint at a given location.
// Param location: Location to set breakpoint in.
// Param condition: Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
// Callback Param breakpointId: Id of the created breakpoint for further reference.
// Callback Param actualLocation: Location this breakpoint resolved into.
- (void)domain:(PDDebuggerDomain *)domain setBreakpointWithLocation:(PDDebuggerLocation *)location condition:(NSString *)condition callback:(void (^)(NSString *breakpointId, PDDebuggerLocation *actualLocation, id error))callback {
    
}

// Removes JavaScript breakpoint.
- (void)domain:(PDDebuggerDomain *)domain removeBreakpointWithBreakpointId:(NSString *)breakpointId callback:(void (^)(id error))callback {
    
}

// Continues execution until specific location is reached.
// Param location: Location to continue to.
- (void)domain:(PDDebuggerDomain *)domain continueToLocationWithLocation:(PDDebuggerLocation *)location callback:(void (^)(id error))callback {
    
}

// Steps over the statement.
- (void)domain:(PDDebuggerDomain *)domain stepOverWithCallback:(void (^)(id error))callback {
    
}

// Steps into the function call.
- (void)domain:(PDDebuggerDomain *)domain stepIntoWithCallback:(void (^)(id error))callback {
    
}

// Steps out of the function call.
- (void)domain:(PDDebuggerDomain *)domain stepOutWithCallback:(void (^)(id error))callback {
    
}

// Stops on the next JavaScript statement.
- (void)domain:(PDDebuggerDomain *)domain pauseWithCallback:(void (^)(id error))callback {
    
}

// Resumes JavaScript execution.
- (void)domain:(PDDebuggerDomain *)domain resumeWithCallback:(void (^)(id error))callback {
    
}

// Searches for given string in script content.
// Param scriptId: Id of the script to search in.
// Param query: String to search for.
// Param caseSensitive: If true, search is case sensitive.
// Param isRegex: If true, treats string parameter as regex.
// Callback Param result: List of search matches.
- (void)domain:(PDDebuggerDomain *)domain searchInContentWithScriptId:(NSString *)scriptId query:(NSString *)query caseSensitive:(NSNumber *)caseSensitive isRegex:(NSNumber *)isRegex callback:(void (^)(NSArray *result, id error))callback {
    
}

// Tells whether <code>setScriptSource</code> is supported.
// Callback Param result: True if <code>setScriptSource</code> is supported.
- (void)domain:(PDDebuggerDomain *)domain canSetScriptSourceWithCallback:(void (^)(NSNumber *result, id error))callback {
    callback([NSNumber numberWithBool:YES],nil);
}

// Edits JavaScript source live.
// Param scriptId: Id of the script to edit.
// Param scriptSource: New content of the script.
// Param preview:  If true the change will not actually be applied. Preview mode may be used to get result description without actually modifying the code.
// Callback Param callFrames: New stack trace in case editing has happened while VM was stopped.
// Callback Param result: VM-specific description of the changes applied.
- (void)domain:(PDDebuggerDomain *)domain setScriptSourceWithScriptId:(NSString *)scriptId scriptSource:(NSString *)scriptSource preview:(NSNumber *)preview callback:(void (^)(NSArray *callFrames, NSDictionary *result, id error))callback {
    
}

// Restarts particular call frame from the beginning.
// Param callFrameId: Call frame identifier to evaluate on.
// Callback Param callFrames: New stack trace.
// Callback Param result: VM-specific description.
- (void)domain:(PDDebuggerDomain *)domain restartFrameWithCallFrameId:(NSString *)callFrameId callback:(void (^)(NSArray *callFrames, NSDictionary *result, id error))callback {
    
}

// Returns source for the script with given id.
// Param scriptId: Id of the script to get source for.
// Callback Param scriptSource: Script source.
- (void)domain:(PDDebuggerDomain *)domain getScriptSourceWithScriptId:(NSString *)scriptId callback:(void (^)(NSString *scriptSource, id error))callback {
    NSCache *responseCache = [[PDNetworkDomainController defaultInstance] getNetWorkResponseCache];
    NSDictionary *response = [responseCache objectForKey:scriptId];
    callback([response objectForKey:@"body"], nil);
}

// Returns detailed informtation on given function.
// Param functionId: Id of the function to get location for.
// Callback Param details: Information about the function.
- (void)domain:(PDDebuggerDomain *)domain getFunctionDetailsWithFunctionId:(NSString *)functionId callback:(void (^)(PDDebuggerFunctionDetails *details, id error))callback {
    
}

// Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
// Param state: Pause on exceptions mode.
- (void)domain:(PDDebuggerDomain *)domain setPauseOnExceptionsWithState:(NSString *)state callback:(void (^)(id error))callback {
    
}

// Evaluates expression on a given call frame.
// Param callFrameId: Call frame identifier to evaluate on.
// Param expression: Expression to evaluate.
// Param objectGroup: String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>).
// Param includeCommandLineAPI: Specifies whether command line API should be available to the evaluated expression, defaults to false.
// Param doNotPauseOnExceptionsAndMuteConsole: Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.
// Param returnByValue: Whether the result is expected to be a JSON object that should be sent by value.
// Callback Param result: Object wrapper for the evaluation result.
// Callback Param wasThrown: True if the result was thrown during the evaluation.
- (void)domain:(PDDebuggerDomain *)domain evaluateOnCallFrameWithCallFrameId:(NSString *)callFrameId expression:(NSString *)expression objectGroup:(NSString *)objectGroup includeCommandLineAPI:(NSNumber *)includeCommandLineAPI doNotPauseOnExceptionsAndMuteConsole:(NSNumber *)doNotPauseOnExceptionsAndMuteConsole returnByValue:(NSNumber *)returnByValue callback:(void (^)(PDRuntimeRemoteObject *result, NSNumber *wasThrown, id error))callback {
    
}

// Compiles expression.
// Param expression: Expression to compile.
// Param sourceURL: Source url to be set for the script.
// Callback Param scriptId: Id of the script.
// Callback Param syntaxErrorMessage: Syntax error message if compilation failed.
- (void)domain:(PDDebuggerDomain *)domain compileScriptWithExpression:(NSString *)expression sourceURL:(NSString *)sourceURL callback:(void (^)(NSString *scriptId, NSString *syntaxErrorMessage, id error))callback {
    
}

// Runs script with given id in a given context.
// Param scriptId: Id of the script to run.
// Param contextId: Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
// Param objectGroup: Symbolic group name that can be used to release multiple objects.
// Param doNotPauseOnExceptionsAndMuteConsole: Specifies whether script run should stop on exceptions and mute console. Overrides setPauseOnException state.
// Callback Param result: Run result.
// Callback Param wasThrown: True if the result was thrown during the script run.
- (void)domain:(PDDebuggerDomain *)domain runScriptWithScriptId:(NSString *)scriptId contextId:(NSNumber *)contextId objectGroup:(NSString *)objectGroup doNotPauseOnExceptionsAndMuteConsole:(NSNumber *)doNotPauseOnExceptionsAndMuteConsole callback:(void (^)(PDRuntimeRemoteObject *result, NSNumber *wasThrown, id error))callback {
    
}

// Sets overlay message.
// Param message: Overlay message to display when paused in debugger.
- (void)domain:(PDDebuggerDomain *)domain setOverlayMessageWithMessage:(NSString *)message callback:(void (^)(id error))callback {
    
}

@end
