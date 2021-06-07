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
package org.apache.weex.uitest.TC_Downgrade;

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

import org.apache.weex.R;
import org.apache.weex.util.ScreenShot;
import org.apache.weex.WXPageActivity;
import org.apache.weex.constants.Constants;
import org.apache.weex.util.ViewUtil;
import com.taobao.weex.ui.view.WXTextView;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcDowngradeWeexVTrue extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WXPageActivity waTestPageActivity;

    public ViewGroup mViewGroup;
    public Application mApplication;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();
    public WeexUiTestCaseTcDowngradeWeexVTrue() {
        super(WXPageActivity.class);
    }

    public void setUp() throws Exception{

        Log.e("TestScript_Guide", "setUp  into!!");
        setActivityInitialTouchMode(false);
        mInstrumentation = getInstrumentation();

        Intent intent = new Intent();
        intent.putExtra("bundleUrl", Constants.BUNDLE_URL);
        launchActivityWithIntent("org.apache.weex", WXPageActivity.class, intent);
        setActivity(WXPageActivity.wxPageActivityInstance);
        waTestPageActivity = getActivity();
//        waTestPageActivity.getIntent().getData().toString();
        Log.e(TAG,"activity1=" + waTestPageActivity.toString() );
        sleep(3000);

        mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
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

    public void testDowngrade(){

        for(final View caseView : mCaseListIndexView){
           if (((WXTextView)caseView).getText().toString().equals("TC_Downgrade")){
               Log.e(TAG, "TC_Downgrade find");

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

               ViewGroup myGroup = (ViewGroup)(activity2.findViewById(R.id.container));
               ArrayList<View> inputListView = new ArrayList<View>();
//               myGroup.findViewsWithText(inputListView, "TC_Downgrade_weexV_True", View.FIND_VIEWS_WITH_TEXT);
               inputListView = ViewUtil.findViewWithText(myGroup, "TC_Downgrade_weexV_True");
               Log.e(TAG, "TC_Downgrade_weexV_True== " + inputListView.size());
               sleep(2000);

               if(inputListView.size()!=0){
                  final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Downgrade_weexV_True clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Downgrade_weexV_True snap!");
//                   screenShot("TC_Downgrade_appV_True");
                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_weexV_True");

                   sleep(2000);

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
