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
package org.apache.weex;

import android.content.Context;
import android.test.ApplicationTestCase;

import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import org.apache.weex.WXApplication;

/**
 */
public class WeappJsBaseTestCase extends ApplicationTestCase<WXApplication> {

    public final String  ComponentCountDownDir = "tc/countdown";
    public final String  ComponentImageDir = "tc/image";
    public final String  ComponentMarqueeDir = "tc/marquee";
    public final String  ComponentScrollerDir = "tc/scroller";
    public final String  ComponentSliderDir = "tc/slider";
    public final String  ComponentTabheaderDir = "tc/tabheader";
    public final String  ComponentTextrDir = "tc/text";
    //    private final String  ComponentJSSelfTestDir = "tc/js";
    public final String  PathSep = "/";

    Context testCtx = null;
    WXApplication testApplication  = null;
    private WXSDKInstance mWaEngine;

    public WeappJsBaseTestCase() {
        super(WXApplication.class);
    }

    public void setUp() throws Exception {

        if (testApplication == null){
            createApplication(); // 创建 application
            testApplication = getApplication();

            WXSDKEngine.init(testApplication, null);
//            WXSDKEngine.registerComponent("latestVisitView", WXLatestVisitView.class);
//            WXSDKEngine.registerComponent("marquee", WXMarquee.class);
//            WXSDKEngine.registerComponent("countdown", WXCountDown.class);
//            WXSDKEngine.registerComponent("tabheader", WXTabHeader.class);
        }

//        assertNotNull(testApplication);

    }

//    /**
//     * Test basic startup/shutdown of Application
//     */
//    @MediumTest
//    public void testSimpleCreate() {
////        createApplication();
//    }

}
