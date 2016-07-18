//
//  PDCSSDomain.h
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

@class PDCSSCSSRule;
@class PDCSSCSSStyleId;
@class PDCSSCSSStyleSheetBody;
@class PDCSSCSSStyle;
@class PDCSSSelectorProfile;
@class PDCSSCSSRuleId;
@class PDCSSNamedFlow;

@protocol PDCSSCommandDelegate;

// This domain exposes CSS read/write operations. All CSS objects, like stylesheets, rules, and styles, have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). Alternatively, a client can discover all the existing stylesheets with the <code>getAllStyleSheets()</code> method and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.
@interface PDCSSDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDCSSCommandDelegate, PDCommandDelegate> delegate;

// Events

// Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features.
- (void)mediaQueryResultChanged;

// Fired whenever a stylesheet is changed as a result of the client operation.
- (void)styleSheetChangedWithStyleSheetId:(NSString *)styleSheetId;

// Fires when a Named Flow is created.
// Param documentNodeId: The document node id.
// Param namedFlow: Identifier of the new Named Flow.
- (void)namedFlowCreatedWithDocumentNodeId:(NSNumber *)documentNodeId namedFlow:(NSString *)namedFlow;

// Fires when a Named Flow is removed: has no associated content nodes and regions.
// Param documentNodeId: The document node id.
// Param namedFlow: Identifier of the removed Named Flow.
- (void)namedFlowRemovedWithDocumentNodeId:(NSNumber *)documentNodeId namedFlow:(NSString *)namedFlow;

@end

@protocol PDCSSCommandDelegate <PDCommandDelegate>
@optional

// Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received.
- (void)domain:(PDCSSDomain *)domain enableWithCallback:(void (^)(id error))callback;

// Disables the CSS agent for the given page.
- (void)domain:(PDCSSDomain *)domain disableWithCallback:(void (^)(id error))callback;

// Returns requested styles for a DOM node identified by <code>nodeId</code>.
// Param includePseudo: Whether to include pseudo styles (default: true).
// Param includeInherited: Whether to include inherited styles (default: true).
// Callback Param matchedCSSRules: CSS rules matching this node, from all applicable stylesheets.
// Callback Param pseudoElements: Pseudo style rules for this node.
// Callback Param inherited: A chain of inherited styles (from the immediate node parent up to the DOM tree root).
- (void)domain:(PDCSSDomain *)domain getMatchedStylesForNodeWithNodeId:(NSNumber *)nodeId includePseudo:(NSNumber *)includePseudo includeInherited:(NSNumber *)includeInherited callback:(void (^)(NSArray *matchedCSSRules, NSArray *pseudoElements, NSArray *inherited, id error))callback;

// Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.
// Callback Param inlineStyle: Inline style for the specified DOM node.
// Callback Param attributesStyle: Attribute-defined element style (e.g. resulting from "width=20 height=100%").
- (void)domain:(PDCSSDomain *)domain getInlineStylesForNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(PDCSSCSSStyle *inlineStyle, PDCSSCSSStyle *attributesStyle, id error))callback;

// Returns the computed style for a DOM node identified by <code>nodeId</code>.
// Callback Param computedStyle: Computed style for the specified DOM node.
- (void)domain:(PDCSSDomain *)domain getComputedStyleForNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(NSArray *computedStyle, id error))callback;

// Returns metainfo entries for all known stylesheets.
// Callback Param headers: Descriptor entries for all available stylesheets.
- (void)domain:(PDCSSDomain *)domain getAllStyleSheetsWithCallback:(void (^)(NSArray *headers, id error))callback;

// Returns stylesheet data for the specified <code>styleSheetId</code>.
// Callback Param styleSheet: Stylesheet contents for the specified <code>styleSheetId</code>.
- (void)domain:(PDCSSDomain *)domain getStyleSheetWithStyleSheetId:(NSString *)styleSheetId callback:(void (^)(PDCSSCSSStyleSheetBody *styleSheet, id error))callback;

// Returns the current textual content and the URL for a stylesheet.
// Callback Param text: The stylesheet text.
- (void)domain:(PDCSSDomain *)domain getStyleSheetTextWithStyleSheetId:(NSString *)styleSheetId callback:(void (^)(NSString *text, id error))callback;

// Sets the new stylesheet text, thereby invalidating all existing <code>CSSStyleId</code>'s and <code>CSSRuleId</code>'s contained by this stylesheet.
- (void)domain:(PDCSSDomain *)domain setStyleSheetTextWithStyleSheetId:(NSString *)styleSheetId text:(NSString *)text callback:(void (^)(id error))callback;

// Sets the new <code>text</code> for a property in the respective style, at offset <code>propertyIndex</code>. If <code>overwrite</code> is <code>true</code>, a property at the given offset is overwritten, otherwise inserted. <code>text</code> entirely replaces the property <code>name: value</code>.
// Callback Param style: The resulting style after the property text modification.
- (void)domain:(PDCSSDomain *)domain setPropertyTextWithStyleId:(PDCSSCSSStyleId *)styleId propertyIndex:(NSNumber *)propertyIndex text:(NSString *)text overwrite:(NSNumber *)overwrite callback:(void (^)(PDCSSCSSStyle *style, id error))callback;

// Toggles the property in the respective style, at offset <code>propertyIndex</code>. The <code>disable</code> parameter denotes whether the property should be disabled (i.e. removed from the style declaration). If <code>disable == false</code>, the property gets put back into its original place in the style declaration.
// Callback Param style: The resulting style after the property toggling.
- (void)domain:(PDCSSDomain *)domain togglePropertyWithStyleId:(PDCSSCSSStyleId *)styleId propertyIndex:(NSNumber *)propertyIndex disable:(NSNumber *)disable callback:(void (^)(PDCSSCSSStyle *style, id error))callback;

// Modifies the rule selector.
// Callback Param rule: The resulting rule after the selector modification.
- (void)domain:(PDCSSDomain *)domain setRuleSelectorWithRuleId:(PDCSSCSSRuleId *)ruleId selector:(NSString *)selector callback:(void (^)(PDCSSCSSRule *rule, id error))callback;

// Creates a new empty rule with the given <code>selector</code> in a special "inspector" stylesheet in the owner document of the context node.
// Callback Param rule: The newly created rule.
- (void)domain:(PDCSSDomain *)domain addRuleWithContextNodeId:(NSNumber *)contextNodeId selector:(NSString *)selector callback:(void (^)(PDCSSCSSRule *rule, id error))callback;

// Returns all supported CSS property names.
// Callback Param cssProperties: Supported property metainfo.
- (void)domain:(PDCSSDomain *)domain getSupportedCSSPropertiesWithCallback:(void (^)(NSArray *cssProperties, id error))callback;

// Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser.
// Param nodeId: The element id for which to force the pseudo state.
// Param forcedPseudoClasses: Element pseudo classes to force when computing the element's style.
- (void)domain:(PDCSSDomain *)domain forcePseudoStateWithNodeId:(NSNumber *)nodeId forcedPseudoClasses:(NSArray *)forcedPseudoClasses callback:(void (^)(id error))callback;
- (void)domain:(PDCSSDomain *)domain startSelectorProfilerWithCallback:(void (^)(id error))callback;
- (void)domain:(PDCSSDomain *)domain stopSelectorProfilerWithCallback:(void (^)(PDCSSSelectorProfile *profile, id error))callback;

// Returns the Named Flows from the document.
// Param documentNodeId: The document node id for which to get the Named Flow Collection.
// Callback Param namedFlows: An array containing the Named Flows in the document.
- (void)domain:(PDCSSDomain *)domain getNamedFlowCollectionWithDocumentNodeId:(NSNumber *)documentNodeId callback:(void (^)(NSArray *namedFlows, id error))callback;

// Returns the Named Flow identified by the given name
// Param documentNodeId: The document node id.
// Param name: Named Flow identifier.
// Callback Param namedFlow: A Named Flow.
- (void)domain:(PDCSSDomain *)domain getFlowByNameWithDocumentNodeId:(NSNumber *)documentNodeId name:(NSString *)name callback:(void (^)(PDCSSNamedFlow *namedFlow, id error))callback;

@end

@interface PDDebugger (PDCSSDomain)

@property (nonatomic, readonly, strong) PDCSSDomain *CSSDomain;

@end
