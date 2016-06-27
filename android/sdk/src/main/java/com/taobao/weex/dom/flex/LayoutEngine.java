/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved. <p/> This source code is licensed under
 * the BSD-cssstyle license found in the LICENSE file in the root directory of this source tree. An
 * additional grant of patent rights can be found in the PATENTS file in the same directory.
 */
package com.taobao.weex.dom.flex;

import static com.taobao.weex.dom.flex.CSSLayout.DIMENSION_HEIGHT;
import static com.taobao.weex.dom.flex.CSSLayout.DIMENSION_WIDTH;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_BOTTOM;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_LEFT;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_RIGHT;
import static com.taobao.weex.dom.flex.CSSLayout.POSITION_TOP;

/**
 * Calculates layouts based on CSS cssstyle. See {@link #layoutNode(CSSLayoutContext, CSSNode,
 * float, CSSDirection)}.
 */
public class LayoutEngine {

  private static final int CSS_FLEX_DIRECTION_COLUMN =
      CSSFlexDirection.COLUMN.ordinal();
  private static final int CSS_FLEX_DIRECTION_COLUMN_REVERSE =
      CSSFlexDirection.COLUMN_REVERSE.ordinal();
  private static final int CSS_FLEX_DIRECTION_ROW =
      CSSFlexDirection.ROW.ordinal();
  private static final int CSS_FLEX_DIRECTION_ROW_REVERSE =
      CSSFlexDirection.ROW_REVERSE.ordinal();

  private static final int CSS_POSITION_RELATIVE = CSSPositionType.RELATIVE.ordinal();
  private static final int CSS_POSITION_ABSOLUTE = CSSPositionType.ABSOLUTE.ordinal();

  private static final int[] leading = {
      POSITION_TOP,
      POSITION_BOTTOM,
      POSITION_LEFT,
      POSITION_RIGHT,
  };

  private static final int[] trailing = {
      POSITION_BOTTOM,
      POSITION_TOP,
      POSITION_RIGHT,
      POSITION_LEFT,
  };

  private static final int[] pos = {
      POSITION_TOP,
      POSITION_BOTTOM,
      POSITION_LEFT,
      POSITION_RIGHT,
  };

  private static final int[] dim = {
      DIMENSION_HEIGHT,
      DIMENSION_HEIGHT,
      DIMENSION_WIDTH,
      DIMENSION_WIDTH,
  };

  private static final int[] leadingSpacing = {
      Spacing.TOP,
      Spacing.BOTTOM,
      Spacing.START,
      Spacing.START
  };

  private static final int[] trailingSpacing = {
      Spacing.BOTTOM,
      Spacing.TOP,
      Spacing.END,
      Spacing.END
  };

  private static float boundAxis(CSSNode node, int axis, float value) {
    float min = CSSConstants.UNDEFINED;
    float max = CSSConstants.UNDEFINED;

    if (axis == CSS_FLEX_DIRECTION_COLUMN ||
        axis == CSS_FLEX_DIRECTION_COLUMN_REVERSE) {
      min = node.cssstyle.minHeight;
      max = node.cssstyle.maxHeight;
    } else if (axis == CSS_FLEX_DIRECTION_ROW ||
               axis == CSS_FLEX_DIRECTION_ROW_REVERSE) {
      min = node.cssstyle.minWidth;
      max = node.cssstyle.maxWidth;
    }

    float boundValue = value;

    if (!Float.isNaN(max) && max >= 0.0 && boundValue > max) {
      boundValue = max;
    }
    if (!Float.isNaN(min) && min >= 0.0 && boundValue < min) {
      boundValue = min;
    }

    return boundValue;
  }

  private static void setDimensionFromStyle(CSSNode node, int axis) {
    // The parent already computed us a width or height. We just skip it
    if (!Float.isNaN(node.csslayout.dimensions[dim[axis]])) {
      return;
    }
    // We only run if there's a width or height defined
    if (Float.isNaN(node.cssstyle.dimensions[dim[axis]]) ||
        node.cssstyle.dimensions[dim[axis]] <= 0.0) {
      return;
    }

    // The dimensions can never be smaller than the padding and border
    float maxLayoutDimension = Math.max(
        boundAxis(node, axis, node.cssstyle.dimensions[dim[axis]]),
        node.cssstyle.padding.getWithFallback(leadingSpacing[axis], leading[axis]) +
        node.cssstyle.padding.getWithFallback(trailingSpacing[axis], trailing[axis]) +
        node.cssstyle.border.getWithFallback(leadingSpacing[axis], leading[axis]) +
        node.cssstyle.border.getWithFallback(trailingSpacing[axis], trailing[axis]));
    node.csslayout.dimensions[dim[axis]] = maxLayoutDimension;
  }

  private static float getRelativePosition(CSSNode node, int axis) {
    float lead = node.cssstyle.position[leading[axis]];
    if (!Float.isNaN(lead)) {
      return lead;
    }

    float trailingPos = node.cssstyle.position[trailing[axis]];
    return Float.isNaN(trailingPos) ? 0 : -trailingPos;
  }

  private static int resolveAxis(
      int axis,
      CSSDirection direction) {
    if (direction == CSSDirection.RTL) {
      if (axis == CSS_FLEX_DIRECTION_ROW) {
        return CSS_FLEX_DIRECTION_ROW_REVERSE;
      } else if (axis == CSS_FLEX_DIRECTION_ROW_REVERSE) {
        return CSS_FLEX_DIRECTION_ROW;
      }
    }

    return axis;
  }

  private static CSSDirection resolveDirection(CSSNode node, CSSDirection parentDirection) {
    CSSDirection direction = node.cssstyle.direction;
    if (direction == CSSDirection.INHERIT) {
      direction = (parentDirection == null ? CSSDirection.LTR : parentDirection);
    }

    return direction;
  }

  private static int getFlexDirection(CSSNode node) {
    return node.cssstyle.flexDirection.ordinal();
  }

  private static int getCrossFlexDirection(
      int axis,
      CSSDirection direction) {
    if (axis == CSS_FLEX_DIRECTION_COLUMN ||
        axis == CSS_FLEX_DIRECTION_COLUMN_REVERSE) {
      return resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);
    } else {
      return CSS_FLEX_DIRECTION_COLUMN;
    }
  }

  private static CSSAlign getAlignItem(CSSNode node, CSSNode child) {
    if (child.cssstyle.alignSelf != CSSAlign.AUTO) {
      return child.cssstyle.alignSelf;
    }
    return node.cssstyle.alignItems;
  }

  private static boolean isMeasureDefined(CSSNode node) {
    return node.isMeasureDefined();
  }

  static boolean needsRelayout(CSSNode node, float parentMaxWidth) {
    return node.isDirty() ||
           !FloatUtil.floatsEqual(
               node.lastLayout.requestedHeight,
               node.csslayout.dimensions[DIMENSION_HEIGHT]) ||
           !FloatUtil.floatsEqual(
               node.lastLayout.requestedWidth,
               node.csslayout.dimensions[DIMENSION_WIDTH]) ||
           !FloatUtil.floatsEqual(node.lastLayout.parentMaxWidth, parentMaxWidth);
  }

  /*package*/
  static void layoutNode(
      CSSLayoutContext layoutContext,
      CSSNode node,
      float parentMaxWidth,
      CSSDirection parentDirection) {
    if (needsRelayout(node, parentMaxWidth)) {
      node.lastLayout.requestedWidth = node.csslayout.dimensions[DIMENSION_WIDTH];
      node.lastLayout.requestedHeight = node.csslayout.dimensions[DIMENSION_HEIGHT];
      node.lastLayout.parentMaxWidth = parentMaxWidth;

      layoutNodeImpl(layoutContext, node, parentMaxWidth, parentDirection);
      node.updateLastLayout(node.csslayout);
    } else {
      node.csslayout.copy(node.lastLayout);
      node.updateLastLayout(node.lastLayout);//nothing changed
    }

    node.markHasNewLayout();
  }

  private static void layoutNodeImpl(
      CSSLayoutContext layoutContext,
      CSSNode node,
      float parentMaxWidth,
      CSSDirection parentDirection) {
    for (int i = 0, childCount = node.getChildCount(); i < childCount; i++) {
      node.getChildAt(i).csslayout.resetResult();
    }
    if (!node.isShow()) {
      return;
    }

    /** START_GENERATED **/

    CSSDirection direction = resolveDirection(node, parentDirection);
    int mainAxis = resolveAxis(getFlexDirection(node), direction);
    int crossAxis = getCrossFlexDirection(mainAxis, direction);
    int resolvedRowAxis = resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);

    // Handle width and height cssstyle attributes
    setDimensionFromStyle(node, mainAxis);
    setDimensionFromStyle(node, crossAxis);

    // Set the resolved resolution in the node's csslayout
    node.csslayout.direction = direction;

    // The position is set by the parent, but we need to complete it with a
    // delta composed of the margin and left/top/right/bottom
    node.csslayout.position[leading[mainAxis]] += node.cssstyle.margin.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) +
                                                  getRelativePosition(node, mainAxis);
    node.csslayout.position[trailing[mainAxis]] += node.cssstyle.margin.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]) +
                                                   getRelativePosition(node, mainAxis);
    node.csslayout.position[leading[crossAxis]] += node.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) +
                                                   getRelativePosition(node, crossAxis);
    node.csslayout.position[trailing[crossAxis]] += node.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]) +
                                                    getRelativePosition(node, crossAxis);

    // Inline immutable values from the target node to avoid excessive method
    // invocations during the csslayout calculation.
    int childCount = node.getChildCount();
    float paddingAndBorderAxisResolvedRow = ((node.cssstyle.padding.getWithFallback(leadingSpacing[resolvedRowAxis], leading[resolvedRowAxis]) +
                                              node.cssstyle.border.getWithFallback(leadingSpacing[resolvedRowAxis], leading[resolvedRowAxis])) +
                                             (node.cssstyle.padding.getWithFallback(trailingSpacing[resolvedRowAxis], trailing[resolvedRowAxis]) +
                                              node.cssstyle.border.getWithFallback(trailingSpacing[resolvedRowAxis], trailing[resolvedRowAxis])));

    if (isMeasureDefined(node)) {
      boolean isResolvedRowDimDefined = !Float.isNaN(node.csslayout.dimensions[dim[resolvedRowAxis]]);

      float width = CSSConstants.UNDEFINED;
      if ((!Float.isNaN(node.cssstyle.dimensions[dim[resolvedRowAxis]]) && node.cssstyle.dimensions[dim[resolvedRowAxis]] >= 0.0)) {
        width = node.cssstyle.dimensions[DIMENSION_WIDTH];
      } else if (isResolvedRowDimDefined) {
        width = node.csslayout.dimensions[dim[resolvedRowAxis]];
      } else {
        width = parentMaxWidth -
                (node.cssstyle.margin.getWithFallback(leadingSpacing[resolvedRowAxis], leading[resolvedRowAxis]) + node.cssstyle.margin.getWithFallback(trailingSpacing[resolvedRowAxis], trailing[resolvedRowAxis]));
      }
      width -= paddingAndBorderAxisResolvedRow;

      // We only need to give a dimension for the text if we haven't got any
      // for it computed yet. It can either be from the cssstyle attribute or because
      // the element is flexible.
      boolean isRowUndefined = !(!Float.isNaN(node.cssstyle.dimensions[dim[resolvedRowAxis]]) && node.cssstyle.dimensions[dim[resolvedRowAxis]] >= 0.0) && !isResolvedRowDimDefined;
      boolean isColumnUndefined = !(!Float.isNaN(node.cssstyle.dimensions[dim[CSS_FLEX_DIRECTION_COLUMN]]) && node.cssstyle.dimensions[dim[CSS_FLEX_DIRECTION_COLUMN]] >= 0.0) &&
                                  Float.isNaN(node.csslayout.dimensions[dim[CSS_FLEX_DIRECTION_COLUMN]]);

      // Let's not measure the text if we already know both dimensions
      if (isRowUndefined || isColumnUndefined) {
        MeasureOutput measureDim = node.measure(

            layoutContext.measureOutput,
            width
                                               );
        if (isRowUndefined) {
          node.csslayout.dimensions[DIMENSION_WIDTH] = measureDim.width +
                                                       paddingAndBorderAxisResolvedRow;
        }
        if (isColumnUndefined) {
          node.csslayout.dimensions[DIMENSION_HEIGHT] = measureDim.height +
                                                        ((node.cssstyle.padding.getWithFallback(leadingSpacing[CSS_FLEX_DIRECTION_COLUMN], leading[CSS_FLEX_DIRECTION_COLUMN]) + node.cssstyle.border.getWithFallback(leadingSpacing[CSS_FLEX_DIRECTION_COLUMN], leading[CSS_FLEX_DIRECTION_COLUMN])) + (node.cssstyle.padding.getWithFallback(trailingSpacing[CSS_FLEX_DIRECTION_COLUMN], trailing[CSS_FLEX_DIRECTION_COLUMN]) + node.cssstyle.border.getWithFallback(trailingSpacing[CSS_FLEX_DIRECTION_COLUMN], trailing[CSS_FLEX_DIRECTION_COLUMN])));
        }
      }
      if (childCount == 0) {
        return;
      }
    }

    boolean isNodeFlexWrap = (node.cssstyle.flexWrap == CSSWrap.WRAP);

    CSSJustify justifyContent = node.cssstyle.justifyContent;

    float leadingPaddingAndBorderMain = (node.cssstyle.padding.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + node.cssstyle.border.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]));
    float leadingPaddingAndBorderCross = (node.cssstyle.padding.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + node.cssstyle.border.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]));
    float paddingAndBorderAxisMain = ((node.cssstyle.padding.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + node.cssstyle.border.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis])) + (node.cssstyle.padding.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]) + node.cssstyle.border.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis])));
    float paddingAndBorderAxisCross = ((node.cssstyle.padding.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + node.cssstyle.border.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis])) + (node.cssstyle.padding.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]) + node.cssstyle.border.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis])));

    boolean isMainDimDefined = !Float.isNaN(node.csslayout.dimensions[dim[mainAxis]]);
    boolean isCrossDimDefined = !Float.isNaN(node.csslayout.dimensions[dim[crossAxis]]);
    boolean isMainRowDirection = (mainAxis == CSS_FLEX_DIRECTION_ROW || mainAxis == CSS_FLEX_DIRECTION_ROW_REVERSE);

    int i;
    int ii;
    CSSNode child;
    int axis;

    CSSNode firstAbsoluteChild = null;
    CSSNode currentAbsoluteChild = null;

    float definedMainDim = CSSConstants.UNDEFINED;
    if (isMainDimDefined) {
      definedMainDim = node.csslayout.dimensions[dim[mainAxis]] - paddingAndBorderAxisMain;
    }

    // We want to execute the next two loops one per line with flex-wrap
    int startLine = 0;
    int endLine = 0;
    // int nextOffset = 0;
    int alreadyComputedNextLayout = 0;
    // We aggregate the total dimensions of the container in those two variables
    float linesCrossDim = 0;
    float linesMainDim = 0;
    int linesCount = 0;
    while (endLine < childCount) {
      // <Loop A> Layout non flexible children and count children by type

      // mainContentDim is accumulation of the dimensions and margin of all the
      // non flexible children. This will be used in order to either set the
      // dimensions of the node if none already exist, or to compute the
      // remaining space left for the flexible children.
      float mainContentDim = 0;

      // There are three kind of children, non flexible, flexible and absolute.
      // We need to know how many there are in order to distribute the space.
      int flexibleChildrenCount = 0;
      float totalFlexible = 0;
      int nonFlexibleChildrenCount = 0;

      // Use the line loop to position children in the main axis for as long
      // as they are using a simple stacking behaviour. Children that are
      // immediately stacked in the initial loop will not be touched again
      // in <Loop C>.
      boolean isSimpleStackMain =
          (isMainDimDefined && justifyContent == CSSJustify.FLEX_START) ||
          (!isMainDimDefined && justifyContent != CSSJustify.CENTER);
      int firstComplexMain = (isSimpleStackMain ? childCount : startLine);

      // Use the initial line loop to position children in the cross axis for
      // as long as they are relatively positioned with alignment STRETCH or
      // FLEX_START. Children that are immediately stacked in the initial loop
      // will not be touched again in <Loop D>.
      boolean isSimpleStackCross = true;
      int firstComplexCross = childCount;

      CSSNode firstFlexChild = null;
      CSSNode currentFlexChild = null;

      float mainDim = leadingPaddingAndBorderMain;
      float crossDim = 0;

      float maxWidth;
      for (i = startLine; i < childCount; ++i) {
        child = node.getChildAt(i);
        if (!child.isShow()) {
          endLine = i + 1;
          continue;
        }
        child.lineIndex = linesCount;

        child.nextAbsoluteChild = null;
        child.nextFlexChild = null;

        CSSAlign alignItem = getAlignItem(node, child);

        // Pre-fill cross axis dimensions when the child is using stretch before
        // we call the recursive csslayout pass
        if (alignItem == CSSAlign.STRETCH &&
            child.cssstyle.positionType == CSSPositionType.RELATIVE &&
            isCrossDimDefined &&
            !(!Float.isNaN(child.cssstyle.dimensions[dim[crossAxis]]) && child.cssstyle.dimensions[dim[crossAxis]] >= 0.0)) {
          child.csslayout.dimensions[dim[crossAxis]] = Math.max(
              boundAxis(child, crossAxis, node.csslayout.dimensions[dim[crossAxis]] -
                                          paddingAndBorderAxisCross - (child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]))),
              // You never want to go smaller than padding
              ((child.cssstyle.padding.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.border.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis])) + (child.cssstyle.padding.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]) + child.cssstyle.border.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis])))
                                                               );
        } else if (child.cssstyle.positionType == CSSPositionType.ABSOLUTE) {
          // Store a private linked list of absolutely positioned children
          // so that we can efficiently traverse them later.
          if (firstAbsoluteChild == null) {
            firstAbsoluteChild = child;
          }
          if (currentAbsoluteChild != null) {
            currentAbsoluteChild.nextAbsoluteChild = child;
          }
          currentAbsoluteChild = child;

          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii != 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;
            if (!Float.isNaN(node.csslayout.dimensions[dim[axis]]) &&
                !(!Float.isNaN(child.cssstyle.dimensions[dim[axis]]) && child.cssstyle.dimensions[dim[axis]] >= 0.0) &&
                !Float.isNaN(child.cssstyle.position[leading[axis]]) &&
                !Float.isNaN(child.cssstyle.position[trailing[axis]])) {
              child.csslayout.dimensions[dim[axis]] = Math.max(
                  boundAxis(child, axis, node.csslayout.dimensions[dim[axis]] -
                                         ((node.cssstyle.padding.getWithFallback(leadingSpacing[axis], leading[axis]) + node.cssstyle.border.getWithFallback(leadingSpacing[axis], leading[axis])) + (node.cssstyle.padding.getWithFallback(trailingSpacing[axis], trailing[axis]) + node.cssstyle.border.getWithFallback(trailingSpacing[axis], trailing[axis]))) -
                                         (child.cssstyle.margin.getWithFallback(leadingSpacing[axis], leading[axis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[axis], trailing[axis])) -
                                         (Float.isNaN(child.cssstyle.position[leading[axis]]) ? 0 : child.cssstyle.position[leading[axis]]) -
                                         (Float.isNaN(child.cssstyle.position[trailing[axis]]) ? 0 : child.cssstyle.position[trailing[axis]])),
                  // You never want to go smaller than padding
                  ((child.cssstyle.padding.getWithFallback(leadingSpacing[axis], leading[axis]) + child.cssstyle.border.getWithFallback(leadingSpacing[axis], leading[axis])) + (child.cssstyle.padding.getWithFallback(trailingSpacing[axis], trailing[axis]) + child.cssstyle.border.getWithFallback(trailingSpacing[axis], trailing[axis])))
                                                              );
            }
          }
        }

        float nextContentDim = 0;

        // It only makes sense to consider a child flexible if we have a computed
        // dimension for the node.
        if (isMainDimDefined && (child.cssstyle.positionType == CSSPositionType.RELATIVE && child.cssstyle.flex > 0)) {
          flexibleChildrenCount++;
          totalFlexible += child.cssstyle.flex;

          // Store a private linked list of flexible children so that we can
          // efficiently traverse them later.
          if (firstFlexChild == null) {
            firstFlexChild = child;
          }
          if (currentFlexChild != null) {
            currentFlexChild.nextFlexChild = child;
          }
          currentFlexChild = child;

          // Even if we don't know its exact size yet, we already know the padding,
          // border and margin. We'll use this partial information, which represents
          // the smallest possible size for the child, to compute the remaining
          // available space.
          nextContentDim = ((child.cssstyle.padding.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + child.cssstyle.border.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis])) + (child.cssstyle.padding.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]) + child.cssstyle.border.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]))) +
                           (child.cssstyle.margin.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]));

        } else {
          maxWidth = CSSConstants.UNDEFINED;
          if (!isMainRowDirection) {
            if ((!Float.isNaN(node.cssstyle.dimensions[dim[resolvedRowAxis]]) && node.cssstyle.dimensions[dim[resolvedRowAxis]] >= 0.0)) {
              maxWidth = node.csslayout.dimensions[dim[resolvedRowAxis]] -
                         paddingAndBorderAxisResolvedRow;
            } else {
              maxWidth = parentMaxWidth -
                         (node.cssstyle.margin.getWithFallback(leadingSpacing[resolvedRowAxis], leading[resolvedRowAxis]) + node.cssstyle.margin.getWithFallback(trailingSpacing[resolvedRowAxis], trailing[resolvedRowAxis])) -
                         paddingAndBorderAxisResolvedRow;
            }
          }

          // This is the main recursive call. We csslayout non flexible children.
          if (alreadyComputedNextLayout == 0) {
            layoutNode(layoutContext, child, maxWidth, direction);
          }

          // Absolute positioned elements do not take part of the csslayout, so we
          // don't use them to compute mainContentDim
          if (child.cssstyle.positionType == CSSPositionType.RELATIVE) {
            nonFlexibleChildrenCount++;
            // At this point we know the final size and margin of the element.
            nextContentDim = (child.csslayout.dimensions[dim[mainAxis]] + child.cssstyle.margin.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]));
          }
        }

        // The element we are about to add would make us go to the next line
        if (isNodeFlexWrap &&
            isMainDimDefined &&
            mainContentDim + nextContentDim > definedMainDim &&
            // If there's only one element, then it's bigger than the content
            // and needs its own line
            i != startLine) {
          nonFlexibleChildrenCount--;
          alreadyComputedNextLayout = 1;
          break;
        }

        // Disable simple stacking in the main axis for the current line as
        // we found a non-trivial child. The remaining children will be laid out
        // in <Loop C>.
        if (isSimpleStackMain &&
            (child.cssstyle.positionType != CSSPositionType.RELATIVE || (child.cssstyle.positionType == CSSPositionType.RELATIVE && child.cssstyle.flex > 0))) {
          isSimpleStackMain = false;
          firstComplexMain = i;
        }

        // Disable simple stacking in the cross axis for the current line as
        // we found a non-trivial child. The remaining children will be laid out
        // in <Loop D>.
        if (isSimpleStackCross &&
            (child.cssstyle.positionType != CSSPositionType.RELATIVE ||
             (alignItem != CSSAlign.STRETCH && alignItem != CSSAlign.FLEX_START) ||
             Float.isNaN(child.csslayout.dimensions[dim[crossAxis]]))) {
          isSimpleStackCross = false;
          firstComplexCross = i;
        }

        if (isSimpleStackMain) {
          child.csslayout.position[pos[mainAxis]] += mainDim;
          if (isMainDimDefined) {
            child.csslayout.position[trailing[mainAxis]] = node.csslayout.dimensions[dim[mainAxis]] - child.csslayout.dimensions[dim[mainAxis]] - child.csslayout.position[pos[mainAxis]];
          }

          mainDim += (child.csslayout.dimensions[dim[mainAxis]] + child.cssstyle.margin.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]));
          crossDim = Math.max(crossDim, boundAxis(child, crossAxis, (child.csslayout.dimensions[dim[crossAxis]] + child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]))));
        }

        if (isSimpleStackCross) {
          child.csslayout.position[pos[crossAxis]] += linesCrossDim + leadingPaddingAndBorderCross;
          if (isCrossDimDefined) {
            child.csslayout.position[trailing[crossAxis]] = node.csslayout.dimensions[dim[crossAxis]] - child.csslayout.dimensions[dim[crossAxis]] - child.csslayout.position[pos[crossAxis]];
          }
        }

        alreadyComputedNextLayout = 0;
        mainContentDim += nextContentDim;
        endLine = i + 1;
      }

      // <Loop B> Layout flexible children and allocate empty space

      // In order to position the elements in the main axis, we have two
      // controls. The space between the beginning and the first element
      // and the space between each two elements.
      float leadingMainDim = 0;
      float betweenMainDim = 0;

      // The remaining available space that needs to be allocated
      float remainingMainDim = 0;
      if (isMainDimDefined) {
        remainingMainDim = definedMainDim - mainContentDim;
      } else {
        remainingMainDim = Math.max(mainContentDim, 0) - mainContentDim;
      }

      // If there are flexible children in the mix, they are going to fill the
      // remaining space
      if (flexibleChildrenCount != 0) {
        float flexibleMainDim = remainingMainDim / totalFlexible;
        float baseMainDim;
        float boundMainDim;

        // If the flex share of remaining space doesn't meet min/max bounds,
        // remove this child from flex calculations.
        currentFlexChild = firstFlexChild;
        while (currentFlexChild != null) {
          if (currentFlexChild.isShow()) {
            baseMainDim = flexibleMainDim * currentFlexChild.cssstyle.flex +
                          ((currentFlexChild.cssstyle.padding.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + currentFlexChild.cssstyle.border.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis])) + (currentFlexChild.cssstyle.padding.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]) + currentFlexChild.cssstyle.border.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis])));
            boundMainDim = boundAxis(currentFlexChild, mainAxis, baseMainDim);

            if (baseMainDim != boundMainDim) {
              remainingMainDim -= boundMainDim;
              totalFlexible -= currentFlexChild.cssstyle.flex;
            }
          }
          currentFlexChild = currentFlexChild.nextFlexChild;
        }
        flexibleMainDim = remainingMainDim / totalFlexible;

        // The non flexible children can overflow the container, in this case
        // we should just assume that there is no space available.
        if (flexibleMainDim < 0) {
          flexibleMainDim = 0;
        }

        currentFlexChild = firstFlexChild;
        while (currentFlexChild != null) {
          if (currentFlexChild.isShow()) {
            // At this point we know the final size of the element in the main
            // dimension
            currentFlexChild.csslayout.dimensions[dim[mainAxis]] = boundAxis(currentFlexChild, mainAxis,
                                                                             flexibleMainDim * currentFlexChild.cssstyle.flex +
                                                                             ((currentFlexChild.cssstyle.padding.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + currentFlexChild.cssstyle.border.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis])) + (currentFlexChild.cssstyle.padding.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]) + currentFlexChild.cssstyle.border.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis])))
                                                                            );

            maxWidth = CSSConstants.UNDEFINED;
            if ((!Float.isNaN(node.cssstyle.dimensions[dim[resolvedRowAxis]]) && node.cssstyle.dimensions[dim[resolvedRowAxis]] >= 0.0)) {
              maxWidth = node.csslayout.dimensions[dim[resolvedRowAxis]] -
                         paddingAndBorderAxisResolvedRow;
            } else if (!isMainRowDirection) {
              maxWidth = parentMaxWidth -
                         (node.cssstyle.margin.getWithFallback(leadingSpacing[resolvedRowAxis], leading[resolvedRowAxis]) + node.cssstyle.margin.getWithFallback(trailingSpacing[resolvedRowAxis], trailing[resolvedRowAxis])) -
                         paddingAndBorderAxisResolvedRow;
            }

            // And we recursively call the csslayout algorithm for this child
            layoutNode(layoutContext, currentFlexChild, maxWidth, direction);
          }
          child = currentFlexChild;
          currentFlexChild = currentFlexChild.nextFlexChild;
          child.nextFlexChild = null;
        }

        // We use justifyContent to figure out how to allocate the remaining
        // space available
      } else if (justifyContent != CSSJustify.FLEX_START) {
        if (justifyContent == CSSJustify.CENTER) {
          leadingMainDim = remainingMainDim / 2;
        } else if (justifyContent == CSSJustify.FLEX_END) {
          leadingMainDim = remainingMainDim;
        } else if (justifyContent == CSSJustify.SPACE_BETWEEN) {
          remainingMainDim = Math.max(remainingMainDim, 0);
          if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 != 0) {
            betweenMainDim = remainingMainDim /
                             (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
          } else {
            betweenMainDim = 0;
          }
        } else if (justifyContent == CSSJustify.SPACE_AROUND) {
          // Space on the edges is half of the space between elements
          betweenMainDim = remainingMainDim /
                           (flexibleChildrenCount + nonFlexibleChildrenCount);
          leadingMainDim = betweenMainDim / 2;
        }
      }

      // <Loop C> Position elements in the main axis and compute dimensions

      // At this point, all the children have their dimensions set. We need to
      // find their position. In order to do that, we accumulate data in
      // variables that are also useful to compute the total dimensions of the
      // container!
      mainDim += leadingMainDim;

      for (i = firstComplexMain; i < endLine; ++i) {
        child = node.getChildAt(i);
        if (!child.isShow()) {
          continue;
        }

        if (child.cssstyle.positionType == CSSPositionType.ABSOLUTE &&
            !Float.isNaN(child.cssstyle.position[leading[mainAxis]])) {
          // In case the child is position absolute and has left/top being
          // defined, we override the position to whatever the user said
          // (and margin/border).
          child.csslayout.position[pos[mainAxis]] = (Float.isNaN(child.cssstyle.position[leading[mainAxis]]) ? 0 : child.cssstyle.position[leading[mainAxis]]) +
                                                    node.cssstyle.border.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) +
                                                    child.cssstyle.margin.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]);
        } else {
          // If the child is position absolute (without top/left) or relative,
          // we put it at the current accumulated offset.
          child.csslayout.position[pos[mainAxis]] += mainDim;

          // Define the trailing position accordingly.
          if (isMainDimDefined) {
            child.csslayout.position[trailing[mainAxis]] = node.csslayout.dimensions[dim[mainAxis]] - child.csslayout.dimensions[dim[mainAxis]] - child.csslayout.position[pos[mainAxis]];
          }

          // Now that we placed the element, we need to update the variables
          // We only need to do that for relative elements. Absolute elements
          // do not take part in that phase.
          if (child.cssstyle.positionType == CSSPositionType.RELATIVE) {
            // The main dimension is the sum of all the elements dimension plus
            // the spacing.
            mainDim += betweenMainDim + (child.csslayout.dimensions[dim[mainAxis]] + child.cssstyle.margin.getWithFallback(leadingSpacing[mainAxis], leading[mainAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]));
            // The cross dimension is the max of the elements dimension since there
            // can only be one element in that cross dimension.
            crossDim = Math.max(crossDim, boundAxis(child, crossAxis, (child.csslayout.dimensions[dim[crossAxis]] + child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]))));
          }
        }
      }

      float containerCrossAxis = node.csslayout.dimensions[dim[crossAxis]];
      if (!isCrossDimDefined) {
        containerCrossAxis = Math.max(
            // For the cross dim, we add both sides at the end because the value
            // is aggregate via a max function. Intermediate negative values
            // can mess this computation otherwise
            boundAxis(node, crossAxis, crossDim + paddingAndBorderAxisCross),
            paddingAndBorderAxisCross
                                     );
      }

      // <Loop D> Position elements in the cross axis
      for (i = firstComplexCross; i < endLine; ++i) {
        child = node.getChildAt(i);
        if (!child.isShow()) {
          continue;
        }

        if (child.cssstyle.positionType == CSSPositionType.ABSOLUTE &&
            !Float.isNaN(child.cssstyle.position[leading[crossAxis]])) {
          // In case the child is absolutely positionned and has a
          // top/left/bottom/right being set, we override all the previously
          // computed positions to set it correctly.
          child.csslayout.position[pos[crossAxis]] = (Float.isNaN(child.cssstyle.position[leading[crossAxis]]) ? 0 : child.cssstyle.position[leading[crossAxis]]) +
                                                     node.cssstyle.border.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) +
                                                     child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]);

        } else {
          float leadingCrossDim = leadingPaddingAndBorderCross;

          // For a relative children, we're either using alignItems (parent) or
          // alignSelf (child) in order to determine the position in the cross axis
          if (child.cssstyle.positionType == CSSPositionType.RELATIVE) {
            /*eslint-disable */
            // This variable is intentionally re-defined as the code is transpiled to a block scope language
            CSSAlign alignItem = getAlignItem(node, child);
            /*eslint-enable */
            if (alignItem == CSSAlign.STRETCH) {
              // You can only stretch if the dimension has not already been set
              // previously.
              if (Float.isNaN(child.csslayout.dimensions[dim[crossAxis]])) {
                child.csslayout.dimensions[dim[crossAxis]] = Math.max(
                    boundAxis(child, crossAxis, containerCrossAxis -
                                                paddingAndBorderAxisCross - (child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]))),
                    // You never want to go smaller than padding
                    ((child.cssstyle.padding.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.border.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis])) + (child.cssstyle.padding.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]) + child.cssstyle.border.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis])))
                                                                     );
              }
            } else if (alignItem != CSSAlign.FLEX_START) {
              // The remaining space between the parent dimensions+padding and child
              // dimensions+margin.
              float remainingCrossDim = containerCrossAxis -
                                        paddingAndBorderAxisCross - (child.csslayout.dimensions[dim[crossAxis]] + child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]));

              if (alignItem == CSSAlign.CENTER) {
                leadingCrossDim += remainingCrossDim / 2;
              } else { // CSSAlign.FLEX_END
                leadingCrossDim += remainingCrossDim;
              }
            }
          }

          // And we apply the position
          child.csslayout.position[pos[crossAxis]] += linesCrossDim + leadingCrossDim;

          // Define the trailing position accordingly.
          if (isCrossDimDefined) {
            child.csslayout.position[trailing[crossAxis]] = node.csslayout.dimensions[dim[crossAxis]] - child.csslayout.dimensions[dim[crossAxis]] - child.csslayout.position[pos[crossAxis]];
          }
        }
      }

      linesCrossDim += crossDim;
      linesMainDim = Math.max(linesMainDim, mainDim);
      linesCount += 1;
      startLine = endLine;
    }

    // <Loop E>
    //
    // Note(prenaux): More than one line, we need to csslayout the crossAxis
    // according to alignContent.
    //
    // Note that we could probably remove <Loop D> and handle the one line case
    // here too, but for the moment this is safer since it won't interfere with
    // previously working code.
    //
    // See specs:
    // http://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#csslayout-algorithm
    // section 9.4
    //
    if (linesCount > 1 && isCrossDimDefined) {
      float nodeCrossAxisInnerSize = node.csslayout.dimensions[dim[crossAxis]] -
                                     paddingAndBorderAxisCross;
      float remainingAlignContentDim = nodeCrossAxisInnerSize - linesCrossDim;

      float crossDimLead = 0;
      float currentLead = leadingPaddingAndBorderCross;

      CSSAlign alignContent = node.cssstyle.alignContent;
      if (alignContent == CSSAlign.FLEX_END) {
        currentLead += remainingAlignContentDim;
      } else if (alignContent == CSSAlign.CENTER) {
        currentLead += remainingAlignContentDim / 2;
      } else if (alignContent == CSSAlign.STRETCH) {
        if (nodeCrossAxisInnerSize > linesCrossDim) {
          crossDimLead = (remainingAlignContentDim / linesCount);
        }
      }

      int endIndex = 0;
      for (i = 0; i < linesCount; ++i) {
        int startIndex = endIndex;

        // compute the line's height and find the endIndex
        float lineHeight = 0;
        for (ii = startIndex; ii < childCount; ++ii) {
          child = node.getChildAt(ii);

          if (!child.isShow() || child.cssstyle.positionType != CSSPositionType.RELATIVE) {
            continue;
          }
          if (child.lineIndex != i) {
            break;
          }
          if (!Float.isNaN(child.csslayout.dimensions[dim[crossAxis]])) {
            lineHeight = Math.max(
                lineHeight,
                child.csslayout.dimensions[dim[crossAxis]] + (child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]) + child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]))
                                 );
          }
        }
        endIndex = ii;
        lineHeight += crossDimLead;

        for (ii = startIndex; ii < endIndex; ++ii) {
          child = node.getChildAt(ii);

          if (!child.isShow() || child.cssstyle.positionType != CSSPositionType.RELATIVE) {
            continue;
          }

          CSSAlign alignContentAlignItem = getAlignItem(node, child);
          if (alignContentAlignItem == CSSAlign.FLEX_START) {
            child.csslayout.position[pos[crossAxis]] = currentLead + child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]);
          } else if (alignContentAlignItem == CSSAlign.FLEX_END) {
            child.csslayout.position[pos[crossAxis]] = currentLead + lineHeight - child.cssstyle.margin.getWithFallback(trailingSpacing[crossAxis], trailing[crossAxis]) - child.csslayout.dimensions[dim[crossAxis]];
          } else if (alignContentAlignItem == CSSAlign.CENTER) {
            float childHeight = child.csslayout.dimensions[dim[crossAxis]];
            child.csslayout.position[pos[crossAxis]] = currentLead + (lineHeight - childHeight) / 2;
          } else if (alignContentAlignItem == CSSAlign.STRETCH) {
            child.csslayout.position[pos[crossAxis]] = currentLead + child.cssstyle.margin.getWithFallback(leadingSpacing[crossAxis], leading[crossAxis]);
            // TODO(prenaux): Correctly set the height of items with undefined
            //                (auto) crossAxis dimension.
          }
        }

        currentLead += lineHeight;
      }
    }

    boolean needsMainTrailingPos = false;
    boolean needsCrossTrailingPos = false;

    // If the user didn't specify a width or height, and it has not been set
    // by the container, then we set it via the children.
    if (!isMainDimDefined) {
      node.csslayout.dimensions[dim[mainAxis]] = Math.max(
          // We're missing the last padding at this point to get the final
          // dimension
          boundAxis(node, mainAxis, linesMainDim + (node.cssstyle.padding.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]) + node.cssstyle.border.getWithFallback(trailingSpacing[mainAxis], trailing[mainAxis]))),
          // We can never assign a width smaller than the padding and borders
          paddingAndBorderAxisMain
                                                         );

      if (mainAxis == CSS_FLEX_DIRECTION_ROW_REVERSE ||
          mainAxis == CSS_FLEX_DIRECTION_COLUMN_REVERSE) {
        needsMainTrailingPos = true;
      }
    }

    if (!isCrossDimDefined) {
      node.csslayout.dimensions[dim[crossAxis]] = Math.max(
          // For the cross dim, we add both sides at the end because the value
          // is aggregate via a max function. Intermediate negative values
          // can mess this computation otherwise
          boundAxis(node, crossAxis, linesCrossDim + paddingAndBorderAxisCross),
          paddingAndBorderAxisCross
                                                          );

      if (crossAxis == CSS_FLEX_DIRECTION_ROW_REVERSE ||
          crossAxis == CSS_FLEX_DIRECTION_COLUMN_REVERSE) {
        needsCrossTrailingPos = true;
      }
    }

    // <Loop F> Set trailing position if necessary
    if (needsMainTrailingPos || needsCrossTrailingPos) {
      for (i = 0; i < childCount; ++i) {
        child = node.getChildAt(i);
        if (!child.isShow()) {
          continue;
        }

        if (needsMainTrailingPos) {
          child.csslayout.position[trailing[mainAxis]] = node.csslayout.dimensions[dim[mainAxis]] - child.csslayout.dimensions[dim[mainAxis]] - child.csslayout.position[pos[mainAxis]];
        }

        if (needsCrossTrailingPos) {
          child.csslayout.position[trailing[crossAxis]] = node.csslayout.dimensions[dim[crossAxis]] - child.csslayout.dimensions[dim[crossAxis]] - child.csslayout.position[pos[crossAxis]];
        }
      }
    }

    // <Loop G> Calculate dimensions for absolutely positioned elements
    currentAbsoluteChild = firstAbsoluteChild;
    while (currentAbsoluteChild != null) {
      if (currentAbsoluteChild.isShow()) {
        // Pre-fill dimensions when using absolute position and both offsets for
        // the axis are defined (either both left and right or top and bottom).
        for (ii = 0; ii < 2; ii++) {
          axis = (ii != 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;

          if (!Float.isNaN(node.csslayout.dimensions[dim[axis]]) &&
              !(!Float.isNaN(currentAbsoluteChild.cssstyle.dimensions[dim[axis]]) && currentAbsoluteChild.cssstyle.dimensions[dim[axis]] >= 0.0) &&
              !Float.isNaN(currentAbsoluteChild.cssstyle.position[leading[axis]]) &&
              !Float.isNaN(currentAbsoluteChild.cssstyle.position[trailing[axis]])) {
            currentAbsoluteChild.csslayout.dimensions[dim[axis]] = Math.max(
                boundAxis(currentAbsoluteChild, axis, node.csslayout.dimensions[dim[axis]] -
                                                      (node.cssstyle.border.getWithFallback(leadingSpacing[axis], leading[axis]) + node.cssstyle.border.getWithFallback(trailingSpacing[axis], trailing[axis])) -
                                                      (currentAbsoluteChild.cssstyle.margin.getWithFallback(leadingSpacing[axis], leading[axis]) + currentAbsoluteChild.cssstyle.margin.getWithFallback(trailingSpacing[axis], trailing[axis])) -
                                                      (Float.isNaN(currentAbsoluteChild.cssstyle.position[leading[axis]]) ? 0 : currentAbsoluteChild.cssstyle.position[leading[axis]]) -
                                                      (Float.isNaN(currentAbsoluteChild.cssstyle.position[trailing[axis]]) ? 0 : currentAbsoluteChild.cssstyle.position[trailing[axis]])
                         ),
                // You never want to go smaller than padding
                ((currentAbsoluteChild.cssstyle.padding.getWithFallback(leadingSpacing[axis], leading[axis]) + currentAbsoluteChild.cssstyle.border.getWithFallback(leadingSpacing[axis], leading[axis])) + (currentAbsoluteChild.cssstyle.padding.getWithFallback(trailingSpacing[axis], trailing[axis]) + currentAbsoluteChild.cssstyle.border.getWithFallback(trailingSpacing[axis], trailing[axis])))
                                                                           );
          }

          if (!Float.isNaN(currentAbsoluteChild.cssstyle.position[trailing[axis]]) &&
              !!Float.isNaN(currentAbsoluteChild.cssstyle.position[leading[axis]])) {
            currentAbsoluteChild.csslayout.position[leading[axis]] =
                node.csslayout.dimensions[dim[axis]] -
                currentAbsoluteChild.csslayout.dimensions[dim[axis]] -
                (Float.isNaN(currentAbsoluteChild.cssstyle.position[trailing[axis]]) ? 0 : currentAbsoluteChild.cssstyle.position[trailing[axis]]);
          }
        }
      }
      child = currentAbsoluteChild;
      currentAbsoluteChild = currentAbsoluteChild.nextAbsoluteChild;
      child.nextAbsoluteChild = null;
    }
  }
  /** END_GENERATED **/
}
