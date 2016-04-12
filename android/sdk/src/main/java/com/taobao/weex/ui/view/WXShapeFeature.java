/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.ui.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.Shader;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.shapes.OvalShape;
import android.graphics.drawable.shapes.RoundRectShape;
import android.graphics.drawable.shapes.Shape;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;

import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.utils.WXResourceUtils;
import com.taobao.weex.utils.WXUtils;
import com.taobao.weex.utils.WXViewUtils;

public class WXShapeFeature {

  public static final int RoundShape = 0;
  public static final int RoundRectShape = 1;
  private final Matrix mMatrix = new Matrix();
  private WXDomObject mDom;
  private Shape mShape;
  private float[] mCornerRadiusArray;
  private boolean mIsRound = true;
  private volatile boolean mStrokeEnable;
  private float mStrokeWidth;
  private Paint mStrokePaint;
  private Path mStrokePath;
  private RectF mRectF;
  private View mHost;
  private boolean mHasRadius = false;

  public WXShapeFeature(Context context, View view, WXDomObject dom) {
    if (dom == null) {
      return;
    }
    mDom = dom;
    int strokeColor = Color.GRAY;
    mHost = view;

    int type = RoundRectShape;
    initCornerRadius();
    setShape(type);
    mStrokePaint = new Paint();

    mStrokePaint.setStyle(Paint.Style.STROKE);
    mStrokePaint.setAntiAlias(true);
    if (mDom.style != null) {
      String realBgColor = mDom.style.getBorderColor();
      if (!TextUtils.isEmpty(realBgColor)) {
        strokeColor = WXResourceUtils.getColor(realBgColor);
      }
      if (strokeColor == -1) {
        strokeColor = Color.GRAY;
      }
      mStrokeWidth = mDom.style.getBorderWidth();
      if (!WXUtils.isUndefined(mStrokeWidth) && mStrokeWidth > 0) {
        mStrokeEnable = true;
        mStrokeWidth = WXViewUtils.getRealPxByWidth(mStrokeWidth);
        mStrokePaint.setStrokeWidth(mStrokeWidth);
      }
    }

    mStrokePaint.setColor(strokeColor);

    mStrokePath = new Path();
    mRectF = new RectF();
  }

  private void initCornerRadius() {
    float radius = 0;
    if (mDom.style != null) {
      radius = mDom.style.getBorderRadius();
    }

    if (WXUtils.isUndefined(radius) || radius <= 0) {
      mCornerRadiusArray = new float[]{0, 0, 0, 0, 0, 0, 0, 0};
      return;
    }
    mHasRadius = true;

    //TODO
    radius = WXViewUtils.getRealPxByWidth(radius);

    float tl = radius;
    float bl = radius;
    float tr = radius;
    float br = radius;
    mCornerRadiusArray = new float[]{tl, tl, tr, tr, br, br, bl, bl};
  }

  /**
   * @param shapeType Pass {@link #RoundShape} or {@link #RoundRectShape}. Default
   *                  value is {@link #RoundShape}.
   * @attr ref R.styleable#ImageShapeFeature_uik_shapeType
   */
  private void setShape(int shapeType) {
    if (RoundShape == shapeType) {
      mShape = new OvalShape();
      if (mHost instanceof ImageView) {
        ((ImageView) mHost).setScaleType(ImageView.ScaleType.CENTER_INSIDE);
      }
      mIsRound = true;
    } else if (RoundRectShape == shapeType) {
      mShape = new RoundRectShape(mCornerRadiusArray, null, null);
      mIsRound = false;
    }
  }

  void updateDom(WXDomObject domObject) {
    mDom = domObject;
  }

  public Drawable wrapDrawable(Drawable drawable) {
    int width = (int) mDom.getLayoutWidth();
    int height = (int) mDom.getLayoutHeight();
    if ((0 >= width && 0 >= height) || !hasRadius()) {
      return drawable;
    }

    WrapShapeDrawable wrapShapeDrawable;
    Drawable innerDrawable;
    if (mHost instanceof ImageView) {
      innerDrawable = ((ImageView) mHost).getDrawable();
    } else {
      innerDrawable = mHost.getBackground();
    }

    if (innerDrawable instanceof WrapShapeDrawable) {
      wrapShapeDrawable = (WrapShapeDrawable) innerDrawable;
    } else {
      wrapShapeDrawable = new WrapShapeDrawable(mShape);
    }

    int vWidth = width;
    int vHeight = height;
    if (0 >= wrapShapeDrawable.getIntrinsicHeight() && 0 >= wrapShapeDrawable.getIntrinsicWidth()) {
      if (mIsRound) {
        vWidth = vHeight = Math.min(vWidth, vHeight);
      }
      wrapShapeDrawable.setIntrinsicWidth(vWidth);
      wrapShapeDrawable.setIntrinsicHeight(vHeight);
    }

    if (drawable instanceof BitmapDrawable) {
      Bitmap bm = getBitmap(drawable);
      if (null != bm) {
        int bmWidth = bm.getWidth();
        int bmHeight = bm.getHeight();
        BitmapShader bitmapShader = new BitmapShader(bm, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP);

        float scale;
        float translateX = 0;
        float translateY = 0;

        if (bmWidth * vHeight > bmHeight * vWidth) {
          scale = vHeight / (float) bmHeight;
          translateX = (vWidth - bmWidth * scale) * 0.5f;
        } else {
          scale = vWidth / (float) bmWidth;
          translateY = (vHeight - bmHeight * scale) * 0.5f;
        }

        mMatrix.reset();
        mMatrix.setScale(scale, scale);
        mMatrix.postTranslate(translateX + 0.5f, translateY + 0.5f);
        bitmapShader.setLocalMatrix(mMatrix);
        wrapShapeDrawable.getPaint().setShader(bitmapShader);
      } else {
        wrapShapeDrawable.getPaint().setShader(null);
      }
    } else if (drawable instanceof ColorDrawable) {
      wrapShapeDrawable.getPaint().setShader(null);
      wrapShapeDrawable.getPaint().setColor(((ColorDrawable) drawable).getColor());
    } else {
      return drawable;
    }
    wrapShapeDrawable.invalidateSelf();
    return wrapShapeDrawable;
  }

  private boolean hasRadius() {
    return mHasRadius || mIsRound;
  }

  private Bitmap getBitmap(Drawable drawable) {
    if (drawable instanceof BitmapDrawable) {
      return ((BitmapDrawable) drawable).getBitmap();
    }
    return null;
  }


  public void beforeOnLayout(boolean changed, int left, int top, int right, int bottom) {
  }

  public void afterOnLayout(boolean changed, int left, int top, int right, int bottom) {
    if (changed) {
      if (mIsRound) {
        float centerX = (right - left) * 0.5f;
        float centerY = (bottom - top) * 0.5f;
        float radius = (Math.min(right - left, bottom - top) - mStrokeWidth) * 0.5f;
        mStrokePath.addCircle(centerX, centerY, radius, Path.Direction.CCW);
      } else {
        float offset = mStrokeWidth * 0.5f;
        mRectF.set(offset, offset, right - left - offset, bottom - top - offset);
        mStrokePath.addRoundRect(mRectF, mCornerRadiusArray, Path.Direction.CCW);
      }
      if (mHost instanceof ImageView) {
        ((ImageView) mHost).setImageDrawable(((ImageView) mHost).getDrawable());
      } else {
        mHost.setBackgroundDrawable(mHost.getBackground());
      }
    }
  }

  public void beforeOnDraw(Canvas canvas) {
  }

  public void afterOnDraw(Canvas canvas) {
    if (mStrokeEnable) {
      canvas.drawPath(mStrokePath, mStrokePaint);
    }
  }

  private static class WrapShapeDrawable extends ShapeDrawable {

    public WrapShapeDrawable() {
      super();
    }

    public WrapShapeDrawable(Shape s) {
      super(s);
    }
  }
}