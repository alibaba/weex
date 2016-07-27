package com.taobao.weex.ui;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXVContainer;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by sospartan on 7/27/16.
 */
public interface ComponentCreator {
  WXComponent createInstance(WXSDKInstance instance, WXDomObject node, WXVContainer parent, boolean lazy) throws IllegalAccessException, InvocationTargetException, InstantiationException;
}
