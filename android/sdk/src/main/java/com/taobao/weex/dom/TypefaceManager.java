package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.utils.FontDO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by caolijie on 17/1/24.
 */

public class TypefaceManager {
    private final static Map<String, FontDO> sCacheMap = new HashMap<>(); //Key: fontFamilyName
    private final static Map<String, List<String>> mTextDomRefMap = new HashMap<>();
    private final static Map<String, LoadCallback> mLoadCallbackMap = new HashMap<>();

    public static void putFontDO(FontDO fontDO) {
        if (fontDO != null && !TextUtils.isEmpty(fontDO.getFontFamilyName())) {
            sCacheMap.put(fontDO.getFontFamilyName(), fontDO);
        }
    }

    public static FontDO getFontDO(String fontFamilyName) {
        return sCacheMap.get(fontFamilyName);
    }

    public static void putRef(String family, String ref) {
        List<String> refs = mTextDomRefMap.get(family);
        if (refs == null) {
            refs = new ArrayList<>();
            mTextDomRefMap.put(family, refs);
        }
        if (!refs.contains(ref)) {
            refs.add(ref);
        }
    }

    public static List<String> getTextDomRefs(String family) {
        return mTextDomRefMap.get(family);
    }

    public static boolean removeTextDomRefsByFamily(String family) {
        return mTextDomRefMap.remove(family) != null;
    }

    public static void putLoadCallback(String key, LoadCallback loadCallback) {
        mLoadCallbackMap.put(key, loadCallback);
    }

    public static LoadCallback getLoadCallback(String key) {
        return mLoadCallbackMap.get(key);
    }

    public static LoadCallback removeLoadCallback(String key) {
        return mLoadCallbackMap.remove(key);
    }

    public interface LoadCallback {
        void onLoaded(boolean success, String family);
    }

    public static void updateTextDomObjects(WXDomStatement statement, String family) {
        if (statement != null) {
            WXDomObject rootDom = statement.mRegistry.get(WXDomObject.ROOT);
            if (rootDom != null) {
                List<String> refs = TypefaceManager.getTextDomRefs(family);
                if (refs != null && refs.size() > 0) {
                    for (String ref : refs) {
                        if (ref != null) {
                            WXDomObject domObject = statement.mRegistry.get(ref);
                            if (domObject != null) {
                                domObject.updateAttr(domObject.getAttrs());
                            }
                        }
                    }
                    statement.layout(rootDom);
                }
            }
        }
        TypefaceManager.removeTextDomRefsByFamily(family);
    }
}
