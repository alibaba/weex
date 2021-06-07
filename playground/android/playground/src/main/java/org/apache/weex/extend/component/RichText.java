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
package org.apache.weex.extend.component;

import android.content.Context;
import android.support.annotation.NonNull;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.method.LinkMovementMethod;
import android.text.style.URLSpan;
import android.widget.TextView;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.ui.action.BasicComponentData;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

public class RichText extends WXComponent<TextView> {

  public RichText(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData) {
    super(instance, parent, basicComponentData);
  }

  @Override
  protected TextView initComponentHostView(@NonNull Context context) {
    TextView view = new TextView(context);
    view.setMovementMethod(LinkMovementMethod.getInstance());
    return view;
  }

  @WXComponentProp(name = "tel")
  public void setTelLink(String tel){
    SpannableString spannable=new SpannableString(tel);
    spannable.setSpan(new URLSpan("tel:"+tel),0,tel.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    ((TextView) getHostView()).setText(spannable);
  }
}
