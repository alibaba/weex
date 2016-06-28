/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved. <p/> This source code is licensed under
 * the BSD-style license found in the LICENSE file in the root directory of this source tree. An
 * additional grant of patent rights can be found in the PATENTS file in the same directory.
 */
package com.taobao.weex.dom.flex;

import java.util.Arrays;

import static com.taobao.weex.dom.flex.CSSLayout.DIMENSION_HEIGHT;
import static com.taobao.weex.dom.flex.CSSLayout.DIMENSION_WIDTH;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_BOTTOM;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_LEFT;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_RIGHT;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_TOP;

/**
 * The CSS style definition for a {@link CSSNode}.
 */
public class CSSStyle {

  public CSSDirection direction;
  public CSSFlexDirection flexDirection;
  public CSSJustify justifyContent;
  public CSSAlign alignContent;
  public CSSAlign alignItems;
  public CSSAlign alignSelf;
  public CSSPositionType positionType;
  public CSSWrap flexWrap;
  public float flex;

  public Spacing margin = new Spacing();
  public Spacing padding = new Spacing();
  public Spacing border = new Spacing();

  public float[] position = new float[4];
  public float[] dimensions = new float[2];

  public float minWidth = CSSConstants.UNDEFINED;
  public float minHeight = CSSConstants.UNDEFINED;

  public float maxWidth = CSSConstants.UNDEFINED;
  public float maxHeight = CSSConstants.UNDEFINED;

  CSSStyle() {
    reset();
  }

  void reset() {
    direction = CSSDirection.INHERIT;
    flexDirection = CSSFlexDirection.COLUMN;
    justifyContent = CSSJustify.FLEX_START;
    alignContent = CSSAlign.FLEX_START;
    alignItems = CSSAlign.STRETCH;
    alignSelf = CSSAlign.AUTO;
    positionType = CSSPositionType.RELATIVE;
    flexWrap = CSSWrap.NOWRAP;
    flex = 0f;

    margin.reset();
    padding.reset();
    border.reset();

    Arrays.fill(position, CSSConstants.UNDEFINED);
    Arrays.fill(dimensions, CSSConstants.UNDEFINED);

    minWidth = CSSConstants.UNDEFINED;
    minHeight = CSSConstants.UNDEFINED;

    maxWidth = CSSConstants.UNDEFINED;
    maxHeight = CSSConstants.UNDEFINED;
  }

  public void copy(CSSStyle cssStyle) {
    direction = cssStyle.direction;
    flexDirection = cssStyle.flexDirection;
    justifyContent = cssStyle.justifyContent;
    alignContent = cssStyle.alignContent;
    alignItems = cssStyle.alignItems;
    alignSelf = cssStyle.alignSelf;
    positionType = cssStyle.positionType;
    flexWrap = cssStyle.flexWrap;
    flex = cssStyle.flex;
    margin = cssStyle.margin;
    padding = cssStyle.padding;
    border = cssStyle.border;
    position[POSITION_TOP] = cssStyle.position[POSITION_TOP];
    position[POSITION_BOTTOM] = cssStyle.position[POSITION_BOTTOM];
    position[POSITION_LEFT] = cssStyle.position[POSITION_LEFT];
    position[POSITION_RIGHT] = cssStyle.position[POSITION_RIGHT];
    dimensions[DIMENSION_WIDTH] = cssStyle.dimensions[DIMENSION_WIDTH];
    dimensions[DIMENSION_HEIGHT] = cssStyle.dimensions[DIMENSION_HEIGHT];
    minWidth = cssStyle.minWidth;
    minHeight = cssStyle.minHeight;
    maxWidth = cssStyle.maxWidth;
    maxHeight = cssStyle.maxHeight;
  }

  public String toString() {
    return "direction =" + direction + "\n"
            + "flexDirection =" + flexDirection + "\n"
            + "justifyContent=" + justifyContent + "\n"
            + "alignContent =" + alignContent + "\n"
            + "alignItems =" + alignItems + "\n"
            + "alignSelf =" + alignSelf + "\n"
            + "positionType =" + positionType + "\n"
            + "flexWrap =" + flexWrap + "\n"
            + "flex =" + flex + "\n"
            + "margin =" + margin + "\n"
            + "padding =" + padding + "\n"
            + "border =" + border + "\n"
            + "position[POSITION_TOP] =" + position[POSITION_TOP] + "\n"
            + "position[POSITION_BOTTOM] =" + position[POSITION_BOTTOM] + "\n"
            + "position[POSITION_LEFT] =" + position[POSITION_LEFT] + "\n"
            + "position[POSITION_RIGHT] =" + position[POSITION_RIGHT] + "\n"
            + "position[DIMENSION_WIDTH] =" + position[DIMENSION_WIDTH] + "\n"
            + "position[DIMENSION_HEIGHT] =" + position[DIMENSION_HEIGHT] + "\n"
            + "minWidth =" + minWidth + "\n"
            + "minHeight =" + minHeight + "\n"
            + "maxWidth =" + maxWidth + "\n"
            + "maxHeight =" + maxHeight + "\n";
  }
}
