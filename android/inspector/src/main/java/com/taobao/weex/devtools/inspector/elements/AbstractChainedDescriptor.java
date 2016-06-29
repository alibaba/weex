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
import com.taobao.weex.devtools.common.ThreadBound;
import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.inspector.protocol.module.DOM;

import javax.annotation.Nullable;

/**
 * This class derives from {@link Descriptor} and provides a canonical implementation of
 * {@link ChainedDescriptor}.<p/>
 *
 * This class implements the thread safety enforcement policy prescribed by
 * {@link ThreadBound}. Namely, that {@link #verifyThreadAccess()}} needs to be called in the
 * prologue for every method. Your derived class SHOULD NOT call {@link #verifyThreadAccess()}} in
 * any of its on___() methods.<p/>
 *
 * (NOTE: As an optimization, {@link #verifyThreadAccess()} is not actually called in the
 * prologue for every method. Instead, we rely on {@link DocumentProvider#getNodeDescriptor(Object)}
 * calling it in order to get most of our enforcement coverage. We still call
 * {@link #verifyThreadAccess()} in a few important methods such as {@link #hook(Object)} and
 * {@link #unhook(Object)} (anything that writes or is potentially really dangerous if misused).<p/>
 *
 * @param <E> the class that this descriptor will be describing for {@link DocumentProvider},
 * {@link Document}, and ultimately {@link DOM}.
 */
public abstract class AbstractChainedDescriptor<E> extends Descriptor implements ChainedDescriptor {

  private Descriptor mSuper;

  public void setSuper(Descriptor superDescriptor) {
    Util.throwIfNull(superDescriptor);

    if (superDescriptor != mSuper) {
      if (mSuper != null) {
        throw new IllegalStateException();
      }
      mSuper = superDescriptor;
    }
  }

  final Descriptor getSuper() {
    return mSuper;
  }

  @Override
  @SuppressWarnings("unchecked")
  public final void hook(Object element) {
    verifyThreadAccess();
    mSuper.hook(element);
    onHook((E) element);
  }

  protected void onHook(E element) {
  }

  @Override
  @SuppressWarnings("unchecked")
  public final void unhook(Object element) {
    verifyThreadAccess();
    onUnhook((E) element);
    mSuper.unhook(element);
  }

  protected void onUnhook(E element) {
  }

  @Override
  @SuppressWarnings("unchecked")
  public final NodeType getNodeType(Object element) {
    return onGetNodeType((E) element);
  }

  protected NodeType onGetNodeType(E element) {
    return mSuper.getNodeType(element);
  }

  @Override
  @SuppressWarnings("unchecked")
  public final String getNodeName(Object element) {
    return onGetNodeName((E) element);
  }

  protected String onGetNodeName(E element) {
    return mSuper.getNodeName(element);
  }

  @Override
  @SuppressWarnings("unchecked")
  public final String getLocalName(Object element) {
    return onGetLocalName((E) element);
  }

  protected String onGetLocalName(E element) {
    return mSuper.getLocalName(element);
  }

  @Override
  @SuppressWarnings("unchecked")
  public final String getNodeValue(Object element) {
    return onGetNodeValue((E) element);
  }

  @Nullable
  public String onGetNodeValue(E element) {
    return mSuper.getNodeValue(element);
  }

  @Override
  @SuppressWarnings("unchecked")
  public final void getChildren(Object element, Accumulator<Object> children) {
    mSuper.getChildren(element, children);
    onGetChildren((E) element, children);
  }

  protected void onGetChildren(E element, Accumulator<Object> children) {
  }

  @Override
  @SuppressWarnings("unchecked")
  public final void getAttributes(Object element, AttributeAccumulator attributes) {
    mSuper.getAttributes(element, attributes);
    onGetAttributes((E) element, attributes);
  }

  protected void onGetAttributes(E element, AttributeAccumulator attributes) {
  }

  @Override
  @SuppressWarnings("unchecked")
  public final void setAttributesAsText(Object element, String text) {
    onSetAttributesAsText((E) element, text);
  }

  protected void onSetAttributesAsText(E element, String text) {
    mSuper.setAttributesAsText(element, text);
  }

  @Override
  @SuppressWarnings("unchecked")
  public final void getStyles(Object element, StyleAccumulator accumulator) {
    mSuper.getStyles(element, accumulator);
    onGetStyles((E) element, accumulator);
  }

  protected void onGetStyles(E element, StyleAccumulator accumulator) {
  }
}
