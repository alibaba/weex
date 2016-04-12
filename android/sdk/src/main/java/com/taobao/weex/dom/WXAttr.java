/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.dom;

import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.common.WXImageSharpen;
import com.taobao.weex.utils.WXLogUtils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * store value of component attribute
 *
 */
public class WXAttr extends ConcurrentHashMap<String, Object> {

  private static final long serialVersionUID = -2619357510079360946L;

  public static String getPrefix(Map<String, Object> attr) {
    if (attr == null) {
      return null;
    }
    Object src = attr.get(WXDomPropConstant.WX_ATTR_PREFIX);
    if (src == null) {
      return null;
    }
    return src.toString();
  }

  public static String getSuffix(Map<String, Object> attr) {
    if (attr == null) {
      return null;
    }
    Object src = attr.get(WXDomPropConstant.WX_ATTR_SUFFIX);
    if (src == null) {
      return null;
    }
    return src.toString();
  }

  /**
   * Compatible with value、content
   *
   * @return
   */
  public static String getValue(Map<String, Object> attr) {
    if (attr == null) {
      return null;
    }
    Object src = attr.get(WXDomPropConstant.WX_ATTR_VALUE);
    if (src == null) {
      src = attr.get("content");
      if (src == null) {
        return null;
      }
    }
    return src.toString();
  }

  public WXImageQuality getImageQuality() {

    Object obj = get(WXDomPropConstant.WX_ATTR_QUALITY);
    if (obj == null) {
      obj = get(WXDomPropConstant.WX_ATTR_IMAGE_QUALITY);
    }
    if (obj == null) {
      return WXImageQuality.LOW;
    }
    WXImageQuality waImageQuality = WXImageQuality.LOW;
    String imageQuality = obj.toString();
    if (imageQuality.equals(WXDomPropConstant.WX_ATTR_IMAGE_QUALITY_ORIGINAL)) {
      waImageQuality = WXImageQuality.ORIGINAL;
    } else if (imageQuality.equals(WXDomPropConstant.WX_ATTR_IMAGE_QUALITY_LOW)) {
      waImageQuality = WXImageQuality.LOW;
    } else if (imageQuality.equals(WXDomPropConstant.WX_ATTR_IMAGE_QUALITY_NORMAL)) {
      waImageQuality = WXImageQuality.NORMAL;
    } else if (imageQuality.equals(WXDomPropConstant.WX_ATTR_IMAGE_QUALITY_HIGH)) {
      waImageQuality = WXImageQuality.HIGH;
    }

    return waImageQuality;
  }

  public WXImageSharpen getImageSharpen() {
    Object obj = get(WXDomPropConstant.WX_SHARPEN);
    if (obj == null) {
      obj = get(WXDomPropConstant.WX_IMAGE_SHARPEN);
    }
    if (obj == null) {
      return WXImageSharpen.UNSHARPEN;
    }
    String imageSharpen = obj.toString();
    WXImageSharpen waImageSharpen = WXImageSharpen.UNSHARPEN;
    if (imageSharpen.equals("sharpen")) {
      waImageSharpen = WXImageSharpen.SHARPEN;
    }

    return waImageSharpen;
  }

  public String getImageSrc() {
    Object src = get(WXDomPropConstant.WX_ATTR_SRC);
    if (src == null) {
      return null;
    }
    return src.toString();
  }

  public boolean showIndicators() {
    Object obj = get(WXDomPropConstant.WX_ATTR_SHOWINDICATORS);
    if (obj == null) {
      return true;
    }

    try {
      return Boolean.parseBoolean(String.valueOf(obj));
    } catch (Exception e) {
      WXLogUtils.e("[WXAttr] showIndicators:" + WXLogUtils.getStackTrace(e));
    }
    return true;
  }

  public boolean autoPlay() {
    Object obj = get(WXDomPropConstant.WX_ATTR_AUTOPLAY);
    if (obj == null) {
      return false;
    }

    try {
      return Boolean.parseBoolean(String.valueOf(obj));
    } catch (Exception e) {
      WXLogUtils.e("[WXAttr] autoPlay:" + WXLogUtils.getStackTrace(e));
    }
    return false;
  }

  public String getScope() {
    Object src = get(WXDomPropConstant.WX_ATTR_SCOPE);
    if (src == null) {
      return null;
    }
    return src.toString();
  }

  public String getLoadMoreOffset() {
    Object src = get(WXDomPropConstant.WX_ATTR_LOADMOREOFFSET);
    if (src == null) {
      return null;
    }
    return src.toString();
  }

  public String getScrollDirection() {
    Object scrollDirection = get("scrollDirection");
    if (scrollDirection == null) {
      return "vertical";
    }
    return scrollDirection.toString();
  }
}
