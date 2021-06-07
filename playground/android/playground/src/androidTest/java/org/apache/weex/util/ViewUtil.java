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
package org.apache.weex.util;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.test.InstrumentationTestCase;
import android.test.TouchUtils;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ScrollView;

import com.taobao.weex.ui.view.WXTextView;

import java.util.ArrayList;

/**
 * Created by admin on 16/3/29.
 */
public class ViewUtil{


    public static ArrayList<View> findViewWithText(ViewGroup vg, String text){
        ArrayList<View> out = new ArrayList<View>();
        if(null != vg && !TextUtils.isEmpty(text)){
            vg.findViewsWithText(out, text, View.FIND_VIEWS_WITH_TEXT);
        }

        if(out.size() == 0){
            ArrayList<View> wxTextViewList = new ArrayList<View>();
            wxTextViewList = getAllChildViews((View)vg);
            for (View wxText:wxTextViewList) {
                if(wxText instanceof WXTextView){
                    String value = ((WXTextView) wxText).getText().toString();
                    if(value.contains(text)){
                        Log.e("TestFlow", "find target:" + text + "|" + "actualVale=" + value);
                        out.add(wxText);
                    }

                }
            }
        }
        return out;
    }

    public static ArrayList<View> getAllChildViews(Activity activity) {
        View view = activity.getWindow().getDecorView();
        return getAllChildViews(view);
    }

    public static ArrayList<View> getAllChildViews(View view) {
        ArrayList<View> allchildren = new ArrayList<View>();
        if (view instanceof ViewGroup) {
            ViewGroup vp = (ViewGroup) view;
            for (int i = 0; i < vp.getChildCount(); i++) {
                View viewchild = vp.getChildAt(i);
                allchildren.add(viewchild);
                allchildren.addAll(getAllChildViews(viewchild));
            }

        }
        return allchildren;
    }

    public static ArrayList<View> getAllChildViews(ViewGroup view) {
        ArrayList<View> allchildren = new ArrayList<View>();

            ViewGroup vp =  view;
            for (int i = 0; i < vp.getChildCount(); i++) {
                View viewchild = vp.getChildAt(i);
                allchildren.add(viewchild);
                allchildren.addAll(getAllChildViews(viewchild));
            }

        return allchildren;
    }

    /**
     * scroller or RecyclerView
     * @param view
     * @return
     */
    public static View getFirstChildScrollableView(ViewGroup view){


        View viewResult = null;
        ArrayList<View> allViews = new ArrayList<View>();
        if(null != view){

            allViews= getAllChildViews(view);
            for(View eachView : allViews){
                if(eachView instanceof ScrollView
                        || eachView instanceof RecyclerView){

                    return eachView;

                }
            }
        }
    return viewResult;
    }


    public static ArrayList<View> getAllEditTextViews(View view) {
        ArrayList<View> allchildren = new ArrayList<View>();
        if (view instanceof ViewGroup) {
            ViewGroup vp = (ViewGroup) view;
            for (int i = 0; i < vp.getChildCount(); i++) {
                View viewchild = vp.getChildAt(i);
                if(viewchild instanceof EditText){
                    allchildren.add(viewchild);
                    allchildren.addAll(getAllChildViews(viewchild));
                }
            }
        }
        return allchildren;
    }

    /*
     * 获取控件宽
     */
    public static int getWidth(View view)
    {
        int w = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
        int h = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
        view.measure(w, h);
        return (view.getMeasuredWidth());
    }
    /*
     * 获取控件高
     */
    public static int getHeight(View view)
    {
        int w = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
        int h = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
        view.measure(w, h);
        return (view.getMeasuredHeight());
    }

    public static void dragQuarterScreenUp(InstrumentationTestCase test, Activity activity) {

        TouchUtils.dragQuarterScreenUp(test, activity);
    }


}
