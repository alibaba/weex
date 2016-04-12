/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable
 * law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License
 * for the specific language governing permissions and limitations under the License.
 */
package com.taobao.weex.ui.view;


import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Paint.Style;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;
import com.taobao.weex.utils.WXViewUtils;


public class WXBaseCircleIndicator extends View implements OnPageChangeListener, WXGestureObservable {

  private final Paint mPaintPage = new Paint();
  private final Paint mPaintStroke = new Paint();
  private final Paint mPaintFill = new Paint();
  private WXGesture wxGesture;
  private WXCircleViewPager mCircleViewPager;

  /**
   * Radius of the circle
   */
  private float radius;
  /**
   * Padding of the circle
   */
  private float circlePadding;
  /**
   * Fill color of unselected circle
   */
  private int pageColor;
  /**
   * Fill color of the selected circle
   */
  private int fillColor;
  private int realCurrentItem;
  private OnPageChangeListener mListener;


  public WXBaseCircleIndicator(Context context) {
    super(context);
    getAttrs(context);
    init();
  }

  /**
   * Get attribute of xml
   */
  private void getAttrs(Context context) {
    radius = WXViewUtils.dip2px(5);
    circlePadding = WXViewUtils.dip2px(5);
    pageColor = Color.parseColor("#ffffff");
    //		strokeWidth= WAViewUtils.dip2px((float)1.5);
    //		strokeColor = Color.parseColor("#FFDDDDDD");
    fillColor = Color.parseColor("#ffd545");
  }

  private void init() {
    mPaintStroke.setStyle(Style.STROKE);
    //		mPaintStroke.setColor(strokeColor);
    //		mPaintStroke.setStrokeWidth(strokeWidth);

    mPaintFill.setStyle(Style.FILL);
    mPaintPage.setColor(pageColor);
    mPaintFill.setStyle(Style.FILL);
    mPaintFill.setColor(fillColor);
  }

  /**
   * @param context
   * @param attrs
   */
  public WXBaseCircleIndicator(Context context, AttributeSet attrs) {
    super(context, attrs);
    getAttrs(context);
    init();
  }

  public void setOnPageChangeListener(OnPageChangeListener listener) {
    mListener = listener;
  }

  /**
   * @return the mCircleViewPager
   */
  public WXCircleViewPager getCircleViewPager() {
    return mCircleViewPager;
  }

  /**
   * @param mCircleViewPager the mCircleViewPager to set
   */
  public void setCircleViewPager(WXCircleViewPager mCircleViewPager) {
    this.mCircleViewPager = mCircleViewPager;
    if (this.mCircleViewPager != null) {
      this.mCircleViewPager.setOnPageChangeListener(this);
    }
    requestLayout();
  }

  @Override
  public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    if (mListener != null) {
      mListener.onPageScrolled(position, positionOffset, positionOffsetPixels);
    }
  }

  @Override
  public void onPageSelected(int position) {
    realCurrentItem = position % getCount();
    invalidate();
    if (mListener != null) {
      mListener.onPageSelected(position);
    }
  }

  @Override
  public void onPageScrollStateChanged(int state) {
    if (mListener != null) {
      mListener.onPageScrollStateChanged(state);
    }
  }

  /**
   * @return the radius
   */
  public float getRadius() {
    return radius;
  }

  /**
   * @param radius the radius to set
   */
  public void setRadius(float radius) {
    this.radius = radius;
  }

  /**
   * @return the circlePadding
   */
  public float getCirclePadding() {
    return circlePadding;
  }

  /**
   * @param circlePadding the circlePadding to set
   */
  public void setCirclePadding(float circlePadding) {
    this.circlePadding = circlePadding;
  }

  /**
   * @return the fillColor
   */
  public int getFillColor() {
    return fillColor;
  }

  /**
   * @param fillColor the fillColor to set
   */
  public void setFillColor(int fillColor) {
    this.fillColor = fillColor;
    mPaintFill.setColor(fillColor);
  }

  public void setPageColor(int pageColor) {
    this.pageColor = pageColor;
    mPaintPage.setColor(pageColor);
  }

  /**
   * @return the realCurrentItem
   */
  public int getRealCurrentItem() {
    return realCurrentItem;
  }

  /**
   * @param realCurrentItem the realCurrentItem to set
   */
  public void setRealCurrentItem(int realCurrentItem) {
    this.realCurrentItem = realCurrentItem;
  }

  //	/**
  //	 * @return the strokeColor
  //	 */
  //	public int getStrokeColor() {
  //		return strokeColor;
  //	}
  //
  //	/**
  //	 * @param strokeColor the strokeColor to set
  //	 */
  //	public void setStrokeColor(int strokeColor) {
  //		this.strokeColor = strokeColor;
  //	}
  //
  //	/**
  //	 * @return the strokeWidth
  //	 */
  //	public float getStrokeWidth() {
  //		return strokeWidth;
  //	}
  //
  //	/**
  //	 * @param strokeWidth the strokeWidth to set
  //	 */
  //	public void setStrokeWidth(float strokeWidth) {
  //		this.strokeWidth = strokeWidth;
  //	}

  @Override
  public void registerGestureListener(WXGesture wxGesture) {
    this.wxGesture = wxGesture;
  }

  @Override
  public boolean onTouchEvent(MotionEvent event) {
    boolean result = super.onTouchEvent(event);
    if (wxGesture != null) {
      result |= wxGesture.onTouch(this, event);
    }
    return result;
  }

  @Override
  protected void onDraw(Canvas canvas) {
    // TODO Auto-generated method stub
    super.onDraw(canvas);

    float firstX = getWidth() / 2 + getPaddingLeft() - getCount() / 2.0f * (radius + circlePadding);// + radius;
    float firstY = getHeight() / 2 + getPaddingTop();// + radius;

    //draw stroked circles
    for (int i = 0; i < getCount(); i++) {
      float dx = firstX + circlePadding * i + radius * 2 * i;
      float dy = firstY;
      if (mPaintStroke.getStrokeWidth() > 0) {
        canvas.drawCircle(dx, dy, radius, mPaintStroke);
      }

      if (mPaintPage.getAlpha() > 0) {
        canvas.drawCircle(dx, dy, radius, mPaintPage);
      }
    }

    //Draw the filled circle
    float dx = firstX + realCurrentItem * circlePadding + radius * 2 * realCurrentItem;
    float dy = firstY;
    canvas.drawCircle(dx, dy, radius, mPaintFill);
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {

    int viewWidth;
    int viewHeight;

    int widthMode = MeasureSpec.getMode(widthMeasureSpec);
    int widthSize = MeasureSpec.getSize(widthMeasureSpec);
    int heightMode = MeasureSpec.getMode(heightMeasureSpec);
    int heightSize = MeasureSpec.getSize(heightMeasureSpec);

    if (widthMode == MeasureSpec.EXACTLY) {
      viewWidth = widthSize;
    } else {
      viewWidth = (int) (getPaddingLeft() + radius * 2 * getCount() + circlePadding * (getCount() - 1) + getPaddingRight()) + 1;
    }

    if (heightMode == MeasureSpec.EXACTLY) {
      viewHeight = heightSize;
    } else {
      viewHeight = (int) (getPaddingTop() + radius * 2 + getPaddingBottom()) + 1;
    }
    setMeasuredDimension(viewWidth, viewHeight);
  }

  /**
   * @return the count
   */
  public int getCount() {
    if (mCircleViewPager == null || mCircleViewPager.getCirclePageAdapter() == null) {
      return 0;
    }
    return mCircleViewPager.getCirclePageAdapter().getRealCount();
  }
}