package com.alibaba.weex.navigator;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.alibaba.weex.util.WXToolBarUtil;
import com.taobao.weex.WXSDKManager;

public class WXNavBarButton {

    public ImageView btn = null;
    public TextView titleView = null;
    public int iconResId = -1;
    public Bitmap iconBitmap = null;
    public String title = "";

    public int setIconResId(Context context, String name) {

        if (titleView == null || btn == null)
            return -1;

        int res = -1;
        res = WXToolBarUtil.getResIdByName(context, name);
        iconResId = res;
        if (iconResId == -1)
            return res;
        titleView.setVisibility(View.INVISIBLE);
        btn.setVisibility(View.VISIBLE);
        return res;
    }

    public void setIconUrl(String url) {

        if (titleView == null || btn == null)
            return;

        titleView.setVisibility(View.INVISIBLE);
        btn.setVisibility(View.VISIBLE);
        WXSDKManager.getInstance().getIWXImgLoaderAdapter().setImage(url, btn, null, null);
    }

    public void setTitle(String resTitle) {

        if (titleView == null || btn == null)
            return;

        title = resTitle;
        titleView.setText(title);
        titleView.setVisibility(View.VISIBLE);
        btn.setVisibility(View.INVISIBLE);
    }

    public void setTitleColor(int color) {
        if (titleView == null || btn == null)
            return;

        titleView.setTextColor(color);
        titleView.setVisibility(View.VISIBLE);
        btn.setVisibility(View.INVISIBLE);
    }

    public void clear() {

        if (btn != null)
            btn.setVisibility(View.INVISIBLE);
        if (titleView != null)
            titleView.setVisibility(View.INVISIBLE);

        iconResId = -1;
        iconBitmap = null;
        title = "";
    }
}
