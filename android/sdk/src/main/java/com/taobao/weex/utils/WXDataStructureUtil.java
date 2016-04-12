/*
 * Copyright (C) 2007 The Guava Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.taobao.weex.utils;

import java.util.HashMap;

public class WXDataStructureUtil {

  /**
   * The largest power of two that can be represented as an {@code int}.
   */
  private static final int MAX_POWER_OF_TWO = 1 << (Integer.SIZE - 2);

  /**
   * Creates a {@code HashMap} instance, with a high enough "initial capacity" that it <i>should</i>
   * hold {@code expectedSize} elements without growth. This behavior cannot be broadly guaranteed,
   * but it is observed to be true for OpenJDK 1.7. It also can't be guaranteed that the method
   * isn't inadvertently <i>oversizing</i> the returned map.
   *
   * @param expectedSize the number of entries you expect to add to the returned map
   * @return a new, empty {@code HashMap} with enough capacity to hold {@code expectedSize} entries
   * without resizing
   * @throws IllegalArgumentException if {@code expectedSize} is negative
   */
  public static <K, V> HashMap<K, V> newHashMapWithExpectedSize(int expectedSize) {
    return new HashMap<>(capacity(expectedSize));
  }

  /**
   * Returns a capacity that is sufficient to keep the map from being resized as long as it grows no
   * larger than expectedSize and the load factor is >= its default (0.75).
   */
  private static int capacity(int expectedSize) {
    if (expectedSize < 3) {
      checkNonnegative(expectedSize, "expectedSize");
      return expectedSize + 1;
    }
    if (expectedSize < MAX_POWER_OF_TWO) {
      // This is the calculation used in JDK8 to resize when a putAll
      // happens; it seems to be the most conservative calculation we
      // can make.  0.75 is the default load factor.
      return (int) ((float) expectedSize / 0.75F + 1.0F);
    }
    return Integer.MAX_VALUE; // any large value
  }

  private static int checkNonnegative(int value, String name) {
    if (value < 0) {
      throw new IllegalArgumentException(name + " cannot be negative but was: " + value);
    }
    return value;
  }
}
