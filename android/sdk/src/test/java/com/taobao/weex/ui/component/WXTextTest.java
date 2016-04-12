/**
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
package com.taobao.weex.ui.component;

import com.taobao.weappplus_sdk.BuildConfig;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXEvent;
import com.taobao.weex.dom.WXTextDomObject;
import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.ui.view.gesture.WXGestureType;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by gulin on 16/2/4.
 */
@RunWith(RobolectricTestRunner.class)
@Config(constants = BuildConfig.class)
public class WXTextTest {
    private WXText mWXText;
    private WXDiv mParent;
    private WXTextDomObject mDomObject;
    private WXDomObject mParentDomObj;

    @Before
    public void setUp() throws Exception {
        WXEnvironment.sApplication = RuntimeEnvironment.application;
        WXSDKInstance instance = Mockito.mock(WXSDKInstance.class);
        Mockito.when(instance.getContext()).thenReturn(RuntimeEnvironment.application);

        mParentDomObj = Mockito.mock(WXDomObject.class);
        Mockito.when(mParentDomObj.getPadding()).thenReturn(new Spacing());
        Mockito.when(mParentDomObj.clone()).thenReturn(mParentDomObj);
        mParentDomObj.ref = "_root";

        mDomObject = Mockito.mock(WXTextDomObject.class);
        mDomObject.ref = "1";
        mDomObject.addEvent(WXEventType.CLICK);
        Mockito.when(mDomObject.clone()).thenReturn(mDomObject);
        Mockito.when(mDomObject.getPadding()).thenReturn(new Spacing());
        Mockito.when(mDomObject.getBorder()).thenReturn(new Spacing());
        Mockito.when(mDomObject.getMargin()).thenReturn(new Spacing());
        Mockito.when(mDomObject.getLayoutWidth()).thenReturn(100f);
        Mockito.when(mDomObject.getLayoutHeight()).thenReturn(100f);

        mParent = new WXDiv(instance, mParentDomObj, null, "1", false);
        mParent.createView(null, -1);
        mWXText = new WXText(instance, mDomObject, mParent, "1", false);
        assertNotNull(instance.getContext());
    }

    @Test
    public void testCreateView(){
        mWXText.createView(mParent, -1);
        assertNotNull(mWXText.getView());
    }

    @Test
    public void testSetLayout(){
        testCreateView();
        mWXText.setLayout(mDomObject);
        assertNotNull(mWXText.getView().getLayoutParams());
        assertEquals(100, mWXText.getView().getLayoutParams().height);
        assertEquals(100, mWXText.getView().getLayoutParams().width);
    }

    @Test
    public void testSetPadding(){
        testCreateView();
        mWXText.setPadding(mDomObject.getPadding(), mDomObject.getBorder());
        assertEquals(0, mWXText.getView().getPaddingLeft());
        assertEquals(0, mWXText.getView().getPaddingTop());
        assertEquals(0, mWXText.getView().getPaddingRight());
        assertEquals(0, mWXText.getView().getPaddingBottom());
    }

    @Test
    public void testBind(){
        testCreateView();
        mWXText.bind(null);

        assertNotNull(mWXText.getView().getLayoutParams());
        assertEquals(100, mWXText.getView().getLayoutParams().height);
        assertEquals(100, mWXText.getView().getLayoutParams().width);

        assertEquals(0, mWXText.getView().getPaddingLeft());
        assertEquals(0, mWXText.getView().getPaddingTop());
        assertEquals(0, mWXText.getView().getPaddingRight());
        assertEquals(0, mWXText.getView().getPaddingBottom());
    }

    @Test
    public void testAddEvent(){
        testBind();
        mWXText.addEvent(WXEventType.CLICK);
        assertTrue(mWXText.getView().isEnabled());
        mWXText.getView().performClick();
    }

    @Test
    public void testUpdateProperties(){
        testBind();
        Map<String, Object> prop = new HashMap<>();
        prop.put(WXDomPropConstant.WX_ATTR_DISABLED, "false");
        prop.put(WXDomPropConstant.WX_OPACITY, 0.8f);
        mWXText.updateProperties(prop);
        assertTrue(mWXText.getView().isEnabled());
        assertTrue(mWXText.getView().getAlpha()>=0.799 && mWXText.getView().getAlpha()<=0.811);

        prop.put(WXDomPropConstant.WX_ATTR_DISABLED, "true");
        mWXText.updateProperties(prop);
        assertFalse(mWXText.getView().isEnabled());
    }
}