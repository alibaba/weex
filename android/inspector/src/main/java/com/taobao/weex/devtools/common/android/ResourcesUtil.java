/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common.android;

import android.content.res.Resources;

import com.taobao.weex.devtools.common.LogUtil;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ResourcesUtil {
  private ResourcesUtil() {
  }

  @Nonnull
  public static String getIdStringQuietly(Object idContext, @Nullable Resources r, int resourceId) {
    try {
      return getIdString(r, resourceId);
    } catch (Resources.NotFoundException e) {
      String idString = getFallbackIdString(resourceId);
      LogUtil.w("Unknown identifier encountered on " + idContext + ": " + idString);
      return idString;
    }
  }

  public static String getIdString(@Nullable Resources r, int resourceId)
      throws Resources.NotFoundException {
    if (r == null) {
      return getFallbackIdString(resourceId);
    }

    String prefix;
    String prefixSeparator;
    switch (getResourcePackageId(resourceId)) {
      case 0x7f:
        prefix = "";
        prefixSeparator = "";
        break;
      default:
        prefix = r.getResourcePackageName(resourceId);
        prefixSeparator = ":";
        break;
    }

    String typeName = r.getResourceTypeName(resourceId);
    String entryName = r.getResourceEntryName(resourceId);

    StringBuilder sb = new StringBuilder(
        1 + prefix.length() + prefixSeparator.length() +
            typeName.length() + 1 + entryName.length());
    sb.append("@");
    sb.append(prefix);
    sb.append(prefixSeparator);
    sb.append(typeName);
    sb.append("/");
    sb.append(entryName);

    return sb.toString();
  }

  private static String getFallbackIdString(int resourceId) {
    return "#" + Integer.toHexString(resourceId);
  }

  private static int getResourcePackageId(int id) {
    return (id >>> 24) & 0xff;
  }
}
