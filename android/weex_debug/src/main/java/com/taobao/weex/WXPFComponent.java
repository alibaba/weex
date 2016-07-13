package com.taobao.weex;

import android.app.Application;
import android.content.Context;
import android.widget.Toast;

import com.taobao.prettyfish.core.comp.AbstractComponent;
import com.taobao.prettyfish_base.R;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


public class WXPFComponent extends AbstractComponent {

  public WXPFComponent(Application application) {
    super(application);
  }

  @Override
  public boolean isDeviceSupport() {
    return true;
  }

  @Override
  public int iconRes() {
    return R.drawable.ic_action_3d;
  }

  @Override
  public String title() {
    return "3D";
  }

  @Override
  public boolean onClick(Context context) {

    try {

      if(!WXEnvironment.sShow3DLayer){
        Toast.makeText(context,"Turn on 3D level switch!use this code WXSDKEngine.show3DLayer(true)",Toast.LENGTH_SHORT).show();
      }

      Class cls = Class.forName("com.taobao.weex.WXDebugTool");
      Method m = cls.getMethod("switchLayerInteractionEnabled", new Class[0]);
      m.invoke(null, new Object[0]);
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (NoSuchMethodException e) {
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    }

//    WXDebugTool.switchLayerInteractionEnabled();
    return false;
  }

  @Override
  public void onClose() {
  }
}
