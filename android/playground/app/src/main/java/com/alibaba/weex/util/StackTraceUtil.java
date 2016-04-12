/*
 * Copyright 1999-2101 Alibaba Group.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.alibaba.weex.util;

import java.util.ArrayList;
import java.util.Locale;

/**
 * @ClassName: StackTraceUtil
 * @Description: Used to convert stacktrace info to string.
 * @date 2014年9月3日 下午12:05:47
 */
public class StackTraceUtil {

  public static String[] StackTraceElementArray2StringArray(StackTraceElement[] stacks) {

    ArrayList<String> a = new ArrayList<String>();

    for (StackTraceElement stack : stacks) {
      a.add(StackTraceElement2String(stack));
    }

    return (String[]) a.toArray(new String[a.size()]);
  }

  public static String StackTraceElement2String(StackTraceElement stack) {

    StringBuilder buf = new StringBuilder(80);

    buf.append(stack.getClassName());
    buf.append('.');
    buf.append(stack.getMethodName());

    if (stack.isNativeMethod()) {
      buf.append("(Native Method)");
    } else {
      String fName = stack.getFileName();

      if (fName == null) {
        buf.append("(Unknown Source)");
      } else {
        int lineNum = stack.getLineNumber();

        buf.append('(');
        buf.append(fName);
        if (lineNum >= 0) {
          buf.append(':');
          buf.append(lineNum);
        }
        buf.append(')');
      }
    }
    return buf.toString();
  }

  /**
   * @param upperLevel find the caller up to how many levels against the direct caller of this
   *                   method. 0 is the direct caller itself.
   */
  public static CallerEntity getDirectCaller(int upperLevel) {
    StackTraceElement[] stacks = Thread.currentThread().getStackTrace();
    // 0: getStackTrace()
    // 1: this method
    // 2: direct caller of this method
    int level = 3 + upperLevel;
    if (null != stacks && stacks.length > level) {
      StackTraceElement caller = stacks[level];
      String callerClz = caller.getClassName();
      String callerMethod = caller.getMethodName();
      return new CallerEntity(callerClz, callerMethod);
    }
    return null;
  }

  public static class CallerEntity {

    private String callerClz;
    private String callerMethod;

    public CallerEntity(String callerClz, String callerMethod) {
      super();
      this.callerClz = callerClz;
      this.callerMethod = callerMethod;
    }

    public String getCallerClz() {
      return callerClz;
    }

    public String getCallerMethod() {
      return callerMethod;
    }

    @Override
    public String toString() {
      return String.format(Locale.US, "%s.%s()", callerClz, callerMethod);
    }


  }
}
