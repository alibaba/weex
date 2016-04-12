package com.alibaba.weex.uitest;

import android.app.Activity;
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
import com.alibaba.weex.ViewUtil;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.constants.Constants;
import com.taobao.weex.ui.view.WXTextView;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcTextStyleColumn extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WeappJsBaseTestCase weappApplication;
    public WXPageActivity waTestPageActivity;
    public WXPageActivity waTestPageActivity2;

    public ViewGroup mViewGroup;
    public Application mApplication;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();
    public WeexUiTestCaseTcTextStyleColumn() {
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

    public void testTextStyleColumn(){

        for(final View caseView : mCaseListIndexView){
           if (((TextView)caseView).getText().toString().equals("TC_Text")){
               Log.e(TAG, "TC_Text find");

               final TextView inputView  = (TextView)caseView;
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
               myGroup.findViewsWithText(inputListView, "TC_Text_Style_Column", View.FIND_VIEWS_WITH_TEXT);

               Log.e(TAG, "TC_Text_Style_Column size== " + inputListView.size());

               if(inputListView.size()!=0){
                  final TextView inputTypeView = (TextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Text_Style_Column clcik!");


//                           screenShot("TC_Input_Type");
                       }
                   });


                   sleep(2000);
                   Log.e(TAG, "TC_Text_Style_Column_01_beforeClick snap!");
                   screenShot("TC_Text_Style_Column_01_beforeClick");
                   sleep(2000);
               }
               setActivity(WXPageActivity.wxPageActivityInstance);
               activity2 = getActivity();
               Log.e(TAG, "activity2 = " + activity2.toString());

               myGroup = (ViewGroup)(activity2.findViewById(R.id.container));
               Log.e(TAG, myGroup.toString());

               inputListView = ViewUtil.getAllChildViews(myGroup);
               for(View view :inputListView) {
                   if (view instanceof TextView || view instanceof WXTextView) {
                       final TextView inputTypeView = (TextView) view;
                       mInstrumentation.runOnMainSync(new Runnable() {
                           @Override
                           public void run() {
                               inputTypeView.requestFocus();
                               inputTypeView.performClick();
                               Log.e(TAG, "TC_Text_Style_Column_02_afterClick_text = "  + inputTypeView.getText() + " clcik!");
                           }
                       });

                       sleep(2000);
                   }
               }
               Log.e(TAG, "TC_Text_Style_Column_02_afterClick snap!");
               screenShot("TC_Text_Style_Column_02_afterClick");
               sleep(2000);

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
            String viewText = ((TextView)view).getText().toString();
            Log.e(TAG, "viewText ==" + viewText);


        }
        return outViews;
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
            ScreenShot.shoot(WXPageActivity.wxPageActivityInstance, shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setViewGroup(ViewGroup viewGroup){
        mViewGroup = viewGroup;
    }


}
