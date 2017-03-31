package com.alibaba.weex.uitest.TC_Input;

import android.app.Activity;
import android.app.Application;
import android.app.Instrumentation;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.test.TouchUtils;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import com.alibaba.weex.R;
import com.alibaba.weex.util.ScreenShot;
import com.alibaba.weex.util.ViewUtil;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.constants.Constants;
import com.taobao.weex.ui.view.WXTextView;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcInputEvent extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WeappJsBaseTestCase weappApplication;
    public WXPageActivity waTestPageActivity;
    public WXPageActivity waTestPageActivity2;

    public ViewGroup mViewGroup;
    public Application mApplication;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();
    public WeexUiTestCaseTcInputEvent() {
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
        Log.e(TAG, "activity1=" + waTestPageActivity.toString());
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

    public void testInputEvent(){

        for(final View caseView : mCaseListIndexView){
           if (((WXTextView)caseView).getText().toString().equals("TC_Input")){
               Log.e(TAG, "TC_Input find");

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
               inputListView = ViewUtil.findViewWithText(myGroup, "TC_Input_Event");

//               myGroup.findViewsWithText(inputListView, "TC_Input_Event", View.FIND_VIEWS_WITH_TEXT);

               Log.e(TAG, "TC_Input_Event size== " + inputListView.size());
               sleep(2000);
               EditText inputTypeViewLoseFocus =null  ;
               sleep(2000);

               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Input_Event clcik!");
                       }
                   });

                   sleep(3000);
                   Log.e(TAG, "TC_Input_Event_01_init snap!");
                   screenShot("TC_Input_Event_01_init");
                   sleep(3000);
               }

               setActivity(WXPageActivity.wxPageActivityInstance);
               activity2 = getActivity();
               Log.e(TAG, "activity2 = " + activity2.toString());

               myGroup = (ViewGroup)(activity2.findViewById(R.id.container));
               ArrayList<View> inputListView11 = new ArrayList<View>();
               sleep(3000);

               inputListView11 = ViewUtil.getAllChildViews(myGroup);
               ArrayList<View> listEventView = new ArrayList<View>();

               for(View view :inputListView11){
                   if(view instanceof android.support.v7.widget.RecyclerView){
                       android.support.v7.widget.RecyclerView listView =
                               (android.support.v7.widget.RecyclerView) view;
                       int count = listView.getChildCount();
                       Log.e(TAG, "listView count" + count);
                       listEventView = ViewUtil.getAllChildViews(listView);
                   }

               }
               Log.e(TAG, "listEventView  size== " + listEventView.size());
               if(listEventView.size()!=0){

                   for(View view :listEventView){
//                       if (view instanceof WXTextView && null != view){
//                           Log.e(TAG, "WXTextView get = " + ((WXTextView) view).getText().toString());
//                       }

                       String hintText = "";

                       if (view instanceof EditText){
                           hintText = ((EditText) view).getHint().toString();
                           Log.e(TAG, "EditText hint text = " + hintText);
                           if(hintText.equals("onclick")){

                               final EditText inputTypeView = (EditText)view;
                               mInstrumentation.runOnMainSync(new Runnable() {
                                   @Override
                                   public void run() {
                                       inputTypeView.requestFocus();
                                       inputTypeView.performClick();
                                       Log.e(TAG, "EditText onclick clcik!");
                                   }
                               });
                               sleep(3000);

                           }
                           else if(hintText.equals("oninput")){

                               final EditText inputTypeView = (EditText)view;
                               mInstrumentation.runOnMainSync(new Runnable() {
                                   @Override
                                   public void run() {
                                       inputTypeView.requestFocus();
                                       inputTypeView.performClick();
                                       inputTypeView.setText("input");
                                       Log.e(TAG, "EditText input clcik!");

                                   }
                               });

                               sleep(1000);
                               screenShot("TC_Input_Event_02_input");
                               Log.e(TAG, "TC_Input_Event_02_input snap!");
                               sleep(1000);

                           }

                           else if(hintText.equals("onchange")){

                               final EditText inputTypeView = (EditText)view;
                               mInstrumentation.runOnMainSync(new Runnable() {
                                   @Override
                                   public void run() {
                                       inputTypeView.requestFocus();
                                       inputTypeView.performClick();
                                       inputTypeView.setText("change");
                                       Log.e(TAG, "EditText change clcik!");

                                   }
                               });

                               sleep(1000);
                           }

                           else if(hintText.equals("失焦用途")){

                               inputTypeViewLoseFocus = (EditText)view;
                               final EditText inputTypeView = inputTypeViewLoseFocus;

                               mInstrumentation.runOnMainSync(new Runnable() {
                                   @Override
                                   public void run() {
                                       inputTypeView.requestFocus();
                                       inputTypeView.performClick();
                                       Log.e(TAG, "失焦用途  clcik!");

                                   }
                               });

                               sleep(1000);
                           }
                           else if(hintText.equals("onfocus")){

                               final EditText inputTypeView = (EditText)view;
                               mInstrumentation.runOnMainSync(new Runnable() {
                                   @Override
                                   public void run() {
                                       inputTypeView.requestFocus();
                                       inputTypeView.performClick();
                                       Log.e(TAG, "onfocus  clcik!");

                                   }
                               });

                               sleep(1000);
                           }

                           else if(hintText.equals("onblur")){

                               final EditText inputTypeView = (EditText)view;
                               mInstrumentation.runOnMainSync(new Runnable() {
                                   @Override
                                   public void run() {
                                       inputTypeView.requestFocus();
                                       inputTypeView.performClick();
                                       Log.e(TAG, "onblur  clcik!");

                                   }
                               });

                               sleep(1000);
                           }

                       }

                   }
                   if(null != inputTypeViewLoseFocus){
                       final EditText inputTypeView1 = inputTypeViewLoseFocus;
                       mInstrumentation.runOnMainSync(new Runnable() {
                           @Override
                           public void run() {
                               inputTypeView1.requestFocus();
                               inputTypeView1.performClick();
                               Log.e(TAG, "失焦用途  clcik22!");

                           }
                       });

                       sleep(2000);
                       screenShot("TC_Input_Event_03_finish");
                       Log.e(TAG, "TC_Input_Event_03_finish snap!");
                       sleep(2000);

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
        try {
            ScreenShot.shoot(WXPageActivity.wxPageActivityInstance, shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
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
