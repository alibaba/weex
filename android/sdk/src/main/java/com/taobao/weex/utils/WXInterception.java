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

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class WXInterception {

  private WXInterception() {
  }

  @SuppressWarnings("unchecked")
  public static <T> T proxy(final Object delegatee, final Class<T> interface_class, final InterceptionHandler<T> handler) throws IllegalArgumentException {
    if (delegatee instanceof Intercepted) {
      return (T) delegatee;
    }
    handler.setDelegate((T) delegatee);
    return (T) Proxy.newProxyInstance(WXInterception.class.getClassLoader(), new Class<?>[]{interface_class, Intercepted.class}, handler);
  }

  @SuppressWarnings("unchecked")
  public static <T> T proxy(final Object delegatee, final InterceptionHandler<T> handler, final Class<?>... interfaces) throws IllegalArgumentException {
    //if (Proxy.isProxyClass(delegatee.getClass())) return (T) delegatee;
    handler.setDelegate((T) delegatee);
    return (T) Proxy.newProxyInstance(WXInterception.class.getClassLoader(), interfaces, handler);
  }

  private interface Intercepted {

  }        // A mark to identify our proxy class

  /**
   * Derive this class and override {@link #invoke(Object, Method, Object[])} to implement an
   * interception handler.
   * <p/>
   * A typical usage example as below:<pre>
   * public class PackageManagerProxy extends InterceptionHandler {
   * <p/>
   *     public Object invoke(final Object proxy, final Method method, final Object[] args) throws Throwable {
   *         if ("getActivityInfo".equals(method.getName())) {
   *             final ActivityInfo found = mActivities.get(((ComponentName) args[0]).getClassName());
   *             if (found != null) {
   *                 ...
   *                 return found;
   *             }
   *         }
   *         return super.invoke(proxy, method, args);
   *     }
   * <p/>
   *     private final Map<String, ActivityInfo> mActivities;
   *     ...
   * }</pre>
   */
  public abstract static class InterceptionHandler<T> implements InvocationHandler {

    private T mDelegate;

    /**
     * Derived class should override this method and call <code>super.invoke(...)</code> to delegate the
     * procedure to original delegate instance if needed.
     *
     * @param proxy is ignored, instead the actual delegate instance will be used to invoke this method on.
     */
    @Override
    public Object invoke(final Object proxy, final Method method, final Object[] args) throws Throwable {
      try {
        return method.invoke(delegate(), args);
      } catch (IllegalArgumentException e) {/* Should never happen */
        e.printStackTrace();
        return null;
      } catch (IllegalAccessException e) {/* Should never happen */
        e.printStackTrace();
        return null;
      } catch (InvocationTargetException e) {
        throw e.getTargetException();
      }
    }

    protected T delegate() {
      return mDelegate;
    }

    void setDelegate(final T delegate) {
      mDelegate = delegate;
    }
  }
}
