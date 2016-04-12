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
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.flex.Spacing;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

import static org.junit.Assert.*;

/**
 * Created by gulin on 16/2/24.
 */
@RunWith(RobolectricTestRunner.class)
@Config(constants = BuildConfig.class)
public class WXDivTest {

    private WXDiv mWXDiv;
    private WXText child2;

    @Before
    public void setUp() throws Exception {
        WXSDKInstance instance = Mockito.mock(WXSDKInstance.class);
        Mockito.when(instance.getContext()).thenReturn(RuntimeEnvironment.application);

        WXDomObject divDom = Mockito.mock(WXDomObject.class);
        Mockito.when(divDom.getPadding()).thenReturn(new Spacing());
        Mockito.when(divDom.clone()).thenReturn(divDom);
        divDom.ref = "1";

        mWXDiv = new WXDiv(instance, divDom, null, "1", false);
        mWXDiv.initView();
    }

    @Test
    public void testAddChild(){
        WXSDKInstance instance = Mockito.mock(WXSDKInstance.class);
        Mockito.when(instance.getContext()).thenReturn(RuntimeEnvironment.application);

        WXDomObject testDom = Mockito.mock(WXDomObject.class);
        Mockito.when(testDom.getPadding()).thenReturn(new Spacing());
        Mockito.when(testDom.clone()).thenReturn(testDom);
        testDom.ref = "2";
        WXText child1 = new WXText(instance, testDom, mWXDiv, "1", false);
        child1.initView();

        mWXDiv.addChild(child1, 0);

        assertEquals(1, mWXDiv.childCount());

        WXDomObject testDom2 = Mockito.mock(WXDomObject.class);
        Mockito.when(testDom2.getPadding()).thenReturn(new Spacing());
        Mockito.when(testDom2.clone()).thenReturn(testDom2);
        testDom2.ref = "3";
        child2 = new WXText(instance, testDom2, mWXDiv, "1", false);
        child2.initView();

        mWXDiv.addChild(child2, -1);

        assertEquals(2, mWXDiv.childCount());
        assertEquals(child2, mWXDiv.getChild(1));

        WXDomObject testDom3 = Mockito.mock(WXDomObject.class);
        Mockito.when(testDom3.getPadding()).thenReturn(new Spacing());
        Mockito.when(testDom3.clone()).thenReturn(testDom3);
        testDom3.ref = "4";
        WXText child3 = new WXText(instance, testDom3, mWXDiv, "1", false);
        child3.initView();

        mWXDiv.addChild(child3, 1);

        assertEquals(3, mWXDiv.childCount());
        assertEquals(child3, mWXDiv.getChild(1));
    }

    @Test
    public void testRemove(){
        testAddChild();
        mWXDiv.remove(child2);

        assertEquals(2, mWXDiv.childCount());
    }
}