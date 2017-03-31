/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved. <p/> This source code is licensed under
 * the BSD-cssstyle license found in the LICENSE file in the root directory of this source tree. An
 * additional grant of patent rights can be found in the PATENTS file in the same directory.
 */
package com.taobao.weex.dom.flex;

//import javax.annotation.Nullable;

import java.util.ArrayList;

import static com.taobao.weex.dom.flex.CSSLayout.DIMENSION_HEIGHT;
import static com.taobao.weex.dom.flex.CSSLayout.DIMENSION_WIDTH;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_BOTTOM;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_LEFT;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_RIGHT;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_TOP;

//import com.facebook.infer.annotation.Assertions;

/**
 * A CSS Node. It has a cssstyle object you can manipulate at {@link #cssstyle}. After calling
 * {@link #calculateLayout(CSSLayoutContext)}, {@link #csslayout} will be filled with the results of
 * the csslayout.
 */
public class CSSNode {

  // VisibleForTesting
  /*package*/public final CSSStyle cssstyle = new CSSStyle();
  /*package*/ public final CSSLayout csslayout = new CSSLayout();
  /*package*/ final CachedCSSLayout lastLayout = new CachedCSSLayout();
  public int lineIndex = 0;
  /*package*/ CSSNode nextAbsoluteChild;
  /*package*/ CSSNode nextFlexChild;
  private ArrayList<CSSNode> mChildren;
  private CSSNode mParent;
  private MeasureFunction mMeasureFunction = null;
  private LayoutState mLayoutState = LayoutState.DIRTY;
  private boolean mShow = true;

  private boolean mIsLayoutChanged = true;

  public boolean isShow() {
    return mShow;
  }

  public void setVisible(boolean isShow) {
    if (!mShow && isShow) {
      mLayoutState = LayoutState.UP_TO_DATE;
    }
    mShow = isShow;
    dirty();
  }

  /**
   * whether layout changed when {@link #updateLastLayout(CSSLayout)} invoked last time.
   * @return
     */
  public boolean isLayoutChanged(){
    return mIsLayoutChanged;
  }

  /**
   * must invoke after every layout finished,even nothing changed.
   * @param newLayout
   * @return
     */
  public boolean updateLastLayout(CSSLayout newLayout){
    mIsLayoutChanged = !lastLayout.equals(newLayout);
    if(mIsLayoutChanged) {
      lastLayout.copy(newLayout);
    }
    return mIsLayoutChanged;
  }

  public int getChildCount() {
    return mChildren == null ? 0 : mChildren.size();
  }

  public CSSNode getChildAt(int i) {
    //    Assertions.assertNotNull(mChildren);
    return mChildren.get(i);
  }

  public void addChildAt(CSSNode child, int i) {
    if (child.mParent != null) {
      throw new IllegalStateException("Child already has a parent, it must be removed first.");
    }
    if (mChildren == null) {
      // 4 is kinda arbitrary, but the default of 10 seems really high for an average View.
      mChildren = new ArrayList<CSSNode>(4);
    }

    mChildren.add(i, child);
    child.mParent = this;
    dirty();
  }

  public CSSNode removeChildAt(int i) {
    //    Assertions.assertNotNull(mChildren);
    CSSNode removed = mChildren.remove(i);
    removed.mParent = null;
    dirty();
    return removed;
  }

  public void setParentNull() {
    mParent = null;
  }

  public CSSNode getParent() {
    return mParent;
  }

  /**
   * @return the index of the given child, or -1 if the child doesn't exist in this node.
   */
  public int indexOf(CSSNode child) {
    //    Assertions.assertNotNull(mChildren);
    return mChildren.indexOf(child);
  }

  public void setMeasureFunction(MeasureFunction measureFunction) {
    if (mMeasureFunction != measureFunction) {
      mMeasureFunction = measureFunction;
      dirty();
    }
  }

  /*package*/ MeasureOutput measure(MeasureOutput measureOutput, float width) {
    if (!isMeasureDefined()) {
      throw new RuntimeException("Measure function isn't defined!");
    }
    measureOutput.height = CSSConstants.UNDEFINED;
    measureOutput.width = CSSConstants.UNDEFINED;
    if (mMeasureFunction != null) {
      mMeasureFunction.measure(this, width, measureOutput);
    }
    //    Assertions.assertNotNull(mMeasureFunction).measure(this, width, measureOutput);
    return measureOutput;
  }

  public boolean isMeasureDefined() {
    return mMeasureFunction != null;
  }

  /**
   * Performs the actual csslayout and saves the results in {@link #csslayout}
   */
  public void calculateLayout(CSSLayoutContext layoutContext) {
    csslayout.resetResult();
    LayoutEngine.layoutNode(layoutContext, this, CSSConstants.UNDEFINED, null);
  }

  /**
   * See {@link LayoutState#DIRTY}.
   */
  protected boolean isDirty() {
    return mLayoutState == LayoutState.DIRTY;
  }

  protected void dirty() {
    if (mLayoutState == LayoutState.DIRTY) {
      return;
    } else if (mLayoutState == LayoutState.HAS_NEW_LAYOUT) {
      throw new IllegalStateException("Previous csslayout was ignored! markLayoutSeen() never called");
    }

    mLayoutState = LayoutState.DIRTY;

    if (mParent != null) {
      mParent.dirty();
    }
  }

  /*package*/ void markHasNewLayout() {
    mLayoutState = LayoutState.HAS_NEW_LAYOUT;
  }

  /**
   * Tells the node that the current values in {@link #csslayout} have been seen. Subsequent calls
   * to {@link #hasNewLayout()} will return false until this node is laid out with new parameters.
   * You must call this each time the csslayout is generated if the node has a new csslayout.
   */
  public void markLayoutSeen() {
    if (!hasNewLayout()) {
      throw new IllegalStateException("Expected node to have a new csslayout to be seen!");
    }

    mLayoutState = LayoutState.UP_TO_DATE;
  }

  /**
   * See {@link LayoutState#HAS_NEW_LAYOUT}.
   */
  public boolean hasNewLayout() {
    return mLayoutState == LayoutState.HAS_NEW_LAYOUT;
  }

  private void toStringWithIndentation(StringBuilder result, int level) {
    // Spaces and tabs are dropped by IntelliJ logcat integration, so rely on __ instead.
    StringBuilder indentation = new StringBuilder();
    for (int i = 0; i < level; ++i) {
      indentation.append("__");
    }

    result.append(indentation.toString());
    result.append(csslayout.toString());
    result.append(cssstyle.toString());

    if (getChildCount() == 0) {
      return;
    }

    result.append(", children: [\n");
    for (int i = 0; i < getChildCount(); i++) {
      getChildAt(i).toStringWithIndentation(result, level + 1);
      result.append("\n");
    }
    result.append(indentation + "]");
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    this.toStringWithIndentation(sb, 0);
    return sb.toString();
  }

  protected boolean valuesEqual(float f1, float f2) {
    return FloatUtil.floatsEqual(f1, f2);
  }

  /**
   * Get this node's direction, as defined in the cssstyle.
   */
  public CSSDirection getStyleDirection() {
    return cssstyle.direction;
  }

  public void setDirection(CSSDirection direction) {
    if (cssstyle.direction != direction) {
      cssstyle.direction = direction;
      dirty();
    }
  }

  /**
   * Get this node's flex direction, as defined by cssstyle.
   */
  public CSSFlexDirection getFlexDirection() {
    return cssstyle.flexDirection;
  }

  public void setFlexDirection(CSSFlexDirection flexDirection) {
    if (cssstyle.flexDirection != flexDirection) {
      cssstyle.flexDirection = flexDirection;
      dirty();
    }
  }

  /**
   * Get this node's justify content, as defined by cssstyle.
   */
  public CSSJustify getJustifyContent() {
    return cssstyle.justifyContent;
  }

  public void setJustifyContent(CSSJustify justifyContent) {
    if (cssstyle.justifyContent != justifyContent) {
      cssstyle.justifyContent = justifyContent;
      dirty();
    }
  }

  /**
   * Get this node's align items, as defined by cssstyle.
   */
  public CSSAlign getAlignItems() {
    return cssstyle.alignItems;
  }

  public void setAlignItems(CSSAlign alignItems) {
    if (cssstyle.alignItems != alignItems) {
      cssstyle.alignItems = alignItems;
      dirty();
    }
  }

  /**
   * Get this node's align items, as defined by cssstyle.
   */
  public CSSAlign getAlignSelf() {
    return cssstyle.alignSelf;
  }

  public void setAlignSelf(CSSAlign alignSelf) {
    if (cssstyle.alignSelf != alignSelf) {
      cssstyle.alignSelf = alignSelf;
      dirty();
    }
  }

  /**
   * Get this node's position type, as defined by cssstyle.
   */
  public CSSPositionType getPositionType() {
    return cssstyle.positionType;
  }

  public void setPositionType(CSSPositionType positionType) {
    if (cssstyle.positionType != positionType) {
      cssstyle.positionType = positionType;
      dirty();
    }
  }

  public void setWrap(CSSWrap flexWrap) {
    if (cssstyle.flexWrap != flexWrap) {
      cssstyle.flexWrap = flexWrap;
      dirty();
    }
  }

  /**
   * Get this node's flex, as defined by cssstyle.
   */
  public float getFlex() {
    return cssstyle.flex;
  }

  public void setFlex(float flex) {
    if (!valuesEqual(cssstyle.flex, flex)) {
      cssstyle.flex = flex;
      dirty();
    }
  }

  /**
   * Get this node's margin, as defined by cssstyle + default margin.
   */
  public Spacing getMargin() {
    return cssstyle.margin;
  }

  public void setMargin(int spacingType, float margin) {
    if (cssstyle.margin.set(spacingType, margin)) {
      dirty();
    }
  }

  public void setMinWidth(float minWidth) {
    if (!valuesEqual(cssstyle.minWidth, minWidth)) {
      cssstyle.minWidth = minWidth;
      dirty();
    }
  }

  public void setMaxWidth(float maxWidth) {
    if (!valuesEqual(cssstyle.maxWidth, maxWidth)) {
      cssstyle.maxWidth = maxWidth;
      dirty();
    }
  }

  public void setMinHeight(float minHeight) {
    if (!valuesEqual(cssstyle.minHeight, minHeight)) {
      cssstyle.minHeight = minHeight;
      dirty();
    }
  }

  public void setMaxHeight(float maxHeight) {
    if (!valuesEqual(cssstyle.maxHeight, maxHeight)) {
      cssstyle.maxHeight = maxHeight;
      dirty();
    }
  }

  /**
   * Get this node's padding, as defined by cssstyle + default padding.
   */
  public Spacing getPadding() {
    return cssstyle.padding;
  }

  public void setPadding(int spacingType, float padding) {
    if (cssstyle.padding.set(spacingType, padding)) {
      dirty();
    }
  }

  /**
   * Get this node's border, as defined by cssstyle.
   */
  public Spacing getBorder() {
    return cssstyle.border;
  }

  public void setBorder(int spacingType, float border) {
    if (cssstyle.border.set(spacingType, border)) {
      dirty();
    }
  }

  /**
   * Get this node's position top, as defined by cssstyle.
   */
  public float getPositionTop() {
    return cssstyle.position[POSITION_TOP];
  }

  public void setPositionTop(float positionTop) {
    if (!valuesEqual(cssstyle.position[POSITION_TOP], positionTop)) {
      cssstyle.position[POSITION_TOP] = positionTop;
      dirty();
    }
  }

  /**
   * Get this node's position bottom, as defined by cssstyle.
   */
  public float getPositionBottom() {
    return cssstyle.position[POSITION_BOTTOM];
  }

  public void setPositionBottom(float positionBottom) {
    if (!valuesEqual(cssstyle.position[POSITION_BOTTOM], positionBottom)) {
      cssstyle.position[POSITION_BOTTOM] = positionBottom;
      dirty();
    }
  }

  /**
   * Get this node's position left, as defined by cssstyle.
   */
  public float getPositionLeft() {
    return cssstyle.position[POSITION_LEFT];
  }

  public void setPositionLeft(float positionLeft) {
    if (!valuesEqual(cssstyle.position[POSITION_LEFT], positionLeft)) {
      cssstyle.position[POSITION_LEFT] = positionLeft;
      dirty();
    }
  }

  /**
   * Get this node's position right, as defined by cssstyle.
   */
  public float getPositionRight() {
    return cssstyle.position[POSITION_RIGHT];
  }

  public void setPositionRight(float positionRight) {
    if (!valuesEqual(cssstyle.position[POSITION_RIGHT], positionRight)) {
      cssstyle.position[POSITION_RIGHT] = positionRight;
      dirty();
    }
  }

  /**
   * Get this node's width, as defined in the cssstyle.
   */
  public float getStyleWidth() {
    return cssstyle.dimensions[DIMENSION_WIDTH];
  }

  public void setStyleWidth(float width) {
    if (!valuesEqual(cssstyle.dimensions[DIMENSION_WIDTH], width)) {
      cssstyle.dimensions[DIMENSION_WIDTH] = width;
      dirty();
    }
  }

  /**
   * Get this node's height, as defined in the cssstyle.
   */
  public float getStyleHeight() {
    return cssstyle.dimensions[DIMENSION_HEIGHT];
  }

  public void setStyleHeight(float height) {
    if (!valuesEqual(cssstyle.dimensions[DIMENSION_HEIGHT], height)) {
      cssstyle.dimensions[DIMENSION_HEIGHT] = height;
      dirty();
    }
  }

  public float getLayoutX() {
    return csslayout.position[POSITION_LEFT];
  }

  public void setLayoutX(float x) {
    csslayout.position[POSITION_LEFT] = x;
  }

  public float getLayoutY() {
    return csslayout.position[POSITION_TOP];
  }

  public void setLayoutY(float y) {
    csslayout.position[POSITION_TOP] = y;
  }

  public float getLayoutWidth() {
    return csslayout.dimensions[DIMENSION_WIDTH];
  }

  public void setLayoutWidth(float width) {
    csslayout.dimensions[DIMENSION_WIDTH] = width;
  }

  public float getLayoutHeight() {
    return csslayout.dimensions[DIMENSION_HEIGHT];
  }

  public void setLayoutHeight(float height) {
    csslayout.dimensions[DIMENSION_HEIGHT] = height;
  }

  public CSSDirection getLayoutDirection() {
    return csslayout.direction;
  }

  /**
   * Set a default padding (left/top/right/bottom) for this node.
   */
  public void setDefaultPadding(int spacingType, float padding) {
    if (cssstyle.padding.setDefault(spacingType, padding)) {
      dirty();
    }
  }

  /**
   * Resets this instance to its default state. This method is meant to be used when recycling
   * {@link CSSNode} instances.
   */
  public void reset() {
    if (mParent != null || (mChildren != null && mChildren.size() > 0)) {
      throw new IllegalStateException("You should not reset an attached CSSNode");
    }

    cssstyle.reset();
    csslayout.resetResult();
    lineIndex = 0;
    mLayoutState = LayoutState.DIRTY;
  }

  private static enum LayoutState {
    /**
     * Some property of this node or its children has changes and the current values in {@link
     * #csslayout} are not valid.
     */
    DIRTY,

    /**
     * This node has a new csslayout relative to the last time {@link #markLayoutSeen()} was
     * called.
     */
    HAS_NEW_LAYOUT,

    /**
     * {@link #csslayout} is valid for the node's properties and this csslayout has been marked as
     * having been seen.
     */
    UP_TO_DATE,
  }

  public static interface MeasureFunction {

    /**
     * Should measure the given node and put the result in the given MeasureOutput.
     * NB: measure is NOT guaranteed to be threadsafe/re-entrant safe!
     */
    public void measure(CSSNode node, float width, MeasureOutput measureOutput);
  }

  public float getCSSLayoutHeight() {
    return csslayout.dimensions[CSSLayout.DIMENSION_HEIGHT];
  }

  public float getCSSLayoutWidth() {
    return csslayout.dimensions[CSSLayout.DIMENSION_WIDTH];
  }

  public float getCSSLayoutTop() {
    return csslayout.position[CSSLayout.POSITION_TOP];
  }

  public float getCSSLayoutBottom() {
    return csslayout.position[CSSLayout.POSITION_BOTTOM];
  }

  public float getCSSLayoutLeft() {
    return csslayout.position[CSSLayout.POSITION_LEFT];
  }

  public float getCSSLayoutRight() {
    return csslayout.position[CSSLayout.POSITION_RIGHT];
  }
}
