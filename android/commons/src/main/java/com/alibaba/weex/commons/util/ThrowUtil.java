package com.alibaba.weex.commons.util;

/**
 * Created by sospartan on 5/31/16.
 */
public class ThrowUtil {
  public static<T extends Exception> void throwIfNull(Object object,T e) throws T {
    if(object == null){
      throw e;
    }
  }
}
