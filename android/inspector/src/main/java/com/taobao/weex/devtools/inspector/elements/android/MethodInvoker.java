/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.common.Util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

/**
 * Tries to arbitrarily invoke single argument methods by name on an object instance by trying out
 * different argument types.
 */
public class MethodInvoker {

  private static final List<TypedMethodInvoker<?>> invokers = Arrays.asList(
      new StringMethodInvoker(), new CharSequenceMethodInvoker(), new IntegerMethodInvoker(),
      new FloatMethodInvoker(), new BooleanMethodInvoker());

  /**
   * Tries to invoke a method on receiver with a single argument by trying out different types
   * for arg until it finds one that matches (or not). No exceptions are thrown on failure.
   *
   * @param methodName The method name to be invoked
   * @param argument The single argument to be provided to the method
   */
  public void invoke(Object receiver, String methodName, String argument) {
    Util.throwIfNull(receiver, methodName, argument);
    int size = invokers.size();
    for (int i = 0; i < size; ++i) {
      final TypedMethodInvoker<?> invoker = invokers.get(i);
      if (invoker.invoke(receiver, methodName, argument)) {
        return;
      }
    }
    LogUtil.w("Method with name " + methodName +
              " not found for any of the MethodInvoker supported argument types.");
  }

  private static abstract class TypedMethodInvoker<T> {
    private final Class<T> mArgType;

    TypedMethodInvoker(Class<T> argType) {
      mArgType = argType;
    }

    boolean invoke(Object receiver, String methodName, String argument) {
      try {
        Method method = receiver.getClass().getMethod(methodName, mArgType);
        method.invoke(receiver, convertArgument(argument));
        return true;
      } catch (NoSuchMethodException ignored) {
        // ignore
      } catch (InvocationTargetException e) {
        LogUtil.w("InvocationTargetException: " + e.getMessage());
      } catch (IllegalAccessException e) {
        LogUtil.w("IllegalAccessException: " + e.getMessage());
      } catch (IllegalArgumentException e) {
        LogUtil.w("IllegalArgumentException: " + e.getMessage());
      }
      return false;
    }

    abstract T convertArgument(String argument);
  }

  private static class StringMethodInvoker extends TypedMethodInvoker<String> {
    StringMethodInvoker() {
      super(String.class);
    }

    @Override
    String convertArgument(String argument) {
      return argument;
    }
  }

  private static class CharSequenceMethodInvoker extends TypedMethodInvoker<CharSequence> {
    CharSequenceMethodInvoker() {
      super(CharSequence.class);
    }

    @Override
    CharSequence convertArgument(String argument) {
      return argument;
    }
  }

  private static class IntegerMethodInvoker extends TypedMethodInvoker<Integer> {
    IntegerMethodInvoker() {
      super(int.class);
    }

    @Override
    Integer convertArgument(String argument) {
      return Integer.parseInt(argument);
    }
  }

  private static class FloatMethodInvoker extends TypedMethodInvoker<Float> {
    FloatMethodInvoker() {
      super(float.class);
    }

    @Override
    Float convertArgument(String argument) {
      return Float.parseFloat(argument);
    }
  }

  private static class BooleanMethodInvoker extends TypedMethodInvoker<Boolean> {
    BooleanMethodInvoker() {
      super(boolean.class);
    }

    @Override
    Boolean convertArgument(String argument) {
      return Boolean.parseBoolean(argument);
    }
  }
}
