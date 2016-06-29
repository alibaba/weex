//
//  PDCSSTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDCSSTypes.h"

@implementation PDCSSCSSStyleId

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"styleSheetId",@"styleSheetId",
                    @"ordinal",@"ordinal",
                    nil];
    });

    return mappings;
}

@dynamic styleSheetId;
@dynamic ordinal;
 
@end

@implementation PDCSSCSSRuleId

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"styleSheetId",@"styleSheetId",
                    @"ordinal",@"ordinal",
                    nil];
    });

    return mappings;
}

@dynamic styleSheetId;
@dynamic ordinal;
 
@end

@implementation PDCSSPseudoIdRules

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"pseudoId",@"pseudoId",
                    @"rules",@"rules",
                    nil];
    });

    return mappings;
}

@dynamic pseudoId;
@dynamic rules;
 
@end

@implementation PDCSSInheritedStyleEntry

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"inlineStyle",@"inlineStyle",
                    @"matchedCSSRules",@"matchedCSSRules",
                    nil];
    });

    return mappings;
}

@dynamic inlineStyle;
@dynamic matchedCSSRules;
 
@end

@implementation PDCSSCSSStyleAttribute

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"style",@"style",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic style;
 
@end

@implementation PDCSSCSSStyleSheetHeader

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"styleSheetId",@"styleSheetId",
                    @"frameId",@"frameId",
                    @"sourceURL",@"sourceURL",
                    @"origin",@"origin",
                    @"title",@"title",
                    @"disabled",@"disabled",
                    nil];
    });

    return mappings;
}

@dynamic styleSheetId;
@dynamic frameId;
@dynamic sourceURL;
@dynamic origin;
@dynamic title;
@dynamic disabled;
 
@end

@implementation PDCSSCSSStyleSheetBody

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"styleSheetId",@"styleSheetId",
                    @"rules",@"rules",
                    @"text",@"text",
                    nil];
    });

    return mappings;
}

@dynamic styleSheetId;
@dynamic rules;
@dynamic text;
 
@end

@implementation PDCSSCSSRule

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"ruleId",@"ruleId",
                    @"styleSheetId",@"styleSheetId",
                    @"selectorText",@"selectorText",
                    @"selectorList",@"selectorList",
                    @"sourceURL",@"sourceURL",
                    @"sourceLine",@"sourceLine",
                    @"origin",@"origin",
                    @"style",@"style",
                    @"selectorRange",@"selectorRange",
                    @"media",@"media",
                    nil];
    });

    return mappings;
}

@dynamic ruleId;
@dynamic styleSheetId;
@dynamic selectorText;
@dynamic selectorList;
@dynamic sourceURL;
@dynamic sourceLine;
@dynamic origin;
@dynamic style;
@dynamic selectorRange;
@dynamic media;
 
@end

@implementation PDCSSSourceRange

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"startLine",@"startLine",
                    @"endLine",@"endLine",
                    @"startColumn",@"startColumn",
                    @"endColumn",@"endColumn",
                    nil];
    });

    return mappings;
}

//@dynamic start;
//@dynamic end;

@dynamic startLine;
@dynamic endLine;
@dynamic startColumn;
@dynamic endColumn;

@end

@implementation PDCSSShorthandEntry

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"value",@"value",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic value;
 
@end

@implementation PDCSSCSSPropertyInfo

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"longhands",@"longhands",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic longhands;
 
@end

@implementation PDCSSCSSComputedStyleProperty

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"value",@"value",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic value;
 
@end

@implementation PDCSSCSSStyle

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"styleId",@"styleId",
                    @"styleSheetId",@"styleSheetId",
                    @"cssProperties",@"cssProperties",
                    @"shorthandEntries",@"shorthandEntries",
                    @"cssText",@"cssText",
                    @"range",@"range",
                    @"width",@"width",
                    @"height",@"height",
                    nil];
    });

    return mappings;
}

@dynamic styleId;
@dynamic styleSheetId;
@dynamic cssProperties;
@dynamic shorthandEntries;
@dynamic cssText;
@dynamic range;
@dynamic width;
@dynamic height;
 
@end

@implementation PDCSSCSSProperty

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"value",@"value",
                    @"priority",@"priority",
                    @"implicit",@"implicit",
                    @"text",@"text",
                    @"parsedOk",@"parsedOk",
                    @"status",@"status",
                    @"range",@"range",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic value;
@dynamic priority;
@dynamic implicit;
@dynamic text;
@dynamic parsedOk;
@dynamic status;
@dynamic range;
 
@end

@implementation PDCSSCSSMedia

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"text",@"text",
                    @"source",@"source",
                    @"sourceURL",@"sourceURL",
                    @"sourceLine",@"sourceLine",
                    nil];
    });

    return mappings;
}

@dynamic text;
@dynamic source;
@dynamic sourceURL;
@dynamic sourceLine;
 
@end

@implementation PDCSSSelectorProfileEntry

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"selector",@"selector",
                    @"url",@"url",
                    @"lineNumber",@"lineNumber",
                    @"time",@"time",
                    @"hitCount",@"hitCount",
                    @"matchCount",@"matchCount",
                    nil];
    });

    return mappings;
}

@dynamic selector;
@dynamic url;
@dynamic lineNumber;
@dynamic time;
@dynamic hitCount;
@dynamic matchCount;
 
@end

@implementation PDCSSSelectorProfile

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"totalTime",@"totalTime",
                    @"data",@"data",
                    nil];
    });

    return mappings;
}

@dynamic totalTime;
@dynamic data;
 
@end

@implementation PDCSSRegion

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"regionOverset",@"regionOverset",
                    @"nodeId",@"nodeId",
                    nil];
    });

    return mappings;
}

@dynamic regionOverset;
@dynamic nodeId;
 
@end

@implementation PDCSSNamedFlow

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"documentNodeId",@"documentNodeId",
                    @"name",@"name",
                    @"overset",@"overset",
                    @"content",@"content",
                    @"regions",@"regions",
                    nil];
    });

    return mappings;
}

@dynamic documentNodeId;
@dynamic name;
@dynamic overset;
@dynamic content;
@dynamic regions;
 
@end

@implementation PDCSSSelectorListData

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"selectors",@"selectors",
                    @"text",@"text",
                    nil];
    });
    
    return mappings;
}
@dynamic selectors;
@dynamic text;

@end

