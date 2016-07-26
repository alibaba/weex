/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXCSSDomainController.h"
#import "PDDOMDomainController.h"
#import "PDCSSTypes.h"

@implementation WXCSSDomainController
@dynamic domain;

+ (WXCSSDomainController *)defaultInstance {
    static WXCSSDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[WXCSSDomainController alloc] init];
    });
    return defaultInstance;
}

+ (Class)domainClass {
    return [PDCSSDomain class];
}

#pragma mark - private method
- (PDDOMNode *)p_getNodeFromNodeId:(NSNumber *)nodeId rootNode:(PDDOMNode *)rootNode{
    if (!rootNode) {
        return nil;
    }
    if ([nodeId longValue] == [rootNode.nodeId longValue]) {
        return rootNode;
    }
    if (rootNode.children.count > 0) {
        for (PDDOMNode *node in rootNode.children) {
            if ([node.nodeId longValue] == [nodeId longValue]) {
                return node;
            }else {
                PDDOMNode *returnNode = [self p_getNodeFromNodeId:nodeId rootNode:node];
                if (returnNode) {
                    return returnNode;
                }
            }
        }
    }
    return nil;
}

- (NSArray *)p_formateFrame:(NSString *)frameStr {
    NSCharacterSet *characterSet1 = [NSCharacterSet characterSetWithCharactersInString:@"{},"];
    NSArray *array = [frameStr componentsSeparatedByCharactersInSet:characterSet1];
    NSMutableArray *position = [NSMutableArray array];
    for(NSString *string in array)
    {
        NSString *removeFrame = [string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
        if ([removeFrame length] > 0) {
            [position addObject:removeFrame];
        }
    }
    return position;
}

#pragma mark - PDCSSCommandDelegate
- (void)domain:(PDCSSDomain *)domain getMatchedStylesForNodeWithNodeId:(NSNumber *)nodeId includePseudo:(NSNumber *)includePseudo includeInherited:(NSNumber *)includeInherited callback:(void (^)(NSArray *matchedCSSRules, NSArray *pseudoElements, NSArray *inherited, id error))callback {
    
    NSArray *inherited = @[];
    NSArray *pseudoElements = @[];
    
    //assembling object of rule
    PDDOMNode *rootDomNode = [PDDOMDomainController defaultInstance].rootDomNode;
    PDDOMNode *node = [self p_getNodeFromNodeId:nodeId rootNode:rootDomNode];
    if (!node) {
        rootDomNode = [PDDOMDomainController defaultInstance].rootNode;
        node = [self p_getNodeFromNodeId:nodeId rootNode:rootDomNode];
        if (!node) {
            callback(nil,pseudoElements,inherited,nil);
            return;
        }
    }
    PDCSSSelectorListData *selectorData = [[PDCSSSelectorListData alloc] init];
    selectorData.text = node.nodeName;
    selectorData.selectors = @[@{@"text":node.nodeName}];
    
    //assembling object of cssStyle
    PDCSSCSSStyle *style = [[PDCSSCSSStyle alloc] init];
    NSMutableArray *cssProperties = [NSMutableArray array];
    NSMutableString *cssText = [[NSMutableString alloc] init];
    for (int i = 0; i < node.attributes.count; i++) {
        if (i & 1) {
            if (![node.attributes[i-1] isEqualToString:@"frame"]) {
                PDCSSCSSProperty *cssProperty = [[PDCSSCSSProperty alloc] init];
                [cssText appendFormat:@"%@;",node.attributes[i]];
                cssProperty.name = node.attributes[i-1];
                cssProperty.value = node.attributes[i];
                [cssProperties addObject:[cssProperty PD_JSONObject]];
            }else {
                NSArray *names = @[@"width",@"height",@"top",@"left"];
                NSArray *position = [self p_formateFrame:node.attributes[i]];
                if (position.count == 4) {
                    NSDictionary *property = @{@"left":position[0],
                                               @"top":position[1],
                                               @"width":position[2],
                                               @"height":position[3]};
                    for (int i = 0; i < property.count; i++) {
                        PDCSSCSSProperty *cssProperty = [[PDCSSCSSProperty alloc] init];
                        cssProperty.name = names[i];
                        cssProperty.value = property[names[i]];
                        [cssText appendString:[NSString stringWithFormat:@"%@:%@;",cssProperty.name,cssProperty.value]];
                        [cssProperties addObject:[cssProperty PD_JSONObject]];
                    }
                }
            }
        }else {
            if (![node.attributes[i] isEqualToString:@"frame"]) {
                [cssText appendFormat:@"%@:",node.attributes[i]];
            }
        }
    }
    style.shorthandEntries = @[];
    style.cssText = cssText;
    style.cssProperties = [NSArray arrayWithArray:cssProperties];
    
    PDCSSCSSRule *rule = [[PDCSSCSSRule alloc] init];
    rule.media = @[];
    rule.origin = @"inspector";
    rule.selectorList = selectorData;
    rule.style = style;
    if ([rule PD_JSONObject]) {
        NSDictionary *ruleMatch = @{@"matchingSelectors":@[[NSNumber numberWithInteger:0]],@"rule":[rule PD_JSONObject]};
        NSArray *matchCSSRules = @[ruleMatch];
        callback(matchCSSRules,pseudoElements,inherited,nil);
    }else {
        callback(nil,pseudoElements,inherited,nil);
    }
}

- (void)domain:(PDCSSDomain *)domain getInlineStylesForNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(PDCSSCSSStyle *inlineStyle, PDCSSCSSStyle *attributesStyle, id error))callback {
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
    callback(inlineStyle,nil,nil);
}

- (void)domain:(PDCSSDomain *)domain getComputedStyleForNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(NSArray *computedStyle, id error))callback {
    PDDOMNode *rootDomNode = [PDDOMDomainController defaultInstance].rootDomNode;
    PDDOMNode *node = [self p_getNodeFromNodeId:nodeId rootNode:rootDomNode];
    
    __block NSArray *position;
    [node.attributes enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        if ([obj isEqualToString:@"frame"]) {
            *stop = YES;
            position = [self p_formateFrame:node.attributes[idx + 1]];
        }
    }];
    NSString *width = @"";
    NSString *height = @"";
    NSString *top = @"";
    NSString *left = @"";
    if (position.count == 4) {
        width = position[2];
        height = position[3];
        top = position[1];
        left = position[0];
    }
    NSMutableArray *computedStyles = [[NSMutableArray alloc] init];
    NSArray *layout = @[@{@"name":@"width",@"value":width},
                        @{@"name":@"height",@"value":height},
                        @{@"name":@"padding-top",@"value":@"0px"},
                        @{@"name":@"padding-left",@"value":@"0px"},
                        @{@"name":@"padding-right",@"value":@"0px"},
                        @{@"name":@"padding-bottom",@"value":@""},
                        @{@"name":@"border-top-width",@"value":@""},
                        @{@"name":@"border-left-width",@"value":@""},
                        @{@"name":@"border-right-width",@"value":@""},
                        @{@"name":@"border-bottom-width",@"value":@""},
                        @{@"name":@"margin-bottom",@"value":@"0px"},
                        @{@"name":@"margin-left",@"value":@"0px"},
                        @{@"name":@"margin-right",@"value":@"0px"},
                        @{@"name":@"margin-top",@"value":@"0px"},
                        @{@"name":@"top",@"value":top},
                        @{@"name":@"right",@"value":@"0px"},
                        @{@"name":@"left",@"value":left},
                        @{@"name":@"bottom",@"value":@"0px"}];
    for (int i = 0; i < layout.count; i++) {
        PDCSSCSSComputedStyleProperty *computedStyleProperty = [[PDCSSCSSComputedStyleProperty alloc] init];
        computedStyleProperty.name = layout[i][@"name"];
        computedStyleProperty.value = layout[i][@"value"];
        [computedStyles addObject:[computedStyleProperty PD_JSONObject]];
    }
    
    callback(computedStyles,nil);
}

- (void)domain:(PDCSSDomain *)domain getSupportedCSSPropertiesWithCallback:(void (^)(NSArray *cssProperties, id error))callback {
    PDCSSCSSPropertyInfo *cssPropertyInfo = [[PDCSSCSSPropertyInfo alloc] init];
    cssPropertyInfo.name = @"width";
    cssPropertyInfo.longhands = @[];
    NSArray *cssProperties = @[cssPropertyInfo];
    callback(cssProperties,nil);
}


@end
