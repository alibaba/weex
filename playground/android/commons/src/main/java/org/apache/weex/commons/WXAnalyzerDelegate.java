/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.weex.commons;

import android.content.Context;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;

import com.taobao.weex.WXSDKInstance;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

/**
 * Description:
 * <p>
 * Created by rowandjj(chuyi)<br/>
 * Date: 2016/10/27<br/>
 * Time: 下午7:01<br/>
 */

public final class WXAnalyzerDelegate {
    private Object mWXAnalyzer;

    private static boolean ENABLE = false;

    @SuppressWarnings("unchecked")
    public WXAnalyzerDelegate(@Nullable Context context) {
        if(!ENABLE){
            return;
        }
        if(context == null){
            return;
        }
        try {
            Class clazz = Class.forName("com.taobao.weex.analyzer.WeexDevOptions");
            Constructor constructor = clazz.getDeclaredConstructor(Context.class);
            mWXAnalyzer = constructor.newInstance(context);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void onCreate() {
        if (mWXAnalyzer == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onCreate");
            method.invoke(mWXAnalyzer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void onStart() {
        if (mWXAnalyzer == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onStart");
            method.invoke(mWXAnalyzer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void onResume() {
        if (mWXAnalyzer == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onResume");
            method.invoke(mWXAnalyzer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void onPause() {
        if (mWXAnalyzer == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onPause");
            method.invoke(mWXAnalyzer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void onStop() {
        if (mWXAnalyzer == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onStop");
            method.invoke(mWXAnalyzer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void onDestroy() {
        if (mWXAnalyzer == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onDestroy");
            method.invoke(mWXAnalyzer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void onWeexRenderSuccess(@Nullable WXSDKInstance instance) {
        if (mWXAnalyzer == null || instance == null) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onWeexRenderSuccess", WXSDKInstance.class);
            method.invoke(mWXAnalyzer, instance);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (mWXAnalyzer == null) {
            return false;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onKeyUp", int.class, KeyEvent.class);
            return (boolean) method.invoke(mWXAnalyzer, keyCode, event);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void onException(WXSDKInstance instance, String errCode, String msg) {
        if (mWXAnalyzer == null) {
            return;
        }
        if (TextUtils.isEmpty(errCode) && TextUtils.isEmpty(msg)) {
            return;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onException", WXSDKInstance.class, String.class, String.class);
            method.invoke(mWXAnalyzer, instance, errCode, msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public View onWeexViewCreated(WXSDKInstance instance, View view) {
        if (mWXAnalyzer == null || instance == null || view == null) {
            return null;
        }
        try {
            Method method = mWXAnalyzer.getClass().getDeclaredMethod("onWeexViewCreated", WXSDKInstance.class, View.class);
            View retView = (View) method.invoke(mWXAnalyzer, instance, view);
            return retView;
        } catch (Exception e) {
            e.printStackTrace();
            return view;
        }
    }

}
