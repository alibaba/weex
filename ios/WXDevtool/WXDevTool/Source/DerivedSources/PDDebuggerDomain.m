//
//  PDDebuggerDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDDebuggerDomain.h"
#import "PDObject.h"
#import "PDRuntimeTypes.h"
#import "PDDebuggerTypes.h"


@interface PDDebuggerDomain ()
//Commands

@end

@implementation PDDebuggerDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Debugger";
}

// Events

// Called when global has been cleared and debugger client should reset its state. Happens upon navigation or reload.
- (void)globalObjectCleared;
{
    [self.debuggingServer sendEventWithName:@"Debugger.globalObjectCleared" parameters:nil];
}

// Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
- (void)scriptParsedWithScriptId:(NSString *)scriptId url:(NSString *)url startLine:(NSNumber *)startLine startColumn:(NSNumber *)startColumn endLine:(NSNumber *)endLine endColumn:(NSNumber *)endColumn isContentScript:(NSNumber *)isContentScript sourceMapURL:(NSString *)sourceMapURL;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:8];

    if (scriptId != nil) {
        [params setObject:[scriptId PD_JSONObject] forKey:@"scriptId"];
    }
    if (url != nil) {
        [params setObject:[url PD_JSONObject] forKey:@"url"];
    }
    if (startLine != nil) {
        [params setObject:[startLine PD_JSONObject] forKey:@"startLine"];
    }
    if (startColumn != nil) {
        [params setObject:[startColumn PD_JSONObject] forKey:@"startColumn"];
    }
    if (endLine != nil) {
        [params setObject:[endLine PD_JSONObject] forKey:@"endLine"];
    }
    if (endColumn != nil) {
        [params setObject:[endColumn PD_JSONObject] forKey:@"endColumn"];
    }
    if (isContentScript != nil) {
        [params setObject:[isContentScript PD_JSONObject] forKey:@"isContentScript"];
    }
    if (sourceMapURL != nil) {
        [params setObject:[sourceMapURL PD_JSONObject] forKey:@"sourceMapURL"];
    }
    
    [self.debuggingServer sendEventWithName:@"Debugger.scriptParsed" parameters:params];
}

// Fired when virtual machine fails to parse the script.
- (void)scriptFailedToParseWithUrl:(NSString *)url scriptSource:(NSString *)scriptSource startLine:(NSNumber *)startLine errorLine:(NSNumber *)errorLine errorMessage:(NSString *)errorMessage;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:5];

    if (url != nil) {
        [params setObject:[url PD_JSONObject] forKey:@"url"];
    }
    if (scriptSource != nil) {
        [params setObject:[scriptSource PD_JSONObject] forKey:@"scriptSource"];
    }
    if (startLine != nil) {
        [params setObject:[startLine PD_JSONObject] forKey:@"startLine"];
    }
    if (errorLine != nil) {
        [params setObject:[errorLine PD_JSONObject] forKey:@"errorLine"];
    }
    if (errorMessage != nil) {
        [params setObject:[errorMessage PD_JSONObject] forKey:@"errorMessage"];
    }
    
    [self.debuggingServer sendEventWithName:@"Debugger.scriptFailedToParse" parameters:params];
}

// Fired when breakpoint is resolved to an actual script and location.
- (void)breakpointResolvedWithBreakpointId:(NSString *)breakpointId location:(PDDebuggerLocation *)location;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (breakpointId != nil) {
        [params setObject:[breakpointId PD_JSONObject] forKey:@"breakpointId"];
    }
    if (location != nil) {
        [params setObject:[location PD_JSONObject] forKey:@"location"];
    }
    
    [self.debuggingServer sendEventWithName:@"Debugger.breakpointResolved" parameters:params];
}

// Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
- (void)pausedWithCallFrames:(NSArray *)callFrames reason:(NSString *)reason data:(NSDictionary *)data;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (callFrames != nil) {
        [params setObject:[callFrames PD_JSONObject] forKey:@"callFrames"];
    }
    if (reason != nil) {
        [params setObject:[reason PD_JSONObject] forKey:@"reason"];
    }
    if (data != nil) {
        [params setObject:[data PD_JSONObject] forKey:@"data"];
    }
    
    [self.debuggingServer sendEventWithName:@"Debugger.paused" parameters:params];
}

// Fired when the virtual machine resumed execution.
- (void)resumed;
{
    [self.debuggingServer sendEventWithName:@"Debugger.resumed" parameters:nil];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"causesRecompilation"] && [self.delegate respondsToSelector:@selector(domain:causesRecompilationWithCallback:)]) {
        [self.delegate domain:self causesRecompilationWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"supportsSeparateScriptCompilationAndExecution"] && [self.delegate respondsToSelector:@selector(domain:supportsSeparateScriptCompilationAndExecutionWithCallback:)]) {
        [self.delegate domain:self supportsSeparateScriptCompilationAndExecutionWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"enable"] && [self.delegate respondsToSelector:@selector(domain:enableWithCallback:)]) {
        [self.delegate domain:self enableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"disable"] && [self.delegate respondsToSelector:@selector(domain:disableWithCallback:)]) {
        [self.delegate domain:self disableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"setBreakpointsActive"] && [self.delegate respondsToSelector:@selector(domain:setBreakpointsActiveWithActive:callback:)]) {
        [self.delegate domain:self setBreakpointsActiveWithActive:[params objectForKey:@"active"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"setBreakpointByUrl"] && [self.delegate respondsToSelector:@selector(domain:setBreakpointByUrlWithLineNumber:url:urlRegex:columnNumber:condition:callback:)]) {
        [self.delegate domain:self setBreakpointByUrlWithLineNumber:[params objectForKey:@"lineNumber"] url:[params objectForKey:@"url"] urlRegex:[params objectForKey:@"urlRegex"] columnNumber:[params objectForKey:@"columnNumber"] condition:[params objectForKey:@"condition"] callback:^(NSString *breakpointId, NSArray *locations, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (breakpointId != nil) {
                [params setObject:breakpointId forKey:@"breakpointId"];
            }
            if (locations != nil) {
                [params setObject:locations forKey:@"locations"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setBreakpoint"] && [self.delegate respondsToSelector:@selector(domain:setBreakpointWithLocation:condition:callback:)]) {
        [self.delegate domain:self setBreakpointWithLocation:[params objectForKey:@"location"] condition:[params objectForKey:@"condition"] callback:^(NSString *breakpointId, PDDebuggerLocation *actualLocation, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (breakpointId != nil) {
                [params setObject:breakpointId forKey:@"breakpointId"];
            }
            if (actualLocation != nil) {
                [params setObject:actualLocation forKey:@"actualLocation"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"removeBreakpoint"] && [self.delegate respondsToSelector:@selector(domain:removeBreakpointWithBreakpointId:callback:)]) {
        [self.delegate domain:self removeBreakpointWithBreakpointId:[params objectForKey:@"breakpointId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"continueToLocation"] && [self.delegate respondsToSelector:@selector(domain:continueToLocationWithLocation:callback:)]) {
        [self.delegate domain:self continueToLocationWithLocation:[params objectForKey:@"location"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"stepOver"] && [self.delegate respondsToSelector:@selector(domain:stepOverWithCallback:)]) {
        [self.delegate domain:self stepOverWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"stepInto"] && [self.delegate respondsToSelector:@selector(domain:stepIntoWithCallback:)]) {
        [self.delegate domain:self stepIntoWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"stepOut"] && [self.delegate respondsToSelector:@selector(domain:stepOutWithCallback:)]) {
        [self.delegate domain:self stepOutWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"pause"] && [self.delegate respondsToSelector:@selector(domain:pauseWithCallback:)]) {
        [self.delegate domain:self pauseWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"resume"] && [self.delegate respondsToSelector:@selector(domain:resumeWithCallback:)]) {
        [self.delegate domain:self resumeWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"searchInContent"] && [self.delegate respondsToSelector:@selector(domain:searchInContentWithScriptId:query:caseSensitive:isRegex:callback:)]) {
        [self.delegate domain:self searchInContentWithScriptId:[params objectForKey:@"scriptId"] query:[params objectForKey:@"query"] caseSensitive:[params objectForKey:@"caseSensitive"] isRegex:[params objectForKey:@"isRegex"] callback:^(NSArray *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"canSetScriptSource"] && [self.delegate respondsToSelector:@selector(domain:canSetScriptSourceWithCallback:)]) {
        [self.delegate domain:self canSetScriptSourceWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setScriptSource"] && [self.delegate respondsToSelector:@selector(domain:setScriptSourceWithScriptId:scriptSource:preview:callback:)]) {
        [self.delegate domain:self setScriptSourceWithScriptId:[params objectForKey:@"scriptId"] scriptSource:[params objectForKey:@"scriptSource"] preview:[params objectForKey:@"preview"] callback:^(NSArray *callFrames, NSDictionary *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (callFrames != nil) {
                [params setObject:callFrames forKey:@"callFrames"];
            }
            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"restartFrame"] && [self.delegate respondsToSelector:@selector(domain:restartFrameWithCallFrameId:callback:)]) {
        [self.delegate domain:self restartFrameWithCallFrameId:[params objectForKey:@"callFrameId"] callback:^(NSArray *callFrames, NSDictionary *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (callFrames != nil) {
                [params setObject:callFrames forKey:@"callFrames"];
            }
            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getScriptSource"] && [self.delegate respondsToSelector:@selector(domain:getScriptSourceWithScriptId:callback:)]) {
        [self.delegate domain:self getScriptSourceWithScriptId:[params objectForKey:@"scriptId"] callback:^(NSString *scriptSource, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (scriptSource != nil) {
                [params setObject:scriptSource forKey:@"scriptSource"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getFunctionDetails"] && [self.delegate respondsToSelector:@selector(domain:getFunctionDetailsWithFunctionId:callback:)]) {
        [self.delegate domain:self getFunctionDetailsWithFunctionId:[params objectForKey:@"functionId"] callback:^(PDDebuggerFunctionDetails *details, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (details != nil) {
                [params setObject:details forKey:@"details"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setPauseOnExceptions"] && [self.delegate respondsToSelector:@selector(domain:setPauseOnExceptionsWithState:callback:)]) {
        [self.delegate domain:self setPauseOnExceptionsWithState:[params objectForKey:@"state"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"evaluateOnCallFrame"] && [self.delegate respondsToSelector:@selector(domain:evaluateOnCallFrameWithCallFrameId:expression:objectGroup:includeCommandLineAPI:doNotPauseOnExceptionsAndMuteConsole:returnByValue:callback:)]) {
        [self.delegate domain:self evaluateOnCallFrameWithCallFrameId:[params objectForKey:@"callFrameId"] expression:[params objectForKey:@"expression"] objectGroup:[params objectForKey:@"objectGroup"] includeCommandLineAPI:[params objectForKey:@"includeCommandLineAPI"] doNotPauseOnExceptionsAndMuteConsole:[params objectForKey:@"doNotPauseOnExceptionsAndMuteConsole"] returnByValue:[params objectForKey:@"returnByValue"] callback:^(PDRuntimeRemoteObject *result, NSNumber *wasThrown, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }
            if (wasThrown != nil) {
                [params setObject:wasThrown forKey:@"wasThrown"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"compileScript"] && [self.delegate respondsToSelector:@selector(domain:compileScriptWithExpression:sourceURL:callback:)]) {
        [self.delegate domain:self compileScriptWithExpression:[params objectForKey:@"expression"] sourceURL:[params objectForKey:@"sourceURL"] callback:^(NSString *scriptId, NSString *syntaxErrorMessage, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (scriptId != nil) {
                [params setObject:scriptId forKey:@"scriptId"];
            }
            if (syntaxErrorMessage != nil) {
                [params setObject:syntaxErrorMessage forKey:@"syntaxErrorMessage"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"runScript"] && [self.delegate respondsToSelector:@selector(domain:runScriptWithScriptId:contextId:objectGroup:doNotPauseOnExceptionsAndMuteConsole:callback:)]) {
        [self.delegate domain:self runScriptWithScriptId:[params objectForKey:@"scriptId"] contextId:[params objectForKey:@"contextId"] objectGroup:[params objectForKey:@"objectGroup"] doNotPauseOnExceptionsAndMuteConsole:[params objectForKey:@"doNotPauseOnExceptionsAndMuteConsole"] callback:^(PDRuntimeRemoteObject *result, NSNumber *wasThrown, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }
            if (wasThrown != nil) {
                [params setObject:wasThrown forKey:@"wasThrown"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setOverlayMessage"] && [self.delegate respondsToSelector:@selector(domain:setOverlayMessageWithMessage:callback:)]) {
        [self.delegate domain:self setOverlayMessageWithMessage:[params objectForKey:@"message"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDDebuggerDomain)

- (PDDebuggerDomain *)debuggerDomain;
{
    return [self domainForName:@"Debugger"];
}

@end
