//
//  PDDOMDomain.h
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

@class PDRuntimeRemoteObject;
@class PDDOMHighlightConfig;
@class PDDOMRGBA;
@class PDDOMNode;

@protocol PDDOMCommandDelegate;

// This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object that has an <code>id</code>. This <code>id</code> can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc. It is important that client receives DOM events only for the nodes that are known to the client. Backend keeps track of the nodes that were sent to the client and never sends the same node twice. It is client's responsibility to collect information about the nodes that were sent to the client.<p>Note that <code>iframe</code> owner elements will return corresponding document elements as their child nodes.</p>
@interface PDDOMDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDDOMCommandDelegate, PDCommandDelegate> delegate;

// Events

// Fired when <code>Document</code> has been totally updated. Node ids are no longer valid.
- (void)documentUpdated;

// Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids.
// Param parentId: Parent node id to populate with children.
// Param nodes: Child nodes array.
- (void)setChildNodesWithParentId:(NSNumber *)parentId nodes:(NSArray *)nodes;

// Fired when <code>Element</code>'s attribute is modified.
// Param nodeId: Id of the node that has changed.
// Param name: Attribute name.
// Param value: Attribute value.
- (void)attributeModifiedWithNodeId:(NSNumber *)nodeId name:(NSString *)name value:(NSString *)value;

// Fired when <code>Element</code>'s attribute is removed.
// Param nodeId: Id of the node that has changed.
// Param name: A ttribute name.
- (void)attributeRemovedWithNodeId:(NSNumber *)nodeId name:(NSString *)name;

// Fired when <code>Element</code>'s inline style is modified via a CSS property modification.
// Param nodeIds: Ids of the nodes for which the inline styles have been invalidated.
- (void)inlineStyleInvalidatedWithNodeIds:(NSArray *)nodeIds;

// Mirrors <code>DOMCharacterDataModified</code> event.
// Param nodeId: Id of the node that has changed.
// Param characterData: New text value.
- (void)characterDataModifiedWithNodeId:(NSNumber *)nodeId characterData:(NSString *)characterData;

// Fired when <code>Container</code>'s child node count has changed.
// Param nodeId: Id of the node that has changed.
// Param childNodeCount: New node count.
- (void)childNodeCountUpdatedWithNodeId:(NSNumber *)nodeId childNodeCount:(NSNumber *)childNodeCount;

// Mirrors <code>DOMNodeInserted</code> event.
// Param parentNodeId: Id of the node that has changed.
// Param previousNodeId: If of the previous siblint.
// Param node: Inserted node data.
- (void)childNodeInsertedWithParentNodeId:(NSNumber *)parentNodeId previousNodeId:(NSNumber *)previousNodeId node:(PDDOMNode *)node;

// Mirrors <code>DOMNodeRemoved</code> event.
// Param parentNodeId: Parent id.
// Param nodeId: Id of the node that has been removed.
- (void)childNodeRemovedWithParentNodeId:(NSNumber *)parentNodeId nodeId:(NSNumber *)nodeId;

// Called when shadow root is pushed into the element.
// Param hostId: Host element id.
// Param root: Shadow root.
- (void)shadowRootPushedWithHostId:(NSNumber *)hostId root:(PDDOMNode *)root;

// Called when shadow root is popped from the element.
// Param hostId: Host element id.
// Param rootId: Shadow root id.
- (void)shadowRootPoppedWithHostId:(NSNumber *)hostId rootId:(NSNumber *)rootId;

@end

@protocol PDDOMCommandDelegate <PDCommandDelegate>
@optional

// Returns the root DOM node to the caller.
// Callback Param root: Resulting node.
- (void)domain:(PDDOMDomain *)domain getDocumentWithCallback:(void (^)(PDDOMNode *root, id error))callback;

// Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events.
// Param nodeId: Id of the node to get children for.
- (void)domain:(PDDOMDomain *)domain requestChildNodesWithNodeId:(NSNumber *)nodeId callback:(void (^)(id error))callback;

// Executes <code>querySelector</code> on a given node.
// Param nodeId: Id of the node to query upon.
// Param selector: Selector string.
// Callback Param nodeId: Query selector result.
- (void)domain:(PDDOMDomain *)domain querySelectorWithNodeId:(NSNumber *)nodeId selector:(NSString *)selector callback:(void (^)(NSNumber *nodeId, id error))callback;

// Executes <code>querySelectorAll</code> on a given node.
// Param nodeId: Id of the node to query upon.
// Param selector: Selector string.
// Callback Param nodeIds: Query selector result.
- (void)domain:(PDDOMDomain *)domain querySelectorAllWithNodeId:(NSNumber *)nodeId selector:(NSString *)selector callback:(void (^)(NSArray *nodeIds, id error))callback;

// Sets node name for a node with given id.
// Param nodeId: Id of the node to set name for.
// Param name: New node's name.
// Callback Param nodeId: New node's id.
- (void)domain:(PDDOMDomain *)domain setNodeNameWithNodeId:(NSNumber *)nodeId name:(NSString *)name callback:(void (^)(NSNumber *nodeId, id error))callback;

// Sets node value for a node with given id.
// Param nodeId: Id of the node to set value for.
// Param value: New node's value.
- (void)domain:(PDDOMDomain *)domain setNodeValueWithNodeId:(NSNumber *)nodeId value:(NSString *)value callback:(void (^)(id error))callback;

// Removes node with given id.
// Param nodeId: Id of the node to remove.
- (void)domain:(PDDOMDomain *)domain removeNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(id error))callback;

// Sets attribute for an element with given id.
// Param nodeId: Id of the element to set attribute for.
// Param name: Attribute name.
// Param value: Attribute value.
- (void)domain:(PDDOMDomain *)domain setAttributeValueWithNodeId:(NSNumber *)nodeId name:(NSString *)name value:(NSString *)value callback:(void (^)(id error))callback;

// Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs.
// Param nodeId: Id of the element to set attributes for.
// Param text: Text with a number of attributes. Will parse this text using HTML parser.
// Param name: Attribute name to replace with new attributes derived from text in case text parsed successfully.
- (void)domain:(PDDOMDomain *)domain setAttributesAsTextWithNodeId:(NSNumber *)nodeId text:(NSString *)text name:(NSString *)name callback:(void (^)(id error))callback;

// Removes attribute with given name from an element with given id.
// Param nodeId: Id of the element to remove attribute from.
// Param name: Name of the attribute to remove.
- (void)domain:(PDDOMDomain *)domain removeAttributeWithNodeId:(NSNumber *)nodeId name:(NSString *)name callback:(void (^)(id error))callback;

// Returns event listeners relevant to the node.
// Param nodeId: Id of the node to get listeners for.
// Callback Param listeners: Array of relevant listeners.
- (void)domain:(PDDOMDomain *)domain getEventListenersForNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(NSArray *listeners, id error))callback;

// Returns node's HTML markup.
// Param nodeId: Id of the node to get markup for.
// Callback Param outerHTML: Outer HTML markup.
- (void)domain:(PDDOMDomain *)domain getOuterHTMLWithNodeId:(NSNumber *)nodeId callback:(void (^)(NSString *outerHTML, id error))callback;

// Sets node HTML markup, returns new node id.
// Param nodeId: Id of the node to set markup for.
// Param outerHTML: Outer HTML markup to set.
- (void)domain:(PDDOMDomain *)domain setOuterHTMLWithNodeId:(NSNumber *)nodeId outerHTML:(NSString *)outerHTML callback:(void (^)(id error))callback;

// Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.
// Param query: Plain text or query selector or XPath search query.
// Callback Param searchId: Unique search session identifier.
// Callback Param resultCount: Number of search results.
- (void)domain:(PDDOMDomain *)domain performSearchWithQuery:(NSString *)query callback:(void (^)(NSString *searchId, NSNumber *resultCount, id error))callback;

// Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.
// Param searchId: Unique search session identifier.
// Param fromIndex: Start index of the search result to be returned.
// Param toIndex: End index of the search result to be returned.
// Callback Param nodeIds: Ids of the search result nodes.
- (void)domain:(PDDOMDomain *)domain getSearchResultsWithSearchId:(NSString *)searchId fromIndex:(NSNumber *)fromIndex toIndex:(NSNumber *)toIndex callback:(void (^)(NSArray *nodeIds, id error))callback;

// Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.
// Param searchId: Unique search session identifier.
- (void)domain:(PDDOMDomain *)domain discardSearchResultsWithSearchId:(NSString *)searchId callback:(void (^)(id error))callback;

// Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications.
// Param objectId: JavaScript object id to convert into node.
// Callback Param nodeId: Node id for given object.
- (void)domain:(PDDOMDomain *)domain requestNodeWithObjectId:(NSString *)objectId callback:(void (^)(NSNumber *nodeId, id error))callback;

// Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspect' command upon element selection.
// Param enabled: True to enable inspection mode, false to disable it.
// Param highlightConfig: A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>.
- (void)domain:(PDDOMDomain *)domain setInspectModeEnabledWithEnabled:(NSNumber *)enabled highlightConfig:(PDDOMHighlightConfig *)highlightConfig callback:(void (^)(id error))callback;

// Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
// Param x: X coordinate
// Param y: Y coordinate
// Param width: Rectangle width
// Param height: Rectangle height
// Param color: The highlight fill color (default: transparent).
// Param outlineColor: The highlight outline color (default: transparent).
- (void)domain:(PDDOMDomain *)domain highlightRectWithX:(NSNumber *)x y:(NSNumber *)y width:(NSNumber *)width height:(NSNumber *)height color:(PDDOMRGBA *)color outlineColor:(PDDOMRGBA *)outlineColor callback:(void (^)(id error))callback;

// Highlights DOM node with given id.
// Param nodeId: Identifier of the node to highlight.
// Param highlightConfig: A descriptor for the highlight appearance.
- (void)domain:(PDDOMDomain *)domain highlightNodeWithNodeId:(NSNumber *)nodeId highlightConfig:(PDDOMHighlightConfig *)highlightConfig callback:(void (^)(id error))callback;

// Hides DOM node highlight.
- (void)domain:(PDDOMDomain *)domain hideHighlightWithCallback:(void (^)(id error))callback;

// Highlights owner element of the frame with given id.
// Param frameId: Identifier of the frame to highlight.
// Param contentColor: The content box highlight fill color (default: transparent).
// Param contentOutlineColor: The content box highlight outline color (default: transparent).
- (void)domain:(PDDOMDomain *)domain highlightFrameWithFrameId:(NSString *)frameId contentColor:(PDDOMRGBA *)contentColor contentOutlineColor:(PDDOMRGBA *)contentOutlineColor callback:(void (^)(id error))callback;

// Requests that the node is sent to the caller given its path. // FIXME, use XPath
// Param path: Path to node in the proprietary format.
// Callback Param nodeId: Id of the node for given path.
- (void)domain:(PDDOMDomain *)domain pushNodeByPathToFrontendWithPath:(NSString *)path callback:(void (^)(NSNumber *nodeId, id error))callback;

// Resolves JavaScript node object for given node id.
// Param nodeId: Id of the node to resolve.
// Param objectGroup: Symbolic group name that can be used to release multiple objects.
// Callback Param object: JavaScript object wrapper for given node.
- (void)domain:(PDDOMDomain *)domain resolveNodeWithNodeId:(NSNumber *)nodeId objectGroup:(NSString *)objectGroup callback:(void (^)(PDRuntimeRemoteObject *object, id error))callback;

// Returns attributes for the specified node.
// Param nodeId: Id of the node to retrieve attibutes for.
// Callback Param attributes: An interleaved array of node attribute names and values.
- (void)domain:(PDDOMDomain *)domain getAttributesWithNodeId:(NSNumber *)nodeId callback:(void (^)(NSArray *attributes, id error))callback;

// Moves node into the new container, places it before the given anchor.
// Param nodeId: Id of the node to drop.
// Param targetNodeId: Id of the element to drop into.
// Param insertBeforeNodeId: Drop node before given one.
// Callback Param nodeId: New id of the moved node.
- (void)domain:(PDDOMDomain *)domain moveToWithNodeId:(NSNumber *)nodeId targetNodeId:(NSNumber *)targetNodeId insertBeforeNodeId:(NSNumber *)insertBeforeNodeId callback:(void (^)(NSNumber *nodeId, id error))callback;

// Undoes the last performed action.
- (void)domain:(PDDOMDomain *)domain undoWithCallback:(void (^)(id error))callback;

// Re-does the last undone action.
- (void)domain:(PDDOMDomain *)domain redoWithCallback:(void (^)(id error))callback;

// Marks last undoable state.
- (void)domain:(PDDOMDomain *)domain markUndoableStateWithCallback:(void (^)(id error))callback;

@end

@interface PDDebugger (PDDOMDomain)

@property (nonatomic, readonly, strong) PDDOMDomain *DOMDomain;

@end
