package com.alibaba.weex.navigator;

import android.util.Log;

import com.taobao.weex.appfram.navigator.IActivityNavBarSetter;

import org.json.JSONException;
import org.json.JSONObject;

public class WXNavigatorAdapter implements IActivityNavBarSetter {

    private final static String TITLE = "title";
    private final static String TITLE_COLOR = "titleColor";
    private final static String ICON = "icon";
    private final static String FROM_NATIVE = "fromNative";

    private static WXNavigatorAdapter instance = null;
    private NavigatorCallBack navigatorCallBack;


    public interface NavigatorCallBack {
        void onSetTitle(String title, String titleColor);

        void onSetNavBarRightItem(String imgPath, String title, String titleColor, boolean fromNative);

        void onClearBarRightItem();

        void onSetNavBarLeftItem(String imgPath, String title, String titleColor, boolean fromNative);

        void onClearNavBarLeftItem();
    }

    public WXNavigatorAdapter(NavigatorCallBack navigatorCallBack) {
        this.navigatorCallBack = navigatorCallBack;
        instance = this;
    }

    public static WXNavigatorAdapter getInstance() {
        return instance;
    }

    @Override
    public boolean push(String param) {
        return false;
    }

    @Override
    public boolean pop(String param) {
        return false;
    }

    @Override
    public boolean setNavBarRightItem(String param) {
        try {
            JSONObject jsObj = new JSONObject(param);
            String imgPath = jsObj.optString(ICON);
            String title = jsObj.optString(TITLE, "");
            String titleColor = jsObj.optString(TITLE_COLOR, "");
            boolean fromNative = jsObj.optBoolean(FROM_NATIVE, false);

            navigatorCallBack.onSetNavBarRightItem(imgPath, title, titleColor, fromNative);

            return true;
        } catch (Exception e) {
            Log.i("WXActivity",
                    "setNavBarRightItem: param parse to JSON error, param=" + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean clearNavBarRightItem(String param) {
        navigatorCallBack.onClearBarRightItem();
        return false;
    }

    @Override
    public boolean setNavBarLeftItem(String param) {
        try {
            JSONObject jsObj = new JSONObject(param);
            String imgPath = jsObj.optString(ICON);
            String title = jsObj.optString(TITLE, "");
            String titleColor = jsObj.optString(TITLE_COLOR, "");
            boolean fromNative = jsObj.optBoolean(FROM_NATIVE, false);

            navigatorCallBack.onSetNavBarLeftItem(imgPath, title, titleColor, fromNative);
            return true;
        } catch (Exception e) {
            Log.i("WXActivity",
                    "setNavBarRightItem: param parse to JSON error, param=" + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean clearNavBarLeftItem(String param) {
        navigatorCallBack.onClearNavBarLeftItem();
        return false;
    }

    @Override
    public boolean setNavBarMoreItem(String param) {
        return false;
    }

    @Override
    public boolean clearNavBarMoreItem(String param) {
        return false;
    }

    @Override
    public boolean setNavBarTitle(String param) {
        try {
            JSONObject jsonObject = new JSONObject(param);
            String title = jsonObject.optString(TITLE);
            String titleColor = jsonObject.optString(TITLE_COLOR);
            navigatorCallBack.onSetTitle(title, titleColor);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }
}
