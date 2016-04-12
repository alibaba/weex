package com.taobao.weex.dom;

import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.utils.WXViewUtils;

class CSSTransformFromStyle {

  public static void transformStyle(WXDomObject node) {
    if (node != null && node.style != null && !node.style.isEmpty()) {
      node.setAlignItems(node.style.getAlignItems());
      node.setAlignSelf(node.style.getAlignSelf());
      node.setFlex(node.style.getFlex());
      node.setFlexDirection(node.style.getFlexDirection());
      node.setJustifyContent(node.style.getJustifyContent());
      node.setWrap(node.style.getCSSWrap());

      node.setMinWidth(WXViewUtils.getRealPxByWidth(node.style.getMinWidth()));
      node.setMaxWidth(WXViewUtils.getRealPxByWidth(node.style.getMaxWidth()));
      node.setMinHeight(WXViewUtils.getRealPxByWidth(node.style.getMinHeight()));
      node.setMaxHeight(WXViewUtils.getRealPxByWidth(node.style.getMaxHeight()));

      node.setMargin(Spacing.LEFT, WXViewUtils.getRealPxByWidth(node.style.getMarginLeft()));
      node.setMargin(Spacing.TOP, WXViewUtils.getRealPxByWidth(node.style.getMarginTop()));
      node.setMargin(Spacing.RIGHT, WXViewUtils.getRealPxByWidth(node.style.getMarginRight()));
      node.setMargin(Spacing.BOTTOM, WXViewUtils.getRealPxByWidth(node.style.getMarginBottom()));

      node.setPadding(Spacing.LEFT, WXViewUtils.getRealPxByWidth(node.style.getPaddingLeft()));
      node.setPadding(Spacing.TOP, WXViewUtils.getRealPxByWidth(node.style.getPaddingTop()));
      node.setPadding(Spacing.RIGHT, WXViewUtils.getRealPxByWidth(node.style.getPaddingRight()));
      node.setPadding(Spacing.BOTTOM, WXViewUtils.getRealPxByWidth(node.style.getPaddingBottom()));

      node.setPositionType(node.style.getPosition());
      node.setPositionLeft(WXViewUtils.getRealPxByWidth(node.style.getLeft()));
      node.setPositionTop(WXViewUtils.getRealPxByWidth(node.style.getTop()));
      node.setPositionRight(WXViewUtils.getRealPxByWidth(node.style.getRight()));
      node.setPositionBottom(WXViewUtils.getRealPxByWidth(node.style.getBottom()));

      node.setBorder(Spacing.TOP, WXViewUtils.getRealPxByWidth(node.style.getBorderTopWidth()));
      node.setBorder(Spacing.RIGHT, WXViewUtils.getRealPxByWidth(node.style.getBorderRightWidth()));
      node.setBorder(Spacing.BOTTOM, WXViewUtils.getRealPxByWidth(node.style.getBorderBottomWidth()));
      node.setBorder(Spacing.LEFT, WXViewUtils.getRealPxByWidth(node.style.getBorderLeftWidth()));

      node.setStyleHeight(WXViewUtils.getRealPxByWidth(node.style.getHeight()));
      node.setStyleWidth(WXViewUtils.getRealPxByWidth(node.style.getWidth()));
    }
  }
}
