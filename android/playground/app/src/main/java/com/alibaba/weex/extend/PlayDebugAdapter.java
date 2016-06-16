package com.alibaba.weex.extend;

import android.app.Application;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;

import com.taobao.weex.IWXActivityStateListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXDebugAdapter;
import com.taobao.weex.utils.WXLogUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lixinke on 16/6/15.
 */
public class PlayDebugAdapter implements IWXDebugAdapter {

  public static final String SHOW_3D_LAYER = "show_3d_layer";
  private Map<String, String> options;


  @Override
  public void initDebug(final Application application) {
    WXSDKManager.getInstance().postOnUiThread(new Runnable() {
      @Override
      public void run() {
        try {
          Class cls = Class.forName("com.taobao.weex.WXPrettyFish");
          Method m = cls.getMethod("init", new Class[]{Application.class});
          m.invoke(cls, new Object[]{application});
        } catch (Exception e) {
          WXLogUtils.d("weex", "WXPrettyFish not found!");
        }
        putDebugOptions(SHOW_3D_LAYER, "true");
      }
    }, 0);
  }

  @Override
  public View wrapContainer(WXSDKInstance instance, View wxView) {
    try {
      Class scalpelClas = Class.forName("com.taobao.weex.scalpel.ScalpelFrameLayout");
      Constructor constructor = scalpelClas.getConstructor(new Class[]{Context.class});
      ViewGroup container = (ViewGroup) constructor.newInstance(wxView.getContext());
      if (container != null) {
        container.addView(wxView);
        Class cls = Class.forName("com.taobao.weex.WXDebugTool");
        Method m = cls.getMethod("updateScapleView", new Class[]{Object.class});
        m.invoke(null, new Object[]{container});
        instance.registerActivityStateListener(new DebugActivityState(wxView));
        return container;
      }
    } catch (Exception e) {
    }

    return wxView;
  }

  @Override
  public void putDebugOptions(String key, String value) {
    if (options == null) {
      options = new HashMap<>();
    }
    options.put(key, value);
  }
  @Override
  public String getDebugOptions(String key) {
    if (options != null) {
      return options.get(key);
    }
    return null;
  }

  static class DebugActivityState implements IWXActivityStateListener {

    private View mWXView;

    public DebugActivityState(View wxView) {
      mWXView = wxView;
    }

    @Override
    public void onActivityCreate() {

    }

    @Override
    public void onActivityStart() {

    }

    @Override
    public void onActivityPause() {
      try {
        Class cls = Class.forName("com.taobao.weex.WXDebugTool");
        Method m = cls.getMethod("updateScapleView", new Class[]{Object.class});
        m.invoke(null, new Object[]{});
      } catch (Exception e){
      }
    }

    @Override
    public void onActivityResume() {
      if (mWXView != null && mWXView.getParent()!=null && mWXView.getParent().getClass().getName().equals("com.taobao.weex.scalpel.ScalpelFrameLayout")) {
        try {
          Class cls = Class.forName("com.taobao.weex.WXDebugTool");
          Method m = cls.getMethod("updateScapleView", new Class[]{Object.class});
          m.invoke(null, new Object[]{mWXView.getParent()});
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    }

    @Override
    public void onActivityStop() {

    }

    @Override
    public void onActivityDestroy() {

    }

    @Override
    public boolean onActivityBack() {
      return false;
    }
  }
}
