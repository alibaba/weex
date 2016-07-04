/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXErrorView.h"

@implementation WXErrorView

- (id) initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        UIImageView *imageView = [[UIImageView alloc]initWithFrame:self.bounds];
        NSString *file = [[NSBundle mainBundle] pathForResource:@"wx_load_error@3x" ofType:@"png"];
        imageView.image = [UIImage imageWithContentsOfFile:file];
        [self addSubview:imageView];
        
        UITapGestureRecognizer *tapRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapGesture:)];
        [self addGestureRecognizer:tapRecognizer];
    }
    return self;
}

- (void)tapGesture:(UITapGestureRecognizer *)sender
{
    [self.delegate onclickErrorView];
}

@end
