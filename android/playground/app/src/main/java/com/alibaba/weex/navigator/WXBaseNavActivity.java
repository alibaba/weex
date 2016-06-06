package com.alibaba.weex.navigator;

import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.alibaba.weex.R;
import com.alibaba.weex.WXBaseActivity;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.utils.WXResourceUtils;

public abstract class WXBaseNavActivity extends WXBaseActivity implements IWXRenderListener, Handler.Callback {

    private TextView toolbar_title;
    private WXNavBarButton leftItem = new WXNavBarButton();
    private WXNavBarButton rightItem = new WXNavBarButton();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWXContentView();
        setActionBarLayout();
        initToolbar();
        initUIAndData();
    }

    /**
     * Activity should implement this function to set contentView
     */
    protected abstract void getWXContentView();

    private void setActionBarLayout() {
        ViewGroup viewById = (ViewGroup) getWindow().getDecorView().findViewById(android.R.id.content);
        View.inflate(this, R.layout.widget_toolbar, viewById);
    }

    private void initToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("");

        toolbar_title = (TextView) findViewById(R.id.toolbar_title);

        leftItem.btn = (ImageView) findViewById(R.id.leftItem);
        leftItem.titleView = (TextView) findViewById(R.id.leftTitleView);
        rightItem.btn = (ImageView) findViewById(R.id.rightItem);
        rightItem.titleView = (TextView) findViewById(R.id.rightTitleView);
    }

    protected abstract void initUIAndData();

    @Override
    protected void onResume() {
        super.onResume();

        WXSDKEngine.setActivityNavBarSetter(new WXNavigatorAdapter(new WXNavigatorAdapter.NavigatorCallBack() {
            @Override
            public void onSetTitle(String title, String titleColor) {
                setToolBarTitle(title);
                setToolBarTitleColor(WXResourceUtils.getColor(titleColor, Color.WHITE));
            }

            @Override
            public void onSetNavBarRightItem(String imgPath, String title, String titleColor, boolean fromNative) {

                if (rightItem.btn == null || rightItem.titleView == null)
                    return;

                rightItem.btn.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
//                        WXSDKManager.getInstance().fireEvent(mInstance.getInstanceId(), mInstance.getRootCom().getRef(), WXEventType.CLICK);
                    }
                });

                rightItem.titleView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
//                        WXSDKManager.getInstance().fireEvent(mInstance.getInstanceId(), mInstance.getRootCom().getRef(), WXEventType.CLICK);
                    }
                });

                if (!TextUtils.isEmpty(title) || !TextUtils.isEmpty(titleColor)) {
                    rightItem.setTitle(title);
                    rightItem.setTitleColor(WXResourceUtils.getColor(titleColor, Color.WHITE));
                    return;
                }

                if (fromNative) {
                    rightItem.setIconResId(getApplicationContext(), imgPath);
                } else {
                    rightItem.setIconUrl(imgPath);
                }

                if (rightItem.iconResId > 0) {
                    rightItem.btn.setImageResource(rightItem.iconResId);
                } else if (rightItem.iconBitmap != null && !rightItem.iconBitmap.isRecycled()) {
                    BitmapDrawable drawable = new BitmapDrawable(getApplicationContext().getResources(), rightItem.iconBitmap);
                    rightItem.btn.setImageDrawable(drawable);
                }
            }

            @Override
            public void onClearBarRightItem() {
                rightItem.clear();
            }

            @Override
            public void onSetNavBarLeftItem(String imgPath, String title, String titleColor, boolean fromNative) {

                if (leftItem.btn == null || leftItem.titleView == null)
                    return;

                leftItem.btn.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                    }
                });

                leftItem.titleView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                    }
                });

                if (!TextUtils.isEmpty(title) || !TextUtils.isEmpty(titleColor)) {
                    leftItem.setTitle(title);
                    leftItem.setTitleColor(WXResourceUtils.getColor(titleColor, Color.WHITE));
                    return;
                }

                if (fromNative) {
                    leftItem.setIconResId(getApplicationContext(), imgPath);
                } else {
                    rightItem.setIconUrl(imgPath);
                }

                if (leftItem.iconResId > 0) {
                    leftItem.btn.setImageResource(leftItem.iconResId);
                } else if (leftItem.iconBitmap != null && !leftItem.iconBitmap.isRecycled()) {
                    BitmapDrawable drawable = new BitmapDrawable(getApplicationContext().getResources(), leftItem.iconBitmap);
                    leftItem.btn.setImageDrawable(drawable);
                }
            }

            @Override
            public void onClearNavBarLeftItem() {
                leftItem.clear();
            }
        }));
    }

    /**
     * set Toolbar Title
     */
    private void setToolBarTitle(String title) {
        if (toolbar_title != null)
            toolbar_title.setText(title);
    }

    private void setToolBarTitleSize(int size) {
        if (toolbar_title != null)
            toolbar_title.setTextSize(size);
    }

    private void setToolBarTitleColor(int color) {
        if (toolbar_title != null)
            toolbar_title.setTextColor(color);
    }

    //获取actionBar 的高度
    private int getActionBarHeight() {
        TypedArray actionbarSizeTypedArray = obtainStyledAttributes(new int[]{
                android.R.attr.actionBarSize
        });

        return (int) actionbarSizeTypedArray.getDimension(0, 0);
    }
}
