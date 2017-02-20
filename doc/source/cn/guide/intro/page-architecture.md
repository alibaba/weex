---
title: Weex 页面结构
type: guide
order: 4.6
version: 2.1
---

# Weex 页面结构

一个 Weex 页面就是一个相对独立解耦的移动应用界面，它不仅包括了界面展示、更包含了逻辑处理、设备能力使用、生命周期管理等部分。

## 界面

### DOM 模型

Weex 页面通过类似 HTML DOM 的方式管理界面，首先页面会被分解为一个 DOM 树，，每个 DOM 结点都代表了一个相对独立的 native 视图的单元。然后不同的视图单元之间通过树形结构组合在了一起，构成一个完整的页面。

**相关链接**

* [Weex Native DOM APIs](../../references/native-dom-api.html)

### 组件

Weex 支持文字、图片、视频等内容型组件，也支持 div、list、scroller 等容器型组件，还包括 slider、input、textarea、switch 等多种特殊的组件。Weex 的界面就是由这些组件以 DOM 树的方式构建出来的。

**相关链接**

* [Weex 组件列表](../../references/components/index.html)

### 布局系统

Weex 页面中的组件会按照一定的布局规范来进行排布，我们这里提供了 CSS 中的盒模型、flexbox 和 绝对/相对/固定/吸附布局这三大块布局模型。

* 盒模型：通过宽、高、边框、内外边距、边框等 CSS 属性描述一个组件本身的尺寸。
* flexbox：通过 CSS 3 Flexbox 布局规范定义和描述组件之间的空间分布情况。
* position：支持 CSS position 属性中的 `absolute`, `relative`, `fixed`, `sticky` 位置类型，其中 `relative` 是默认值。

## 功能

Weex 提供了非常丰富的系统功能 API，包括弹出存储、网络、导航、弹对话框和 toast 等，开发者可以在 Weex 页面通过获取一个 native module 的方式引入并调用这些客户端功能 API。

**相关链接**

* [Weex 模块列表](../../references/modules/index.html)

## 生命周期

每个 Weex 页面都有其自身的生命周期，页面从开始被创建到最后被销毁，会经历到整个过程。这是通过对 Weex 页面的创建和销毁，在路由中通过 SDK 自行定义并实现的。
