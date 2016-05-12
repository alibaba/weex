package com.alibaba.weex;

import android.content.Context;
import android.test.ApplicationTestCase;

import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;

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
