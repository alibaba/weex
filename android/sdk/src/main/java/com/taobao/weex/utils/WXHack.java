/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.utils;

import com.taobao.weex.utils.WXHack.HackDeclaration.HackAssertionException;
import com.taobao.weex.utils.WXInterception.InterceptionHandler;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class WXHack {

  private static AssertionFailureHandler sFailureHandler;

  private WXHack() {
  }

  public static <T> HackedClass<T> into(final Class<T> clazz) {
    return new HackedClass<T>(clazz);
  }

  @SuppressWarnings({"rawtypes", "unchecked"})
  public static <T> HackedClass<T> into(final String class_name) throws HackAssertionException {
    try {
      return new HackedClass(Class.forName(class_name));
    } catch (final ClassNotFoundException e) {
      fail(new HackAssertionException(e));
      return new HackedClass(null);    // TODO: Better solution to avoid null?
    }
  }

  private static void fail(HackAssertionException e) throws HackAssertionException {
    if (sFailureHandler == null || !sFailureHandler.onAssertionFailure(e)) {
      throw e;
    }
  }

  /**
   * Specify a handler to deal with assertion failure, and decide whether the failure should be thrown.
   */
  public static void setAssertionFailureHandler(AssertionFailureHandler handler) {
    sFailureHandler = handler;
  }

  /**
   * Use {@link WXHack#setAssertionFailureHandler(AssertionFailureHandler) } to set the global handler
   */
  public interface AssertionFailureHandler {

    /**
     * @return whether the failure is handled and no need to throw out, return false to let it thrown
     */
    boolean onAssertionFailure(HackAssertionException failure);
  }

  /**
   * All hacks should be declared in a centralized point extending this class, typically as static
   * method, and call it in your application initialization stage to verify all the hack
   * assertions by catching exception thrown:
   * <pre>
   * class MyHacks extends HackDeclaration {
   *
   *     static HackedField<Object, PackageManager> ContextImpl_mPackageManager;
   *     static HackedField<Object, Map<String, IBinder>> ServiceManager_sCache;
   *
   *     static void defineAndVerify() {
   *         try {
   *             ContextImpl_mPackageManager = Hack.into("android.app.ContextImpl").field("mPackageManager").ofType(PackageManager.class);
   *             ServiceManager_sCache = Hack.into("android.os.ServiceManager").staticField("sCache").ofGenericType(Map.class)
   *
   *             ...
   *         } catch (HackAssertionException e) {
   *             // Report the failure and activate fall-back strategy.
   *             ...
   *         }
   *     }
   * }
   * <pre>
   * Thus we can verify them all together in an early application initialization stage. If any assertion
   * failed, a fall-back strategy is suggested.
   */
  public static abstract class HackDeclaration {

    /**
     * This exception is purposely defined as "protected" and not extending Exception to avoid
     * developers unconsciously catch it outside the centralized hacks declaration, which results
     * in potentially pre-checked usage of hacks.
     */
    public static class HackAssertionException extends Throwable {

      private static final long serialVersionUID = 1L;
      private Class<?> mHackedClass;
      private String mHackedFieldName;
      private String mHackedMethodName;

      public HackAssertionException(final String e) {
        super(e);
      }

      public HackAssertionException(final Exception e) {
        super(e);
      }

      @Override
      public String toString() {
        return getCause() != null ? getClass().getName() + ": " + getCause() : super.toString();
      }

      public Class<?> getHackedClass() {
        return mHackedClass;
      }

      public void setHackedClass(Class<?> mHackedClass) {
        this.mHackedClass = mHackedClass;
      }

      public String getHackedMethodName() {
        return mHackedMethodName;
      }

      public void setHackedMethodName(String methodName) {
        this.mHackedMethodName = methodName;
      }

      public String getHackedFieldName() {
        return mHackedFieldName;
      }

      public void setHackedFieldName(String fieldName) {
        this.mHackedFieldName = fieldName;
      }
    }
  }

  /**
   * @beta
   */
  public static class HackedField<C, T> {

    private final Field mField;

    /**
     * @param modifiers the modifiers this field must have
     */
    HackedField(final Class<C> clazz, final String name, int modifiers) throws HackAssertionException {
      Field field = null;
      try {
        if (clazz == null) {
          return;
        }
        field = clazz.getDeclaredField(name);
        if (modifiers > 0 && (field.getModifiers() & modifiers) != modifiers) {
          fail(new HackAssertionException(field + " does not match modifiers: " + modifiers));
        }
        field.setAccessible(true);
      } catch (final NoSuchFieldException e) {
        HackAssertionException hae = new HackAssertionException(e);
        hae.setHackedClass(clazz);
        hae.setHackedFieldName(name);
        fail(hae);
      } finally {
        mField = field;
      }
    }

    @SuppressWarnings("unchecked")        // TODO: Add more check
    public <T2> HackedField<C, T2> ofGenericType(final Class<?> type) throws HackAssertionException {
      if (mField != null && !type.isAssignableFrom(mField.getType())) {
        fail(new HackAssertionException(new ClassCastException(mField + " is not of type " + type)));
      }
      return (HackedField<C, T2>) this;
    }

    @SuppressWarnings("unchecked")
    public HackedField<C, T> ofType(final String type_name) throws HackAssertionException {
      try {
        return (HackedField<C, T>) ofType(Class.forName(type_name));
      } catch (final ClassNotFoundException e) {
        fail(new HackAssertionException(e));
        return this;
      }
    }

    @SuppressWarnings("unchecked")
    public <T2> HackedField<C, T2> ofType(final Class<T2> type) throws HackAssertionException {
      if (mField != null && !type.isAssignableFrom(mField.getType())) {
        fail(new HackAssertionException(new ClassCastException(mField + " is not of type " + type)));
      }
      return (HackedField<C, T2>) this;
    }

    /**
     * Hijack the current instance of this field.
     * <p/>
     * <p><b>The instance must not be null at the time of hijacking</b>, or an IllegalStateException will be thrown.
     *
     * @param handler a invocation handler to implement the hijack logic.
     */
    public void hijack(final C instance, final InterceptionHandler<?> handler) {
      final Object delegatee = get(instance);
      if (delegatee == null) {
        throw new IllegalStateException("Cannot hijack null");
      }
      final Class<?>[] interfaces = delegatee.getClass().getInterfaces();
      set(instance, WXInterception.proxy(delegatee, handler, interfaces));
    }

    /**
     * Get current value of this field
     */
    public T get(final C instance) {
      try {
        @SuppressWarnings("unchecked") final T value = (T) mField.get(instance);
        return value;
      } catch (final IllegalAccessException e) {
        e.printStackTrace();
        //TBS.Ext.commitEvent("AtlasRuntimeException", AtlasConstant.ATLAS_RUNTIME_EXCEPTION, e.toString());
        return null; /* Should never happen */
      }
    }

    /**
     * Set value of this field
     * <p/>
     * <p>No type enforced here since most type mismatch can be easily tested and exposed early.</p>
     */
    public void set(final C instance, final Object value) {
      try {
        mField.set(instance, value);
      } catch (final IllegalAccessException e) {
        e.printStackTrace();
        //                if(value instanceof DelegateClassLoader){
        //                    throw new RuntimeException("set DelegateClassLoader fail",e);
        //                }
                /* Should never happen */
      }
    }

    public Field getField() {
      return mField;
    }
  }

  public static class HackedMethod {

    protected final Method mMethod;

    HackedMethod(final Class<?> clazz, final String name, final Class<?>[] arg_types, int modifiers) throws HackAssertionException {
      Method method = null;
      try {
        if (clazz == null) {
          return;
        }
        method = clazz.getDeclaredMethod(name, arg_types);
        if (modifiers > 0 && (method.getModifiers() & modifiers) != modifiers) {
          fail(new HackAssertionException(method + " does not match modifiers: " + modifiers));
        }
        method.setAccessible(true);
      } catch (final NoSuchMethodException e) {
        HackAssertionException hae = new HackAssertionException(e);
        hae.setHackedClass(clazz);
        hae.setHackedMethodName(name);
        fail(hae);
      } finally {
        mMethod = method;
      }
    }

    public Object invoke(final Object receiver, final Object... args) throws IllegalArgumentException, InvocationTargetException {
      Object obj = null;
      try {
        obj = mMethod.invoke(receiver, args);
        return obj;
      } catch (final IllegalAccessException e) { /* Should never happen */
        e.printStackTrace();
      }
      return obj;
    }

    public Method getMethod() {
      return mMethod;
    }
  }

  public static class HackedConstructor {

    protected Constructor<?> mConstructor;

    HackedConstructor(final Class<?> clazz, final Class<?>[] arg_types) throws HackAssertionException {
      try {
        if (clazz == null) {
          return;
        }
        mConstructor = clazz.getDeclaredConstructor(arg_types);
      } catch (NoSuchMethodException e) {
        HackAssertionException hae = new HackAssertionException(e);
        hae.setHackedClass(clazz);
        fail(hae);
      }
    }

    public Object getInstance(final Object... arg_types) throws IllegalArgumentException {
      Object obj = null;
      mConstructor.setAccessible(true);
      try {
        obj = mConstructor.newInstance(arg_types);
      } catch (Exception e) {
        e.printStackTrace();
      }
      return obj;
    }
  }

  public static class HackedClass<C> {

    protected Class<C> mClass;

    public HackedClass(final Class<C> clazz) {
      mClass = clazz;
    }

    public HackedField<C, Object> staticField(final String name) throws HackAssertionException {
      return new HackedField<C, Object>(mClass, name, Modifier.STATIC);
    }

    public HackedField<C, Object> field(final String name) throws HackAssertionException {
      return new HackedField<C, Object>(mClass, name, 0);
    }

    public HackedMethod staticMethod(final String name, final Class<?>... arg_types) throws HackAssertionException {
      return new HackedMethod(mClass, name, arg_types, Modifier.STATIC);
    }

    public HackedMethod method(final String name, final Class<?>... arg_types) throws HackAssertionException {
      return new HackedMethod(mClass, name, arg_types, 0);
    }

    public HackedConstructor constructor(final Class<?>... arg_types) throws HackAssertionException {
      return new HackedConstructor(mClass, arg_types);
    }

    public Class<C> getmClass() {
      return mClass;
    }
  }
}
