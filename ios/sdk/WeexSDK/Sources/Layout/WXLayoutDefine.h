/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */


#define WX_LAYOUT_NAMESPACE wx_

#ifdef WX_LAYOUT_NAMESPACE
    // prefix all layout symbols with "wx_" to prevent conflict
    #define WX_NAMESPACE_PREFIX_INNER(namespace, symbol) namespace ## symbol
    #define WX_NAMESPACE_PREFIX(namespace, symbol) WX_NAMESPACE_PREFIX_INNER(namespace, symbol)
    #define WX_LAYOUT_PREFIX(symbol) WX_NAMESPACE_PREFIX(WX_LAYOUT_NAMESPACE, symbol)

    #define css_direction_t                WX_LAYOUT_PREFIX(css_direction_t)
    #define css_flex_direction_t           WX_LAYOUT_PREFIX(css_flex_direction_t)
    #define css_justify_t                  WX_LAYOUT_PREFIX(css_justify_t)
    #define css_align_t                    WX_LAYOUT_PREFIX(css_align_t)
    #define css_position_type_t            WX_LAYOUT_PREFIX(css_position_type_t)
    #define css_wrap_type_t                WX_LAYOUT_PREFIX(css_wrap_type_t)
    #define css_position_t                 WX_LAYOUT_PREFIX(css_position_t)
    #define css_dimension_t                WX_LAYOUT_PREFIX(css_dimension_t)
    #define css_layout_t                   WX_LAYOUT_PREFIX(css_layout_t)
    #define css_dim_t                      WX_LAYOUT_PREFIX(css_dim_t)
    #define css_style_t                    WX_LAYOUT_PREFIX(css_style_t)
    #define css_node                       WX_LAYOUT_PREFIX(css_node)
    #define css_node_t                     WX_LAYOUT_PREFIX(css_node_t)
    #define new_css_node                   WX_LAYOUT_PREFIX(new_css_node)
    #define init_css_node                  WX_LAYOUT_PREFIX(init_css_node)
    #define free_css_node                  WX_LAYOUT_PREFIX(free_css_node)
    #define css_print_options_t            WX_LAYOUT_PREFIX(css_print_options_t)
    #define print_css_node                 WX_LAYOUT_PREFIX(print_css_node)
    #define layoutNode                     WX_LAYOUT_PREFIX(layoutNode)
    #define isUndefined                    WX_LAYOUT_PREFIX(isUndefined)
    #define resetNodeLayout                WX_LAYOUT_PREFIX(resetNodeLayout)

#endif


#import "Layout.h"



