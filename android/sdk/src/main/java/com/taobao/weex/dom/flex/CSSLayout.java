/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved. <p/> This source code is licensed under
 * the BSD-style license found in the LICENSE file in the root directory of this source tree. An
 * additional grant of patent rights can be found in the PATENTS file in the same directory.
 */
package com.taobao.weex.dom.flex;

import java.util.Arrays;

/**
 * Where the output of {@link LayoutEngine#layoutNode(CSSLayoutContext, CSSNode, float,
 * CSSDirection)} will go in the CSSNode.
 */
public class CSSLayout {

  public static final int POSITION_LEFT = 0;
  public static final int POSITION_TOP = 1;
  public static final int POSITION_RIGHT = 2;
  public static final int POSITION_BOTTOM = 3;

  public static final int DIMENSION_WIDTH = 0;
  public static final int DIMENSION_HEIGHT = 1;

  public float[] position = new float[4];
  public float[] dimensions = new float[2];
  public CSSDirection direction = CSSDirection.LTR;

  /**
   * This should always get called before calling {@link LayoutEngine#layoutNode(CSSLayoutContext,
   * CSSNode, float, CSSDirection)}
   */
  public void resetResult() {
    Arrays.fill(position, 0);
    Arrays.fill(dimensions, CSSConstants.UNDEFINED);
    direction = CSSDirection.LTR;
  }

  public void copy(CSSLayout layout) {
    position[POSITION_LEFT] = layout.position[POSITION_LEFT];
    position[POSITION_TOP] = layout.position[POSITION_TOP];
    position[POSITION_RIGHT] = layout.position[POSITION_RIGHT];
    position[POSITION_BOTTOM] = layout.position[POSITION_BOTTOM];
    dimensions[DIMENSION_WIDTH] = layout.dimensions[DIMENSION_WIDTH];
    dimensions[DIMENSION_HEIGHT] = layout.dimensions[DIMENSION_HEIGHT];
    direction = layout.direction;
  }

  @Override
  public String toString() {
    return "layout: {" +
           "left: " + position[POSITION_LEFT] + ", " +
           "top: " + position[POSITION_TOP] + ", " +
           "width: " + dimensions[DIMENSION_WIDTH] + ", " +
           "height: " + dimensions[DIMENSION_HEIGHT] + ", " +
           "direction: " + direction +
           "}";
  }

  @Override
  public boolean equals(Object o) {
    if(this == o){
      return true;
    }
    if(o instanceof CSSLayout){
      CSSLayout cl = (CSSLayout)o;
      return FloatUtil.floatsEqual(cl.position[POSITION_LEFT],this.position[POSITION_LEFT]) &&
              FloatUtil.floatsEqual(cl.position[POSITION_TOP],this.position[POSITION_TOP])  &&
              FloatUtil.floatsEqual(cl.position[POSITION_RIGHT],this.position[POSITION_RIGHT]) &&
              FloatUtil.floatsEqual(cl.position[POSITION_BOTTOM],this.position[POSITION_BOTTOM]) &&
              FloatUtil.floatsEqual(cl.dimensions[DIMENSION_HEIGHT],this.dimensions[DIMENSION_HEIGHT]) &&
              FloatUtil.floatsEqual(cl.dimensions[DIMENSION_WIDTH],this.dimensions[DIMENSION_WIDTH]);

    }
    return false;
  }
}
