package com.taobao.weex;

import android.app.Application;

import com.taobao.prettyfish.PrettyFishCommon;
import com.taobao.prettyfish.core.comp.AbstractBaseComp;
import com.taobao.prettyfish.core.fab.FloatWndManager;
import com.taobao.prettyfish_base.R;

/**
 * Created by lixinke on 16/5/4.
 */
public class WXPrettyFish {

  public static void init(Application application) {
    PrettyFishCommon.init(application);
    AbstractBaseComp wxBaseComp=new AbstractBaseComp() {
      @Override
      public int iconRes() {
        return R.drawable.ic_action_weex;
      }

      @Override
      public String title() {
        return "WEEX";
      }
    };
    wxBaseComp.registerComp(new WXPFComponent(application));
    FloatWndManager.registerBaseComp(wxBaseComp);
  }

}
