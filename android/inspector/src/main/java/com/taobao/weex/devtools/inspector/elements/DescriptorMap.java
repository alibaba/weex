/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.common.Util;

import java.util.IdentityHashMap;
import java.util.Map;

import javax.annotation.Nullable;

public final class DescriptorMap {
  private final Map<Class<?>, Descriptor> mMap = new IdentityHashMap<>();
  private boolean mIsInitializing;
  private Descriptor.Host mHost;

  public DescriptorMap beginInit() {
    Util.throwIf(mIsInitializing);
    mIsInitializing = true;
    return this;
  }

  public DescriptorMap register(Class<?> elementClass, Descriptor descriptor) {
    Util.throwIfNull(elementClass);
    Util.throwIfNull(descriptor);
    Util.throwIf(descriptor.isInitialized());
    Util.throwIfNot(mIsInitializing);

    // Cannot register two descriptors for one class
    if (mMap.containsKey(elementClass)) {
      throw new UnsupportedOperationException();
    }

    // Cannot reuse one descriptor for two classes
    if (mMap.containsValue(descriptor)) {
      throw new UnsupportedOperationException();
    }

    mMap.put(elementClass, descriptor);
    return this;
  }

  public DescriptorMap setHost(Descriptor.Host host) {
    Util.throwIfNull(host);
    Util.throwIfNot(mIsInitializing);
    Util.throwIfNotNull(mHost);

    mHost = host;
    return this;
  }

  public DescriptorMap endInit() {
    Util.throwIfNot(mIsInitializing);
    Util.throwIfNull(mHost);

    mIsInitializing = false;

    for (final Class<?> elementClass : mMap.keySet()) {
      final Descriptor descriptor = mMap.get(elementClass);

      if (descriptor instanceof ChainedDescriptor) {
        final ChainedDescriptor chainedDescriptor = (ChainedDescriptor) descriptor;
        Class<?> superClass = elementClass.getSuperclass();
        Descriptor superDescriptor = getImpl(superClass);
        chainedDescriptor.setSuper(superDescriptor);
      }

      descriptor.initialize(mHost);
    }

    return this;
  }

  @Nullable
  public Descriptor get(Class<?> elementClass) {
    Util.throwIfNull(elementClass);
    Util.throwIf(mIsInitializing);
    return getImpl(elementClass);
  }

  @Nullable
  private Descriptor getImpl(final Class<?> elementClass) {
    Class<?> theClass = elementClass;
    while (theClass != null) {
      Descriptor descriptor = mMap.get(theClass);
      if (descriptor != null) {
        return descriptor;
      }
      theClass = theClass.getSuperclass();
    }
    return null;
  }
}
