//
//  PDDOMDomainController.m
//  PonyDebugger
//
//  Created by Ryan Olson on 2012-09-19.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDOMDomainController.h"
#import "PDInspectorDomainController.h"
#import "PDRuntimeTypes.h"

#import <objc/runtime.h>
#import <QuartzCore/QuartzCore.h>

#pragma mark - Definitions

// Constants defined in the DOM Level 2 Core: http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1950641247
static const int kPDDOMNodeTypeElement = 1;
static const int kPDDOMNodeTypeDocument = 9;

static NSString *const kPDDOMAttributeParsingRegex = @"[\"'](.*)[\"']";

#pragma mark - Private Interface

@interface PDDOMDomainController ()

// Use mirrored dictionaries to map between objets and node ids with fast lookup in both directions
@property (nonatomic, strong) NSMutableDictionary *objectsForNodeIds;
@property (nonatomic, strong) NSMutableDictionary *nodeIdsForObjects;
@property (nonatomic, assign) NSUInteger nodeIdCounter;

@property (nonatomic, strong) UIView *viewToHighlight;
@property (nonatomic, strong) UIView *highlightOverlay;

@property (nonatomic, assign) CGPoint lastPanPoint;
@property (nonatomic, assign) CGRect originalPinchFrame;
@property (nonatomic, assign) CGPoint originalPinchLocation;

@property (nonatomic, strong) UIView *inspectModeOverlay;

@end

#pragma mark - Implementation

@implementation PDDOMDomainController

@dynamic domain;
@synthesize rootDomNode;

#pragma mark - NSObject

- (id)init;
{
    if (self = [super init]) {
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(windowHidden:) name:UIWindowDidBecomeHiddenNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(windowShown:) name:UIWindowDidBecomeVisibleNotification object:nil];
        
        UIPanGestureRecognizer *panGR = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handleMovePanGesure:)];
        panGR.maximumNumberOfTouches = 1;
        UIPinchGestureRecognizer *pinchGR = [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(handleResizePinchGesture:)];
        
        self.highlightOverlay = [[UIView alloc] initWithFrame:CGRectZero];
        self.highlightOverlay.layer.borderWidth = 1.0;
        
        [self.highlightOverlay addGestureRecognizer:panGR];
        [self.highlightOverlay addGestureRecognizer:pinchGR];
        
        UITapGestureRecognizer *inspectTapGR = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleInspectTapGesture:)];
        UIPanGestureRecognizer *inspectPanGR = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handleInspectPanGesture:)];
        inspectPanGR.maximumNumberOfTouches = 1;
        
        self.inspectModeOverlay = [[UIView alloc] initWithFrame:CGRectZero];
        self.inspectModeOverlay.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        self.inspectModeOverlay.backgroundColor = [UIColor clearColor];
        
        [self.inspectModeOverlay addGestureRecognizer:inspectTapGR];
        [self.inspectModeOverlay addGestureRecognizer:inspectPanGR];
    }
    return self;
}

- (void)dealloc;
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - Class Methods

+ (PDDOMDomainController *)defaultInstance;
{
    static PDDOMDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[PDDOMDomainController alloc] init];
    });
    return defaultInstance;
}

+ (void)startMonitoringUIViewChanges;
{
    // Swizzle UIView add/remove methods to monitor changes in the view hierarchy
    // Only do it once to avoid swapping back if this method is called again
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method original, swizzle;
        Class viewClass = [UIView class];

        // Using sel_registerName() because compiler complains about the swizzled selectors not being found.
        original = class_getInstanceMethod(viewClass, @selector(addSubview:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_addSubview:"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(bringSubviewToFront:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_bringSubviewToFront:"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(sendSubviewToBack:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_sendSubviewToBack:"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(removeFromSuperview));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_removeFromSuperview"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(insertSubview:atIndex:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_insertSubview:atIndex:"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(insertSubview:aboveSubview:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_insertSubview:aboveSubview:"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(insertSubview:belowSubview:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_insertSubview:belowSubview:"));
        method_exchangeImplementations(original, swizzle);
        
        original = class_getInstanceMethod(viewClass, @selector(exchangeSubviewAtIndex:withSubviewAtIndex:));
        swizzle = class_getInstanceMethod(viewClass, sel_registerName("pd_swizzled_exchangeSubviewAtIndex:withSubviewAtIndex:"));
        method_exchangeImplementations(original, swizzle);
    });
}

+ (Class)domainClass;
{
    return [PDDOMDomain class];
}

#pragma mark - Setter Overrides

- (void)setViewKeyPathsToDisplay:(NSArray *)viewKeyPathsToDisplay;
{
    if (![_viewKeyPathsToDisplay isEqualToArray:viewKeyPathsToDisplay]) {
        // Stop tracking all the views to remove KVO
        [self stopTrackingAllViews];
        
        // Now that the observers have been removed, it's safe to change the keyPaths array
        _viewKeyPathsToDisplay = viewKeyPathsToDisplay;
        
        // Refresh the DOM tree to see the new attributes
        [self.domain documentUpdated];
    }
}

#pragma mark - PDDOMCommandDelegate

- (void)domain:(PDDOMDomain *)domain getDocumentWithCallback:(void (^)(PDDOMNode *root, id error))callback;
{
    [self stopTrackingAllViews];
    self.objectsForNodeIds = [[NSMutableDictionary alloc] init];
    self.nodeIdsForObjects = [[NSMutableDictionary alloc] init];
    self.nodeIdCounter = 3;
    callback([self rootNode], nil);
}

- (void)domain:(PDDOMDomain *)domain highlightNodeWithNodeId:(NSNumber *)nodeId highlightConfig:(PDDOMHighlightConfig *)highlightConfig callback:(void (^)(id))callback;
{
    id objectForNodeId = [self.objectsForNodeIds objectForKey:nodeId];
    if ([objectForNodeId isKindOfClass:[UIView class]]) {
        [self configureHighlightOverlayWithConfig:highlightConfig];
        [self revealHighlightOverlayForView:objectForNodeId allowInteractions:YES];
    }
    
    callback(nil);
}

- (void)domain:(PDDOMDomain *)domain hideHighlightWithCallback:(void (^)(id))callback;
{
    [self.highlightOverlay removeFromSuperview];
    self.viewToHighlight = nil;
    
    callback(nil);
}

- (void)domain:(PDDOMDomain *)domain removeNodeWithNodeId:(NSNumber *)nodeId callback:(void (^)(id))callback;
{
    UIView *view = [self.objectsForNodeIds objectForKey:nodeId];
    [view removeFromSuperview];
    
    callback(nil);
}

- (void)domain:(PDDOMDomain *)domain setAttributesAsTextWithNodeId:(NSNumber *)nodeId text:(NSString *)text name:(NSString *)name callback:(void (^)(id))callback;
{
    // The "class" attribute cannot be edited. Bail early
    if ([name isEqualToString:@"class"]) {
        callback(nil);
        return;
    }
    
    id nodeObject = [self.objectsForNodeIds objectForKey:nodeId];
    const char *typeEncoding = [self typeEncodingForKeyPath:name onObject:nodeObject];
    
    // Try to parse out the value
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:kPDDOMAttributeParsingRegex options:0 error:NULL];
    NSTextCheckingResult *firstMatch = [regex firstMatchInString:text options:0 range:NSMakeRange(0, [text length])];
    if (firstMatch) {
        NSString *valueString = [text substringWithRange:[firstMatch rangeAtIndex:1]];
        
        // Note: this is by no means complete...
        // Allow BOOLs to be set with YES/NO
        if (typeEncoding && !strcmp(typeEncoding, @encode(BOOL)) && ([valueString isEqualToString:@"YES"] || [valueString isEqualToString:@"NO"])) {
            BOOL boolValue = [valueString isEqualToString:@"YES"];
            [nodeObject setValue:[NSNumber numberWithBool:boolValue] forKeyPath:name];
        } else if (typeEncoding && !strcmp(typeEncoding, @encode(CGPoint))) {
            CGPoint point = CGPointFromString(valueString);
            [nodeObject setValue:[NSValue valueWithCGPoint:point] forKeyPath:name];
        } else if (typeEncoding && !strcmp(typeEncoding, @encode(CGSize))) {
            CGSize size = CGSizeFromString(valueString);
            [nodeObject setValue:[NSValue valueWithCGSize:size] forKeyPath:name];
        } else if (typeEncoding && !strcmp(typeEncoding, @encode(CGRect))) {
            CGRect rect = CGRectFromString(valueString);
            [nodeObject setValue:[NSValue valueWithCGRect:rect] forKeyPath:name];
        } else if (typeEncoding && !strcmp(typeEncoding, @encode(id))) {
            // Only support editing for string objects (due to the trivial mapping between the string and its description)
            id currentValue = [nodeObject valueForKeyPath:name];
            if ([currentValue isKindOfClass:[NSString class]]) {
                [nodeObject setValue:valueString forKeyPath:name];
            }
        } else {
            NSNumber *number = @([valueString doubleValue]);
            [nodeObject setValue:number forKeyPath:name];
        }
    }
    
    callback(nil);
}

- (void)domain:(PDDOMDomain *)domain setInspectModeEnabledWithEnabled:(NSNumber *)enabled highlightConfig:(PDDOMHighlightConfig *)highlightConfig callback:(void (^)(id))callback;
{
    if ([enabled boolValue]) {
        [self configureHighlightOverlayWithConfig:highlightConfig];
        UIWindow *keyWindow = [[UIApplication sharedApplication] keyWindow];
        self.inspectModeOverlay.frame = keyWindow.frame;
        [keyWindow addSubview:self.inspectModeOverlay];
    } else {
        [self.inspectModeOverlay removeFromSuperview];
    }
    
    callback(nil);
}

- (void)domain:(PDDOMDomain *)domain requestNodeWithObjectId:(NSString *)objectId callback:(void (^)(NSNumber *, id))callback;
{
    callback(@([objectId intValue]), nil);
}

#pragma mark - Gesture Moving and Resizing

- (void)handleMovePanGesure:(UIPanGestureRecognizer *)panGR;
{
    switch (panGR.state) {
        case UIGestureRecognizerStateBegan:
            self.lastPanPoint = [panGR locationInView:self.viewToHighlight.superview];
            break;
            
        default: {
            // Convert to superview coordinates for a consistent basis
            CGPoint newPanPoint = [panGR locationInView:self.viewToHighlight.superview];
            CGFloat deltaX = newPanPoint.x - self.lastPanPoint.x;
            CGFloat deltaY = newPanPoint.y - self.lastPanPoint.y;
            
            CGRect frame = self.viewToHighlight.frame;
            frame.origin.x += deltaX;
            frame.origin.y += deltaY;
            self.viewToHighlight.frame = frame;
            
            self.lastPanPoint = newPanPoint;
            break;
        }
    }
}

- (void)handleResizePinchGesture:(UIPinchGestureRecognizer *)pinchGR;
{
    switch (pinchGR.state) {
        case UIGestureRecognizerStateBegan:
            self.originalPinchFrame = self.viewToHighlight.frame;
            self.originalPinchLocation = [pinchGR locationInView:self.viewToHighlight.superview];
            break;
        
        case UIGestureRecognizerStateChanged: {
            // Scale the frame by the pinch amount
            CGFloat scale = [pinchGR scale];
            CGRect newFrame = self.originalPinchFrame;
            CGFloat scaleByFactor = (scale - 1.0) / 1.0;
            scaleByFactor /= 3.0;
            
            newFrame.size.width *= 1.0 + scaleByFactor;
            newFrame.size.height *= 1.0 + scaleByFactor;
            
            // Translate the center by the difference between the current centroid and the original centroid
            CGPoint location = [pinchGR locationInView:self.viewToHighlight.superview];
            CGPoint center = CGPointMake(floor(CGRectGetMidX(self.originalPinchFrame)), floor(CGRectGetMidY(self.originalPinchFrame)));
            center.x += location.x - self.originalPinchLocation.x;
            center.y += location.y - self.originalPinchLocation.y;
            
            newFrame.origin.x = center.x - newFrame.size.width / 2.0;
            newFrame.origin.y = center.y - newFrame.size.height / 2.0;
            self.viewToHighlight.frame = newFrame;
            break;
        }
        
        case UIGestureRecognizerStateEnded:
        case UIGestureRecognizerStateCancelled:
            self.viewToHighlight.frame = CGRectIntegral(self.viewToHighlight.frame);
            break;
            
        default:
            break;
    }
}

#pragma mark - Inspect Mode

- (void)handleInspectTapGesture:(UITapGestureRecognizer *)tapGR;
{
    switch (tapGR.state) {
        case UIGestureRecognizerStateRecognized:
            [self inspectViewAtPoint:[tapGR locationInView:nil]];
            break;
            
        default:
            break;
    }
    
}

- (void)handleInspectPanGesture:(UIPanGestureRecognizer *)panGR;
{
    switch (panGR.state) {
        case UIGestureRecognizerStateBegan:
        case UIGestureRecognizerStateChanged: {
            // As the user drags, highlight the view that we would inspect
            CGPoint panPoint = [panGR locationInView:nil];
            UIView *chosenView = [self chooseViewAtPoint:panPoint givenStartingView:[[UIApplication sharedApplication] keyWindow]];
            [self revealHighlightOverlayForView:chosenView allowInteractions:NO];
            break;
        }
        case UIGestureRecognizerStateCancelled:
        case UIGestureRecognizerStateFailed:
        case UIGestureRecognizerStateEnded:
            // When the user finishes dragging, send the inspect command
            [self inspectViewAtPoint:[panGR locationInView:nil]];
            break;
            
        default:
            break;
    }
}

- (void)inspectViewAtPoint:(CGPoint)point;
{
    PDInspectorDomain *inspectorDomain = [[PDInspectorDomainController defaultInstance] domain];
    PDRuntimeRemoteObject *remoteObject = [[PDRuntimeRemoteObject alloc] init];
    
    UIView *chosenView = [self chooseViewAtPoint:point givenStartingView:[[UIApplication sharedApplication] keyWindow]];
    NSNumber *chosenNodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:chosenView]];
    
    remoteObject.type = @"object";
    remoteObject.subtype = @"node";
    remoteObject.objectId = [chosenNodeId stringValue];
    
    [inspectorDomain inspectWithObject:remoteObject hints:nil];
    [self.inspectModeOverlay removeFromSuperview];
}

- (UIView *)chooseViewAtPoint:(CGPoint)point givenStartingView:(UIView *)startingView;
{
    // Look into the subviews (topmost first) to see if there's a view there that we should select
    for (UIView *subview in [startingView.subviews reverseObjectEnumerator]) {
        CGRect subviewFrameInWindowCoordinates = [startingView convertRect:subview.frame toView:nil];
        if (![self shouldIgnoreView:subview] && !subview.hidden && subview.alpha > 0.0 && CGRectContainsPoint(subviewFrameInWindowCoordinates, point)) {
            // We've found a promising looking subview. Recurse to check it out
            return [self chooseViewAtPoint:point givenStartingView:subview];
        }
    }
    
    // We didn't find anything in the subviews, so just return the starting view
    return startingView;
}

#pragma mark - Highlight Overlay

- (void)configureHighlightOverlayWithConfig:(PDDOMHighlightConfig *)highlightConfig;
{
    PDDOMRGBA *contentColor = [highlightConfig valueForKey:@"contentColor"];
    NSNumber *r = [contentColor valueForKey:@"r"];
    NSNumber *g = [contentColor valueForKey:@"g"];
    NSNumber *b = [contentColor valueForKey:@"b"];
    NSNumber *a = [contentColor valueForKey:@"a"];
    
    self.highlightOverlay.backgroundColor = [UIColor colorWithRed:[r floatValue] / 255.0 green:[g floatValue] / 255.0 blue:[b floatValue] / 255.0 alpha:[a floatValue]];
    
    PDDOMRGBA *borderColor = [highlightConfig valueForKey:@"borderColor"];
    r = [borderColor valueForKey:@"r"];
    g = [borderColor valueForKey:@"g"];
    b = [borderColor valueForKey:@"b"];
    a = [borderColor valueForKey:@"a"];
    
    self.highlightOverlay.layer.borderColor = [[UIColor colorWithRed:[r floatValue] / 255.0 green:[g floatValue] / 255.0 blue:[b floatValue] / 255.0 alpha:[a floatValue]] CGColor];
}

- (void)revealHighlightOverlayForView:(UIView *)view allowInteractions:(BOOL)interactionEnabled;
{
    // Add a highlight overlay directly to the window if this is a window, otherwise to the view's window
    self.viewToHighlight = view;
    
    UIWindow *window = self.viewToHighlight.window;
    CGRect highlightFrame = CGRectZero;
    
    if (!window && [self.viewToHighlight isKindOfClass:[UIWindow class]]) {
        window = (UIWindow *)self.viewToHighlight;
        highlightFrame = window.bounds;
    } else {
        highlightFrame = [window convertRect:self.viewToHighlight.frame fromView:self.viewToHighlight.superview];
    }
    
    self.highlightOverlay.frame = highlightFrame;
    self.highlightOverlay.userInteractionEnabled = interactionEnabled;
    
    // Make sure the highlight goes behind the inspect overlay if it's on screen
    if (self.inspectModeOverlay.superview == window) {
        [window insertSubview:self.highlightOverlay belowSubview:self.inspectModeOverlay];
    } else {
        [window addSubview:self.highlightOverlay];
    }
}

#pragma mark - View Hierarchy Changes

- (void)windowHidden:(NSNotification *)windowNotification;
{
    [self removeView:windowNotification.object];
}

- (void)windowShown:(NSNotification *)windowNotification;
{
    [self addView:windowNotification.object];
}

- (void)removeView:(UIView *)view;
{
    // Bail early if we're ignoring this view or if the document hasn't been requested yet
    if ([self shouldIgnoreView:view] || !self.objectsForNodeIds) {
        return;
    }
    
    NSNumber *nodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:view]];

    // Only proceed if this is a node we know about
    if ([self.objectsForNodeIds objectForKey:nodeId]) {
        
        NSNumber *parentNodeId = nil;
        
        if (view.superview) {
            parentNodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:view.superview]];
        } else if ([view isKindOfClass:[UIWindow class]]) {
            // Windows are always children of the root element node
            parentNodeId = @(1);
        }
        
        [self stopTrackingView:view];
        [self.domain childNodeRemovedWithParentNodeId:parentNodeId nodeId:nodeId];
    }
}

- (void)addView:(UIView *)view;
{
    // Bail early if we're ignoring this view or if the document hasn't been requested yet
    if ([self shouldIgnoreView:view] || !self.objectsForNodeIds) {
        return;
    }

    // Only proceed if we know about this view's superview (corresponding to the parent node)
    NSNumber *parentNodeId = nil;
    if (view.superview) {
        parentNodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:view.superview]];
    }
    
    if ([self.objectsForNodeIds objectForKey:parentNodeId]) {
        
        PDDOMNode *node = [self nodeForView:view];

        // Find the sibling view to insert the node in the right place
        // We're actually looking for the next view in the subviews array. Index 0 holds the back-most view.
        // We essentialy dispay the subviews array backwards.
        NSNumber *previousNodeId = nil;
        NSUInteger indexOfView = [view.superview.subviews indexOfObject:view];
        
        // If this is the last subview in the array, it has no previous node.
        if (indexOfView < [view.superview.subviews count] - 1) {
            UIView *aheadSibling = [view.superview.subviews objectAtIndex:indexOfView + 1];
            previousNodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:aheadSibling]];
        }
        
        [self.domain childNodeInsertedWithParentNodeId:parentNodeId previousNodeId:previousNodeId node:node];
    } else if ([view isKindOfClass:[UIWindow class]]) {
        
        PDDOMNode *node = [self nodeForView:view];
        
        // Look at the other windows to find where to place this window
        NSNumber *previousNodeId = nil;
        NSArray *windows = [[UIApplication sharedApplication] windows];
        NSUInteger indexOfWindow = [windows indexOfObject:view];
        
        if (indexOfWindow > 0) {
            UIWindow *previousWindow = [windows objectAtIndex:indexOfWindow - 1];
            previousNodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:previousWindow]];
        }
        
        // Note that windows are always children of the root element node (id 1)
        [self.domain childNodeInsertedWithParentNodeId:@(1) previousNodeId:previousNodeId node:node];
    }
}

- (void)startTrackingView:(UIView *)view withNodeId:(NSNumber *)nodeId;
{
    NSAssert(view != self.highlightOverlay, @"The highlight overlay should not be tracked. We update its frame in the KVO observe method, so tracking it will lead to infinite recursion");
    
    [self.nodeIdsForObjects setObject:nodeId forKey:[NSValue valueWithNonretainedObject:view]];
    [self.objectsForNodeIds setObject:view forKey:nodeId];
    
    // Use KVO to keep the displayed properties fresh
    for (NSString *keyPath in self.viewKeyPathsToDisplay) {
        [view addObserver:self forKeyPath:keyPath options:NSKeyValueObservingOptionNew context:NULL];
    }
}

- (void)stopTrackingView:(UIView *)view;
{
    NSValue *viewKey = [NSValue valueWithNonretainedObject:view];
    NSNumber *nodeId = [self.nodeIdsForObjects objectForKey:viewKey];
    
    // Bail early if we weren't tracking this view
    if (!nodeId) {
        return;
    }
    
    // Recurse to get any nested views
    for (UIView *subview in view.subviews) {
        [self stopTrackingView:subview];
    }
    
    // Remove the highlight if necessary
    if (view == self.viewToHighlight) {
        [self.highlightOverlay removeFromSuperview];
        self.viewToHighlight = nil;
    }
    
    // Unregister from KVO
    for (NSString *keyPath in self.viewKeyPathsToDisplay) {
        [view removeObserver:self forKeyPath:keyPath];
    }
    
    // Important that this comes last, so we don't get KVO observations for objects we don't konw about
    [self.nodeIdsForObjects removeObjectForKey:viewKey];
    [self.objectsForNodeIds removeObjectForKey:nodeId];
}

- (void)stopTrackingAllViews;
{
    for (UIWindow *window in [[UIApplication sharedApplication] windows]) {
        [self stopTrackingView:window];
    }
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context;
{
    // Make sure this is a node we know about and a key path we're observing
    NSNumber *nodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:object]];
    
    if ([self.objectsForNodeIds objectForKey:nodeId] && [self.viewKeyPathsToDisplay containsObject:keyPath]) {
        // Update the attributes on the DOM node
        NSString *newValue = [self stringForValue:[change objectForKey:NSKeyValueChangeNewKey] atKeyPath:keyPath onObject:object];
        [self.domain attributeModifiedWithNodeId:nodeId name:keyPath value:newValue];
    }
    
    // If this is the view we're highlighting, update appropriately
    if (object == self.viewToHighlight && [keyPath isEqualToString:@"frame"]) {
        CGRect updatedFrame = [[change objectForKey:NSKeyValueChangeNewKey] CGRectValue];
        self.highlightOverlay.frame = [self.viewToHighlight.superview convertRect:updatedFrame toView:nil];
    }
    
    // Note that we do not call [super observeValueForKeyPath:...] because super doesn't implement the method
}

- (BOOL)shouldIgnoreView:(UIView *)view;
{
    return view == nil || view == self.highlightOverlay || view == self.inspectModeOverlay;
}

- (NSNumber *)getAndIncrementNodeIdCount;
{
    return @(self.nodeIdCounter++);
}

#pragma mark - Node Generation

- (PDDOMNode *)rootNode;
{
    PDDOMNode *rootNode = [[PDDOMNode alloc] init];
    rootNode.nodeId = [NSNumber numberWithInt:1];//[self getAndIncrementNodeIdCount];
    rootNode.nodeType = @(kPDDOMNodeTypeDocument);
    rootNode.nodeName = @"#document";
    rootNode.children = @[ [self rootElement] ];
    self.rootDomNode = rootNode;
    return rootNode;
}

- (PDDOMNode *)rootElement;
{
    PDDOMNode *rootElement = [[PDDOMNode alloc] init];
    rootElement.nodeId = [NSNumber numberWithInt:2];//[self getAndIncrementNodeIdCount];
    rootElement.nodeType = @(kPDDOMNodeTypeElement);
    rootElement.nodeName = @"iosml";
    rootElement.children = [self windowNodes];
    
    return rootElement;
}

- (NSArray *)windowNodes;
{
    NSArray *windows = [[UIApplication sharedApplication] windows];
    NSMutableArray *windowNodes = [NSMutableArray arrayWithCapacity:[windows count]];
    
    for (id window in windows) {
        PDDOMNode *windowNode = [self nodeForView:window];
        if (windowNode) {
            [windowNodes addObject:windowNode];
        }
    }
    
    return windowNodes;
}

- (PDDOMNode *)nodeForView:(UIView *)view;
{
    // Don't generate nodes for views we want to ignore
    if ([self shouldIgnoreView:view]) {
        return nil;
    }
    
    // Build the child nodes by recursing on this view's subviews
    NSMutableArray *childNodes = [[NSMutableArray alloc] initWithCapacity:[view.subviews count]];
    for (UIView *subview in [view.subviews reverseObjectEnumerator]) {
        PDDOMNode *childNode = [self nodeForView:subview];
        if (childNode) {
            [childNodes addObject:childNode];
        }
    }
    
    PDDOMNode *viewNode = [self elementNodeForObject:view withChildNodes:childNodes];
    [self startTrackingView:view withNodeId:viewNode.nodeId];
    
    return viewNode;
}

- (PDDOMNode *)elementNodeForObject:(id)object withChildNodes:(NSArray *)children;
{
    PDDOMNode *elementNode = [[PDDOMNode alloc] init];
    elementNode.nodeType = @(kPDDOMNodeTypeElement);
    
    if ([object isKindOfClass:[UIWindow class]]) {
        elementNode.nodeName = @"window";
    } else if ([object isKindOfClass:[UIView class]]) {
        elementNode.nodeName = @"view";
    } else {
        elementNode.nodeName = @"object";
    }
    
    elementNode.children = children;
    elementNode.childNodeCount = @([elementNode.children count]);
    NSNumber *nodeId = [self.nodeIdsForObjects objectForKey:[NSValue valueWithNonretainedObject:object]];
    if (nodeId) {
        elementNode.nodeId = nodeId;
    }else {
        elementNode.nodeId = [self getAndIncrementNodeIdCount];
    }
    elementNode.attributes = [self attributesArrayForObject:object];
    
    return elementNode;
}

#pragma mark - Attribute Generation

- (NSArray *)attributesArrayForObject:(id)object;
{
    // No attributes for a nil object
    if (!object) {
        return nil;
    }
    
    NSString *className = [[object class] description];
    
    // Thanks to http://petersteinberger.com/blog/2012/pimping-recursivedescription/
    SEL viewDelSEL = NSSelectorFromString([NSString stringWithFormat:@"%@wDelegate", @"_vie"]);
    if ([object respondsToSelector:viewDelSEL]) {
        
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        UIViewController *vc = [object performSelector:viewDelSEL];
#pragma clang diagnostic pop
        
        if (vc) {
            className = [className stringByAppendingFormat:@" (%@)", [vc class]];
        }
    }
    
    NSMutableArray *attributes = [NSMutableArray arrayWithArray:@[ @"class", className ]];
    
    if ([object isKindOfClass:[UIView class]]) {
        // Get strings for all the key paths in viewKeyPathsToDisplay
        for (NSString *keyPath in self.viewKeyPathsToDisplay) {
            
            NSValue *value = nil;
            
            @try {
                value = [object valueForKeyPath:keyPath];
            } @catch (NSException *exception) {
                // Continue if valueForKeyPath fails (ie KVC non-compliance)
                continue;
            }
            
            NSString *stringValue = [self stringForValue:value atKeyPath:keyPath onObject:object];
            if (stringValue) {
                [attributes addObjectsFromArray:@[ keyPath, stringValue ]];
            }
        }
    }
    
    return attributes;
}

- (NSString *)stringForValue:(id)value atKeyPath:(NSString *)keyPath onObject:(id)object;
{
    NSString *stringValue = nil;
    const char *typeEncoding = [self typeEncodingForKeyPath:keyPath onObject:object];
    
    if (typeEncoding) {
        // Special structs
        if (!strcmp(typeEncoding,@encode(BOOL))) {
            stringValue = [(id)value boolValue] ? @"YES" : @"NO";
        } else if (!strcmp(typeEncoding,@encode(CGPoint))) {
            stringValue = NSStringFromCGPoint([value CGPointValue]);
        } else if (!strcmp(typeEncoding,@encode(CGSize))) {
            stringValue = NSStringFromCGSize([value CGSizeValue]);
        } else if (!strcmp(typeEncoding,@encode(CGRect))) {
            stringValue = NSStringFromCGRect([value CGRectValue]);
        }
    }
    
    // Boxed numeric primitives
    if (!stringValue && [value isKindOfClass:[NSNumber class]]) {
        stringValue = [(NSNumber *)value stringValue];
        
    // Object types
    } else if (!stringValue && typeEncoding && !strcmp(typeEncoding, @encode(id))) {
        stringValue = [value description];
    }
    
    return stringValue;
}

- (const char *)typeEncodingForKeyPath:(NSString *)keyPath onObject:(id)object;
{
    const char *encoding = NULL;
    NSString *lastKeyPathComponent = nil;
    id targetObject = nil;
    
    // Separate the key path components
    NSArray *keyPathComponents = [keyPath componentsSeparatedByString:@"."];
    
    if ([keyPathComponents count] > 1) {
        // Drill down to find the targetObject.key piece that we're interested in.
        NSMutableArray *mutableComponents = [keyPathComponents mutableCopy];
        lastKeyPathComponent = [mutableComponents lastObject];
        [mutableComponents removeLastObject];
        
        NSString *targetKeyPath = [mutableComponents componentsJoinedByString:@"."];
        @try {
            targetObject = [object valueForKeyPath:targetKeyPath];
        } @catch (NSException *exception) {
            // Silently fail for KVC non-compliance
        }
    } else {
        // This is the simple case with no dots. Use the full key and original target object
        lastKeyPathComponent = keyPath;
        targetObject = object;
    }
    
    // Look for a matching set* method to infer the type
    NSString *selectorString = [NSString stringWithFormat:@"set%@:", [lastKeyPathComponent stringByReplacingCharactersInRange:NSMakeRange(0,1) withString:[[lastKeyPathComponent substringToIndex:1] uppercaseString]]];
    NSMethodSignature *methodSignature = [targetObject methodSignatureForSelector:NSSelectorFromString(selectorString)];
    if (methodSignature) {
        // We don't care about arg0 (self) or arg1 (_cmd)
        encoding = [methodSignature getArgumentTypeAtIndex:2];
    }
    
    // If we didn't find a setter, look for the getter
    // We could be more exhasutive here with KVC conventions, but these two will cover the majority of cases
    if (!encoding) {
        NSMethodSignature *getterSignature = [targetObject methodSignatureForSelector:NSSelectorFromString(lastKeyPathComponent)];
        encoding = [getterSignature methodReturnType];
    }
    
    return encoding;
}

@end

@implementation UIView (Hackery)

// There is a different set of view add/remove observation methods that could've been swizzled instead of the ones below.
// Choosing the set below seems safer becuase the UIView implementations of the other methods are documented to be no-ops.
// Custom UIView subclasses may override and not make calls to super for those methods, which would cause us to miss changes in the view hierarchy.

- (void)pd_swizzled_addSubview:(UIView *)subview;
{
    [[PDDOMDomainController defaultInstance] removeView:subview];
    [self pd_swizzled_addSubview:subview];
    [[PDDOMDomainController defaultInstance] addView:subview];
}

- (void)pd_swizzled_bringSubviewToFront:(UIView *)view;
{
    [[PDDOMDomainController  defaultInstance] removeView:view];
    [self pd_swizzled_bringSubviewToFront:view];
    [[PDDOMDomainController defaultInstance] addView:view];
}

- (void)pd_swizzled_sendSubviewToBack:(UIView *)view;
{
    [[PDDOMDomainController  defaultInstance] removeView:view];
    [self pd_swizzled_sendSubviewToBack:view];
    [[PDDOMDomainController defaultInstance] addView:view];
}

- (void)pd_swizzled_removeFromSuperview;
{
    [[PDDOMDomainController defaultInstance] removeView:self];
    [self pd_swizzled_removeFromSuperview];
}

- (void)pd_swizzled_insertSubview:(UIView *)view atIndex:(NSInteger)index;
{
    [[PDDOMDomainController  defaultInstance] removeView:view];
    [self pd_swizzled_insertSubview:view atIndex:index];
    [[PDDOMDomainController defaultInstance] addView:view];
}

- (void)pd_swizzled_insertSubview:(UIView *)view aboveSubview:(UIView *)siblingSubview;
{
    [[PDDOMDomainController  defaultInstance] removeView:view];
    [self pd_swizzled_insertSubview:view aboveSubview:siblingSubview];
    [[PDDOMDomainController defaultInstance] addView:view];
}

- (void)pd_swizzled_insertSubview:(UIView *)view belowSubview:(UIView *)siblingSubview;
{
    [[PDDOMDomainController  defaultInstance] removeView:view];
    [self pd_swizzled_insertSubview:view belowSubview:siblingSubview];
    [[PDDOMDomainController defaultInstance] addView:view];
}

- (void)pd_swizzled_exchangeSubviewAtIndex:(NSInteger)index1 withSubviewAtIndex:(NSInteger)index2;
{
    // Guard against calls with out-of-bounds indices.
    // exchangeSubviewAtIndex:withSubviewAtIndex: doesn't crash in this case, so neither should we.
    if (index1 >= 0 && index1 < [[self subviews] count]) {
        [[PDDOMDomainController defaultInstance] removeView:[[self subviews] objectAtIndex:index1]];
    }
    if (index2 >= 0 && index2 < [[self subviews] count]) {
        [[PDDOMDomainController defaultInstance] removeView:[[self subviews] objectAtIndex:index2]];
    }
    
    [self pd_swizzled_exchangeSubviewAtIndex:index1 withSubviewAtIndex:index2];
    
    if (index1 >= 0 && index1 < [[self subviews] count]) {
        [[PDDOMDomainController defaultInstance] addView:[[self subviews] objectAtIndex:index1]];
    }
    if (index2 >= 0 && index2 < [[self subviews] count]) {
        [[PDDOMDomainController defaultInstance] addView:[[self subviews] objectAtIndex:index2]];
    }
}


@end