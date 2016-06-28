/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.text.Editable;
import android.text.TextWatcher;
import android.widget.TextView;

import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;
import com.taobao.weex.devtools.inspector.elements.AttributeAccumulator;

import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Map;

final class TextViewDescriptor extends AbstractChainedDescriptor<TextView> {
  private static final String TEXT_ATTRIBUTE_NAME = "text";

  private final Map<TextView, ElementContext> mElementToContextMap =
      Collections.synchronizedMap(new IdentityHashMap<TextView, ElementContext>());

  @Override
  protected void onHook(final TextView element) {
    ElementContext context = new ElementContext();
    context.hook(element);
    mElementToContextMap.put(element, context);
  }

  protected void onUnhook(TextView element) {
    ElementContext context = mElementToContextMap.remove(element);
    context.unhook();
  }

  @Override
  protected void onGetAttributes(TextView element, AttributeAccumulator attributes) {
    CharSequence text = element.getText();
    if (text.length() != 0) {
      attributes.store(TEXT_ATTRIBUTE_NAME, text.toString());
    }
  }

  private final class ElementContext implements TextWatcher {
    private TextView mElement;

    public void hook(TextView element) {
      mElement = Util.throwIfNull(element);
      mElement.addTextChangedListener(this);
    }

    public void unhook() {
      if (mElement != null) {
        mElement.removeTextChangedListener(this);
        mElement = null;
      }
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
    }

    @Override
    public void afterTextChanged(Editable s) {
      if (s.length() == 0) {
        getHost().onAttributeRemoved(mElement, TEXT_ATTRIBUTE_NAME);
      } else {
        getHost().onAttributeModified(mElement, TEXT_ATTRIBUTE_NAME, s.toString());
      }
    }
  }
}
