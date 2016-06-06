package com.alibaba.weex.navigator;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
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

    public boolean setIconBitmap(String encodedImage, float height) {
        if (TextUtils.isEmpty(encodedImage))
            return false;
        encodedImage = encodedImage.replace(' ', '+');
        try {
            byte[] decodedString = Base64.decode(encodedImage,
                    Base64.DEFAULT);
            Bitmap tempBitmap = BitmapFactory.decodeByteArray(decodedString, 0,
                    decodedString.length);
            iconBitmap = WXToolBarUtil.resizeBitmap(tempBitmap, (int) (height / 2));
            if (null == iconBitmap)
                Log.i("WXNavBarButton", encodedImage + "is not a base64 bitmap data");
        } catch (IllegalArgumentException ex) {
            Log.i("WXNavBarButton", "base64 to byteArr decode fail");
        }
        titleView.setVisibility(View.INVISIBLE);
        btn.setVisibility(View.VISIBLE);
        return iconBitmap != null;
    }

    public int setIconResId(Context context, String name) {
        int res = -1;
        res = WXToolBarUtil.getResIdByName(context, name);
        iconResId = res;
        titleView.setVisibility(View.INVISIBLE);
        btn.setVisibility(View.VISIBLE);
        return res;
    }

    public void setIconUrl(String url) {
        WXSDKManager.getInstance().getIWXImgLoaderAdapter().setImage(url, btn, null, null);
    }

    public void setTitle(String resTitle) {
        title = resTitle;
        if (titleView != null) {
            titleView.setText(title);
            titleView.setVisibility(View.VISIBLE);
            btn.setVisibility(View.INVISIBLE);
        }
    }

    public void setTitleColor(int color) {
        if (titleView != null) {
            titleView.setTextColor(color);
        }
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
