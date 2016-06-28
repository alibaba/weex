/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.helper;

import android.util.SparseArray;

import java.util.IdentityHashMap;
import java.util.Map;

import javax.annotation.Nullable;
import javax.annotation.concurrent.GuardedBy;

public class ObjectIdMapper {
  protected final Object mSync = new Object();

  @GuardedBy("mSync")
  private int mNextId = 1;

  @GuardedBy("mSync")
  private final Map<Object, Integer> mObjectToIdMap = new IdentityHashMap<Object, Integer>();

  @GuardedBy("mSync")
  private SparseArray<Object> mIdToObjectMap = new SparseArray<Object>();

  public void clear() {
    SparseArray<Object> idToObjectMap;
    synchronized (mSync) {
      idToObjectMap = mIdToObjectMap;
      mObjectToIdMap.clear();
      mIdToObjectMap = new SparseArray<Object>();
    }

    int size = idToObjectMap.size();
    for (int i = 0; i < size; ++i) {
      int id = idToObjectMap.keyAt(i);
      Object object = idToObjectMap.valueAt(i);
      onUnmapped(object, id);
    }
  }

  public boolean containsId(int id) {
    synchronized (mSync) {
      return mIdToObjectMap.get(id) != null;
    }
  }

  public boolean containsObject(Object object) {
    synchronized (mSync) {
      return mObjectToIdMap.containsKey(object);
    }
  }

  @Nullable
  public Object getObjectForId(int id) {
    synchronized (mSync) {
      return mIdToObjectMap.get(id);
    }
  }

  @Nullable
  public Integer getIdForObject(Object object) {
    synchronized (mSync) {
      return mObjectToIdMap.get(object);
    }
  }

  public int putObject(Object object) {
    Integer id;

    synchronized (mSync) {
      id = mObjectToIdMap.get(object);
      if (id != null) {
        return id;
      }

      id = mNextId++;
      mObjectToIdMap.put(object, id);
      mIdToObjectMap.put(id, object);
    }

    onMapped(object, id);
    return id;
  }

  @Nullable
  public Object removeObjectById(int id) {
    Object object;

    synchronized (mSync) {
      object = mIdToObjectMap.get(id);
      if (object == null) {
        return null;
      }

      mIdToObjectMap.remove(id);
      mObjectToIdMap.remove(object);
    }

    onUnmapped(object, id);
    return object;
  }

  @Nullable
  public Integer removeObject(Object object) {
    Integer id;

    synchronized (mSync) {
      id = mObjectToIdMap.remove(object);
      if (id == null) {
        return null;
      }

      mIdToObjectMap.remove(id);
    }

    onUnmapped(object, id);
    return id;
  }

  public int size() {
    synchronized (mSync) {
      return mObjectToIdMap.size();
    }
  }

  protected void onMapped(Object object, int id) {
  }

  protected void onUnmapped(Object object, int id) {
  }
}
