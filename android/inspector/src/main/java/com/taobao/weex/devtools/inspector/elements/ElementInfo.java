/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.common.ListUtil;
import com.taobao.weex.devtools.common.Util;

import java.util.List;

import javax.annotation.concurrent.Immutable;

@Immutable
public final class ElementInfo {
  public final Object element;
  public final Object parentElement;
  public final List<Object> children;

  public ElementInfo(
      Object element,
      Object parentElement,
      List<Object> children) {
    this.element = Util.throwIfNull(element);
    this.parentElement = parentElement;
    this.children = ListUtil.copyToImmutableList(children);
  }

  @Override
  public boolean equals(Object o) {
    if (o == this) {
      return true;
    }

    if (o instanceof ElementInfo) {
      ElementInfo other = (ElementInfo) o;
      return this.element == other.element
          && this.parentElement == other.parentElement
          && ListUtil.identityEquals(this.children, other.children);
    }

    return false;
  }
}
