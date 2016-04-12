/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.dom.module;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.text.TextUtils;
import android.view.Gravity;
import android.widget.EditText;
import android.widget.Toast;

import com.taobao.weex.bridge.WXBridgeManager;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;
import com.taobao.weex.utils.WXConst;
import com.taobao.weex.utils.WXLogUtils;

import org.json.JSONObject;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;


/**
 * WXModalUIModule module provide toast、alert、confirm、prompt to display the message.
 * for example(weex JS):
 * this.$call('modal','toast',{'message':'test toast','duration': 2.0});
 */
public class WXModalUIModule extends WXModule {

  @WXModuleAnno
  public void toast(String param) {

    String message = "";
    int duration = Toast.LENGTH_SHORT;
    if (!TextUtils.isEmpty(param)) {
      try {
        param = URLDecoder.decode(param, "utf-8");
        JSONObject jsObj = new JSONObject(param);
        message = jsObj.optString(WXConst.MESSAGE);
        duration = jsObj.optInt(WXConst.DURATION);
      } catch (Exception e) {
        WXLogUtils.e("[WXModalUIModule] alert param parse error " + WXLogUtils.getStackTrace(e));
      }
    }
    if (TextUtils.isEmpty(message)) {
      WXLogUtils.e("[WXModalUIModule] toast param parse is null ");
      return;
    }

    if (duration > 3) {
      duration = Toast.LENGTH_LONG;
    } else {
      duration = Toast.LENGTH_SHORT;
    }

    Toast toast = Toast.makeText(mWXSDKInstance.getContext(), message, duration);
    toast.setGravity(Gravity.CENTER, 0, 0);
    toast.show();
  }

  @WXModuleAnno
  public void alert(String param, final String callbackId) {

    if (mWXSDKInstance.getContext() instanceof Activity) {

      String message = "";
      String okTitle = WXConst.OK;
      if (!TextUtils.isEmpty(param)) {
        try {
          param = URLDecoder.decode(param, "utf-8");
          JSONObject jsObj = new JSONObject(param);
          message = jsObj.optString(WXConst.MESSAGE);
          okTitle = jsObj.optString(WXConst.OK_TITLE);
        } catch (Exception e) {
          WXLogUtils.e("[WXModalUIModule] alert param parse error " + WXLogUtils.getStackTrace(e));
        }
      }
      if (TextUtils.isEmpty(message)) {
        WXLogUtils.e("[WXModalUIModule] alert param parse is null ");
        return;
      }
      AlertDialog.Builder builder = new AlertDialog.Builder(mWXSDKInstance.getContext());
      builder.setMessage(message);

      final String okTitle_f = TextUtils.isEmpty(okTitle) ? WXConst.OK : okTitle;
      builder.setPositiveButton(okTitle_f, new OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
          WXBridgeManager.getInstance().callback(mWXSDKInstance.getInstanceId(), callbackId, okTitle_f);

        }
      });
      AlertDialog alertDialog = builder.create();
      alertDialog.setCanceledOnTouchOutside(false);
      alertDialog.show();
    } else {
      WXLogUtils.e("[WXModalUIModule] when call alert mWXSDKInstance.getContext() must instanceof Activity");
    }
  }

  @WXModuleAnno
  public void confirm(String param, final String callbackId) {

    if (mWXSDKInstance.getContext() instanceof Activity) {
      String message = "";
      String okTitle = WXConst.OK;
      String cancelTitle = WXConst.CANCEL;

      if (!TextUtils.isEmpty(param)) {
        try {
          param = URLDecoder.decode(param, "utf-8");
          JSONObject jsObj = new JSONObject(param);
          message = jsObj.optString(WXConst.MESSAGE);
          okTitle = jsObj.optString(WXConst.OK_TITLE);
          cancelTitle = jsObj.optString(WXConst.CANCEL_TITLE);
        } catch (Exception e) {
          WXLogUtils.e("[WXModalUIModule] confirm param parse error " + WXLogUtils.getStackTrace(e));
        }
      }
      if (TextUtils.isEmpty(message)) {
        WXLogUtils.e("[WXModalUIModule] confirm param parse is null ");
        return;
      }
      AlertDialog.Builder builder = new AlertDialog.Builder(mWXSDKInstance.getContext());
      builder.setMessage(message);

      final String okTitle_f = TextUtils.isEmpty(okTitle) ? WXConst.OK : okTitle;
      final String cancelTitle_f = TextUtils.isEmpty(cancelTitle) ? WXConst.CANCEL : cancelTitle;

      builder.setPositiveButton(okTitle_f, new OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
          WXBridgeManager.getInstance().callback(mWXSDKInstance.getInstanceId(), callbackId, okTitle_f);

        }
      });
      builder.setNegativeButton(cancelTitle_f, new OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
          WXBridgeManager.getInstance().callback(mWXSDKInstance.getInstanceId(), callbackId, cancelTitle_f);

        }
      });
      AlertDialog alertDialog = builder.create();
      alertDialog.setCanceledOnTouchOutside(false);
      alertDialog.show();
    } else {
      WXLogUtils.e("[WXModalUIModule] when call confirm mWXSDKInstance.getContext() must instanceof Activity");
    }
  }

  @WXModuleAnno
  public void prompt(String param, final String callbackId) {
    if (mWXSDKInstance.getContext() instanceof Activity) {
      String message = "";
      String defaultValue = "";
      String okTitle = WXConst.OK;
      String cancelTitle = WXConst.CANCEL;

      if (!TextUtils.isEmpty(param)) {
        try {
          param = URLDecoder.decode(param, "utf-8");
          JSONObject jsObj = new JSONObject(param);
          message = jsObj.optString("message");
          okTitle = jsObj.optString("okTitle");
          cancelTitle = jsObj.optString("cancelTitle");
          defaultValue = jsObj.optString("default");
        } catch (Exception e) {
          WXLogUtils.e("[WXModalUIModule] confirm param parse error " + WXLogUtils.getStackTrace(e));
        }
      }

      if (TextUtils.isEmpty(message)) {
        WXLogUtils.e("[WXModalUIModule] confirm param parse is null ");
        return;
      }
      AlertDialog.Builder builder = new AlertDialog.Builder(mWXSDKInstance.getContext());
      builder.setMessage(message);

      final EditText editText = new EditText(mWXSDKInstance.getContext());
      editText.setText(defaultValue);
      builder.setView(editText);
      final String okTitle_f = TextUtils.isEmpty(okTitle) ? WXConst.OK : okTitle;
      final String cancelTitle_f = TextUtils.isEmpty(cancelTitle) ? WXConst.CANCEL : cancelTitle;
      builder.setPositiveButton(okTitle_f, new OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
          Map<String, Object> result = new HashMap<String, Object>();
          result.put(WXConst.RESULT, okTitle_f);
          result.put(WXConst.DATA, editText.getText().toString());
          WXBridgeManager.getInstance().callback(mWXSDKInstance.getInstanceId(), callbackId, result);

        }
      });
      builder.setNegativeButton(cancelTitle_f, new OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
          WXBridgeManager.getInstance().callback(mWXSDKInstance.getInstanceId(), callbackId, cancelTitle_f);
        }
      });
      AlertDialog alertDialog = builder.create();
      alertDialog.setCanceledOnTouchOutside(false);
      alertDialog.show();
    } else {
      WXLogUtils.e("when call prompt mWXSDKInstance.getContext() must instanceof Activity");
    }
  }

}