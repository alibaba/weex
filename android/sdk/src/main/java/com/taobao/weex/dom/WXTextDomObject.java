/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
package com.taobao.weex.dom;

import android.graphics.Typeface;
import android.os.Build;
import android.text.BoringLayout;
import android.text.Layout;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.TextUtils;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.BackgroundColorSpan;
import android.text.style.ForegroundColorSpan;
import android.text.style.StrikethroughSpan;
import android.text.style.UnderlineSpan;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.flex.CSSConstants;
import com.taobao.weex.dom.flex.CSSNode;
import com.taobao.weex.dom.flex.MeasureOutput;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXTextDecoration;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Class for calculating a given text's height and width. The calculating of width and height of
 * text is done by {@link Layout}.
 */
public class WXTextDomObject extends WXDomObject {

  public static final int UNSET = -1;
  private final static String XIAO_MI = "xiaomi";
  private final static int XIAOMI_ABOVE_750_WIDTH_DELTA = 14;
  private final static int XIAOMI_BELOW_750_WIDTH_DELTA = 8;
  private final static int XIAOMI_HEIGHT_THRESHOLD = 6;
  private static final TextPaint sTextPaintInstance = new TextPaint();
  /**
   * Object for calculating text's width and height. This class is an anonymous class of
   * implementing {@link com.taobao.weex.dom.flex.CSSNode.MeasureFunction}
   */
  private static final CSSNode.MeasureFunction TEXT_MEASURE_FUNCTION = new CSSNode.MeasureFunction() {
    @Override
    public void measure(CSSNode node, float width, MeasureOutput measureOutput) {
      WXTextDomObject textDomObject = (WXTextDomObject) node;
      TextPaint textPaint = sTextPaintInstance;
      Layout layout;
      Spanned text = textDomObject.mPreparedSpannedText;
      if (text == null) {
        return;
      }
      BoringLayout.Metrics boring = BoringLayout
          .isBoring(text, textPaint);
      float desiredWidth = boring == null ? Layout.getDesiredWidth(text,
                                                                   textPaint) : Float.NaN;
      if(CSSConstants.isUndefined(width)){
        width=node.cssstyle.maxWidth;
      }
      if (boring == null
          && (CSSConstants.isUndefined(width) || (!CSSConstants
          .isUndefined(desiredWidth) && desiredWidth <= width))) {
        // Is used when the width is not known and the text is not
        // boring, ie. if it contains
        // unicode characters.
        layout = new StaticLayout(text, textPaint,
                                  (int) Math.ceil(desiredWidth),
                                  Layout.Alignment.ALIGN_NORMAL, 1, 0, true);
      } else if (boring != null
                 && (CSSConstants.isUndefined(width) || boring.width <= width)) {
        // Is used for single-line, boring text when the width is either
        // unknown or bigger
        // than the width of the text.
        layout = BoringLayout.make(text, textPaint, boring.width,
                                   Layout.Alignment.ALIGN_NORMAL, 1, 0, boring, true);
      } else {
        // Is used for multiline, boring text and the width is known.
        layout = new StaticLayout(text, textPaint, (int) width,
                                  Layout.Alignment.ALIGN_NORMAL, 1, 0, true);
      }

      measureOutput.height = layout.getHeight();
      measureOutput.width = layout.getWidth();
      if (textDomObject.mNumberOfLines != UNSET
          && textDomObject.mNumberOfLines < layout.getLineCount()) {
        measureOutput.height = layout
            .getLineBottom(textDomObject.mNumberOfLines - 1);
      }
      if (textDomObject.mLineHeight != UNSET) {
        int lines = textDomObject.mNumberOfLines != UNSET ? Math.min(
            textDomObject.mNumberOfLines, layout.getLineCount())
                                                          : layout.getLineCount();
        float lineHeight = textDomObject.mLineHeight;
        measureOutput.height = lineHeight * lines;
      }
      measureOutput.height = measureOutput.height + layout.getTopPadding() - layout
          .getBottomPadding();

      processXiaoMiModel(measureOutput, width,
                         layout.getLineCount() == 0 ? 0 : measureOutput.height / layout
                             .getLineCount(), layout.getLineCount());
    }

    private void processXiaoMiModel(MeasureOutput measureOutput, float outerWidth,
                                    float lineHeight, float lineCount) {
      String manufacturer = Build.MANUFACTURER.toLowerCase();
      if (TextUtils.equals(XIAO_MI, manufacturer)) {
        processXiaoMiHeight(lineHeight, lineCount, measureOutput);
        if (WXViewUtils.getScreenWidth() < WXEnvironment.sDeafultWidth) {
          processXiaoMiWidth(measureOutput, outerWidth, XIAOMI_BELOW_750_WIDTH_DELTA);
        } else {
          processXiaoMiWidth(measureOutput, outerWidth, XIAOMI_ABOVE_750_WIDTH_DELTA);
        }
      }
    }

    private void processXiaoMiHeight(float lineHeight, float lineCount, MeasureOutput measureOutput) {
      if (lineHeight != 0 && lineCount != 0) {
        if (lineCount < XIAOMI_HEIGHT_THRESHOLD) {
          measureOutput.height += (lineCount / XIAOMI_HEIGHT_THRESHOLD) * lineHeight;
        } else {
          measureOutput.height += lineHeight;
        }
      }
    }

    private void processXiaoMiWidth(MeasureOutput measureOutput, float outerWidth, int
        widthDelta) {
      float width_pixel = measureOutput.width + widthDelta;
      if (Float.isNaN(outerWidth)) {
        measureOutput.width = width_pixel;
      } else if (outerWidth > width_pixel) {
        measureOutput.width = width_pixel;
      } else {
        measureOutput.width = outerWidth;
      }
    }

  };

  static {
    sTextPaintInstance.setFlags(TextPaint.ANTI_ALIAS_FLAG);
  }

  public Spanned mPreparedSpannedText;
  protected int mNumberOfLines = UNSET;
  protected int mFontSize = UNSET;
  private int mLineHeight = UNSET;
  private boolean mIsColorSet = false;
  private int mColor;
  private boolean mIsBackgroundColorSet = false;
  private int mBackgroundColor;
  /**
   * mFontStyle can be {@link Typeface#NORMAL} or {@link Typeface#ITALIC}.
   * mFontWeight can be {@link Typeface#NORMAL} or {@link Typeface#BOLD}.
   */
  private int mFontStyle = UNSET;
  private int mFontWeight = UNSET;
  private String mFontFamily = null;
  private String mText = null;
  private WXTextDecoration mTextDecoration = WXTextDecoration.NONE;

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
    initData();
    mPreparedSpannedText = fromTextCSSNode(this);
    super.dirty();
    super.layoutBefore();
  }

  @Override
  public Object getExtra() {
    return mPreparedSpannedText;
  }

  @Override
  public void updateAttr(Map<String, Object> attrs) {
    super.updateAttr(attrs);
    if (attrs.containsKey(WXDomPropConstant.WX_ATTR_VALUE)) {
      mText = WXAttr.getValue(attrs);
    }
  }

  @Override
  public void updateStyle(Map<String, Object> styles) {
    super.updateStyle(styles);
    update(styles);
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
      if (this.csslayout != null) {
        dom.csslayout.copy(this.csslayout);
      }
    } catch (Exception e) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.e("WXTextDomObject clone error: " + WXLogUtils.getStackTrace(e));
      }
    }
    dom.mPreparedSpannedText = mPreparedSpannedText;
    return dom;
  }

  private void initData() {
    update(style);
    if (attr != null) {
      mText = WXAttr.getValue(attr);
    }
  }

  protected static final Spanned fromTextCSSNode(WXTextDomObject textCSSNode) {
    SpannableStringBuilder sb = new SpannableStringBuilder();
    List<SetSpanOperation> ops = new ArrayList<SetSpanOperation>();
    buildSpannedFromTextCSSNode(textCSSNode, sb, ops);
    if (textCSSNode.mFontSize == UNSET) {
      sb.setSpan(
          new AbsoluteSizeSpan(WXText.sDEFAULT_SIZE), 0, sb
              .length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
    }
    for (int i = ops.size() - 1; i >= 0; i--) {
      SetSpanOperation op = ops.get(i);
      op.execute(sb);
    }
    return sb;
  }

  private void update(Map<String, Object> style) {
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
    }
  }

  private static final void buildSpannedFromTextCSSNode(
      WXTextDomObject textCSSNode, SpannableStringBuilder sb,
      List<SetSpanOperation> ops) {
    //Length of the text.
    int start = sb.length();
    if (textCSSNode.mText != null) {
      sb.append(textCSSNode.mText);
    }
    int end = sb.length();
    if (end >= start) {
      if (textCSSNode.mTextDecoration == WXTextDecoration.UNDERLINE) {
        ops.add(new SetSpanOperation(start, end,
                                     new UnderlineSpan()));
      }
      if (textCSSNode.mTextDecoration == WXTextDecoration.LINETHROUGH) {
        ops.add(new SetSpanOperation(start, end,
                                     new StrikethroughSpan()));
      }
      if (textCSSNode.mIsColorSet) {
        ops.add(new SetSpanOperation(start, end,
                                     new ForegroundColorSpan(textCSSNode.mColor)));
      }
      if (textCSSNode.mIsBackgroundColorSet) {
        ops.add(new SetSpanOperation(start, end,
                                     new BackgroundColorSpan(textCSSNode.mBackgroundColor)));
      }
      if (textCSSNode.mFontSize != UNSET) {
        ops.add(new SetSpanOperation(start, end, new AbsoluteSizeSpan(
            textCSSNode.mFontSize)));
      }
      if (textCSSNode.mFontStyle != UNSET
          || textCSSNode.mFontWeight != UNSET
          || textCSSNode.mFontFamily != null) {
        ops.add(new SetSpanOperation(start, end, new WXCustomStyleSpan(
            textCSSNode.mFontStyle, textCSSNode.mFontWeight,
            textCSSNode.mFontFamily)));
      }
      ops.add(new SetSpanOperation(start, end, new WXTagSpan(
          textCSSNode.ref)));
    }
  }

  private static class SetSpanOperation {

    protected int start, end;
    protected Object what;

    SetSpanOperation(int start, int end, Object what) {
      this.start = start;
      this.end = end;
      this.what = what;
    }

    public void execute(SpannableStringBuilder sb) {
      int spanFlags = Spannable.SPAN_EXCLUSIVE_INCLUSIVE;
      if (start == 0) {
        spanFlags = Spannable.SPAN_INCLUSIVE_INCLUSIVE;
      }
      sb.setSpan(what, start, end, spanFlags);
    }
  }
}
