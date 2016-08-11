//
//  PDCSSDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDCSSDomain.h"
#import "PDObject.h"
#import "PDCSSTypes.h"


@interface PDCSSDomain ()
//Commands

@end

@implementation PDCSSDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"CSS";
}

// Events

// Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features.
- (void)mediaQueryResultChanged;
{
    [self.debuggingServer sendEventWithName:@"CSS.mediaQueryResultChanged" parameters:nil];
}

// Fired whenever a stylesheet is changed as a result of the client operation.
- (void)styleSheetChangedWithStyleSheetId:(NSString *)styleSheetId;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (styleSheetId != nil) {
        [params setObject:[styleSheetId PD_JSONObject] forKey:@"styleSheetId"];
    }
    
    [self.debuggingServer sendEventWithName:@"CSS.styleSheetChanged" parameters:params];
}

// Fires when a Named Flow is created.
- (void)namedFlowCreatedWithDocumentNodeId:(NSNumber *)documentNodeId namedFlow:(NSString *)namedFlow;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (documentNodeId != nil) {
        [params setObject:[documentNodeId PD_JSONObject] forKey:@"documentNodeId"];
    }
    if (namedFlow != nil) {
        [params setObject:[namedFlow PD_JSONObject] forKey:@"namedFlow"];
    }
    
    [self.debuggingServer sendEventWithName:@"CSS.namedFlowCreated" parameters:params];
}

// Fires when a Named Flow is removed: has no associated content nodes and regions.
- (void)namedFlowRemovedWithDocumentNodeId:(NSNumber *)documentNodeId namedFlow:(NSString *)namedFlow;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (documentNodeId != nil) {
        [params setObject:[documentNodeId PD_JSONObject] forKey:@"documentNodeId"];
    }
    if (namedFlow != nil) {
        [params setObject:[namedFlow PD_JSONObject] forKey:@"namedFlow"];
    }
    
    [self.debuggingServer sendEventWithName:@"CSS.namedFlowRemoved" parameters:params];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"enable"] && [self.delegate respondsToSelector:@selector(domain:enableWithCallback:)]) {
        [self.delegate domain:self enableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"disable"] && [self.delegate respondsToSelector:@selector(domain:disableWithCallback:)]) {
        [self.delegate domain:self disableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"getMatchedStylesForNode"] && [self.delegate respondsToSelector:@selector(domain:getMatchedStylesForNodeWithNodeId:includePseudo:includeInherited:callback:)]) {
        [self.delegate domain:self getMatchedStylesForNodeWithNodeId:[params objectForKey:@"nodeId"] includePseudo:[params objectForKey:@"includePseudo"] includeInherited:[params objectForKey:@"includeInherited"] callback:^(NSArray *matchedCSSRules, NSArray *pseudoElements, NSArray *inherited, id error) {
            if (!matchedCSSRules) {
                responseCallback(nil, error);
                return;
            }
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

            if (matchedCSSRules != nil) {
                [params setObject:matchedCSSRules forKey:@"matchedCSSRules"];
            }
            if (pseudoElements != nil) {
                [params setObject:pseudoElements forKey:@"pseudoElements"];
            }
            if (inherited != nil) {
                [params setObject:inherited forKey:@"inherited"];
            }
            
            /*
            PDCSSCSSStyle *inlineStyle = [[PDCSSCSSStyle alloc] init];
            inlineStyle.styleSheetId = @"22222.2";
            inlineStyle.cssProperties = @[];
            inlineStyle.cssText = @"";
            inlineStyle.shorthandEntries = @[];
            PDCSSSourceRange *range = [[PDCSSSourceRange alloc] init];
            range.startLine = [NSNumber numberWithInt:0];
            range.endLine = [NSNumber numberWithInt:0];
            range.startColumn = [NSNumber numberWithInt:0];
            range.endColumn = [NSNumber numberWithInt:0];
            inlineStyle.range = range;
            
            [params setObject:[inlineStyle PD_JSONObject] forKey:@"inlineStyle"];
             */

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getInlineStylesForNode"] && [self.delegate respondsToSelector:@selector(domain:getInlineStylesForNodeWithNodeId:callback:)]) {
        [self.delegate domain:self getInlineStylesForNodeWithNodeId:[params objectForKey:@"nodeId"] callback:^(PDCSSCSSStyle *inlineStyle, PDCSSCSSStyle *attributesStyle, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (inlineStyle != nil) {
                [params setObject:inlineStyle forKey:@"inlineStyle"];
            }
            if (attributesStyle != nil) {
                [params setObject:attributesStyle forKey:@"attributesStyle"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getComputedStyleForNode"] && [self.delegate respondsToSelector:@selector(domain:getComputedStyleForNodeWithNodeId:callback:)]) {
        [self.delegate domain:self getComputedStyleForNodeWithNodeId:[params objectForKey:@"nodeId"] callback:^(NSArray *computedStyle, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (computedStyle != nil) {
                [params setObject:computedStyle forKey:@"computedStyle"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getAllStyleSheets"] && [self.delegate respondsToSelector:@selector(domain:getAllStyleSheetsWithCallback:)]) {
        [self.delegate domain:self getAllStyleSheetsWithCallback:^(NSArray *headers, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (headers != nil) {
                [params setObject:headers forKey:@"headers"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getStyleSheet"] && [self.delegate respondsToSelector:@selector(domain:getStyleSheetWithStyleSheetId:callback:)]) {
        [self.delegate domain:self getStyleSheetWithStyleSheetId:[params objectForKey:@"styleSheetId"] callback:^(PDCSSCSSStyleSheetBody *styleSheet, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (styleSheet != nil) {
                [params setObject:styleSheet forKey:@"styleSheet"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getStyleSheetText"] && [self.delegate respondsToSelector:@selector(domain:getStyleSheetTextWithStyleSheetId:callback:)]) {
        [self.delegate domain:self getStyleSheetTextWithStyleSheetId:[params objectForKey:@"styleSheetId"] callback:^(NSString *text, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (text != nil) {
                [params setObject:text forKey:@"text"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setStyleSheetText"] && [self.delegate respondsToSelector:@selector(domain:setStyleSheetTextWithStyleSheetId:text:callback:)]) {
        [self.delegate domain:self setStyleSheetTextWithStyleSheetId:[params objectForKey:@"styleSheetId"] text:[params objectForKey:@"text"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"setPropertyText"] && [self.delegate respondsToSelector:@selector(domain:setPropertyTextWithStyleId:propertyIndex:text:overwrite:callback:)]) {
        [self.delegate domain:self setPropertyTextWithStyleId:[params objectForKey:@"styleId"] propertyIndex:[params objectForKey:@"propertyIndex"] text:[params objectForKey:@"text"] overwrite:[params objectForKey:@"overwrite"] callback:^(PDCSSCSSStyle *style, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (style != nil) {
                [params setObject:style forKey:@"style"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"toggleProperty"] && [self.delegate respondsToSelector:@selector(domain:togglePropertyWithStyleId:propertyIndex:disable:callback:)]) {
        [self.delegate domain:self togglePropertyWithStyleId:[params objectForKey:@"styleId"] propertyIndex:[params objectForKey:@"propertyIndex"] disable:[params objectForKey:@"disable"] callback:^(PDCSSCSSStyle *style, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (style != nil) {
                [params setObject:style forKey:@"style"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setRuleSelector"] && [self.delegate respondsToSelector:@selector(domain:setRuleSelectorWithRuleId:selector:callback:)]) {
        [self.delegate domain:self setRuleSelectorWithRuleId:[params objectForKey:@"ruleId"] selector:[params objectForKey:@"selector"] callback:^(PDCSSCSSRule *rule, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (rule != nil) {
                [params setObject:rule forKey:@"rule"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"addRule"] && [self.delegate respondsToSelector:@selector(domain:addRuleWithContextNodeId:selector:callback:)]) {
        [self.delegate domain:self addRuleWithContextNodeId:[params objectForKey:@"contextNodeId"] selector:[params objectForKey:@"selector"] callback:^(PDCSSCSSRule *rule, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (rule != nil) {
                [params setObject:rule forKey:@"rule"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getSupportedCSSProperties"] && [self.delegate respondsToSelector:@selector(domain:getSupportedCSSPropertiesWithCallback:)]) {
        [self.delegate domain:self getSupportedCSSPropertiesWithCallback:^(NSArray *cssProperties, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (cssProperties != nil) {
                [params setObject:cssProperties forKey:@"cssProperties"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"forcePseudoState"] && [self.delegate respondsToSelector:@selector(domain:forcePseudoStateWithNodeId:forcedPseudoClasses:callback:)]) {
        [self.delegate domain:self forcePseudoStateWithNodeId:[params objectForKey:@"nodeId"] forcedPseudoClasses:[params objectForKey:@"forcedPseudoClasses"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"startSelectorProfiler"] && [self.delegate respondsToSelector:@selector(domain:startSelectorProfilerWithCallback:)]) {
        [self.delegate domain:self startSelectorProfilerWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"stopSelectorProfiler"] && [self.delegate respondsToSelector:@selector(domain:stopSelectorProfilerWithCallback:)]) {
        [self.delegate domain:self stopSelectorProfilerWithCallback:^(PDCSSSelectorProfile *profile, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (profile != nil) {
                [params setObject:profile forKey:@"profile"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getNamedFlowCollection"] && [self.delegate respondsToSelector:@selector(domain:getNamedFlowCollectionWithDocumentNodeId:callback:)]) {
        [self.delegate domain:self getNamedFlowCollectionWithDocumentNodeId:[params objectForKey:@"documentNodeId"] callback:^(NSArray *namedFlows, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (namedFlows != nil) {
                [params setObject:namedFlows forKey:@"namedFlows"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getFlowByName"] && [self.delegate respondsToSelector:@selector(domain:getFlowByNameWithDocumentNodeId:name:callback:)]) {
        [self.delegate domain:self getFlowByNameWithDocumentNodeId:[params objectForKey:@"documentNodeId"] name:[params objectForKey:@"name"] callback:^(PDCSSNamedFlow *namedFlow, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (namedFlow != nil) {
                [params setObject:namedFlow forKey:@"namedFlow"];
            }

            responseCallback(params, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDCSSDomain)

- (PDCSSDomain *)CSSDomain;
{
    return [self domainForName:@"CSS"];
}

@end
