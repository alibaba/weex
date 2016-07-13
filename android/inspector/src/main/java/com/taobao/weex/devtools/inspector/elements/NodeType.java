/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.json.annotation.JsonValue;

public enum NodeType {
  ELEMENT_NODE(1),
  TEXT_NODE(3),
  PROCESSING_INSTRUCTION_NODE(7),
  COMMENT_NODE(8),
  DOCUMENT_NODE(9),
  DOCUMENT_TYPE_NODE(10),
  DOCUMENT_FRAGMENT_NODE(11);

  private final int mValue;

  private NodeType(int value) {
    mValue = value;
  }

  @JsonValue
  public int getProtocolValue() {
    return mValue;
  }
}
