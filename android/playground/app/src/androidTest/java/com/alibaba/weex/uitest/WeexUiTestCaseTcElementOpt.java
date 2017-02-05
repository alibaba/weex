package com.alibaba.weex.uitest;

import android.app.Application;
import android.app.Instrumentation;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.test.TouchUtils;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.alibaba.weex.R;
import com.alibaba.weex.util.ScreenShot;
import com.alibaba.weex.util.ViewUtil;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.constants.Constants;
import com.taobao.weex.ui.view.WXTextView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcElementOpt extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WeappJsBaseTestCase weappApplication;
    public WXPageActivity waTestPageActivity;
    public WXPageActivity waTestPageActivity2;

    public ViewGroup mViewGroup;
    public Application mApplication;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();
    public WeexUiTestCaseTcElementOpt() {
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
//        waTestPageActivity.getIntent().getData().toString();
        Log.e(TAG,"activity1=" + waTestPageActivity.toString() );
        Thread.sleep(3000);

        mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
        setViewGroup(mViewGroup);

        mCaseListIndexView = ViewUtil.findViewWithText(mViewGroup, "TC_");
        addAllTargetView("TC_");
        Thread.sleep(3000);
    }

//    public void testPreConditions()
//    {
//        assertNotNull(waTestPageActivity);
//        assertNotNull(mViewGroup);
//        assertNotNull(mCaseListIndexView);
//
//    }

    public void testElementOpt() {

        for (final View caseView : mCaseListIndexView) {
            if (((WXTextView) caseView).getText().toString().equals("TC_Event")) {
                Log.e(TAG, "TC_Event find");

                final WXTextView inputView = (WXTextView) caseView;
                mInstrumentation.runOnMainSync(new Runnable() {
                    @Override
                    public void run() {
                        inputView.requestFocus();
                        inputView.performClick();
                        Log.e(TAG, "TC_Event clcik!!" );
                    }
                });
                sleep(2000);

                setActivity(WXPageActivity.wxPageActivityInstance);
                ViewGroup optGroup = (ViewGroup) (getActivity().findViewById(R.id.container));
                ArrayList<View> otpViewList = new ArrayList<View>();
                otpViewList = ViewUtil.findViewWithText(optGroup, "TC_Event_ElementOpt");
//                optGroup.findViewsWithText(otpViewList, "TC_Event_ElementOpt", View.FIND_VIEWS_WITH_TEXT);
                sleep(2000);

                for (View view : otpViewList) {
                    if (view instanceof WXTextView) {
                        final WXTextView optView = (WXTextView) view;
                        mInstrumentation.runOnMainSync(new Runnable() {
                            @Override
                            public void run() {
                                optView.requestFocus();
                                optView.performClick();
                                Log.e(TAG, "TC_Event_ElementOpt clcik!!");

                            }
                        });
                        sleep(2000);
                    }

                }


                Log.e(TAG, "TC_Element_Opt_01_initialize snap!");
                screenShot("TC_Event_ElementOpt_01_init");

                setActivity(WXPageActivity.wxPageActivityInstance);
                ViewUtil util = new ViewUtil();
                List<View> optListView = util.getAllChildViews(getActivity().findViewById(R.id.container));
                //分别点击“文本1”一次，“文本1，点击我增加控件”一次，"文本2"两次，截图
                for (View child : optListView) {
                    if (child instanceof WXTextView) {

                        String childValue = ((WXTextView) child).getText().toString();
                        Log.e(TAG, "opt child vaule : " + childValue);

                        if (childValue.equals("点击我，在我上方增加一个文本")) {
                            final WXTextView wenbenClickAndThenAddText = (WXTextView) child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {
                                    wenbenClickAndThenAddText.requestFocus();
                                    wenbenClickAndThenAddText.performClick();
                                    Log.e(TAG, "文本1 click once!!");
                                }
                            });
                            sleep(2000);
                        }
                    }
                }

//               setActivity(WXPageActivity.wxPageActivityInstance);
                ViewUtil util1 = new ViewUtil();
                List<View> optListView1 = util1.getAllChildViews(getActivity().findViewById(R.id.container));
                //分别点击“文本1”一次，“文本1，点击我增加控件”一次，"文本2"两次，截图
                for (View child1 : optListView1) {
                    if (child1 instanceof WXTextView) {

                        String childValue1 = ((WXTextView) child1).getText().toString();
                        Log.e(TAG, "opt child1 vaule : " + childValue1);

                        if (childValue1.equals("文本1，点击我增加控件")) {
                            Log.e(TAG, "childValue.equals(\"文本1，点击我增加控件\")");

                            final WXTextView wenbenClickAndThenAddText1 = (WXTextView) child1;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();
                                    Log.e(TAG, "文本1 click once!!");
                                }
                            });

                            sleep(3000);
                        }
                    }
                }
                /////////////////////////////////////////
                optListView1 = util1.getAllChildViews(getActivity().findViewById(R.id.container));
                for(View child : optListView1){
                    if (child instanceof WXTextView) {

                        String childValue = ((WXTextView) child).getText().toString();
                        Log.e(TAG, "点击我，在我下方增加一个文本 vaule : " + childValue);

                        if(childValue.equals("点击我，在我下方增加一个文本")){
                            Log.e(TAG, "childValue.equals(\"点击我，在我下方增加一个文本\")");

                            final WXTextView wenbenClickAndThenAddText1 = (WXTextView)child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();
                                    wenbenClickAndThenAddText1.performClick();

                                    Log.e(TAG, "点击我，在我下方增加一个文本 2!!");
                                }
                            });

                            sleep(3000);
                            screenShot("TC_Event_ElementOpt_02_addElements");
                        }
                    }
                }
                ////////////////////////////////////////////////////////
                optListView1 = util1.getAllChildViews(getActivity().findViewById(R.id.container));
                for(View child : optListView1){
                    if (child instanceof WXTextView) {

                        String childValue = ((WXTextView) child).getText().toString();
                        Log.e(TAG, "文本2，点击我自动消失 vaule : " + childValue);

                        if(childValue.equals("文本2，点击我自动消失")){
                            Log.e(TAG, "childValue.equals(\"文本2，点击我自动消失\")");

                            final WXTextView wenbenClickAndThenAddText1 = (WXTextView)child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();

                                    Log.e(TAG, "文本2，点击我自动消失click 1!!");
                                }
                            });

                            sleep(3000);
                            screenShot("TC_Event_ElementOpt_03_removeElement");
                        }
                    }
                }
                ////////////////////////////////////////////////////////
                optListView1 = util1.getAllChildViews(getActivity().findViewById(R.id.container));
                for(View child : optListView1){
                    if (child instanceof WXTextView) {

                        String childValue = ((WXTextView) child).getText().toString();
                        Log.e(TAG, "文本2，点击我自动消失 vaule : " + childValue);

                        if(childValue.equals("文本2，点击我自动消失")){
                            Log.e(TAG, "childValue.equals(\"文本2，点击我自动消失\")");

                            final WXTextView wenbenClickAndThenAddText1 = (WXTextView)child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();

                                    Log.e(TAG, "文本2，点击我自动消失click  1!!");
                                }
                            });

                            sleep(3000);
                            screenShot("TC_Event_ElementOpt_03_removeElement");
                            Log.e(TAG, "TC_Event_ElementOpt_03_removeElement snap!");
                        }
                    }
                }
                //////////////////////////////
                optListView1 = util1.getAllChildViews(getActivity().findViewById(R.id.container));
                for(View child : optListView1){
                    if (child instanceof WXTextView) {

                        String childValue = ((WXTextView) child).getText().toString();
                        Log.e(TAG, "点击测试Move方法 vaule : " + childValue);

                        if(childValue.equals("点击测试Move方法")){

                            Log.e(TAG, "点击测试Move方法 find");
                                final View wenbenClickAndThenAddText1 = child;
                                mInstrumentation.runOnMainSync(new Runnable() {
                                    @Override
                                    public void run() {

                                        wenbenClickAndThenAddText1.setClickable(true);

                                        wenbenClickAndThenAddText1.requestFocus();
                                        wenbenClickAndThenAddText1.performClick();

                                        Log.e(TAG, "点击测试Move方法click 1!!");
                                    }
                                });

                        sleep(3000);

                        }
                        if(childValue.equals("点击我，改变背景颜色")){

                            Log.e(TAG, "点击我，改变背景颜色 find");
                            final View wenbenClickAndThenAddText1 = child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();

                                    Log.e(TAG, "点击我，改变背景颜色 click!!");
                                }
                            });

                            sleep(3000);
//                            screenShot("TC_Event_ElementOpt_04_finish");
//                            Log.e(TAG, "TC_Event_ElementOpt_04_finish");
                        }
                        if(childValue.equals("点击我，addEvent")){

                            Log.e(TAG, "点击我，addEvent find");
                            final View wenbenClickAndThenAddText1 = child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();

                                    Log.e(TAG, "点击我，addEvent click 1!!");
                                }
                            });

                            sleep(3000);
//                            screenShot("TC_Event_ElementOpt_04_finish");
//                            Log.e(TAG, "TC_Event_ElementOpt_04_finish");
                        }

                        if(childValue.equals("点击我，removeEvent")){

                            Log.e(TAG, "点击我，removeEvent find");
                            final View wenbenClickAndThenAddText1 = child;
                            mInstrumentation.runOnMainSync(new Runnable() {
                                @Override
                                public void run() {

                                    wenbenClickAndThenAddText1.setClickable(true);

                                    wenbenClickAndThenAddText1.requestFocus();
                                    wenbenClickAndThenAddText1.performClick();

                                    Log.e(TAG, "点击我，removeEvent click 1!!");
                                }
                            });

                            sleep(3000);
                            screenShot("TC_Event_ElementOpt_04_finish");
                            Log.e(TAG, "TC_Event_ElementOpt_04_finish");
                        }

                    }
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
        ArrayList<View> outViews = new ArrayList<View>();
        mViewGroup.findViewsWithText(outViews, byText, View.FIND_VIEWS_WITH_TEXT);

        for (View view :  outViews){
            String viewText = ((WXTextView)view).getText().toString();
            Log.e(TAG, "viewText ==" + viewText);

        }
        return outViews;
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
        sleep(2000);
        try {
            ScreenShot.shoot(WXPageActivity.wxPageActivityInstance, shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        sleep(2000);
    }

    public void setViewGroup(ViewGroup viewGroup){
        mViewGroup = viewGroup;
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
