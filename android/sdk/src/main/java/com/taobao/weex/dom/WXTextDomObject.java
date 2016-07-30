/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
package com.taobao.weex.dom;

import android.graphics.Canvas;
import android.graphics.Typeface;
import android.os.Build;
import android.text.DynamicLayout;
import android.text.Editable;
import android.text.Layout;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.TextUtils;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.AlignmentSpan;
import android.text.style.ForegroundColorSpan;
import android.text.style.StrikethroughSpan;
import android.text.style.UnderlineSpan;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.flex.CSSConstants;
import com.taobao.weex.dom.flex.CSSNode;
import com.taobao.weex.dom.flex.FloatUtil;
import com.taobao.weex.dom.flex.MeasureOutput;
import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXTextDecoration;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

import static com.taobao.weex.dom.WXStyle.UNSET;

/**
 * Class for calculating a given text's height and width. The calculating of width and height of
 * text is done by {@link Layout}.
 */
public class WXTextDomObject extends WXDomObject {

  /**
   * Command object for setSpan
   */
  private static class SetSpanOperation {

    protected int start, end;
    protected Object what;

    SetSpanOperation(int start, int end, Object what) {
      this.start = start;
      this.end = end;
      this.what = what;
    }

    public void execute(SpannableStringBuilder sb) {
      sb.setSpan(what, start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
    }
  }

  /**
   * Object for calculating text's width and height. This class is an anonymous class of
   * implementing {@link com.taobao.weex.dom.flex.CSSNode.MeasureFunction}
   */
  private static final CSSNode.MeasureFunction TEXT_MEASURE_FUNCTION = new CSSNode.MeasureFunction() {
    @Override
    public void measure(CSSNode node, float width, MeasureOutput measureOutput) {
      WXTextDomObject textDomObject = (WXTextDomObject) node;
      if (CSSConstants.isUndefined(width)) {
        width = node.cssstyle.maxWidth;
      }
      textDomObject.updateLayout(width,false);
      textDomObject.hasBeenMeasured = true;
      textDomObject.previousWidth = textDomObject.layout.getWidth();
      measureOutput.height = textDomObject.layout.getHeight();
      measureOutput.width = textDomObject.previousWidth;
    }
  };


  private static final TextPaint TEXT_PAINT = new TextPaint();
  private static final Canvas DUMMY_CANVAS = new Canvas();
  private static final String ELLIPSIS = "\u2026";
  private boolean mIsColorSet = false;
  private boolean hasBeenMeasured = false;
  private int mColor;
  /**
   * mFontStyle can be {@link Typeface#NORMAL} or {@link Typeface#ITALIC}.
   */
  private int mFontStyle = UNSET;
  /**
   * mFontWeight can be {@link Typeface#NORMAL} or {@link Typeface#BOLD}.
   */
  private int mFontWeight = UNSET;
  private int mNumberOfLines = UNSET;
  private int mFontSize = UNSET;
  private int mLineHeight = UNSET;
  private float previousWidth = Float.NaN;
  private String mFontFamily = null;
  private String mText = null;
  private TextUtils.TruncateAt textOverflow;
  private Layout.Alignment mAlignment;
  private WXTextDecoration mTextDecoration = WXTextDecoration.NONE;
  private SpannableStringBuilder spannableStringBuilder = new SpannableStringBuilder();
  private Layout layout;
  private AtomicReference<Layout> atomicReference=new AtomicReference<>();

  static {
    TEXT_PAINT.setFlags(TextPaint.ANTI_ALIAS_FLAG);
  }

  /**
   * Create an instance of current class, and set {@link #TEXT_MEASURE_FUNCTION} as the
   * measureFunction
   * @see CSSNode#setMeasureFunction(MeasureFunction)
   */
  public WXTextDomObject() {
    super();
    setMeasureFunction(TEXT_MEASURE_FUNCTION);
  }

  /**
   * Prepare the text {@link Spanned} for calculating text's size. This is done by setting
   * various text span to the text.
   * @see android.text.style.CharacterStyle
   */
  @Override
  public void layoutBefore() {
    hasBeenMeasured = false;
    updateStyleAndText();
    updateSpannableStringBuilder(mText);
    super.dirty();
    super.layoutBefore();
  }

  @Override
  public void layoutAfter() {
    if(hasBeenMeasured){
      if(layout!=null&& !FloatUtil.floatsEqual(getTextContentWidth(),previousWidth)){
        recalculateLayout();
      }
    }
    else{
      updateStyleAndText();
      recalculateLayout();
    }
    hasBeenMeasured =false;

    if(layout!=null && !layout.equals(atomicReference.get()) &&
       Build.VERSION.SDK_INT>=Build.VERSION_CODES.KITKAT) {
      //TODO Warm up, a profile should be used to see the improvement.
      warmUpTextLayoutCache();
    }
    swap();
    super.layoutAfter();
  }

  @Override
  public Layout getExtra() {
    return atomicReference.get();
  }

  @Override
  public void updateAttr(Map<String, Object> attrs) {
    swap();
    super.updateAttr(attrs);
    if (attrs.containsKey(WXDomPropConstant.WX_ATTR_VALUE)) {
      mText = WXAttr.getValue(attrs);
    }
  }

  @Override
  public void updateStyle(Map<String, Object> styles) {
    swap();
    super.updateStyle(styles);
    updateStyleImp(styles);
  }

  @Override
  public WXTextDomObject clone() {
    WXTextDomObject dom = null;
    try {
      dom = new WXTextDomObject();
      if (this.cssstyle != null) {
        dom.cssstyle.copy(this.cssstyle);
      }
      dom.ref = ref;
      dom.type = type;
      dom.style = style;
      dom.attr = attr;
      dom.event = event == null ? null : event.clone();
      dom.hasBeenMeasured = hasBeenMeasured;
      dom.atomicReference=atomicReference;
      if (this.csslayout != null) {
        dom.csslayout.copy(this.csslayout);
      }
    } catch (Exception e) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.e("WXTextDomObject clone error: ", e);
      }
    }
    if (dom != null) {
      dom.spannableStringBuilder = spannableStringBuilder;
    }
    return dom;
  }

  private float getTextContentWidth(){
    float rawWidth=getLayoutWidth(), left, right;
    Spacing padding=getPadding();
    if(!CSSConstants.isUndefined((left=padding.get(Spacing.LEFT)))){
      rawWidth-=left;
    }
    if(!CSSConstants.isUndefined((right=padding.get(Spacing.RIGHT)))){
      rawWidth-=right;
    }
    return rawWidth;
  }

  private void recalculateLayout() {
    updateSpannableStringBuilder(mText);
    updateLayout(getTextContentWidth(),true);
    previousWidth = layout.getWidth();
  }

  /**
   * Update style and text.
   */
  private void updateStyleAndText() {
    updateStyleImp(style);
    if (attr != null) {
      mText = WXAttr.getValue(attr);
    }
  }

  /**
   * Record the property according to the given style
   * @param style the give style.
   */
  private void updateStyleImp(Map<String, Object> style) {
    if (style != null) {
      if (style.containsKey(WXDomPropConstant.WX_LINES)) {
        int lines = WXStyle.getLines(style);
        if (lines > 0) {
          mNumberOfLines = lines;
        }
      }
      if (style.containsKey(WXDomPropConstant.WX_FONTSIZE)) {
        mFontSize = WXStyle.getFontSize(style);
      }
      if (style.containsKey(WXDomPropConstant.WX_FONTWEIGHT)) {
        mFontWeight = WXStyle.getFontWeight(style);
      }
      if (style.containsKey(WXDomPropConstant.WX_FONTSTYLE)) {
        mFontStyle = WXStyle.getFontStyle(style);
      }
      if (style.containsKey(WXDomPropConstant.WX_COLOR)) {
        mColor = WXResourceUtils.getColor(WXStyle.getTextColor(style));
        mIsColorSet = mColor != Integer.MIN_VALUE;
      }
      if (style.containsKey(WXDomPropConstant.WX_TEXTDECORATION)) {
        mTextDecoration = WXStyle.getTextDecoration(style);
      }
      if (style.containsKey(WXDomPropConstant.WX_FONTFAMILY)) {
        mFontFamily = WXStyle.getFontFamily(style);
      }
      mAlignment = WXStyle.getTextAlignment(style);
      textOverflow = WXStyle.getTextOverflow(style);
      int lineHeight=WXStyle.getLineHeight(style);
      if(lineHeight!=UNSET)
        mLineHeight=lineHeight;
    }
  }

  /**
   * Update layout according to {@link #mText} and span
   * @param width the specified width.
   * @param forceWidth If true, force the text width to the specified width, otherwise, text width
   *                   may equals to or be smaller than the specified width.
   */
  private void updateLayout(float width, boolean forceWidth) {
    float textWidth;
    if(forceWidth){
      textWidth=width;
    }
    else {
      float desiredWidth = Layout.getDesiredWidth(spannableStringBuilder, TEXT_PAINT);
      if (CSSConstants.isUndefined(width) || desiredWidth < width) {
        textWidth = desiredWidth;
      } else {
        textWidth = width;
      }
    }
    if (layout == null||!FloatUtil.floatsEqual(previousWidth, width)) {
      layout = new DynamicLayout(spannableStringBuilder, TEXT_PAINT, (int) Math.ceil(textWidth),
                                 Layout.Alignment.ALIGN_NORMAL, 1, 0, true);
    }

    if (mNumberOfLines != UNSET && mNumberOfLines > 0 && mNumberOfLines < layout.getLineCount()) {
      int lastLineStart, lastLineEnd;
      CharSequence reminder, main;
      lastLineStart = layout.getLineStart(mNumberOfLines - 1);
      lastLineEnd = layout.getLineEnd(mNumberOfLines - 1);
      if (lastLineStart < lastLineEnd) {
        StringBuilder stringBuilder = new StringBuilder();
        main = mText.subSequence(0, lastLineStart);
        reminder = mText.subSequence(lastLineStart, textOverflow == null ? lastLineEnd : lastLineEnd - 1);
        stringBuilder.setLength(0);
        stringBuilder.append(main);
        stringBuilder.append(reminder);
        if (textOverflow != null) {
          stringBuilder.append(ELLIPSIS);
        }
        updateSpannableStringBuilder(stringBuilder.toString());
        updateLayout(width, forceWidth);
      }
    }
  }

  /**
   * Update {@link #spannableStringBuilder} according to the give charSequence and {@link #style}
   * @param text the give raw text.
   * @return an editable contains text and spans
   */
  private Editable updateSpannableStringBuilder(String text) {
    spannableStringBuilder.clear();
    if (text != null) {
      spannableStringBuilder.append(text);
    }
    List<SetSpanOperation> ops = createSetSpanOperation(spannableStringBuilder.length());
    if (mFontSize == UNSET) {
      spannableStringBuilder.setSpan(
          new AbsoluteSizeSpan(WXText.sDEFAULT_SIZE), 0, spannableStringBuilder
              .length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
    }
    Collections.reverse(ops);
    for (SetSpanOperation op : ops) {
      op.execute(spannableStringBuilder);
    }
    return spannableStringBuilder;
  }

  /**
   * Create a task list which contains {@link SetSpanOperation}. The task list will be executed
   * in other method.
   * @param end the end character of the text.
   * @return a task list which contains {@link SetSpanOperation}.
   */
  private List<SetSpanOperation> createSetSpanOperation(int end) {
    List<SetSpanOperation> ops = new LinkedList<>();
    int start = 0;
    if (end >= start) {
      if (mTextDecoration == WXTextDecoration.UNDERLINE) {
        ops.add(new SetSpanOperation(start, end,
                                     new UnderlineSpan()));
      }
      if (mTextDecoration == WXTextDecoration.LINETHROUGH) {
        ops.add(new SetSpanOperation(start, end,
                                     new StrikethroughSpan()));
      }
      if (mIsColorSet) {
        ops.add(new SetSpanOperation(start, end,
                                     new ForegroundColorSpan(mColor)));
      }
      if (mFontSize != UNSET) {
        ops.add(new SetSpanOperation(start, end, new AbsoluteSizeSpan(mFontSize)));
      }
      if (mFontStyle != UNSET
          || mFontWeight != UNSET
          || mFontFamily != null) {
        ops.add(new SetSpanOperation(start, end,
                                     new WXCustomStyleSpan(mFontStyle, mFontWeight, mFontFamily)));
      }
      ops.add(new SetSpanOperation(start, end, new AlignmentSpan.Standard(mAlignment)));
      if(mLineHeight !=UNSET) {
        ops.add(new SetSpanOperation(start, end, new WXLineHeightSpan(mLineHeight)));
      }
    }
    return ops;
  }

  private void swap(){
    if (layout != null) {
      spannableStringBuilder = new SpannableStringBuilder(spannableStringBuilder);
      atomicReference.set(layout);
      layout = null;
    }
  }

  /**
   * As warming up TextLayoutCache done in the DOM thread may manipulate UI operation,
   there may be some exception, in which case the exception is ignored. After all,
   this is just a warm up operation.
   * @return false for warm up failure, otherwise returns true.
   */
  private boolean warmUpTextLayoutCache() {
    boolean result;
    try {
      layout.draw(DUMMY_CANVAS);
      result = true;
    } catch (Exception e) {
      WXLogUtils.eTag(TAG, e);
      result = false;
    }
    return result;
  }

}
