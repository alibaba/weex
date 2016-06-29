package com.alibaba.weex.uitest.TC_Slider;

import android.app.Activity;
import android.app.Application;
import android.app.Instrumentation;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.alibaba.weex.R;
import com.alibaba.weex.util.ScreenShot;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.constants.Constants;
import com.alibaba.weex.util.ViewUtil;
import com.taobao.weex.ui.view.WXTextView;

import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcSlider extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WeappJsBaseTestCase weappApplication;
    public WXPageActivity waTestPageActivity;
    public ViewGroup mViewGroup;
    public Application mApplication;
    //    private int childViewCount;
//    private int viewGroupHeight;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();


    public WeexUiTestCaseTcSlider() {
        super(WXPageActivity.class);
    }

    public void setUp() throws Exception{

        Log.e("TestScript_Guide", "setUp  test!!");
        setActivityInitialTouchMode(false);
        weappApplication = new WeappJsBaseTestCase();
        mInstrumentation = getInstrumentation();

        Intent intent = new Intent();
        intent.putExtra("bundleUrl", Constants.BUNDLE_URL);
        launchActivityWithIntent("com.alibaba.weex", WXPageActivity.class, intent);
        waTestPageActivity = getActivity();
        Thread.sleep(3000);

        mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
        setViewGroup(mViewGroup);

        mCaseListIndexView = ViewUtil.findViewWithText(mViewGroup, "TC_");
        Thread.sleep(3000);
    }


//    public void testPreConditions()
//    {
//        assertNotNull(waTestPageActivity);
//        assertNotNull(mViewGroup);
//        assertNotNull(mCaseListIndexView);
//
//    }


    //不会执行 如果不用@Test
    public void testSlider(){
        // Todo nothing

    }
    public  void Slider(){

        for(final View caseView : mCaseListIndexView){
            if (((WXTextView)caseView).getText().toString().equals("TC_Slider")){
                Log.e(TAG, "TC_Slider find");

                final WXTextView inputView  = (WXTextView)caseView;
                mInstrumentation.runOnMainSync(new Runnable() {
                    @Override
                    public void run() {
                        inputView.requestFocus();
                        inputView.performClick();
                    }
                });

                sleep(2000);

                setActivity(WXPageActivity.wxPageActivityInstance);
                Activity activity2 = getActivity();
                Log.e(TAG, "activity2 = " + activity2.toString());

                ViewGroup myGroup = (ViewGroup)(activity2.findViewById(R.id.container));
                Log.e(TAG, myGroup.toString());

                ArrayList<View> inputListView = new ArrayList<View>();
                inputListView = ViewUtil.findViewWithText(myGroup, "TC_Slider_Event");

//               myGroup.findViewsWithText(inputListView, "TC_Input_Style", View.FIND_VIEWS_WITH_TEXT);

                Log.e(TAG, "TC_Slider_Event size== " + inputListView.size());

                if(inputListView.size()!=0){
                    final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                    mInstrumentation.runOnMainSync(new Runnable() {
                        @Override
                        public void run() {
                            inputTypeView.requestFocus();
                            inputTypeView.performClick();
                            Log.e(TAG, "TC_Slider_Event clcik!");


//                           screenShot("TC_Input_Type");
                        }
                    });


                    sleep(3000);
                    Log.e(TAG, "TC_Slider_Event snap!");
                    screenShot("TC_Slider_Event");

                }
            }
        }
    }

    /**
     * get tc list by text
     * @param byText
     * @return
     * @throws InterruptedException
     */
    public ArrayList<View> getTestCaseListViewByText(String byText) throws InterruptedException {
        Log.e("TestScript_Guide", "byText ==" + byText);

        if(TextUtils.isEmpty(byText)){
            return null;
        }

//        mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
//        setViewGroup(mViewGroup);
        ArrayList<View> outViews = new ArrayList<View>();

        // 寻找 TC_测试
        for(int i=0 ; i<mViewGroup.getChildCount(); i++){

            View childView = mViewGroup.getChildAt(i);
            if(childView.getClass().isAssignableFrom(WXTextView.class)){
                Log.e(TAG, "Current View====" + ((WXTextView) childView).getText().toString());
            }

        }

        outViews = ViewUtil.findViewWithText(mViewGroup, "TC_Input_Type");

//        mViewGroup.findViewsWithText(outViews, byText, View.FIND_VIEWS_WITH_TEXT);

        for (View view :  outViews){
            String viewText = ((WXTextView)view).getText().toString();
            Log.e(TAG, "viewText ==" + viewText);

            if(viewText.equals("TC_Slider")){
                final View tcSlider = view;
                mInstrumentation.runOnMainSync(new Runnable() {
                    @Override
                    public void run() {
                        tcSlider.requestFocus();
                        tcSlider.performClick();
                    }
                });
                screenShot("TC_Slider");
            }

        }
        return outViews;
    }

    /**
     * snapshot
     */
    public void screenShot(String shotName) {
        try {
            ScreenShot.shoot(waTestPageActivity, shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * findMyCaseByText
     */
    public View findMyCaseByText(String caseText){
        if (mCaseListIndexView.size() == 0) return null;

        WXTextView view = null;
        for(int i=0; i<mCaseListIndexView.size();i++){

            view = (WXTextView)mCaseListIndexView.get(i);

            if (view.getText().toString().toLowerCase().contains(caseText.toLowerCase())){
                return view;
            }

        }
        return view;
    }


    /**
     * findMyCaseByText
     */
    public View findMyCaseByText(ArrayList<View> fatherView, String caseText){
        if (fatherView.size() == 0) return null;

        WXTextView view = null;
        for(int i=0; i<fatherView.size();i++){

            view = (WXTextView)fatherView.get(i);

            if (view.getText().toString().toLowerCase().contains(caseText.toLowerCase())){
                return view;
            }

        }
        return view;
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

    public void setViewGroup(ViewGroup viewGroup){
        mViewGroup = viewGroup;
    }
}
