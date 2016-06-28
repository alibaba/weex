/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent.h"

typedef enum
{
    WXPointIndicatorAlignCenter,    // point indicator align center
    WXPointIndicatorAlignLeft,      // point indicator align left
    WXPointIndicatorAlignRight,     // point indicator align right
} WXPointIndicatorAlignStyle;

@interface WXIndicatorView : UIView

@property (nonatomic, assign)   NSInteger   pointCount;         // total count point of point indicator
@property (nonatomic, assign)   NSInteger   currentPoint;       // current light index of point at point indicator
@property (nonatomic, strong)   UIColor *pointColor;        // normal point color of point indicator
@property (nonatomic, strong)   UIColor *lightColor;        // highlight point color of point indicator
@property (nonatomic, assign)   WXPointIndicatorAlignStyle  alignStyle;    //align style of point indicator
@property (nonatomic, assign)   CGFloat pointSize;          // point size of point indicator
@property (nonatomic, assign)   CGFloat pointSpace;         // point space of point indicator

@end


@interface WXIndicatorComponent : WXComponent

@end
