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
import android.view.View;

import javax.annotation.Nullable;

public interface FragmentAccessor<FRAGMENT, FRAGMENT_MANAGER> {
  int NO_ID = 0;

  @Nullable
  FRAGMENT_MANAGER getFragmentManager(FRAGMENT fragment);

  Resources getResources(FRAGMENT fragment);

  int getId(FRAGMENT fragment);

  @Nullable
  String getTag(FRAGMENT fragment);

  @Nullable
  View getView(FRAGMENT fragment);

  @Nullable
  FRAGMENT_MANAGER getChildFragmentManager(FRAGMENT fragment);
}
