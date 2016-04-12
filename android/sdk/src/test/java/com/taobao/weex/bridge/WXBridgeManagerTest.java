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
package com.taobao.weex.bridge;

import android.os.Handler;

import junit.framework.TestCase;

/**
 * Created by lixinke on 16/2/24.
 */
public class WXBridgeManagerTest extends TestCase {

    public void setUp() throws Exception {
        super.setUp();

    }

    public void testGetJSHander() throws Exception {
        Handler handler=WXBridgeManager.getInstance().getJSHandler();
        assertNotNull(handler);
    }

    public void testGetInstance() throws Exception {

        WXBridgeManager instance = WXBridgeManager.getInstance();
        assertNotNull(instance);

    }

    public void testRestart() throws Exception {

    }

    public void testSetStackTopInstance() throws Exception {

        WXBridgeManager.getInstance().setStackTopInstance("");


    }

    public void testCallNative() throws Exception {

    }

    public void testInitScriptsFramework() throws Exception {

    }

    public void testFireEvent() throws Exception {

    }

    public void testCallback() throws Exception {

    }

    public void testCallback1() throws Exception {

    }

    public void testRefreshInstance() throws Exception {

    }

    public void testCreateInstance() throws Exception {

    }

    public void testDestroyInstance() throws Exception {

    }

    public void testRegisterComponents() throws Exception {

    }

    public void testRegisterModules() throws Exception {

    }

    public void testHandleMessage() throws Exception {

    }

    public void testDestroy() throws Exception {

    }

    public void testReportJSException() throws Exception {

    }

    public void testCommitJSBridgeAlarmMonitor() throws Exception {

    }
}