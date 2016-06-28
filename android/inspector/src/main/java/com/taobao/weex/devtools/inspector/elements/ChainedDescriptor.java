/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.ListView;

import com.taobao.weex.devtools.common.Accumulator;

/**
 * This interface marks a {@link Descriptor} in a way that is specially understood by
 * {@link DescriptorMap}. When registered for a particular class 'E', a {@link Descriptor} that
 * implements this interface will be chained (via {@link ChainedDescriptor#setSuper(Descriptor)}) to
 * the {@link Descriptor} that is registered for the super class of E. If the super class of E
 * doesn't have a registration, then the super-super class will be used (and so on). This allows you
 * to implement {@link Descriptor} for any class in an inheritance hierarchy without having to
 * couple it (via direct inheritance) to the super-class' {@link Descriptor}.<p/>
 *
 * To understand why this is useful, let's say you wanted to write a {@link Descriptor} for
 * {@link ListView}. You have three options:<p/>
 *
 * The first option is to derive directly from {@link Descriptor} and write code to describe
 * everything about instances of {@link ListView}, including details that are exposed by super
 * classes such as {@link ViewGroup}, {@link View}, and even {@link Object}. This isn't generally
 * a very good choice because it would require a lot of duplicated code amongst many descriptor
 * implementations.<p/>
 *
 * The second option is to derive your 'ListViewDescriptor' from
 * {@link com.taobao.weex.devtools.inspector.elements.android.ViewGroupDescriptor} and only implement
 * code to describe how {@link ListView} differs from {@link ViewGroup}. This will result in a class
 * hierarchy that is parallel to the one that you are describing, but is also not a good choice for
 * two reasons (let's assume for the moment that
 * {@link com.taobao.weex.devtools.inspector.elements.android.ViewGroupDescriptor} is deriving from
 * {@link com.taobao.weex.devtools.inspector.elements.android.ViewDescriptor}). The first problem is that
 * you will need to write code for aggregating results from the super-class in methods such as
 * {@link Descriptor#getChildren(Object, Accumulator)} and
 * {@link Descriptor#getAttributes(Object, AttributeAccumulator)}. The second problem is that you'd
 * end up with a log of fragility if you ever want to implement a descriptor for classes that are
 * in-between {@link ViewGroup} and {@link ListView}, e.g. {@link AbsListView}. Any descriptor that
 * derived from {@link com.taobao.weex.devtools.inspector.elements.android.ViewGroupDescriptor} and
 * described a class deriving from {@link AbsListView} would have to be modified to now derive from
 * 'AbsListViewDescriptor'.<p/>
 *
 * The third option is to implement {@link ChainedDescriptor} (e.g. by deriving from
 * {@link AbstractChainedDescriptor}) which solves all of these issues for you.<p/>
 */
public interface ChainedDescriptor {
  void setSuper(Descriptor superDescriptor);
}
