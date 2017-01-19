/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSDKInstance.h"
#import "WXLog.h"
#import "WXCellComponent.h"
#import "WXListComponent.h"
#import "WXComponent_internal.h"

@implementation WXCellComponent
{
    NSIndexPath *_indexPathBeforeMove;
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    
    if (self) {
        _async = attributes[@"async"] ? [WXConvert BOOL:attributes[@"async"]] : YES;
        _insertAnimation = [WXConvert UITableViewRowAnimation:attributes[@"insertAnimation"]];
        _deleteAnimation = [WXConvert UITableViewRowAnimation:attributes[@"deleteAnimation"]];
        _lazyCreateView = YES;
        _isNeedJoinLayoutSystem = NO;
    }
    
    return self;
}

- (void)dealloc
{
    
}

- (void)_frameDidCalculated:(BOOL)isChanged
{
    [super _frameDidCalculated:isChanged];
    
    if (isChanged) {
        [self.list cellDidLayout:self];
    }
}

- (WXDisplayCompeletionBlock)displayCompeletionBlock
{
    return ^(CALayer *layer, BOOL finished) {
        if ([super displayCompeletionBlock]) {
            [super displayCompeletionBlock](layer, finished);
        }
        
        [self.list cellDidRendered:self];
    };
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"async"]) {
        _async = [WXConvert BOOL:attributes[@"async"]];
    }
    
    if (attributes[@"insertAnimation"]) {
        _insertAnimation = [WXConvert UITableViewRowAnimation:attributes[@"insertAnimation"]];
    }
    
    if (attributes[@"deleteAnimation"]) {
        _deleteAnimation = [WXConvert UITableViewRowAnimation:attributes[@"deleteAnimation"]];
    }
}

- (void)_moveToSupercomponent:(WXComponent *)newSupercomponent atIndex:(NSUInteger)index
{
    if (self.list == newSupercomponent) {
        [self.list cell:self didMoveToIndex:index];
        [super _removeFromSupercomponent];
        [newSupercomponent _insertSubcomponent:self atIndex:index];
    } else {
        [super _moveToSupercomponent:newSupercomponent atIndex:index];
    }
}

- (void)_removeFromSupercomponent
{
    [super _removeFromSupercomponent];
    
    [self.list cellDidRemove:self];
}

- (void)removeFromSuperview
{
    // do nothing
}

- (void)_calculateFrameWithSuperAbsolutePosition:(CGPoint)superAbsolutePosition gatherDirtyComponents:(NSMutableSet<WXComponent *> *)dirtyComponents
{
    if (isUndefined(self.cssNode->style.dimensions[CSS_WIDTH]) && self.list) {
        self.cssNode->style.dimensions[CSS_WIDTH] = self.list.scrollerCSSNode->style.dimensions[CSS_WIDTH];
    }
    
    if ([self needsLayout]) {
        layoutNode(self.cssNode, CSS_UNDEFINED, CSS_UNDEFINED, CSS_DIRECTION_INHERIT);
        if ([WXLog logLevel] >= WXLogLevelDebug) {
            print_css_node(self.cssNode, CSS_PRINT_LAYOUT | CSS_PRINT_STYLE | CSS_PRINT_CHILDREN);
        }
    }
    
    [super _calculateFrameWithSuperAbsolutePosition:superAbsolutePosition gatherDirtyComponents:dirtyComponents];
}
@end

