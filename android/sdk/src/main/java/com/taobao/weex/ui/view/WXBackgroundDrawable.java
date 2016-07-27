/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
 * This source code is licensed under the BSD-style license found in the LICENSE file in the root
 * directory of this source tree. An additional grant of patent rights can be found in the PATENTS
 * file in the same directory.
 */
package com.taobao.weex.ui.view;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.DashPathEffect;
import android.graphics.Outline;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PathEffect;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.SparseIntArray;

import com.taobao.weex.dom.flex.CSSConstants;
import com.taobao.weex.dom.flex.FloatUtil;
import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.utils.WXViewUtils;

import java.util.Arrays;
import java.util.Locale;

/**
 * A subclass of {@link Drawable} used for background of {@link com.taobao.weex.ui.component.WXComponent}. It supports
 * drawing background color and borders (including rounded borders) by providing a react friendly
 * API (setter for each of those properties).
 *
 * The implementation tries to allocate as few objects as possible depending on which properties are
 * set. E.g. for views with rounded background/borders we allocate {@code mPathForBorderRadius} and
 * {@code mTempRectForBorderRadius}. In case when view have a rectangular borders we allocate
 * {@code mBorderWidthResult} and similar. When only background color is set we won't allocate any
 * extra/unnecessary objects.
 */
public class WXBackgroundDrawable extends Drawable {

  public final static int BORDER_TOP_LEFT_RADIUS = 0;
  public final static int BORDER_TOP_RIGHT_RADIUS = 1;
  public final static int BORDER_BOTTOM_RIGHT_RADIUS = 2;
  public final static int BORDER_BOTTOM_LEFT_RADIUS = 3;
  private static final int DEFAULT_BORDER_COLOR = Color.BLACK;
  /* Used by all types of background and for drawing borders */
  private final Paint mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
  /* Value at Spacing.ALL index used for rounded borders, whole array used by rectangular borders */
  private
  @Nullable
  Spacing mBorderWidth;
  private
  @Nullable
  SparseIntArray mBorderColor;
  private
  @Nullable
  BorderStyle mBorderStyle;

  /* Used for rounded border and rounded background */
  private
  @Nullable
  PathEffect mPathEffectForBorderStyle;
  private
  @Nullable
  Path mPathForBorderRadius;
  private
  @Nullable
  Path mPathForBorderRadiusOutline;
  private
  @Nullable
  Path mPathForBorder;
  private
  @Nullable
  RectF mTempRectForBorderRadius;
  private
  @Nullable
  RectF mTempRectForBorderRadiusOutline;
  private boolean mNeedUpdatePathForBorderRadius = false;
  private float mBorderRadius = CSSConstants.UNDEFINED;
  private int mColor = Color.TRANSPARENT;
  private int mAlpha = 255;
  private
  @Nullable
  float[] mBorderCornerRadii;

  @Override
  public void draw(Canvas canvas) {

    updatePathEffect();
    boolean roundedBorders = mBorderCornerRadii != null ||
    (!CSSConstants.isUndefined(mBorderRadius) && mBorderRadius > 0);

    if ((mBorderStyle == null || mBorderStyle == BorderStyle.SOLID) && !roundedBorders) {
      drawRectangularBackgroundWithBorders(canvas);
    }else{
      drawRoundedBackgroundWithBorders(canvas);
    }
  }

  private void drawRoundedBackgroundWithBorders(Canvas canvas) {
    updatePath();
    int useColor = WXViewUtils.multiplyColorAlpha(mColor, mAlpha);
    if ((useColor >>> 24) != 0) { // color is not transparent
      mPaint.setColor(useColor);
      mPaint.setStyle(Paint.Style.FILL);
      canvas.drawPath(mPathForBorderRadiusOutline, mPaint);
    }
    // maybe draw borders?
    float fullBorderWidth = getFullBorderWidth();
    if (fullBorderWidth > 0) {
      int borderColor = getFullBorderColor();
      mPaint.setColor(WXViewUtils.multiplyColorAlpha(borderColor, mAlpha));
      mPaint.setStyle(Paint.Style.STROKE);
      mPaint.setStrokeWidth(fullBorderWidth);
      canvas.drawPath(mPathForBorderRadius, mPaint);
    }
  }

  private void drawRectangularBackgroundWithBorders(Canvas canvas) {
    int useColor = WXViewUtils.multiplyColorAlpha(mColor, mAlpha);
    Rect bounds = getBounds();
    if ((useColor >>> 24) != 0) { // color is not transparent
      mPaint.setColor(useColor);
      mPaint.setStyle(Paint.Style.FILL);
      canvas.drawRect(bounds, mPaint);
    }
    // maybe draw borders?
    if (getBorderWidth(Spacing.LEFT) > 0 || getBorderWidth(Spacing.TOP) > 0 ||
        getBorderWidth(Spacing.RIGHT) > 0 || getBorderWidth(Spacing.BOTTOM) > 0) {

      int borderLeft = getBorderWidth(Spacing.LEFT);
      int borderTop = getBorderWidth(Spacing.TOP);
      int borderRight = getBorderWidth(Spacing.RIGHT);
      int borderBottom = getBorderWidth(Spacing.BOTTOM);


      int colorLeft = getBorderColor(Spacing.LEFT);
      int colorTop = getBorderColor(Spacing.TOP);
      int colorRight = getBorderColor(Spacing.RIGHT);
      int colorBottom = getBorderColor(Spacing.BOTTOM);

      int width = bounds.width();
      int height = bounds.height();
      // If the path drawn previously is of the same color,
      // there would be a slight white space between borders
      // with anti-alias set to true.
      // Therefore we need to disable anti-alias, and
      // after drawing is done, we will re-enable it.

      mPaint.setAntiAlias(false);

      if (mPathForBorder == null) {
        mPathForBorder = new Path();
      }

      if (borderLeft > 0 && colorLeft != Color.TRANSPARENT) {
        drawBorder(canvas,colorLeft,new float[]{
                0, 0,
                borderLeft, borderTop,
                borderLeft, height - borderBottom,
                0, height
        },mPathForBorder,mPaint);
      }

      if (borderTop > 0 && colorTop != Color.TRANSPARENT) {
        drawBorder(canvas,colorTop,new float[]{
                0, 0,
                borderLeft, borderTop,
                width - borderRight, borderTop,
                width, 0
        },mPathForBorder,mPaint);
      }

      if (borderRight > 0 && colorRight != Color.TRANSPARENT) {
        drawBorder(canvas,colorRight,new float[]{
                width, 0,
                width, height,
                width - borderRight, height - borderBottom,
                width - borderRight, borderTop
        },mPathForBorder,mPaint);
      }

      if (borderBottom > 0 && colorBottom != Color.TRANSPARENT) {
        drawBorder(canvas,colorBottom,new float[]{
                        0, height,
                        width, height,
                        width - borderRight, height - borderBottom,
                        borderLeft, height - borderBottom
        },mPathForBorder,mPaint);
      }

      // re-enable anti alias
      mPaint.setAntiAlias(true);
    }
  }

  /**
   * draw one border
   * @param canvas
   * @param color
   * @param pts
   * @param path
   * @param paint
   */
  private void drawBorder(Canvas canvas,int color,float[] pts,Path path,Paint paint){
    paint.setColor(color);
    path.reset();
    path.moveTo(pts[0],pts[1]);

    //exclude start point
    for(int i=1,len=pts.length/2;i<len;i++){
      path.lineTo(pts[i*2],pts[i*2+1]);
    }

    //back to start point
    path.lineTo(pts[0],pts[1]);
    canvas.drawPath(path,paint);
  }

  @Override
  protected void onBoundsChange(Rect bounds) {
    super.onBoundsChange(bounds);
    mNeedUpdatePathForBorderRadius = true;
  }

  private void updatePath() {
    if (!mNeedUpdatePathForBorderRadius) {
      return;
    }
    mNeedUpdatePathForBorderRadius = false;
    if (mPathForBorderRadius == null) {
      mPathForBorderRadius = new Path();
    }
    if (mTempRectForBorderRadius == null) {
      mTempRectForBorderRadius = new RectF();
    }
    if (mPathForBorderRadiusOutline == null) {
      mPathForBorderRadiusOutline = new Path();
    }
    if (mTempRectForBorderRadiusOutline == null) {
      mTempRectForBorderRadiusOutline = new RectF();
    }

    mPathForBorderRadius.reset();
    mPathForBorderRadiusOutline.reset();

    mTempRectForBorderRadius.set(getBounds());
    mTempRectForBorderRadiusOutline.set(getBounds());
    float fullBorderWidth = getFullBorderWidth();
    if (fullBorderWidth > 0) {
      mTempRectForBorderRadius.inset(fullBorderWidth * 0.5f, fullBorderWidth * 0.5f);
    }

    float defaultBorderRadius = !CSSConstants.isUndefined(mBorderRadius) ? mBorderRadius : 0;
    float topLeftRadius = mBorderCornerRadii != null && !CSSConstants.isUndefined(mBorderCornerRadii[0]) ? mBorderCornerRadii[0] : defaultBorderRadius;
    float topRightRadius = mBorderCornerRadii != null && !CSSConstants.isUndefined(mBorderCornerRadii[1]) ? mBorderCornerRadii[1] : defaultBorderRadius;
    float bottomRightRadius = mBorderCornerRadii != null && !CSSConstants.isUndefined(mBorderCornerRadii[2]) ? mBorderCornerRadii[2] : defaultBorderRadius;
    float bottomLeftRadius = mBorderCornerRadii != null && !CSSConstants.isUndefined(mBorderCornerRadii[3]) ? mBorderCornerRadii[3] : defaultBorderRadius;

    mPathForBorderRadius.addRoundRect(
            mTempRectForBorderRadius,
            new float[]{
                    topLeftRadius,
                    topLeftRadius,
                    topRightRadius,
                    topRightRadius,
                    bottomRightRadius,
                    bottomRightRadius,
                    bottomLeftRadius,
                    bottomLeftRadius
            },
            Path.Direction.CW);

    float extraRadiusForOutline = 0;

    if (mBorderWidth != null) {
      extraRadiusForOutline = mBorderWidth.get(Spacing.ALL) / 2f;
    }

    mPathForBorderRadiusOutline.addRoundRect(
            mTempRectForBorderRadiusOutline,
            new float[]{
                    topLeftRadius + extraRadiusForOutline,
                    topLeftRadius + extraRadiusForOutline,
                    topRightRadius + extraRadiusForOutline,
                    topRightRadius + extraRadiusForOutline,
                    bottomRightRadius + extraRadiusForOutline,
                    bottomRightRadius + extraRadiusForOutline,
                    bottomLeftRadius + extraRadiusForOutline,
                    bottomLeftRadius + extraRadiusForOutline
            },
            Path.Direction.CW);

  }

  private void updatePathEffect() {

    mPathEffectForBorderStyle = mBorderStyle != null
                                ? mBorderStyle.getPathEffect(getFullBorderWidth())
                                : null;
    mPaint.setPathEffect(mPathEffectForBorderStyle);
  }




  @Override
  public void setAlpha(int alpha) {
    if (alpha != mAlpha) {
      mAlpha = alpha;
      invalidateSelf();
    }
  }

  /**
   * For rounded borders we use default "borderWidth" property.
   */
  private float getFullBorderWidth() {
    return (mBorderWidth != null && !CSSConstants.isUndefined(mBorderWidth.getRaw(Spacing.ALL))) ?
           mBorderWidth.getRaw(Spacing.ALL) : 0f;
  }

  @Override
  public int getAlpha() {
    return mAlpha;
  }

  /**
   * We use this method for getting color for rounded borders only similarly as for
   * {@link #getFullBorderWidth}.
   */
  private int getFullBorderColor() {
    if(mBorderColor!=null){
      return mBorderColor.get(Spacing.ALL,DEFAULT_BORDER_COLOR);
    }
    else{
      return DEFAULT_BORDER_COLOR;
    }
  }

  @Override
  public void setColorFilter(ColorFilter cf) {
    // do nothing
  }

  private int getBorderWidth(int position) {
    return mBorderWidth != null ? Math.round(mBorderWidth.get(position)) : 0;
  }

  @Override
  public int getOpacity() {
    return WXViewUtils.getOpacityFromColor(WXViewUtils.multiplyColorAlpha(
        mColor, mAlpha));
  }

  private int getBorderColor(int position) {
    // Check ReactStylesDiffMap#getColorInt() to see why this is needed
    return mBorderColor != null ?
           mBorderColor.get(position,mBorderColor.get(Spacing.ALL)) :
           DEFAULT_BORDER_COLOR;
  }

  /* Android's elevation implementation requires this to be implemented to know where to draw the shadow. */
  @Override
  public void getOutline(@NonNull Outline outline) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
      super.getOutline(outline);
    } else {
      if ((!CSSConstants.isUndefined(mBorderRadius) && mBorderRadius > 0) || mBorderCornerRadii != null) {
        updatePath();

        outline.setConvexPath(mPathForBorderRadiusOutline);
      } else {
        outline.setRect(getBounds());
      }
    }

  }

  public void setBorderWidth(int position, float width) {
    if (mBorderWidth == null) {
      mBorderWidth = new Spacing();
    }
    if (!FloatUtil.floatsEqual(mBorderWidth.getRaw(position), width)) {
      mBorderWidth.set(position, width);
      if (position == Spacing.ALL) {
        mNeedUpdatePathForBorderRadius = true;
      }
      invalidateSelf();
    }
  }

  public void setBorderColor(int position, int color) {
    if (mBorderColor == null) {
      mBorderColor = new SparseIntArray(9);
      mBorderColor.put(Spacing.ALL, DEFAULT_BORDER_COLOR);
    }
    if (mBorderColor.get(position)!=color) {
      mBorderColor.put(position,color);
      invalidateSelf();
    }
  }

  public void setBorderStyle(@Nullable String style) {
    BorderStyle borderStyle = style == null
                              ? null
                              : BorderStyle.valueOf(style.toUpperCase(Locale.US));
    if (mBorderStyle != borderStyle) {
      mBorderStyle = borderStyle;
      mNeedUpdatePathForBorderRadius = true;
      invalidateSelf();
    }
  }

  public void setRadius(float radius) {
    if (!FloatUtil.floatsEqual(mBorderRadius, radius)) {
      mBorderRadius = radius;
      mNeedUpdatePathForBorderRadius = true;
      invalidateSelf();
    }
  }

  public void setRadius(float radius, int position) {
    if (mBorderCornerRadii == null) {
      mBorderCornerRadii = new float[4];
      Arrays.fill(mBorderCornerRadii, CSSConstants.UNDEFINED);
    }

    if (!FloatUtil.floatsEqual(mBorderCornerRadii[position], radius)) {
      mBorderCornerRadii[position] = radius;
      mNeedUpdatePathForBorderRadius = true;
      invalidateSelf();
    }
  }

  public int getColor() {
    return mColor;
  }

  public void setColor(int color) {
    mColor = color;
    invalidateSelf();
  }

  private enum BorderStyle {
    SOLID,
    DASHED,
    DOTTED;

    public
    @Nullable
    PathEffect getPathEffect(float borderWidth) {
      switch (this) {
        case SOLID:
          return null;

        case DASHED:
          return new DashPathEffect(
              new float[]{borderWidth * 3, borderWidth * 3, borderWidth * 3, borderWidth * 3}, 0);

        case DOTTED:
          return new DashPathEffect(
              new float[]{borderWidth, borderWidth, borderWidth, borderWidth}, 0);

        default:
          return null;
      }
    }
  }












}
