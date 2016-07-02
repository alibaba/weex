/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.common.ThreadBound;
import com.taobao.weex.devtools.common.UncheckedCallable;
import com.taobao.weex.devtools.common.Util;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public abstract class Descriptor implements NodeDescriptor {
  private Host mHost;

  protected Descriptor() {
  }

  final void initialize(Host host) {
    Util.throwIfNull(host);
    Util.throwIfNotNull(mHost);
    mHost = host;
  }

  final boolean isInitialized() {
    return mHost != null;
  }

  protected final Host getHost() {
    return mHost;
  }

  @Override
  public final boolean checkThreadAccess() {
    return getHost().checkThreadAccess();
  }

  @Override
  public final void verifyThreadAccess() {
    getHost().verifyThreadAccess();
  }

  @Override
  public final <V> V postAndWait(UncheckedCallable<V> c) {
    return getHost().postAndWait(c);
  }

  @Override
  public final void postAndWait(Runnable r) {
    getHost().postAndWait(r);
  }

  @Override
  public final void postDelayed(Runnable r, long delayMillis) {
    getHost().postDelayed(r, delayMillis);
  }

  @Override
  public final void removeCallbacks(Runnable r) {
    getHost().removeCallbacks(r);
  }

  /**
   * Parses the text argument text from DOM.setAttributeAsText()
   * Text will be in the format "attribute1=\"Value 1\" attribute2=\"Value2\""
   * @param text the text argument to be parsed
   * @return a map of attributes to their respective values to be set.
   */
  protected static Map<String, String> parseSetAttributesAsTextArg(String text) {
    String value = "";
    String key = "";
    StringBuilder buffer = new StringBuilder();
    Map<String, String> keyValuePairs = new HashMap<>();
    boolean isInsideQuotes = false;
    for (int i = 0, N = text.length(); i < N; ++i) {
      final char c = text.charAt(i);
      if (c == '=') {
        key = buffer.toString();
        buffer.setLength(0);
      } else if (c == '\"') {
        if (isInsideQuotes) {
          value = buffer.toString();
          buffer.setLength(0);
        }
        isInsideQuotes = !isInsideQuotes;
      } else if (c == ' ' && !isInsideQuotes) {
        keyValuePairs.put(key, value);
      } else {
        buffer.append(c);
      }
    }
    if (!key.isEmpty() && !value.isEmpty()) {
      keyValuePairs.put(key, value);
    }
    return keyValuePairs;
  }

  public interface Host extends ThreadBound {
    @Nullable
    public Descriptor getDescriptor(@Nullable Object element);

    public void onAttributeModified(
        Object element,
        String name,
        String value);

    public void onAttributeRemoved(
        Object element,
        String name);
  }
}
