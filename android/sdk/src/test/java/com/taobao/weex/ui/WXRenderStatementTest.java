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
package com.taobao.weex.ui;

import android.text.TextUtils;

import com.taobao.weappplus_sdk.BuildConfig;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.ui.component.WXComponentFactory;
import com.taobao.weex.utils.WXSoInstallMgrSdk;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

/**
 * Created by lixinke on 16/3/2.
 */
@RunWith(PowerMockRunner.class)
@Config(constants = BuildConfig.class)
@PrepareForTest({WXSoInstallMgrSdk.class, TextUtils.class,WXComponentFactory.class})
public class WXRenderStatementTest {

    WXRenderStatement mWXRenderStatement;

    @Before
    public void setUp() throws Exception {
        PowerMockito.mockStatic(WXSoInstallMgrSdk.class);
        PowerMockito.mockStatic(TextUtils.class);
        PowerMockito.mockStatic(WXComponentFactory.class);
        PowerMockito.when(TextUtils.isEmpty("124")).thenReturn(true);
        PowerMockito.when(WXSoInstallMgrSdk.initSo(null, 1, null)).thenReturn(true);
        WXSDKEngine.init(RuntimeEnvironment.application);
        WXSDKInstance instance = Mockito.mock(WXSDKInstance.class);
        mWXRenderStatement = new WXRenderStatement(instance, "123");
    }

    public void testCreateBody() throws Exception {

    }

    @Test
    public void testCreateBodyOnDomThread() throws Exception {

    }

    public void testSetPadding() throws Exception {

    }

    public void testSetLayout() throws Exception {

    }

    public void testSetExtra() throws Exception {

    }

    public void testAddComponent() throws Exception {

    }

    @Test
    public void testCreateComponentOnDomThread() throws Exception {


//        PowerMockito.mockStatic(TextUtils.class);
//        PowerMockito.mockStatic(WXComponentFactory.class);
//        PowerMockito.when(TextUtils.isEmpty("1234")).thenReturn(true);
//        PowerMockito.when(WXComponentFactory.newInstance(null, null, null, null)).thenReturn(PowerMockito.mock(WXDiv.class));
//
//        WXDomObject object = PowerMockito.mock(WXDomObject.class);
//        WXComponent wxComponent = mWXRenderStatement.createBodyOnDomThread(object);
//        assertNotNull(wxComponent);

    }

    public void testAddComponent1() throws Exception {

    }

    public void testRemoveComponent() throws Exception {

    }

    public void testMove() throws Exception {

    }

    public void testAddEvent() throws Exception {

    }

    public void testRemoveEvent() throws Exception {

    }

    public void testUpdateAttrs() throws Exception {

    }

    public void testUpdateStyle() throws Exception {

    }

    public void testScrollTo() throws Exception {

    }

    public void testCreateFinish() throws Exception {

    }

    public void testRefreshFinish() throws Exception {

    }
}