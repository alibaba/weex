package com.alibaba.weex;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import java.util.ArrayList;

/**
 * Created by admin on 16/3/29.
 */
public class ViewUtil {

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
}
