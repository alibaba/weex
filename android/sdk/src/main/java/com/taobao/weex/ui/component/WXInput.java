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
package com.taobao.weex.ui.component;

import android.content.Context;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.text.method.PasswordTransformationMethod;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.inputmethod.InputMethodManager;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXStyle;
import com.taobao.weex.ui.view.WXEditText;
import com.taobao.weex.utils.WXResourceUtils;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * Input component
 */
public class WXInput extends WXComponent implements IWXRecyclerViewChild {

  private final InputMethodManager mInputMethodManager = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
  private String mBeforeText = "";
  private boolean mAutoFocus;
  private String mType = "text";
  private int mTextAlign = Gravity.LEFT;

  public WXInput(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, isLazy);
  }

  @Override
  protected void initView() {
    super.initView();
    mHost = new WXEditText(mContext);
    mTextAlign = Gravity.LEFT;
    int colorInt = WXResourceUtils.getColor("#999999");
    if (colorInt != Integer.MIN_VALUE) {
      ((WXEditText) mHost).setHintTextColor(colorInt);
    }

    ((WXEditText) mHost).setTextSize(TypedValue.COMPLEX_UNIT_PX, WXStyle.getFontSize(mDomObj.style));
  }

  @Override
  public WXEditText getView() {
    return (WXEditText) super.getView();
  }

  @Override
  public void flushView() {
    super.flushView();
    if (mHost == null) {
      return;
    }
    ((WXEditText) mHost).setRawInputType(getInputType(mType));
    if (mAutoFocus) {
      mHost.setFocusable(true);
      mHost.requestFocus();
      mHost.setFocusableInTouchMode(true);
      mHost.postDelayed(new Runnable() {
        @Override
        public void run() {
          showSoftKeyboard();
        }
      }, 16);
    } else {
      mHost.postDelayed(new Runnable() {
        @Override
        public void run() {
          hideSoftKeyboard();
        }
      }, 16);
    }
    if (mTextAlign > 0) {
      getView().setGravity(mTextAlign | Gravity.CENTER_VERTICAL);
    }
  }

  @Override
  public void addEvent(String type) {
    super.addEvent(type);
    if (mHost == null || TextUtils.isEmpty(type)) {
      return;
    }
    ((WXEditText) mHost).addTextChangedListener(new TextWatcher() {
      @Override
      public void beforeTextChanged(CharSequence s, int start, int count, int after) {

      }

      @Override
      public void onTextChanged(CharSequence s, int start, int before, int count) {
        if (mBeforeText.equals(s.toString())) {
          return;
        }
        if (mDomObj.event.contains(WXEventType.INPUT)) {
          Map<String, Object> params = new HashMap<>(2);
          params.put("value", s.toString());
          params.put("timeStamp", System.currentTimeMillis());
          WXSDKManager.getInstance().fireEvent(mInstanceId, mDomObj.ref, WXEventType.INPUT, params);
        }
        if (mDomObj.event.contains(WXEventType.INPUT_CHANGE)) {
          Map<String, Object> params = new HashMap<>(2);
          params.put("value", s.toString());
          params.put("timeStamp", System.currentTimeMillis());
          WXSDKManager.getInstance().fireEvent(mInstanceId, mDomObj.ref, WXEventType.INPUT_CHANGE, params);
        }

        mBeforeText = s.toString();
      }

      @Override
      public void afterTextChanged(Editable s) {

      }
    });
  }

  private int getInputType(String type) {
    int inputType;
    switch (type) {
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_TEXT:
        inputType = InputType.TYPE_CLASS_TEXT;
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_DATE:
        inputType = InputType.TYPE_CLASS_DATETIME | InputType.TYPE_DATETIME_VARIATION_DATE;
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_DATETIME:
        inputType = InputType.TYPE_CLASS_DATETIME;
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_EMAIL:
        inputType = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS;
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_PASSWORD:
        inputType = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD;
        getView().setTransformationMethod(PasswordTransformationMethod.getInstance());
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_TEL:
        inputType = InputType.TYPE_CLASS_PHONE;
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_TIME:
        inputType = InputType.TYPE_CLASS_DATETIME | InputType.TYPE_DATETIME_VARIATION_TIME;
        break;
      case WXDomPropConstant.WX_ATTR_INPUT_TYPE_URL:
        inputType = InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI;
        break;
      default:
        inputType = InputType.TYPE_CLASS_TEXT;
    }
    return inputType;
  }

  private boolean showSoftKeyboard() {
    if (mHost == null) {
      return false;
    }
    return mInputMethodManager.showSoftInput(mHost, InputMethodManager.SHOW_IMPLICIT);
  }

  private void hideSoftKeyboard() {
    if (mHost != null) {
      mInputMethodManager.hideSoftInputFromWindow(mHost.getWindowToken(), 0);
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_VALUE)
  public void setValue(String value) {
    if (value == null || mHost == null) {
      return;
    }
    ((WXEditText) mHost).setText(value);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_PLACEHOLDER)
  public void setPlaceholder(String placeholder) {
    if (placeholder == null || mHost == null) {
      return;
    }
    ((WXEditText) mHost).setHint(placeholder);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_INPUT_PLACEHOLDER_COLOR)
  public void setPlaceholderColor(String color) {
    if (mHost != null && !TextUtils.isEmpty(color)) {
      int colorInt = WXResourceUtils.getColor(color);
      if (colorInt != Integer.MIN_VALUE) {
        ((WXEditText) mHost).setHintTextColor(colorInt);
      }
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_COLOR)
  public void setColor(String color) {
    if (mHost != null && !TextUtils.isEmpty(color)) {
      int colorInt = WXResourceUtils.getColor(color);
      if (colorInt != Integer.MIN_VALUE) {
        ((WXEditText) mHost).setTextColor(colorInt);
      }
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_FONTSIZE)
  public void setFontSize(String fontSize) {
    if (mHost != null && fontSize != null && mDomObj.style != null) {
      ((WXEditText) mHost).setTextSize(TypedValue.COMPLEX_UNIT_PX, WXStyle.getFontSize(mDomObj.style));
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_AUTOFOCUS)
  public void setAutofocus(boolean autofocus) {
    if (mHost == null) {
      return;
    }
    mAutoFocus = autofocus;
  }

    @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_SINGLELINE)
    public void setSingleLine(boolean singleLine) {
        if (mHost == null) {
            return;
        }
        ((WXEditText)mHost).setSingleLine(singleLine);
    }

    @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_LINES)
    public void setLines(int lines) {
        if (mHost == null) {
            return;
        }
        ((WXEditText)mHost).setLines(lines);
    }

    @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_MAXLENGTH)
    public void setMaxLength(int maxLength) {
        if (mHost == null) {
            return;
        }
        ((WXEditText)mHost).setFilters(new InputFilter[]{new InputFilter.LengthFilter(maxLength)});
    }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_INPUT_TYPE)
  public void setType(String type) {
    if (type == null || mHost == null) {
      return;
    }
    mType = type;
  }

  @WXComponentProp(name = WXDomPropConstant.WX_TEXTALIGN)
  public void setTextAlign(String textAlign) {
    mTextAlign = getTextAlign(textAlign);
  }

  private int getTextAlign(String textAlign) {
    int align = Gravity.LEFT;
    if (TextUtils.isEmpty(textAlign)) {
      return align;
    }
    if (textAlign.equals(WXDomPropConstant.WX_TEXTALIGN_LEFT)) {
      align = Gravity.LEFT;
    } else if (textAlign.equals(WXDomPropConstant.WX_TEXTALIGN_CENTER)) {
      align = Gravity.CENTER;
    } else if (textAlign.equals(WXDomPropConstant.WX_TEXTALIGN_RIGHT)) {
      align = Gravity.RIGHT;
    }
    return align;
  }
}
