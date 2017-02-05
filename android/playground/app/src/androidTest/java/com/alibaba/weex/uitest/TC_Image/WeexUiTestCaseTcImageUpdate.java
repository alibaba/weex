package com.alibaba.weex.uitest.TC_Image;

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

import com.alibaba.weex.R;
import com.alibaba.weex.WeappJsBaseTestCase;
import com.alibaba.weex.util.ScreenShot;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.constants.Constants;
import com.alibaba.weex.util.ViewUtil;
import com.taobao.weex.ui.view.WXTextView;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcImageUpdate extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WXPageActivity waTestPageActivity;
    public WeappJsBaseTestCase weappApplication;


    public ViewGroup mViewGroup;
    public Application mApplication;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();
    public WeexUiTestCaseTcImageUpdate() {
        super(WXPageActivity.class);
    }

    public void setUp() throws Exception{

        Log.e("TestScript_Guide", "setUp  into!!");
        setActivityInitialTouchMode(false);
        weappApplication = new WeappJsBaseTestCase();
        mInstrumentation = getInstrumentation();

        Intent intent = new Intent();
        intent.putExtra("bundleUrl", Constants.BUNDLE_URL);
        launchActivityWithIntent("com.alibaba.weex", WXPageActivity.class, intent);
        setActivity(WXPageActivity.wxPageActivityInstance);
        waTestPageActivity = getActivity();
//        waTestPageActivity.getIntent().getData().toString();
        Log.e(TAG,"activity1=" + waTestPageActivity.toString() );
        sleep(3000);

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

    public void testImageUpdate(){

        for(final View caseView : mCaseListIndexView){
           if (((WXTextView)caseView).getText().toString().equals("TC_Image")){
               Log.e(TAG, "TC_Image find");

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
               inputListView = ViewUtil.findViewWithText(myGroup, "TC_Image_Update");
//               myGroup.findViewsWithText(inputListView, "TC_Image_Update", View.FIND_VIEWS_WITH_TEXT);
               sleep(3000);
               Log.e(TAG, "TC_Image_Update== " + inputListView.size());

               if(inputListView.size()!=0){
                  final WXTextView inputTypeView = (WXTextView)inputListView.get(0);
                   Log.e(TAG, "inputTypeView text == " +inputTypeView.getText().toString());

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_01_init snap!");
                   screenShot("TC_Image_Update_01_init");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");
                   sleep(2000);
               }

               setActivity(WXPageActivity.wxPageActivityInstance);
               activity2 = getActivity();

               myGroup = (ViewGroup)(activity2.findViewById(R.id.container));
               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "error src");
//               myGroup.findViewsWithText(inputListView, "点击我，图片无法显示", View.FIND_VIEWS_WITH_TEXT);
               sleep(2000);

               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);
                   Log.e(TAG, "inputTypeView text == " +inputTypeView.getText().toString());

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_02_errorSrc clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_02_errorSrc snap!");
                   screenShot("TC_Image_Update_02_errorSrc");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "change src");
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);
                   Log.e(TAG, "inputTypeView text == " +inputTypeView.getText().toString());

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_03_changeSrc clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_03_changeSrc snap!");
                   screenShot("TC_Image_Update_03_changeSrc");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "origin src");
//               myGroup.findViewsWithText(inputListView, "点击我，图片正常显示", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_04_normalSrc clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_04_normalSrc snap!");
                   screenShot("TC_Image_Update_04_normalSrc");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "pic opacity");

//               myGroup.findViewsWithText(inputListView, "点击我，图片设置不透明", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_05_notTransparent clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_05_notTransparent snap!");
                   screenShot("TC_Image_Update_05_notTransparent");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "pic transparency");

//               myGroup.findViewsWithText(inputListView, "点击我，图片设置透明", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_06_transparent clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_06_transparent snap!");
                   screenShot("TC_Image_Update_06_transparent");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "width large");

//               myGroup.findViewsWithText(inputListView, "点击我，图片宽度变大", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_07_largeWidth clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_07_largeWidth snap!");
                   screenShot("TC_Image_Update_07_largeWidth");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "width less");

//               myGroup.findViewsWithText(inputListView, "点击我，图片宽度变小", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_08_smallWidth clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_08_smallWidth snap!");
                   screenShot("TC_Image_Update_08_smallWidth");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "height large");

//               myGroup.findViewsWithText(inputListView, "点击我，图片高度变大", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_09_largeHeight clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_09_largeHeight snap!");
                   screenShot("TC_Image_Update_09_largeHeight");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "height less");

//               myGroup.findViewsWithText(inputListView, "点击我，图片高度变小", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_10_smallHeight clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_10_smallHeight snap!");
                   screenShot("TC_Image_Update_10_smallHeight");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "scale large");

//               myGroup.findViewsWithText(inputListView, "点击我，图片等比例放大", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_11_largeScale clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_11_largeScale snap!");
                   screenShot("TC_Image_Update_11_largeScale");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "scale smaller");

//               myGroup.findViewsWithText(inputListView, "点击我，图片等比例缩小", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_12_smallScale clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_12_smallScale snap!");
                   screenShot("TC_Image_Update_12_smallScale");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "resize cover");

//               myGroup.findViewsWithText(inputListView, "点击我，恢复默认", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_13_recover clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_13_recover snap!");
                   screenShot("TC_Image_Update_13_recover");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

                   sleep(2000);

               }

               inputListView = new ArrayList<View>();
               inputListView = ViewUtil.findViewWithText(myGroup, "resize contain");

//               myGroup.findViewsWithText(inputListView, "点击我，恢复默认", View.FIND_VIEWS_WITH_TEXT);
               if(inputListView.size()!=0){
                   final WXTextView inputTypeView = (WXTextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Image_Update_14_contain clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Image_Update_14_contain snap!");
                   screenShot("TC_Image_Update_14_contain");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_osV_False");

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
