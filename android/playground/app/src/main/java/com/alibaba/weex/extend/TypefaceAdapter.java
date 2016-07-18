package com.alibaba.weex.extend;

import android.graphics.Typeface;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.adapter.IWXTypefaceAdapter;

public class TypefaceAdapter implements IWXTypefaceAdapter {
    @Override
    public Typeface createTypeface(String path, int style) {
        try {
            return Typeface.createFromAsset(WXEnvironment.getApplication().getApplicationContext().getAssets(), path);
        }catch (Exception e) {
            return null;
        }
    }
}
