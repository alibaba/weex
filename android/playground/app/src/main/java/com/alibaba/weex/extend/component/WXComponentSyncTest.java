package com.alibaba.weex.extend.component;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXDiv;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXLogUtils;

/**
 * Created by zhengshihan on 2016/12/30.
 */

public class WXComponentSyncTest extends WXDiv {

    public WXComponentSyncTest(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
    }

    @JSMethod (uiThread = false)
    public void testSyncCall(){
        WXLogUtils.d("11WXComponentSyncTest :"+ Thread.currentThread().getName());
    }

    @JSMethod (uiThread = true)
    public void testAsyncCall(){
        WXLogUtils.e("22WXComponentSynTest :"+ Thread.currentThread().getName() );
    }
}
