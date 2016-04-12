package com.alibaba.weex.uitest;

import android.app.Application;
import android.app.Instrumentation;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.alibaba.weex.R;
import com.alibaba.weex.ScreenShot;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.constants.Constants;

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

        mCaseListIndexView = getTestCaseListViewByText("TC_");
        Thread.sleep(3000);
    }


//    public void testPreConditions()
//    {
//        assertNotNull(waTestPageActivity);
//        assertNotNull(mViewGroup);
//        assertNotNull(mCaseListIndexView);
//
//    }

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
            if(childView.getClass().isAssignableFrom(android.widget.TextView.class)){
                Log.e(TAG, "Current View====" + ((TextView) childView).getText().toString());
            }

        }

        mViewGroup.findViewsWithText(outViews, byText, View.FIND_VIEWS_WITH_TEXT);

        for (View view :  outViews){
            String viewText = ((TextView)view).getText().toString();
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
        sleep(3000);
        try {
            ScreenShot.shoot(waTestPageActivity, shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        sleep(3000);
    }

    /**
     * findMyCaseByText
     */
    public View findMyCaseByText(String caseText){
        if (mCaseListIndexView.size() == 0) return null;

        TextView view = null;
        for(int i=0; i<mCaseListIndexView.size();i++){

            view = (TextView)mCaseListIndexView.get(i);

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

        TextView view = null;
        for(int i=0; i<fatherView.size();i++){

            view = (TextView)fatherView.get(i);

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
