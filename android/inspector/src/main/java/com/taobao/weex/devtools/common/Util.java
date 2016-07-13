/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common;

import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Util {
  public static <T> T throwIfNull(T item) {
    if (item == null) {
      throw new NullPointerException();
    }
    return item;
  }

  public static <T1, T2> void throwIfNull(T1 item1, T2 item2) {
    throwIfNull(item1);
    throwIfNull(item2);
  }

  public static <T1, T2, T3> void throwIfNull(T1 item1, T2 item2, T3 item3) {
    throwIfNull(item1);
    throwIfNull(item2);
    throwIfNull(item3);
  }

  public static void throwIfNotNull(Object item) {
    if (item != null) {
      throw new IllegalStateException();
    }
  }

  public static void throwIf(boolean condition) {
    if (condition) {
      throw new IllegalStateException();
    }
  }

  public static void throwIfNot(boolean condition) {
    if (!condition) {
      throw new IllegalStateException();
    }
  }

  public static void throwIfNot(boolean condition, String format, Object...args) {
    if (!condition) {
      String message = String.format(format, args);
      throw new IllegalStateException(message);
    }
  }

  public static void copy(InputStream input, OutputStream output, byte[] buffer)
      throws IOException {
    int n;
    while ((n = input.read(buffer)) != -1) {
      output.write(buffer, 0, n);
    }
  }

  public static void close(Closeable closeable, boolean hideException) throws IOException {
    if (closeable != null) {
      if (hideException) {
        try {
          closeable.close();
        } catch (IOException e) {
          LogUtil.e(e, "Hiding IOException because another is pending");
        }
      } else {
        closeable.close();
      }
    }
  }

  public static void sleepUninterruptibly(long millis) {
    long remaining = millis;
    long startTime = System.currentTimeMillis();
    do {
      try {
        Thread.sleep(remaining);
        return;
      } catch (InterruptedException e) {
        long sleptFor = System.currentTimeMillis() - startTime;
        remaining -= sleptFor;
      }
    } while (remaining > 0);
  }

  public static void joinUninterruptibly(Thread t) {
    while (true) {
      try {
        t.join();
        return;
      } catch (InterruptedException e) {
        // Keep going...
      }
    }
  }

  public static void awaitUninterruptibly(CountDownLatch latch) {
    while (true) {
      try {
        latch.await();
        return;
      } catch (InterruptedException e) {
        // Keep going...
      }
    }
  }

  public static <T> T getUninterruptibly(
      Future<T> future,
      long timeout,
      TimeUnit unit) throws TimeoutException, ExecutionException {
    long remaining = unit.toMillis(timeout);
    long startTime = System.currentTimeMillis();
    while (true) {
      try {
        return future.get(remaining, TimeUnit.MILLISECONDS);
      } catch (InterruptedException e) {
        long gotFor = System.currentTimeMillis() - startTime;
        remaining -= gotFor;
      }
    }
  }

  public static <T> T getUninterruptibly(Future<T> future)
      throws ExecutionException {
    while (true) {
      try {
        return future.get();
      } catch (InterruptedException e) {
        //Keep going...
      }
    }
  }

  public static String readAsUTF8(InputStream in) throws IOException {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    copy(in, out, new byte[1024]);
    return out.toString("UTF-8");
  }
}
