/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXSDkInstance.h"

typedef NS_ENUM(int, WXSDKErrCode)
{
    WX_ERR_JSFRAMEWORK_START = -1001,
    WX_ERR_JSFRAMEWORK_LOAD = -1002,
    WX_ERR_JSFRAMEWORK_EXECUTE = -1003,
    WX_ERR_JSFRAMEWORK_END = -1099,
    
    WX_ERR_JSBRIAGE_START = -2001,
    WX_ERR_JSFUNC_PARAM = -2009,
    WX_ERR_INVOKE_NATIVE = -2012,
    WX_ERR_JS_EXECUTE = -2013,
    WX_ERR_JSBRIAGE_END = -2099,
    
    WX_ERR_RENDER_START = -2100,
    WX_ERR_RENDER_CREATEBODY = -2100,
    WX_ERR_RENDER_UPDATTR = -2101,
    WX_ERR_RENDER_UPDSTYLE = -2102,
    WX_ERR_RENDER_ADDELEMENT = -2103,
    WX_ERR_RENDER_REMOVEELEMENT = -2104,
    WX_ERR_RENDER_MOVEELEMENT = -2105,
    WX_ERR_RENDER_ADDEVENT = -2106,
    WX_ERR_RENDER_REMOVEEVENT = -2107,
    WX_ERR_RENDER_SCROLLTOELEMENT = -2110,
    WX_ERR_RENDER_END = -2199,
    
    WX_ERR_JSDOWNLOAD_START = -2201,
    WX_ERR_JSBUNDLE_DOWNLOAD = -2202,
    WX_ERR_JSBUNDLE_STRING_CONVERT = -2203,
    WX_ERR_JSDOWNLOAD_END = -2299,
};

