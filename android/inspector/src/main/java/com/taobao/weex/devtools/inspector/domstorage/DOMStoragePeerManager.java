/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.domstorage;

import android.content.Context;
import android.content.SharedPreferences;

import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.inspector.helper.ChromePeerManager;
import com.taobao.weex.devtools.inspector.helper.PeerRegistrationListener;
import com.taobao.weex.devtools.inspector.helper.PeersRegisteredListener;
import com.taobao.weex.devtools.inspector.protocol.module.DOMStorage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class DOMStoragePeerManager extends ChromePeerManager {
  private final Context mContext;

  public DOMStoragePeerManager(Context context) {
    mContext = context;
    setListener(mPeerListener);
  }

  public void signalItemRemoved(DOMStorage.StorageId storageId, String key) {
    DOMStorage.DomStorageItemRemovedParams params =
        new DOMStorage.DomStorageItemRemovedParams();
    params.storageId = storageId;
    params.key = key;
    sendNotificationToPeers("DOMStorage.domStorageItemRemoved", params);
  }

  public void signalItemAdded(DOMStorage.StorageId storageId, String key, String value) {
    DOMStorage.DomStorageItemAddedParams params =
        new DOMStorage.DomStorageItemAddedParams();
    params.storageId = storageId;
    params.key = key;
    params.newValue = value;
    sendNotificationToPeers("DOMStorage.domStorageItemAdded", params);
  }

  public void signalItemUpdated(
      DOMStorage.StorageId storageId,
      String key,
      String oldValue,
      String newValue) {
    DOMStorage.DomStorageItemUpdatedParams params =
        new DOMStorage.DomStorageItemUpdatedParams();
    params.storageId = storageId;
    params.key = key;
    params.oldValue = oldValue;
    params.newValue = newValue;
    sendNotificationToPeers("DOMStorage.domStorageItemUpdated", params);
  }

  private final PeerRegistrationListener mPeerListener = new PeersRegisteredListener() {
    private final List<DevToolsSharedPreferencesListener> mPrefsListeners =
        new ArrayList<DevToolsSharedPreferencesListener>();

    @Override
    protected synchronized void onFirstPeerRegistered() {
      // TODO: We list the tags in Page.getResourceTree as well and those are the real fixed
      // tags that will be observed by the peer.  We can fix this by making the page frames
      // dynamically update in response to DOMStorage events.  This would also allow us to
      // add new SharedPreferences tags as we observe them being created by way of
      // android.os.FileObserver.
      List<String> tags = SharedPreferencesHelper.getSharedPreferenceTags(mContext);
      for (String tag : tags) {
        SharedPreferences prefs = mContext.getSharedPreferences(tag, Context.MODE_PRIVATE);
        DevToolsSharedPreferencesListener listener =
            new DevToolsSharedPreferencesListener(prefs, tag);
        prefs.registerOnSharedPreferenceChangeListener(listener);
        mPrefsListeners.add(listener);
      }
    }

    @Override
    protected synchronized void onLastPeerUnregistered() {
      for (DevToolsSharedPreferencesListener prefsListener : mPrefsListeners) {
        prefsListener.unregister();
      }
      mPrefsListeners.clear();
    }
  };

  private class DevToolsSharedPreferencesListener
      implements SharedPreferences.OnSharedPreferenceChangeListener {
    private final SharedPreferences mPrefs;
    private final DOMStorage.StorageId mStorageId;

    /**
     * Maintains a copy of the prefs data structure so that we can invoke
     * {@code DOMStorage.domStorageItemUpdated}.  This method requires that we know the old
     * value to perform updates.  Using {@code domStorageItemRemoved}/{@code Added} causes a UI
     * glitch where the item is moved to the end of the list, unfortunately.
     */
    private final Map<String, Object> mCopy;

    public DevToolsSharedPreferencesListener(SharedPreferences prefs, String tag) {
      mPrefs = prefs;
      mStorageId = new DOMStorage.StorageId();
      mStorageId.securityOrigin = tag;
      mStorageId.isLocalStorage = true;
      mCopy = prefsCopy(prefs.getAll());
    }

    public void unregister() {
      mPrefs.unregisterOnSharedPreferenceChangeListener(this);
    }

    @Override
    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
      Map<String, ?> entries = sharedPreferences.getAll();
      boolean existedBefore = mCopy.containsKey(key);
      boolean existsNow = entries.containsKey(key);
      Object newValue = existsNow ? entries.get(key) : null;
      if (existedBefore && existsNow) {
        signalItemUpdated(
            mStorageId,
            key,
            SharedPreferencesHelper.valueToString(mCopy.get(key)),
            SharedPreferencesHelper.valueToString(newValue));
        mCopy.put(key, newValue);
      } else if (existedBefore) {
        signalItemRemoved(mStorageId, key);
        mCopy.remove(key);
      } else if (existsNow) {
        signalItemAdded(
            mStorageId,
            key,
            SharedPreferencesHelper.valueToString(newValue));
        mCopy.put(key, newValue);
      } else {
        // This can happen due to the async nature of the onSharedPreferenceChanged callback.  A
        // rapid put/remove as two separate commits on a background thread would cause this.
        LogUtil.i("Detected rapid put/remove of %s", key);
      }
    }
  }

  private static Map<String, Object> prefsCopy(Map<String, ?> src) {
    HashMap<String, Object> dst = new HashMap<String, Object>(src.size());
    for (Map.Entry<String, ?> entry : src.entrySet()) {
      String key = entry.getKey();
      Object value = entry.getValue();
      if (value instanceof Set) {
        dst.put(key, shallowCopy((Set<String>)value));
      } else {
        dst.put(key, value);
      }
    }
    return dst;
  }

  private static <T> Set<T> shallowCopy(Set<T> src) {
    HashSet<T> dst = new HashSet<T>();
    for (T item : src) {
      dst.add(item);
    }
    return dst;
  }
}
