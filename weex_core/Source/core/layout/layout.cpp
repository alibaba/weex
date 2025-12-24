/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#include <math.h>
#include "layout.h"
#include <tuple>

using namespace WeexCore;

namespace WeexCore {

  /**
   * Entry function to calculate layout
   */
  void WXCoreLayoutNode::calculateLayout(const std::pair<float,float> &renderPageSize) {
    BFCs.clear();
    initFormatingContext(BFCs);
    auto bfcDimension = calculateBFCDimension(renderPageSize);
    if (std::get<0>(bfcDimension) || isDirty()) {
      mChildrenFrozen.assign(getChildCount(kNonBFC), false);
      measure(std::get<1>(bfcDimension), std::get<2>(bfcDimension), true);
      checkSizeConstraints(this, false);
    }
    layout(mCssStyle->mMargin.getMargin(kMarginLeft),
           mCssStyle->mMargin.getMargin(kMarginTop),
           mCssStyle->mMargin.getMargin(kMarginLeft) + getLayoutWidth(),
           mCssStyle->mMargin.getMargin(kMarginTop) + getLayoutHeight(),
           false, &renderPageSize);
    for (Index i = 0; i < getChildCount(kBFC); ++i) {
      WXCoreLayoutNode *child = getChildAt(kBFC, i);
      child->calculateLayout(renderPageSize);
    }
  }

  void WXCoreLayoutNode::initFormatingContext(std::vector<WXCoreLayoutNode *> &BFCs) {
    NonBFCs.clear();
    for(auto it = ChildListIterBegin(); it != ChildListIterEnd(); it++) {
      WXCoreLayoutNode* child = *it;
      if (child != nullptr) {
        if (isBFC(child)) {
          BFCs.push_back(child);
        } else {
          NonBFCs.push_back(child);
          child->initFormatingContext(BFCs);
        }
      }
    }
    reset();
  }

  std::tuple<bool, float, float> WXCoreLayoutNode::calculateBFCDimension(const std::pair<float,float>& renderPageSize) {
    bool sizeChanged = false;
    float width = mCssStyle->mStyleWidth, height = mCssStyle->mStyleHeight;
    std::pair<bool,float> ret;
    if (isBFC(this)) {
      ret = calculateBFCWidth(width, renderPageSize.first);
      sizeChanged |=ret.first;
      width = ret.second;

      ret = calculateBFCHeight(height,renderPageSize.second);
      sizeChanged |=ret.first;
      height = ret.second;
    }
    return std::make_tuple(sizeChanged, width, height);
  }

  std::pair<bool,float> WXCoreLayoutNode::calculateBFCWidth(float width, const float renderPageWidth){
    bool sizeChanged = false;
    if (isnan(width) &&
        mParent != nullptr &&
        !isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeLeft)) &&
        !isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeRight))) {
      float containingBlockWidth = NAN;
      switch (mCssStyle->mPositionType) {
        case kAbsolute:
          containingBlockWidth = mParent->mLayoutResult->mLayoutSize.width;
          if (!isnan(mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthLeft))) {
            containingBlockWidth -= mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthLeft);
          }
          if (!isnan(mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthRight))) {
            containingBlockWidth -= mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthRight);
          }
          break;
        case kFixed:
          if (!isnan(renderPageWidth)) {
            containingBlockWidth = renderPageWidth;
          }
          break;
        default: break;
      }
      if (!isnan(containingBlockWidth)) {
        width = containingBlockWidth -
            mCssStyle->mStylePosition.getPosition(kPositionEdgeLeft) -
            mCssStyle->mStylePosition.getPosition(kPositionEdgeRight);
        if (!isnan(mCssStyle->mMargin.getMargin(kMarginLeft))) {
          width -= mCssStyle->mMargin.getMargin(kMarginLeft);
        }
        if (!isnan(mCssStyle->mMargin.getMargin(kMarginRight))) {
          width -= mCssStyle->mMargin.getMargin(kMarginRight);
        }
        setWidthMeasureMode(kExactly);
        sizeChanged = true;
      }
    }
    return std::make_pair(sizeChanged, width);
  }


  std::pair<bool,float> WXCoreLayoutNode::calculateBFCHeight(float height, const float renderPageHeight){
    bool sizeChanged = false;
    if (isnan(mCssStyle->mStyleHeight) &&
        mParent != nullptr &&
        !isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeTop)) &&
        !isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeBottom))) {
      float containingBlockHeight = NAN;
      switch (mCssStyle->mPositionType) {
        case kAbsolute:
          containingBlockHeight = mParent->mLayoutResult->mLayoutSize.height;
          if (!isnan(mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthTop))) {
            containingBlockHeight -= mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthTop);
          }
          if (!isnan(mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthBottom))) {
            containingBlockHeight -= mParent->mCssStyle->mBorderWidth.getBorderWidth(kBorderWidthBottom);
          }
          break;
        case kFixed:
          if (!isnan(renderPageHeight)) {
            containingBlockHeight = renderPageHeight;
          }
          break;
        default: break;
      }
      if (!isnan(containingBlockHeight)) {
        height = containingBlockHeight -
            mCssStyle->mStylePosition.getPosition(kPositionEdgeTop) -
            mCssStyle->mStylePosition.getPosition(kPositionEdgeBottom);
        if (!isnan(mCssStyle->mMargin.getMargin(kMarginTop))) {
          height -= mCssStyle->mMargin.getMargin(kMarginTop);
        }
        if (!isnan(mCssStyle->mMargin.getMargin(kMarginBottom))) {
          height -= mCssStyle->mMargin.getMargin(kMarginBottom);
        }
        setHeightMeasureMode(kExactly);
        sizeChanged = true;
      }
    }
    return std::make_pair(sizeChanged, height);
  }

  void WXCoreLayoutNode::measure(const float width, const float height, const bool hypotheticalMeasurment){
    if(hypotheticalMeasurment){
      //Only BFC will enter this case.
      hypotheticalMeasure(width, height);
    }

    if(getChildCount(kNonBFC) > 0){
      if((isMainAxisHorizontal(this) && widthDirty) || (!isMainAxisHorizontal(this) && heightDirty)){
        measureInternalNode(width, height, false, false);
      }
      determineMainSize(width, height);
      determineCrossSize(width, height, true);
      measureInternalNode(width, height, true, false);
      determineCrossSize(width, height, false);
    }
    else {
      if (widthDirty || heightDirty) {
        measureLeafNode(width, height, hypotheticalMeasurment, false);
      }
    }
    clearDirty();
  }

  void WXCoreLayoutNode::hypotheticalMeasure(const float width, const float height, const bool stretch){
    if (getChildCount(kNonBFC) > 0) {
      measureInternalNode(width, height, true, true);
    } else {
      measureLeafNode(width, height, true, stretch);
    }

    widthDirty = false;
    heightDirty = false;
    mLayoutResult->mLayoutSize.hypotheticalWidth = mLayoutResult->mLayoutSize.width;
    mLayoutResult->mLayoutSize.hypotheticalHeight = mLayoutResult->mLayoutSize.height;
  }

  void WXCoreLayoutNode::measureLeafNode(float width, float height, const bool hypothetical, const bool stretch) {
    if ((measureFunc != nullptr) &&
        (widthMeasureMode == kUnspecified
            || heightMeasureMode == kUnspecified)) {
      float constrainsWidth = width;
      if(isnan(width) && !isnan(mCssStyle->mMaxWidth)){
          constrainsWidth = mCssStyle->mMaxWidth;
      }

      if((!isnan(width)) ||
          (isnan(width) && !isnan(mCssStyle->mMaxWidth))) {
        constrainsWidth -= sumPaddingBorderAlongAxis(this, true);
      }
      WXCoreSize dimension = measureFunc(this, constrainsWidth,
                                         (stretch && !isnan(width)) ? kExactly:widthMeasureMode,
                                         height, heightMeasureMode);
      if (widthMeasureMode == kUnspecified) {
        float actualWidth = dimension.width + sumPaddingBorderAlongAxis(this, true);
        if (isnan(width)) {
          width = actualWidth;
        } else if (!stretch) {
          width = std::min(width, actualWidth);
        }
      }
      if (heightMeasureMode == kUnspecified) {
        float actualHeight = dimension.height + sumPaddingBorderAlongAxis(this, false);
        if (isnan(height)) {
          height = actualHeight;
        } else if (!stretch) {
          height = std::min(height, actualHeight);
        }
      }
    } else {
      width = widthMeasureMode == kUnspecified ? sumPaddingBorderAlongAxis(this, true)
                                               : width;
      height = heightMeasureMode == kUnspecified ? sumPaddingBorderAlongAxis(this, false)
                                                 : height;
    }
    setMeasuredDimension(width, height);
  }


  /**
   * Determine the main size by expanding the individual flexGrow attribute.
   */
  void WXCoreLayoutNode::determineMainSize(const float width, const float height) {
      bool horizontal = isMainAxisHorizontal(this);
      if((horizontal && widthMeasureMode == kExactly) || (!horizontal && heightMeasureMode == kExactly)) {
        //The measureMode along main axis is exactly
        float maxMainSize = horizontal ? width: height;
        maxMainSize -= sumPaddingBorderAlongAxis(this, isMainAxisHorizontal(this));
        Index childIndex = 0;
        for (WXCoreFlexLine *flexLine : mFlexLines) {
          childIndex = expandItemsInFlexLine(flexLine, maxMainSize, childIndex);
        }
      }
    }


  /**
   * @param flexDirection         the flex direction attribute
   * @param width                 stylewidth by this node
   * @param height                styleheight by this node
   * @param paddingAlongCrossAxis the padding value for this node along the cross axis
   */
    void WXCoreLayoutNode::determineCrossSize(const float width, const float height, const bool stretch) {
      if (mFlexLines.size() == 1 && isCrossExactly()) {
        determineCrossSize(width, height, mFlexLines[0]);
      }
      if (stretch) {
        stretchViewCrossSize();
      }
    }

    void WXCoreLayoutNode::determineCrossSize(const float width, const float height, WXCoreFlexLine* const flexLine){
      bool horizontal = isMainAxisHorizontal(this);
      float size = flexLine->mCrossSize;
      float paddingAlongCrossAxis = sumPaddingBorderAlongAxis(this, !horizontal);
      if (horizontal) {
        if (heightMeasureMode == kExactly) {
          size = height - paddingAlongCrossAxis;
        }
      } else {
        if (widthMeasureMode == kExactly) {
          size = width - paddingAlongCrossAxis;
        }
      }
      flexLine->mCrossSize = size;
    }

    void WXCoreLayoutNode::measureInternalNode(const float width, const float height, const bool needMeasure,
                                               const bool hypotheticalMeasurment) {
      for (WXCoreFlexLine *flexLine : mFlexLines) {
        if(flexLine!= nullptr) {
          delete flexLine;
        }
        flexLine = nullptr;
      }
      mFlexLines.clear();
      Index childCount = getChildCount(kNonBFC);
      WXCoreFlexLine *flexLine = new WXCoreFlexLine();

      for (Index i = 0; i < childCount; i++) {
        WXCoreLayoutNode *child = getChildAt(kNonBFC, i);
        if (child->mCssStyle->mAlignSelf == kAlignSelfStretch) {
          flexLine->mIndicesAlignSelfStretch.push_back(i);
        }
        measureChild(child, flexLine->mMainSize, width, height, needMeasure, hypotheticalMeasurment);
        checkSizeConstraints(child, hypotheticalMeasurment);

        if (isWrapRequired(width, height, flexLine->mMainSize,
                           calcItemSizeAlongAxis(child, isMainAxisHorizontal(this)))) {
          if (flexLine->mItemCount > 0) {
            mFlexLines.push_back(flexLine);
          }
          flexLine = new WXCoreFlexLine();
          flexLine->mItemCount = 1;
        } else {
          flexLine->mItemCount++;
        }
        updateCurrentFlexline(childCount, flexLine, i, child, hypotheticalMeasurment || (!hypotheticalMeasurment && !needMeasure));
      }
      setMeasuredDimensionForFlex(width, widthMeasureMode, height, heightMeasureMode);
    }

    void WXCoreLayoutNode::updateCurrentFlexline(const Index childCount, WXCoreFlexLine* const flexLine, const Index i,
                                                 const WXCoreLayoutNode* const child, const bool useHypotheticalSize){
      flexLine->mMainSize += calcItemSizeAlongAxis(child, isMainAxisHorizontal(this), useHypotheticalSize);
      sumFlexGrow(child, flexLine, i);
      flexLine->mCrossSize =
          std::max(flexLine->mCrossSize, calcItemSizeAlongAxis(child, !isMainAxisHorizontal(this), useHypotheticalSize));
      if (i == childCount - 1 && flexLine->mItemCount != 0) {
        mFlexLines.push_back(flexLine);
      }
    }

    void WXCoreLayoutNode::measureChild(WXCoreLayoutNode* const child, const float currentMainSize,
                                        const float parentWidth, const float parentHeight,
                                        const bool needMeasure, const bool hypotheticalMeasurment) {
      if (needMeasure && child->isDirty()) {
        if (hypotheticalMeasurment) {
          float childWidth = child->mCssStyle->mStyleWidth;
          float childHeight = child->mCssStyle->mStyleHeight;
          bool stretch = !isMainAxisHorizontal(this) &&
              child->measureFunc != nullptr &&
              widthMeasureMode == kExactly &&
              isSingleFlexLine(parentHeight) &&
              ((child->mCssStyle->mAlignSelf == kAlignSelfStretch) ||
                  (mCssStyle->mAlignItems == kAlignItemsStretch
                      && child->mCssStyle->mAlignSelf == kAlignSelfAuto));

          adjustChildSize(child, currentMainSize, parentWidth,
                          parentHeight, childWidth, childHeight);
          child->hypotheticalMeasure(childWidth, childHeight, stretch);
        } else {
          if(isSingleFlexLine(isMainAxisHorizontal(this) ? parentWidth : parentHeight)
              && !isMainAxisHorizontal(this)){
            if(child->widthMeasureMode == kUnspecified) {
              child->setLayoutWidth(parentWidth - sumPaddingBorderAlongAxis(this, true)
                                        - child->mCssStyle->sumMarginOfDirection(true));
            }
            if(child->heightMeasureMode == kUnspecified && child->widthDirty) {
              child->mLayoutResult->mLayoutSize.height = NAN;
            }
          }
          child->measure(child->mLayoutResult->mLayoutSize.width,
                         child->mLayoutResult->mLayoutSize.height, hypotheticalMeasurment);
        }
      }
    }

    void WXCoreLayoutNode::adjustChildSize(const WXCoreLayoutNode *child,
                                        const float currentMainSize,
                                        const float parentWidth,
                                        const float parentHeight,
                                        float &childWidth,
                                        float &childHeight) const {
      if(child->measureFunc == nullptr) {
        if(!isnan(childWidth)){
          childWidth = std::max(childWidth, child->sumPaddingBorderAlongAxis(child, true));
        }
        if(!isnan(childHeight)){
          childHeight = std::max(childHeight, child->sumPaddingBorderAlongAxis(child, false));
        }
      }

      if (isSingleFlexLine(isMainAxisHorizontal(this) ? parentWidth : parentHeight)) {
        if (isMainAxisHorizontal(this)) {
          if (!isnan(parentHeight) && isnan(child->mCssStyle->mStyleHeight)
              && child->mCssStyle->mAlignSelf == kAlignSelfAuto
              && mCssStyle->mAlignItems == kAlignItemsStretch) {
            childHeight = parentHeight - sumPaddingBorderAlongAxis(this, false) -
                child->mCssStyle->sumMarginOfDirection(false);
          }
        } else {
          if (!isnan(parentWidth) && isnan(child->mCssStyle->mStyleWidth)) {
            childWidth = parentWidth - sumPaddingBorderAlongAxis(this, true) -
                child->mCssStyle->sumMarginOfDirection(true);
          }
       }
      }
    }

    void WXCoreLayoutNode::checkSizeConstraints(WXCoreLayoutNode* const node, const bool hypotheticalMeasurment) {
      bool widthRemeasure = false, heightRemeasure = false;
      float nodeWidth,nodeHeight;
      nodeWidth = node->mLayoutResult->mLayoutSize.width;
      nodeHeight = node->mLayoutResult->mLayoutSize.height;

      if (!isnan(node->mCssStyle->mMinWidth) &&
          nodeWidth < node->mCssStyle->mMinWidth) {
        widthRemeasure = true;
        nodeWidth = node->mCssStyle->mMinWidth;
      } else if (!isnan(node->mCssStyle->mMaxWidth)
          && nodeWidth > node->mCssStyle->mMaxWidth) {
        widthRemeasure = true;
        nodeWidth = node->mCssStyle->mMaxWidth;
      }

      if (!isnan(node->mCssStyle->mMinHeight) &&
          nodeHeight < node->mCssStyle->mMinHeight) {
        heightRemeasure = true;
        nodeHeight = node->mCssStyle->mMinHeight;
      } else if (!isnan(node->mCssStyle->mMaxHeight) &&
          nodeHeight > node->mCssStyle->mMaxHeight) {
        heightRemeasure = true;
        nodeHeight = node->mCssStyle->mMaxHeight;
      }

      node->setWidthMeasureMode(widthRemeasure ? kExactly : node->widthMeasureMode);
      node->setHeightMeasureMode(heightRemeasure ? kExactly : node->heightMeasureMode);

      if (hypotheticalMeasurment) {
        if (widthRemeasure) {
          node->setLayoutWidth(nodeWidth);
          node->mLayoutResult->mLayoutSize.hypotheticalWidth = nodeWidth;
        }
        if (heightRemeasure) {
          node->setLayoutHeight(nodeHeight);
          node->mLayoutResult->mLayoutSize.hypotheticalHeight = nodeHeight;
        }
      } else {
        if (widthRemeasure || heightRemeasure) {
          node->measure(nodeWidth, nodeHeight, hypotheticalMeasurment);
        }
      }
    }

    Index WXCoreLayoutNode::expandItemsInFlexLine(WXCoreFlexLine* const flexLine,
                                      const float maxMainSize,
                                      const Index startIndex) {
      Index childIndex = startIndex;
      if (flexLine->mTotalFlexGrow <= 0) {
        childIndex += flexLine->mItemCount;
      } else {
        bool needsReexpand = false;
        const float unitSpace = (maxMainSize - flexLine->mMainSize + flexLine->mTotalFlexibleSize) /
                                (flexLine->mTotalFlexGrow > 1 ? flexLine->mTotalFlexGrow : 1);
        float sizeBeforeExpand = flexLine->mMainSize;
        flexLine->mMainSize = 0;

        for (Index i = 0; i < flexLine->mItemCount; i++) {
          WXCoreLayoutNode *child = getChildAt(kNonBFC, childIndex);
          if (!mChildrenFrozen[childIndex]) {
            float childSizeAlongMainAxis = unitSpace * child->mCssStyle->mFlexGrow;
            std::pair<bool, float> limitSize = limitChildMainSize(flexLine, child,
                                                                childSizeAlongMainAxis, childIndex);
            needsReexpand = limitSize.first;
            adjustChildSize(child, limitSize.second);
          }
          flexLine->mMainSize += calcItemSizeAlongAxis(child, isMainAxisHorizontal(this));
          childIndex++;
        }

        if (needsReexpand && sizeBeforeExpand != flexLine->mMainSize) {
          // Re-invoke the method with the same startIndex to distribute the positive free space
          // that wasn't fully distributed (because of maximum/minimum length constraint)
          expandItemsInFlexLine(flexLine, maxMainSize, startIndex);
        }
      }
      return childIndex;
    }

    void WXCoreLayoutNode::adjustChildSize(WXCoreLayoutNode* const child, const float childMainSize) {
      if (isMainAxisHorizontal(this)) {
        child->setWidthMeasureMode(kExactly);
        child->setLayoutWidth(childMainSize);
        //TODO Fix https://jsplayground.taobao.org/raxplayground/97efee70-775f-45a6-b07d-d84c8d1b4387
        //TODO This is just a temporary fix, we need to make things beauty and clean.
        if(child->heightMeasureMode == kUnspecified && child->measureFunc != nullptr && child->getChildCount() == 0){
          child->setLayoutHeight(NAN);
        }
      } else {
        child->setHeightMeasureMode(kExactly);
        child->setLayoutHeight(childMainSize);
      }
    }

    void WXCoreLayoutNode::stretchViewCrossSize(){
      if (mCssStyle->mAlignItems == kAlignItemsStretch) {
        Index viewIndex = 0;
        for (Index i = 0; i< mFlexLines.size(); i++ ) {
            WXCoreFlexLine *flexLine = mFlexLines.at(i);
            for (Index j = 0; j < flexLine->mItemCount; j++, viewIndex++) {
                WXCoreLayoutNode* child = getChildAt(kNonBFC, viewIndex);
              if (child->mCssStyle->mAlignSelf == kAlignSelfAuto ||
                  child->mCssStyle->mAlignSelf == kAlignSelfStretch) {
                stretchViewCrossSize(child, flexLine->mCrossSize);
              }
          }
        }
      } else {
        for (WXCoreFlexLine *flexLine : mFlexLines) {
          for (auto index : flexLine->mIndicesAlignSelfStretch) {
            stretchViewCrossSize(getChildAt(kNonBFC, index), flexLine->mCrossSize);
          }
        }
      }
    }

    void WXCoreLayoutNode::stretchViewCrossSize(WXCoreLayoutNode* const child, float crossSize){
      if (isMainAxisHorizontal(this)) {
        if (child->heightMeasureMode != kExactly &&
            !(child->measureFunc != nullptr && child->getChildCount() == 0)) {
          crossSize -=
              child->mCssStyle->mMargin.getMargin(kMarginTop) +
                  child->mCssStyle->mMargin.getMargin(kMarginBottom);
          child->setHeightMeasureMode(kExactly);
          child->setLayoutHeight(std::max(0.f, crossSize));
        }
      } else {
        if (child->widthMeasureMode != kExactly) {
            crossSize -=
                child->mCssStyle->mMargin.getMargin(kMarginLeft) +
                    child->mCssStyle->mMargin.getMargin(kMarginRight);
          child->setWidthMeasureMode(kExactly);
          child->setLayoutWidth(std::max(0.f, crossSize));
        }
      }
    }

    void WXCoreLayoutNode::setFrame(const float l, const float t, const float r, const float b) {
      if (mLayoutResult->mLayoutPosition.getPosition(kPositionEdgeLeft) != l
          || mLayoutResult->mLayoutPosition.getPosition(kPositionEdgeTop) != t
          || mLayoutResult->mLayoutPosition.getPosition(kPositionEdgeRight) != r
          || mLayoutResult->mLayoutPosition.getPosition(kPositionEdgeBottom) != b
          || (l == 0.0f && t == 0.0f && r == 0.0f && b == 0.0f) ) {
        setHasNewLayout(true);
        setFrame(&mLayoutResult->mLayoutPosition, l, t, r, b);
      }
    }

  void WXCoreLayoutNode::setFrame(WXCorePosition* position,const float l, const float t, const float r, const float b){
    position->setPosition(kPositionEdgeLeft, l);
    position->setPosition(kPositionEdgeTop, t);
    position->setPosition(kPositionEdgeRight, r);
    position->setPosition(kPositionEdgeBottom, b);
  }

  void WXCoreLayoutNode::layout(float left, float top, float right, float bottom, const bool absoluteFlexItem, const std::pair<float,float>* const renderPageSize) {
    if(absoluteFlexItem) {
      absoultePositon = new WXCorePosition();
      setFrame(absoultePositon, left, top, right, bottom);
    }
    else{
      switch (mCssStyle->mPositionType) {
        case kFixed:
        case kAbsolute:
          calcAbsoluteOffset(left, top, right, bottom, renderPageSize);
          break;
        default:
        case kRelative:
          calcRelativeOffset(left, top, right, bottom);
          break;
      }
      setFrame(left, top, right, bottom);
      onLayout(left, top, right, bottom);
    }
  }

  void WXCoreLayoutNode::calcRelativeOffset(float &left, float &top, float &right, float &bottom) const {
    if (!isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeLeft))) {
      left += mCssStyle->mStylePosition.getPosition(kPositionEdgeLeft);
      right += mCssStyle->mStylePosition.getPosition(kPositionEdgeLeft);
    } else if (!isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeRight))) {
      left -= mCssStyle->mStylePosition.getPosition(kPositionEdgeRight);
      right -= mCssStyle->mStylePosition.getPosition(kPositionEdgeRight);
    }

    if (!isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeTop))) {
      top += mCssStyle->mStylePosition.getPosition(kPositionEdgeTop);
      bottom += mCssStyle->mStylePosition.getPosition(kPositionEdgeTop);
    } else if (!isnan(mCssStyle->mStylePosition.getPosition(kPositionEdgeBottom))) {
      top -= mCssStyle->mStylePosition.getPosition(kPositionEdgeBottom);
      bottom -= mCssStyle->mStylePosition.getPosition(kPositionEdgeBottom);
    }
  }

  void WXCoreLayoutNode::calcAbsoluteOffset(float &left, float &top, float &right, float &bottom, const std::pair<float,float>* const renderPageSize){
    WXCorePadding parentPadding;
    WXCoreBorderWidth parentBorder;
    WXCoreSize parentSize;
    if (mCssStyle->mPositionType == kAbsolute && mParent != nullptr) {
      parentPadding = mParent->mCssStyle->mPadding;
      parentBorder = mParent->mCssStyle->mBorderWidth;
      parentSize = mParent->mLayoutResult->mLayoutSize;
      positionAbsoluteFlexItem(left, top, right, bottom);
    } else if(mCssStyle->mPositionType == kFixed && renderPageSize!= nullptr){
      parentSize.width = renderPageSize->first;
      parentSize.height = renderPageSize->second;
    }
    updateLeftRightForAbsolute(left, right, parentPadding, parentBorder, parentSize);
    updateTopBottomForAbsolute(top, bottom, parentPadding, parentBorder, parentSize);
  }

  void WXCoreLayoutNode::positionAbsoluteFlexItem(float &left, float &top, float &right, float &bottom){
    if ((isnan(getStylePositionLeft()) && isnan(getStylePositionRight())) ||
        (isnan(getStylePositionTop()) && isnan(getStylePositionBottom()))) {
      WXCoreFlexLine tempLine;
      mParent->updateFlexLineForAbsoluteItem(this, &tempLine);
      mParent->onLayout(mParent->getLayoutPositionLeft(),
                        mParent->getLayoutPositionTop(),
                        mParent->getLayoutPositionRight(),
                        mParent->getLayoutPositionBottom(),
                        this, &tempLine);
      if(absoultePositon != nullptr) {
        if (isnan(getStylePositionLeft()) && isnan(getStylePositionRight())) {
          left = absoultePositon->getPosition(kPositionEdgeLeft);
          right = absoultePositon->getPosition(kPositionEdgeRight);
        }
        if (isnan(getStylePositionTop()) && isnan(getStylePositionBottom())) {
          top = absoultePositon->getPosition(kPositionEdgeTop);
          bottom = absoultePositon->getPosition(kPositionEdgeBottom);
        }
        delete absoultePositon;
        absoultePositon = nullptr;
      }
    }
  }

  void WXCoreLayoutNode::updateFlexLineForAbsoluteItem(WXCoreLayoutNode *const absoluteFlexItem, WXCoreFlexLine *const flexLine){
    flexLine->mMainSize = isMainAxisHorizontal(this) ?
                         absoluteFlexItem->getLayoutWidth() + absoluteFlexItem->getMarginLeft()
                             + absoluteFlexItem->getMarginRight() :
                         absoluteFlexItem->getLayoutHeight() + absoluteFlexItem->getMarginTop()
                             + absoluteFlexItem->getMarginBottom();
    flexLine->mCrossSize = isMainAxisHorizontal(this) ?
                          absoluteFlexItem->getLayoutHeight() + absoluteFlexItem->getMarginTop()
                              + absoluteFlexItem->getMarginBottom() :
                          absoluteFlexItem->getLayoutWidth() + absoluteFlexItem->getMarginLeft()
                              + absoluteFlexItem->getMarginRight();
    flexLine->mItemCount = 1;
    determineCrossSize(getLayoutWidth(),
                       getLayoutHeight(),
                       flexLine);
  }

  void WXCoreLayoutNode::onLayout(const float left, const float top, const float right, const float bottom,
                                  WXCoreLayoutNode *const absoulteItem, WXCoreFlexLine *const flexLine) {
      // determin direction
      if (mLayoutResult->mLayoutDirection == kDirectionInherit) {
          if(mCssStyle->mDirection == kDirectionInherit) {
              // default direction in css is inherit, inherit direction from parent node
              mLayoutResult->mLayoutDirection = NULL == mParent ? WEEXCORE_CSS_DEFAULT_DIRECTION : mParent->getLayoutDirection();
          } else {
              // specific direction in current Node's style
              mLayoutResult->mLayoutDirection = mCssStyle->mDirection;
          }
      }
      
      bool verticalRTL = false;
      if (mLayoutResult->mLayoutDirection == kDirectionRTL) {
          verticalRTL = mCssStyle->mFlexWrap != kWrapReverse;
      } else {
          verticalRTL = mCssStyle->mFlexWrap == kWrapReverse;
      }
      
      switch (mCssStyle->mFlexDirection) {
        case kFlexDirectionRow:
            layoutHorizontal(mLayoutResult->mLayoutDirection == kDirectionRTL, left, top, right, bottom, absoulteItem, flexLine);
            break;
        case kFlexDirectionRowReverse:
            layoutHorizontal(mLayoutResult->mLayoutDirection != kDirectionRTL, left, top, right, bottom, absoulteItem, flexLine);
            break;
          case kFlexDirectionColumnReverse:
              layoutVertical(verticalRTL, true, left, top, right, bottom, absoulteItem, flexLine);
              break;
          case kFlexDirectionColumn:
          default:
              layoutVertical(verticalRTL, false, left, top, right, bottom, absoulteItem, flexLine);
              break;
      }
  }

  /**
   * Sub method for {@link WXCoreLayoutNode #onLayout(int, int, int, int)} when the
   * {@link #mFlexDirection} is either {@link WXCoreFlexDirection #WXCore_Flex_Direction_Row} or
   * {@link WXCoreFlexDirection #WXCore_Flex_Direction_Row_REVERSE}.
   *
   * @param isRtl  {@code true} if the horizontal layout direction is mStyleRight to mStyleLeft, {@code
   *               false} otherwise.
   * @param left   the mStyleLeft position of this View
   * @param top    the mStyleTop position of this View
   * @param right  the mStyleRight position of this View
   * @param bottom the mStyleBottom position of this View
   */
  void WXCoreLayoutNode::layoutHorizontal(const bool isRtl,
                                          const float left, const float top,
                                          const float right, const float bottom,
                                          WXCoreLayoutNode *const absoulteItem,
                                          WXCoreFlexLine *const flexLine) {
    Index currentViewIndex = 0;
    float height = bottom - top;
    float width = right - left;

    // childBottom is used if the mFlexWrap is FLEX_WRAP_WRAP_REVERSE otherwise
    // childTop is used to align the vertical position of the children views.
    float childBottom = height - getPaddingBottom() - getBorderWidthBottom();
    float childTop = getPaddingTop() + getBorderWidthTop();

    // Used only for RTL layout
    // Use float to reduce the round error that may happen in when justifyContent ==
    // SPACE_BETWEEN or SPACE_AROUND
    float childLeft, childRight;
    const std::vector<WXCoreFlexLine*> &lines = (flexLine == nullptr? mFlexLines: std::vector<WXCoreFlexLine*>{flexLine});

    for (WXCoreFlexLine *flexLine: lines) {
      float spaceBetweenItem = 0.f;
      // Bugfix: when flex-direction is row-reverse, justify-content:flex-end is not available, it always performance as flex-start
      // layoutFlexlineHorizontal(width, flexLine, childLeft, childRight, spaceBetweenItem);
      layoutFlexlineHorizontal(isRtl, width, flexLine, childLeft, childRight, spaceBetweenItem);
      spaceBetweenItem = std::max(spaceBetweenItem, 0.f);

      if(absoulteItem == nullptr) {
        for (Index j = 0; j < flexLine->mItemCount; j++) {
          WXCoreLayoutNode *child = getChildAt(kNonBFC, currentViewIndex);
          if (child == nullptr) {
            continue;
          }
          layoutSingleChildHorizontal(isRtl, false, childBottom, childTop,
                                     flexLine, child, childLeft, childRight);
          childLeft += child->mLayoutResult->mLayoutSize.width + spaceBetweenItem + child->getMarginRight();
          childRight -= child->mLayoutResult->mLayoutSize.width + spaceBetweenItem + child->getMarginLeft();
          currentViewIndex++;
        }
        childTop += flexLine->mCrossSize;
        childBottom -= flexLine->mCrossSize;
      }
      else{
        layoutSingleChildHorizontal(isRtl, true, childBottom, childTop,
                                   flexLine, absoulteItem, childLeft, childRight);
      }
    }
  }

  void WXCoreLayoutNode::layoutFlexlineHorizontal(const bool isRTL,
                                                  const float width,
                                                  const WXCoreFlexLine *const flexLine,
                                                  float &childLeft,
                                                  float &childRight,
                                                  float &spaceBetweenItem) const {
      Index visibleCount, visibleItem;
      float denominator;
      switch (mCssStyle->mJustifyContent) {
          case kJustifyCenter:
              childLeft = (width - flexLine->mMainSize - mCssStyle->sumPaddingBorderOfEdge(kRight)
                              + mCssStyle->sumPaddingBorderOfEdge(kLeft)) / 2;
              childRight = childLeft + flexLine->mMainSize;
              break;
          case kJustifySpaceAround:
              visibleCount = flexLine->mItemCount;
              if (visibleCount != 0) {
                  spaceBetweenItem =
                  (width - flexLine->mMainSize - sumPaddingBorderAlongAxis(this, true)) / visibleCount;
              }
              childLeft = getPaddingLeft() + getBorderWidthLeft() + spaceBetweenItem / 2.f;
              childRight = width - getPaddingRight() - getBorderWidthRight() - spaceBetweenItem / 2.f;
              break;
          case kJustifySpaceBetween:
              childLeft = getPaddingLeft() + getBorderWidthLeft();
              visibleItem = flexLine->mItemCount;
              denominator = visibleItem != 1 ? visibleItem - 1 : 1.f;
              spaceBetweenItem =
              (width - flexLine->mMainSize - sumPaddingBorderAlongAxis(this, true)) / denominator;
              childRight = width - getPaddingRight() - getBorderWidthRight();
              break;
          case kJustifyFlexEnd:
              if (isRTL) {
                  childLeft = getPaddingLeft() + getBorderWidthLeft();
                  childRight = flexLine->mMainSize + getPaddingLeft() + getBorderWidthLeft();
              } else {
                  childLeft = width - flexLine->mMainSize - getPaddingRight() - getBorderWidthRight();
                  childRight = width - getPaddingRight() - getBorderWidthRight();
              }
              break;
          case kJustifyFlexStart:
          default:
              if (isRTL) {
                  childLeft = width - flexLine->mMainSize - getPaddingRight() - getBorderWidthRight();
                  childRight = width - getPaddingRight() - getBorderWidthRight();
              } else {
                  childLeft = getPaddingLeft() + getBorderWidthLeft();
                  childRight = flexLine->mMainSize + getPaddingLeft() + getBorderWidthLeft();
              }
              break;
      }
  }
    
  void WXCoreLayoutNode::layoutFlexlineHorizontal(const float width,
                              const WXCoreFlexLine *const flexLine,
                              float &childLeft,
                              float &childRight,
                              float &spaceBetweenItem) const {
      layoutFlexlineHorizontal(false, width, flexLine, childLeft, childRight, spaceBetweenItem);
  }

  void WXCoreLayoutNode::layoutSingleChildHorizontal(const bool isRtl, const bool absoulteItem,
                                                  float childBottom, float childTop,
                                                  WXCoreFlexLine *const flexLine,
                                                  WXCoreLayoutNode *const child,
                                                  float &childLeft, float &childRight) {
    childLeft += child->getMarginLeft();
    childRight -= child->getMarginRight();
    if (mCssStyle->mFlexWrap == kWrapReverse) {
      if (isRtl) {
        layoutSingleChildHorizontal(child,
                                    flexLine,
                                    mCssStyle->mFlexWrap,
                                    mCssStyle->mAlignItems,
                                    childRight - child->mLayoutResult->mLayoutSize.width,
                                    childBottom - child->mLayoutResult->mLayoutSize.height,
                                    childRight,
                                    childBottom,
                                    absoulteItem);
      } else {
        layoutSingleChildHorizontal(child,
                                    flexLine,
                                    mCssStyle->mFlexWrap,
                                    mCssStyle->mAlignItems,
                                    childLeft,
                                    childBottom - child->mLayoutResult->mLayoutSize.height,
                                    childLeft + child->mLayoutResult->mLayoutSize.width,
                                    childBottom,
                                    absoulteItem);
      }
    } else {
      if (isRtl) {
        layoutSingleChildHorizontal(child, flexLine, mCssStyle->mFlexWrap, mCssStyle->mAlignItems,
                                    childRight - child->mLayoutResult->mLayoutSize.width, childTop,
                                    childRight, childTop + child->mLayoutResult->mLayoutSize.height,
                                    absoulteItem);
      } else {
        layoutSingleChildHorizontal(child, flexLine, mCssStyle->mFlexWrap, mCssStyle->mAlignItems,
                                    childLeft, childTop,
                                    childLeft + child->mLayoutResult->mLayoutSize.width,
                                    childTop + child->mLayoutResult->mLayoutSize.height,
                                    absoulteItem);
      }
    }
  }

  /**
   * Place a single View when the layout direction is horizontal ({@link #mFlexDirection} is
   * either {@link WXCoreFlexDirection #WXCore_Flex_Direction_Row} or
   * {@link WXCoreFlexDirection #WXCore_Flex_Direction_Row_REVERSE}).
   *
   * @param node       the View to be placed
   * @param flexLine   the {@link WXCoreFlexLine} where the View belongs to
   * @param flexWrap   the flex wrap attribute of this BasicLayoutNode
   * @param alignItems the align items attribute of this BasicLayoutNode
   * @param left       the mStyleLeft position of the View, which the View's margin is already taken
   *                   into account
   * @param top        the mStyleTop position of the flex line where the View belongs to. The actual
   *                   View's mStyleTop position is shifted depending on the flexWrap and alignItems
   *                   attributes
   * @param right      the mStyleRight position of the View, which the View's margin is already taken
   *                   into account
   * @param bottom     the mStyleBottom position of the flex line where the View belongs to. The actual
   *                   View's mStyleBottom position is shifted depending on the flexWrap and alignItems
   *                   attributes
   */
  void WXCoreLayoutNode::layoutSingleChildHorizontal(WXCoreLayoutNode *const node, WXCoreFlexLine* const flexLine,
                                                     const WXCoreFlexWrap flexWrap, WXCoreAlignItems alignItems,
                                                     const float left, const float top, const float right, const float bottom, const bool absoluteFlexItem) {
    if (node->mCssStyle->mAlignSelf != kAlignSelfAuto) {
      // Expecting the values for alignItems and alignSelf match except for ALIGN_SELF_AUTO.
      // Assigning the alignSelf value as alignItems should work.
      alignItems = static_cast<WXCoreAlignItems>(node->mCssStyle->mAlignSelf);
    }

    float crossSize = flexLine->mCrossSize;

    switch (alignItems) {
      case kAlignItemsFlexStart:
      case kAlignItemsStretch:
        if (flexWrap != kWrapReverse) {
          node->layout(left, top + node->getMarginTop(), right, bottom + node->getMarginTop(), absoluteFlexItem);
        } else {
          node->layout(left, top - node->getMarginBottom(), right, bottom - node->getMarginBottom(), absoluteFlexItem);
        }
        break;
      case kAlignItemsFlexEnd:
        if (flexWrap != kWrapReverse) {
          node->layout(left,
                       top + crossSize - node->mLayoutResult->mLayoutSize.height - node->getMarginBottom(),
                       right, top + crossSize - node->getMarginBottom(), absoluteFlexItem);
        } else {
          // If the flexWrap == FLEX_WRAP_WRAP_REVERSE, the direction of the
          // flexEnd is flipped (from mStyleTop to mStyleBottom).
          node->layout(left, top - crossSize + node->mLayoutResult->mLayoutSize.height + node->getMarginTop(),
                       right, bottom - crossSize + node->mLayoutResult->mLayoutSize.height + node->getMarginTop(), absoluteFlexItem);
        }
        break;
      case kAlignItemsCenter:
        float topFromCrossAxis = (crossSize - node->mLayoutResult->mLayoutSize.height
                                  + node->getMarginTop() - node->getMarginBottom()) / 2;
        if (flexWrap != kWrapReverse) {
          node->layout(left, top + topFromCrossAxis,
                       right, top + topFromCrossAxis + node->mLayoutResult->mLayoutSize.height, absoluteFlexItem);
        } else {
          node->layout(left, top - topFromCrossAxis,
                       right, top - topFromCrossAxis + node->mLayoutResult->mLayoutSize.height, absoluteFlexItem);
        }
        break;
    }
  }

  /**
   * Sub method for {@link WXCoreLayoutNode #onLayout(int, int, int, int)} when the
   * {@link #mFlexDirection} is either {@link WXCoreFlexDirection #WXCore_Flex_Direction_Column} or
   * {@link WXCoreFlexDirection #WXCore_Flex_Direction_Column_Reverse}.
   *
   * @param isRtl           {@code true} if the horizontal layout direction is mStyleRight to mStyleLeft,
   *                        {@code false}
   *                        otherwise
   * @param fromBottomToTop {@code true} if the layout direction is mStyleBottom to mStyleTop, {@code false}
   *                        otherwise
   * @param left            the mStyleLeft position of this View
   * @param top             the mStyleTop position of this View
   * @param right           the mStyleRight position of this View
   * @param bottom          the mStyleBottom position of this View
   */
  void
  WXCoreLayoutNode::layoutVertical(const bool isRtl,
                                   const bool fromBottomToTop,
                                   const float left, const float top,
                                   const float right, const float bottom,
                                   WXCoreLayoutNode *const absoulteItem,
                                   WXCoreFlexLine *const flexLine) {
    float childLeft = getPaddingLeft() + getBorderWidthLeft();
    Index currentViewIndex = 0;
    float width = right - left;
    float height = bottom - top;

    // childRight is used if the mFlexWrap is FLEX_WRAP_WRAP_REVERSE otherwise
    // childLeft is used to align the horizontal position of the children views.
    float childRight = width - getPaddingRight() - getBorderWidthRight();

    // Use float to reduce the round error that may happen in when justifyContent ==
    // SPACE_BETWEEN or SPACE_AROUND
    float childTop, childBottom;
    const std::vector<WXCoreFlexLine*> &lines = (flexLine == nullptr? mFlexLines: std::vector<WXCoreFlexLine*>{flexLine});

    for (WXCoreFlexLine *flexLine : lines) {
      float spaceBetweenItem = 0.f;
      layoutFlexlineVertical(height, flexLine, childTop, childBottom, spaceBetweenItem);
      spaceBetweenItem = std::max(spaceBetweenItem, 0.f);
      if(absoulteItem == nullptr) {
        for (Index j = 0; j < flexLine->mItemCount; j++) {
          WXCoreLayoutNode *child = getChildAt(kNonBFC, currentViewIndex);
          if (child == nullptr) {
            continue;
          }
          layoutSingleChildVertical(isRtl, fromBottomToTop, false,
                                    childLeft, childRight, flexLine,
                                    child, childTop, childBottom);
          childTop += child->mLayoutResult->mLayoutSize.height + spaceBetweenItem + child->getMarginBottom();
          childBottom -= child->mLayoutResult->mLayoutSize.height + spaceBetweenItem + child->getMarginTop();
          currentViewIndex++;
        }
        childLeft += flexLine->mCrossSize;
        childRight -= flexLine->mCrossSize;
      }
      else{
        layoutSingleChildVertical(isRtl, fromBottomToTop, true,
                                  childLeft, childRight, flexLine,
                                  absoulteItem, childTop, childBottom);
      }
    }
  }

  void WXCoreLayoutNode::layoutFlexlineVertical(const float height,
                            const WXCoreFlexLine *const flexLine,
                            float &childTop,
                            float &childBottom,
                            float &spaceBetweenItem) const {
    Index visibleCount, visibleItem;
    float denominator;
    switch (mCssStyle->mJustifyContent) {
      case kJustifyFlexEnd:
        childTop = height - flexLine->mMainSize - getPaddingBottom() - getBorderWidthBottom();
        childBottom = height - getPaddingTop() - getBorderWidthTop();
        break;
      case kJustifyCenter:
        childTop = (height - flexLine->mMainSize - mCssStyle->sumPaddingBorderOfEdge(kBottom)
            + mCssStyle->sumPaddingBorderOfEdge(kTop)) / 2;
        childBottom = childTop + flexLine->mMainSize;
        break;
      case kJustifySpaceAround:
        visibleCount = flexLine->mItemCount;
        if (visibleCount != 0) {
          spaceBetweenItem = (height - flexLine->mMainSize - sumPaddingBorderAlongAxis(this, false))
              / visibleCount;
        }
        childTop = getPaddingTop() + getBorderWidthTop() + spaceBetweenItem / 2;
        childBottom = height - getPaddingBottom() - getBorderWidthBottom() - spaceBetweenItem / 2;
        break;
      case kJustifySpaceBetween:
        childTop = getPaddingTop() + getBorderWidthTop();
        visibleItem = flexLine->mItemCount;
        denominator = visibleItem != 1 ? visibleItem - 1 : 1.f;
        spaceBetweenItem =
            (height - flexLine->mMainSize - sumPaddingBorderAlongAxis(this, false)) / denominator;
        childBottom = height - getPaddingBottom() - getBorderWidthBottom();
        break;
      case kJustifyFlexStart:
      default:
        childTop = getPaddingTop() + getBorderWidthTop();
        childBottom = height - getPaddingBottom() - getBorderWidthBottom();
        break;
    }
  }

  void WXCoreLayoutNode::layoutSingleChildVertical(const bool isRtl, const bool fromBottomToTop,
                                                   const bool absoluteFlexItem,
                                                   const float childLeft, const float childRight,
                                                   WXCoreFlexLine *const flexLine,
                                                   WXCoreLayoutNode *const child,
                                                   float &childTop, float &childBottom) {
    childTop += child->getMarginTop();
    childBottom -= child->getMarginBottom();
    if (isRtl) {
      if (fromBottomToTop) {
        layoutSingleChildVertical(child, flexLine, true,
                                  mCssStyle->mAlignItems,
                                  childRight - child->mLayoutResult->mLayoutSize.width,
                                  childBottom - child->mLayoutResult->mLayoutSize.height,
                                  childRight, childBottom, absoluteFlexItem);
      } else {
        layoutSingleChildVertical(child, flexLine, true, mCssStyle->mAlignItems,
                                  childRight - child->mLayoutResult->mLayoutSize.width, childTop,
                                  childRight, childTop + child->mLayoutResult->mLayoutSize.height,
                                  absoluteFlexItem);
      }
    } else {
      if (fromBottomToTop) {
        layoutSingleChildVertical(child, flexLine, false, mCssStyle->mAlignItems,
                                  childLeft, childBottom - child->mLayoutResult->mLayoutSize.height,
                                  childLeft + child->mLayoutResult->mLayoutSize.width, childBottom,
                                  absoluteFlexItem);
      } else {
        layoutSingleChildVertical(child, flexLine, false, mCssStyle->mAlignItems,
                                  childLeft, childTop,
                                  childLeft + child->mLayoutResult->mLayoutSize.width,
                                  childTop + child->mLayoutResult->mLayoutSize.height,
                                  absoluteFlexItem);
      }
    }
  }

  /**
   * Place a single View when the layout direction is vertical ({@link #mFlexDirection} is
   * either {@link WXCoreFlexDirection #WXCore_Flex_Direction_Column} or
   * {@link WXCoreFlexDirection #WXCore_Flex_Direction_Column_Reverse}).
   *
   * @param node       the View to be placed
   * @param flexLine   the {@link FlexLine} where the View belongs to
   * @param isRtl      {@code true} if the layout direction is mStyleRight to mStyleLeft, {@code false}
   *                   otherwise
   * @param alignItems the align items attribute of this BasicLayoutNode
   * @param left       the mStyleLeft position of the flex line where the View belongs to. The actual
   *                   View's mStyleLeft position is shifted depending on the isRtl and alignItems
   *                   attributes
   * @param top        the mStyleTop position of the View, which the View's margin is already taken
   *                   into account
   * @param right      the mStyleRight position of the flex line where the View belongs to. The actual
   *                   View's mStyleRight position is shifted depending on the isRtl and alignItems
   *                   attributes
   * @param bottom     the mStyleBottom position of the View, which the View's margin is already taken
   *                   into account
   */
  void WXCoreLayoutNode::layoutSingleChildVertical(WXCoreLayoutNode* const node, WXCoreFlexLine* const flexLine, const bool isRtl,
                                                   WXCoreAlignItems alignItems, const float left, const float top, const float right,
                                                   const float bottom, const bool absoluteFlexItem) {
    if (node->mCssStyle->mAlignSelf != kAlignSelfAuto) {
      // Expecting the values for alignItems and alignSelf match except for ALIGN_SELF_AUTO.
      // Assigning the alignSelf value as alignItems should work.
      alignItems = static_cast<WXCoreAlignItems>(node->mCssStyle->mAlignSelf);
    }

    float crossSize = flexLine->mCrossSize;

    switch (alignItems) {
      case kAlignItemsFlexStart:
      case kAlignItemsStretch:
        if (!isRtl) {
          node->layout(left + node->getMarginLeft(), top, right + node->getMarginLeft(), bottom, absoluteFlexItem);
        } else {
          node->layout(left - node->getMarginRight(), top, right - node->getMarginRight(), bottom, absoluteFlexItem);
        }
        break;
      case kAlignItemsFlexEnd:
        if (!isRtl) {
          node->layout(left + crossSize - node->mLayoutResult->mLayoutSize.width - node->getMarginRight(),
                       top, right + crossSize - node->mLayoutResult->mLayoutSize.width - node->getMarginRight(),
                       bottom, absoluteFlexItem);
        } else {
          // If the flexWrap == FLEX_WRAP_WRAP_REVERSE, the direction of the
          // flexEnd is flipped (from mStyleLeft to mStyleRight).
          node->layout(left - crossSize + node->mLayoutResult->mLayoutSize.width + node->getMarginLeft(), top,
                       right - crossSize + node->mLayoutResult->mLayoutSize.width + node->getMarginLeft(),
                       bottom, absoluteFlexItem);
        }
        break;
      case kAlignItemsCenter:
        float leftFromCrossAxis = (crossSize - node->mLayoutResult->mLayoutSize.width
                                   + node->getMarginLeft()
                                   - node->getMarginRight()) / 2.f;
        if (!isRtl) {
          node->layout(left + leftFromCrossAxis, top, right + leftFromCrossAxis, bottom, absoluteFlexItem);
        } else {
          node->layout(left - leftFromCrossAxis, top, right - leftFromCrossAxis, bottom, absoluteFlexItem);
        }
        break;
    }
  }
    void WXCoreLayoutNode::determineChildLayoutDirection(const WXCoreDirection direction) {
        for (Index i = 0; i < getChildCount(kBFC); ++i) {
            WXCoreLayoutNode *child = getChildAt(kBFC, i);
            if (child == nullptr) {
                continue;
            }
            if (child->mLayoutResult == nullptr || child->mCssStyle == nullptr) {
                continue;
            }
            // determin direction
            if (child->mLayoutResult->mLayoutDirection == kDirectionInherit) {
                if(child->mCssStyle->mDirection == kDirectionInherit) {
                    // default direction in css is inherit, inherit direction from parent node
                    child->mLayoutResult->mLayoutDirection = direction;
                } else {
                    // specific direction in current Node's style
                    child->mLayoutResult->mLayoutDirection = child->mCssStyle->mDirection;
                }
            }
        }
    }
    
    WXCoreDirection WXCoreLayoutNode::getLayoutDirectionFromPathNode() {
        if (getLayoutDirection() != kDirectionInherit)
            return getLayoutDirection();
        if (getDirection() != kDirectionInherit) {
            mLayoutResult->mLayoutDirection = getDirection();
            return getLayoutDirection();
        } else if (nullptr != mParent) {
            mLayoutResult->mLayoutDirection = mParent->getLayoutDirectionFromPathNode();
            return getLayoutDirection();
        }
        return WEEXCORE_CSS_DEFAULT_DIRECTION;
    }
}


