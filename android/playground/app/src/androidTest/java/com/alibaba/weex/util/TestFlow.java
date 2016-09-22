package com.alibaba.weex.util;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.test.TouchUtils;
import android.text.method.Touch;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ScrollView;

import com.alibaba.weex.R;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.constants.Constants;
import com.taobao.weex.devtools.inspector.elements.ObjectDescriptor;
import com.taobao.weex.ui.view.WXTextView;

import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by admin on 16/7/20.
 */
public class TestFlow extends ActivityInstrumentationTestCase2<WXPageActivity>{

    private WeappJsBaseTestCase weappApplication;
    private Instrumentation mInstrumentation;
    private WXPageActivity waTestPageActivity;
    private final static String TAG = "TestFlow";
    private ViewGroup mViewGroup;
    private ArrayList<View> mCaseListIndexView;
    private WXPageActivity activity2;
    private HashMap testMap = new HashMap();
    private int stepCountFlag = 0;


    public TestFlow(Class<WXPageActivity> activityClass) {
        super(activityClass);
    }


    /**
     * get tc list
     * @throws InterruptedException
     */
    @Before
    public void setUp() throws InterruptedException {
        setActivityInitialTouchMode(false);
        weappApplication = new WeappJsBaseTestCase();
        mInstrumentation = getInstrumentation();

        if(mInstrumentation == null){

            mInstrumentation = this.getInstrumentation();
        }
        Intent intent = new Intent();
        intent.putExtra("bundleUrl", Constants.BUNDLE_URL);
        launchActivityWithIntent("com.alibaba.weex", WXPageActivity.class, intent);
        waTestPageActivity = getActivity();
        Log.e(TAG, "activity1=" + waTestPageActivity.toString());
        Thread.sleep(1000);

        mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
        setViewGroup(mViewGroup);
        // 根据TC 获取TC 列表,默认“"TC_"”
        mCaseListIndexView = ViewUtil.findViewWithText(mViewGroup, "AG_");

//        addAllTargetView("AG_");

        Thread.sleep(1000);
    }

    /**
     * firstTCChildInCompnnet item
     * like "TC_AHref"
     *
     * map
     * {"testComponet"      :      "TC_AHref",
     *  "testChildCaseInit":      "TC_AHref_Event"
     *  "Step1"        : "Hello Weex"
     *  "Step2"        : "Hello Weex2"
     *  "Step3"        : "Hello Weex3"

     * }
     *
     */
    @Test
    public void testByTestMap() {
        for (final View caseView : mCaseListIndexView) {

            String caseViewName = ((WXTextView) caseView).getText().toString();
            String testComponet = (String)getTestMap().get("testComponet");

            if (caseViewName.equals(testComponet)) {

                final WXTextView inputView = (WXTextView) caseView;

                // handle if the view is INVISIBLE then scrollToBottom
                int maxStep = 12;
                int scrollCount = 0;
                if(inputView.getVisibility() == View.INVISIBLE){
                    while(scrollCount <maxStep){

                        TouchUtils.dragQuarterScreenUp(this, this.getActivity());
                        scrollCount ++;

                    }
                }

                mInstrumentation.runOnMainSync(new Runnable() {
                    @Override
                    public void run() {
                        inputView.requestFocus();
                        inputView.performClick();
                    }
                });

                sleep(1000);

                setActivity(WXPageActivity.wxPageActivityInstance);
                Activity activity2 = getActivity();
                Log.e(TAG, "activity2 = " + activity2.toString());

                ViewGroup myGroup = (ViewGroup) (activity2.findViewById(R.id.container));
                Log.e(TAG, myGroup.toString());

                String childCaseName = (String)testMap.get("testChildCaseInit");
                Log.e(TAG, "testChildCaseInit to find==" + childCaseName);
                ArrayList<View> inputListView = new ArrayList<View>();
                inputListView = ViewUtil.findViewWithText(myGroup,
                        childCaseName);
                sleep(2000);
//                View scrollableView = ViewUtil.getFirstChildScrollableView(myGroup);

                int findCount = 0;
                while(inputListView.size() == 0 ){

//                    TouchUtils.dragQuarterScreenUp(this, this.getActivity());
//                    sleep(2000);

                    if(findCount< maxStep){
                        Log.e(TAG, "inputListView size=" + inputListView.size()+"," + "findCount=" + findCount);
                        TouchUtils.dragQuarterScreenUp(this, this.getActivity());
                        sleep(1000);
                        myGroup = (ViewGroup) (activity2.findViewById(R.id.container));
                        inputListView = ViewUtil.findViewWithText(myGroup,
                                childCaseName);
                        sleep(1000);
                        findCount ++ ;

                    }else{
                        break;
                    }
                }
//                else{
//                    Log.e(TAG, "inputListView size==" +
//                            inputListView.size() + "findCount=="+findCount);
//
//                }


                if (inputListView.size() != 0) {
                    final WXTextView inputTypeView = (WXTextView) inputListView.get(0);
                    stepCountFlag ++;
                    mInstrumentation.runOnMainSync(new Runnable() {
                        @Override
                        public void run() {
                            Log.e(TAG, "find veiw text=" + inputTypeView.getText().toString());
                            inputTypeView.requestFocus();
                            inputTypeView.performClick();
                            Log.e(TAG, "child clcik!");
                        }
                    });

                    sleep(1000);
                }

                HashMap testStepMap = new HashMap();

                testStepMap = (HashMap)testMap.clone();
                testStepMap.remove("testComponet");
                testStepMap.remove("testChildCaseInit");

                Iterator iter = testStepMap.entrySet().iterator();
                Log.e(TAG,"testStepMap keyset==" + testStepMap.keySet().toString());

                while (iter.hasNext()) {
                    stepCountFlag ++;
                    HashMap.Entry entry = (HashMap.Entry) iter.next();
                    Object testStepkey = entry.getKey();
                    Log.e(TAG,"testStepMap testStepkey==" + testStepkey.toString());

                    Object testStepValue = entry.getValue();
                    Log.e(TAG,"testStepMap testStepValue==" + testStepValue.toString());

                    testStep(testStepkey, testStepValue);

                    }

                break;
            }
        }
    }

    public void testStep(Object testStepkey,  Object testStepValue) {

        HashMap testSteps = (HashMap) testStepValue;
        Iterator iter = testSteps.entrySet().iterator();
        Log.e(TAG,"testSteps keyset==" + testSteps.keySet().toString());

        while (iter.hasNext()) {
            HashMap.Entry entry = (HashMap.Entry) iter.next();
            Object testStepAction = entry.getKey();
            Log.e(TAG,"testSteps testStepAction==" + testStepAction.toString());

            Object testStepActionValue = entry.getValue();
            Log.e(TAG,"testSteps testStepActionValue==" + testStepActionValue.toString());

            testAction(testStepAction, testStepActionValue);
        }

    }

    private void testAction(Object testStepAction, Object testStepActionValue){
        String action = (String)testStepAction;
        String actionValue = (String)testStepActionValue;

        if(action.equals("click")){
            doClickAction(action, actionValue);
        }

        if(action.equals("screenshot")){
            doScreenShotAction(actionValue);
        }


    }
    private void doScreenShotAction (String name){
        sleep(1000);
        screenShot(name);
        sleep(1000);
    }
    private void doClickAction(String action, String actionValue){
        setActivity(WXPageActivity.wxPageActivityInstance);
        Activity activity2 = getActivity();
        Log.e(TAG, "activity2 = " + activity2.toString());

        ViewGroup myGroup = (ViewGroup) (activity2.findViewById(R.id.container));
        ArrayList<View> inputListView11 = new ArrayList<View>();
        sleep(1000);

        inputListView11 = ViewUtil.getAllChildViews(myGroup);

        for (View view : inputListView11) {
            if (view instanceof WXTextView) {
                String text = ((WXTextView) view).getText().toString();
                Log.e(TAG, " doClickAction text===" + text);
                if (text.contains(actionValue)) {
                    float viewY= view.getY();
                    float viewX = view.getX();
                    Log.e(TAG,"viewY==" + viewY);
                    Log.e(TAG,"viewX==" + viewX);

                    TouchUtils.clickView(this, view);
                    sleep(2000);
                    Log.e(TAG,"clickView==" );


//                    final FrameLayout aView = (FrameLayout) view.getParent();
//                    TouchUtils.clickView(this, aView);
//                    Log.e(TAG,"clickaView==" );
//
//                    mInstrumentation.runOnMainSync(new Runnable() {
//                        @Override
//                        public void run() {
//                            aView.requestFocus();
//                            aView.performClick();
//                            Log.e(TAG,  "do click ");
//
//                        }
//                    });

                    break;
                }
            }

        }
    }

    public void setViewGroup(ViewGroup viewGroup) {
        this.mViewGroup = viewGroup;
    }

    /**
     * sleep
     */
    public void sleep(long time){
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    /**
     * snapshot
     */
    public void screenShot(String shotName) {
        try {
            ScreenShot.shoot(getActivity(), shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setTestMap(HashMap testStepMap) {
        this.testMap = testStepMap;
    }

    public HashMap getTestMap(){
        return testMap;
    }

    /**
     *
     */
    public void setUpToFindComponet(String targert){
        int max = 60;
        int count = 0;
        while(mCaseListIndexView.size() == 0){

            if (count < max){
                TouchUtils.dragQuarterScreenUp(this, this.getActivity());
                mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
                mCaseListIndexView = ViewUtil.findViewWithText(mViewGroup, targert);
                count ++;
            }
            else{
                break;
            }

        }
    }

    public void addAllTargetView(String target){
        int max = 6;
        int count =0 ;
        while (count < max){
            TouchUtils.dragQuarterScreenUp(this, this.getActivity());
            mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
            mCaseListIndexView = ViewUtil.findViewWithText(mViewGroup, target);
            mCaseListIndexView.addAll(mCaseListIndexView);
            count ++;
        }
    }
}
