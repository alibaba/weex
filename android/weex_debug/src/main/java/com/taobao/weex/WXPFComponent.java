package com.taobao.weex;

import android.app.Application;
import android.content.Context;

import com.taobao.prettyfish.core.comp.AbstractComponent;


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
    return R.drawable.ic_action_bug;
  }

  @Override
  public String title() {
    return "3D";
  }

  @Override
  public boolean onClick(Context context) {
    WXDebugTool.switchLayerInteractionEnabled();
    return false;
  }

  @Override
  public void onClose() {
  }
}
