package com.taobao.weex.ui.view.refresh.circlebar;

import android.content.Context;
import android.content.res.Resources;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RadialGradient;
import android.graphics.Shader;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.shapes.OvalShape;
import android.support.v4.view.ViewCompat;
import android.util.AttributeSet;
import android.view.animation.Animation;
import android.widget.ImageView;

import com.taobao.weappplus_sdk.R;

/**
 * Modify of android.support.v4
 */
public class CircleProgressBar extends ImageView {

  private static final int KEY_SHADOW_COLOR = 0x1E000000;
  private static final int FILL_SHADOW_COLOR = 0x3D000000;
  private static final float X_OFFSET = 0f;
  private static final float Y_OFFSET = 1.75f;
  private static final float SHADOW_RADIUS = 3.5f;
  private static final int SHADOW_ELEVATION = 4;

  public static final int DEFAULT_CIRCLE_BG_LIGHT = 0xFFFAFAFA;
  public static final int DEFAULT_CIRCLE_COLOR = 0xFFF00000;
  private static final int DEFAULT_CIRCLE_DIAMETER = 40;
  private static final int STROKE_WIDTH_LARGE = 3;

  private Animation.AnimationListener mListener;
  private int mShadowRadius;
  private int mBackGroundColor;
  private int mProgressColor;
  private int mProgressStokeWidth;
  private int mArrowWidth;
  private int mArrowHeight;
  private int mProgress;
  private int mMax;
  private int mDiameter;
  private int mInnerRadius;
  private boolean mShowArrow;
  public MaterialProgressDrawable mProgressDrawable;
  private ShapeDrawable mBgCircle;
  private boolean mCircleBackgroundEnabled;
  private int[] mColors = new int[]{Color.BLACK};

  public CircleProgressBar(Context context) {
    super(context);
    init(context, null, 0);

  }

  public CircleProgressBar(Context context, AttributeSet attrs) {
    super(context, attrs);
    init(context, attrs, 0);

  }

  public CircleProgressBar(Context context, AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
    init(context, attrs, defStyleAttr);
  }

  private void init(Context context, AttributeSet attrs, int defStyleAttr) {
    final TypedArray a = context.obtainStyledAttributes(
        attrs, R.styleable.CircleProgressBar, defStyleAttr, 0);

    final float density = getContext().getResources().getDisplayMetrics().density;

    mBackGroundColor = a.getColor(
        R.styleable.CircleProgressBar_background_color, DEFAULT_CIRCLE_BG_LIGHT);

    mProgressColor = a.getColor(
        R.styleable.CircleProgressBar_progress_color, DEFAULT_CIRCLE_COLOR);
    mColors = new int[]{mProgressColor};

    mInnerRadius = a.getDimensionPixelOffset(
        R.styleable.CircleProgressBar_inner_radius, -1);

    mProgressStokeWidth = a.getDimensionPixelOffset(
        R.styleable.CircleProgressBar_progress_stoke_width, (int) (STROKE_WIDTH_LARGE * density));
    mArrowWidth = a.getDimensionPixelOffset(
        R.styleable.CircleProgressBar_arrow_width, -1);
    mArrowHeight = a.getDimensionPixelOffset(
        R.styleable.CircleProgressBar_arrow_height, -1);
    mShowArrow = a.getBoolean(R.styleable.CircleProgressBar_show_arrow, true);
    mCircleBackgroundEnabled = a.getBoolean(R.styleable.CircleProgressBar_enable_circle_background, true);

    mProgress = a.getInt(R.styleable.CircleProgressBar_progress, 0);
    mMax = a.getInt(R.styleable.CircleProgressBar_max, 100);
    a.recycle();
    mProgressDrawable = new MaterialProgressDrawable(getContext(), this);
    super.setImageDrawable(mProgressDrawable);
  }

  public void setProgressBackGroundColor(int color) {
    this.mBackGroundColor = color;
  }

  private boolean elevationSupported() {
    return android.os.Build.VERSION.SDK_INT >= 21;
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    if (!elevationSupported()) {
      setMeasuredDimension(getMeasuredWidth() + mShadowRadius * 2, getMeasuredHeight()
                                                                   + mShadowRadius * 2);
    }
  }

  public int getProgressStokeWidth() {
    return mProgressStokeWidth;
  }

  public void setProgressStokeWidth(int mProgressStokeWidth) {
    final float density = getContext().getResources().getDisplayMetrics().density;
    this.mProgressStokeWidth = (int) (mProgressStokeWidth * density);
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);
    final float density = getContext().getResources().getDisplayMetrics().density;
    mDiameter = Math.min(getMeasuredWidth(), getMeasuredHeight());
    if (mDiameter <= 0) {
      mDiameter = (int) density * DEFAULT_CIRCLE_DIAMETER;
    }
    if (getBackground() == null && mCircleBackgroundEnabled) {
      final int shadowYOffset = (int) (density * Y_OFFSET);
      final int shadowXOffset = (int) (density * X_OFFSET);
      mShadowRadius = (int) (density * SHADOW_RADIUS);

      if (elevationSupported()) {
        mBgCircle = new ShapeDrawable(new OvalShape());
        ViewCompat.setElevation(this, SHADOW_ELEVATION * density);
      } else {
        OvalShape oval = new OvalShadow(mShadowRadius, mDiameter - mShadowRadius * 2);
        mBgCircle = new ShapeDrawable(oval);
        ViewCompat.setLayerType(this, ViewCompat.LAYER_TYPE_SOFTWARE, mBgCircle.getPaint());
        mBgCircle.getPaint().setShadowLayer(mShadowRadius, shadowXOffset, shadowYOffset,
                                            KEY_SHADOW_COLOR);
        final int padding = (int) mShadowRadius;
        // set padding so the inner image sits correctly within the shadow.
        setPadding(padding, padding, padding, padding);
      }
      mBgCircle.getPaint().setColor(mBackGroundColor);
      setBackgroundDrawable(mBgCircle);
    }
    mProgressDrawable.setBackgroundColor(mBackGroundColor);
    mProgressDrawable.setColorSchemeColors(mColors);
    if (isShowArrow()) {
      mProgressDrawable.setArrowScale(1f);
      mProgressDrawable.showArrow(true);
    }
    super.setImageDrawable(null);
    super.setImageDrawable(mProgressDrawable);
    mProgressDrawable.setAlpha(255);
    if (getVisibility() == VISIBLE) {
      mProgressDrawable.setStartEndTrim(0, (float) 0.8);
    }
  }

  public boolean isShowArrow() {
    return mShowArrow;
  }

  public void setShowArrow(boolean showArrow) {
    this.mShowArrow = showArrow;
  }

  public void setAnimationListener(Animation.AnimationListener listener) {
    mListener = listener;
  }

  @Override
  public void onAnimationStart() {
    super.onAnimationStart();
    if (mListener != null) {
      mListener.onAnimationStart(getAnimation());
    }
  }

  @Override
  public void onAnimationEnd() {
    super.onAnimationEnd();
    if (mListener != null) {
      mListener.onAnimationEnd(getAnimation());
    }
  }

  /**
   * Set the colors used in the progress animation. The first
   * color will also be the color of the bar that grows in response to a user
   * swipe gesture.
   *
   * @param colors
   */
  public void setColorSchemeColors(int... colors) {
    mColors = colors;
    if (mProgressDrawable != null) {
      mProgressDrawable.setColorSchemeColors(colors);
    }
  }

  /**
   * Update the background color of the mBgCircle image view.
   */
  public void setBackgroundColorResource(int colorRes) {
    if (getBackground() instanceof ShapeDrawable) {
      final Resources res = getResources();
      ((ShapeDrawable) getBackground()).getPaint().setColor(res.getColor(colorRes));
    }
  }

  public void setBackgroundColor(int color) {
    if (getBackground() instanceof ShapeDrawable) {
      final Resources res = getResources();
      ((ShapeDrawable) getBackground()).getPaint().setColor(color);
    }
  }

  public int getMax() {
    return mMax;
  }

  public void setMax(int max) {
    mMax = max;
  }

  public int getProgress() {
    return mProgress;
  }

  public void setProgress(int progress) {
    if (getMax() > 0) {
      mProgress = progress;
    }
    invalidate();
  }

  public boolean circleBackgroundEnabled() {
    return mCircleBackgroundEnabled;
  }

  public void setCircleBackgroundEnabled(boolean enableCircleBackground) {
    this.mCircleBackgroundEnabled = enableCircleBackground;
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    if (mProgressDrawable != null) {
      mProgressDrawable.stop();
      mProgressDrawable.setVisible(getVisibility() == VISIBLE, false);
    }
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    if (mProgressDrawable != null) {
      mProgressDrawable.stop();
      mProgressDrawable.setVisible(false, false);
    }
  }

  private class OvalShadow extends OvalShape {

    private RadialGradient mRadialGradient;
    private int mShadowRadius;
    private Paint mShadowPaint;
    private int mCircleDiameter;

    public OvalShadow(int shadowRadius, int circleDiameter) {
      super();
      mShadowPaint = new Paint();
      mShadowRadius = shadowRadius;
      mCircleDiameter = circleDiameter;
      mRadialGradient = new RadialGradient(mCircleDiameter / 2, mCircleDiameter / 2,
                                           mShadowRadius, new int[]{
          FILL_SHADOW_COLOR, Color.TRANSPARENT
      }, null, Shader.TileMode.CLAMP);
      mShadowPaint.setShader(mRadialGradient);
    }

    @Override
    public void draw(Canvas canvas, Paint paint) {
      final int viewWidth = CircleProgressBar.this.getWidth();
      final int viewHeight = CircleProgressBar.this.getHeight();
      canvas.drawCircle(viewWidth / 2, viewHeight / 2, (mCircleDiameter / 2 + mShadowRadius),
                        mShadowPaint);
      canvas.drawCircle(viewWidth / 2, viewHeight / 2, (mCircleDiameter / 2), paint);
    }
  }

  public void start() {
    mProgressDrawable.start();
  }

  public void setStartEndTrim(float startAngle, float endAngle) {
    mProgressDrawable.setStartEndTrim(startAngle, endAngle);
  }

  public void stop() {
    mProgressDrawable.stop();
  }

  public void setProgressRotation(float rotation) {
    mProgressDrawable.setProgressRotation(rotation);
  }
}