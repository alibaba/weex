/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.common.Accumulator;

public final class ObjectDescriptor extends Descriptor {
  @Override
  public void hook(Object element) {
  }

  @Override
  public void unhook(Object element) {
  }

  @Override
  public NodeType getNodeType(Object element) {
    return NodeType.ELEMENT_NODE;
  }

  @Override
  public String getNodeName(Object element) {
    return element.getClass().getName();
  }

  @Override
  public String getLocalName(Object element) {
    return getNodeName(element);
  }

  @Override
  public String getNodeValue(Object element) {
    return null;
  }

  @Override
  public void getChildren(Object element, Accumulator<Object> children) {
  }

  @Override
  public void getAttributes(Object element, AttributeAccumulator attributes) {
  }

  @Override
  public void setAttributesAsText(Object element, String text) {
  }

  @Override
  public void getStyles(Object element, StyleAccumulator accumulator) {
  }
}
