---
title: 手势
type: references
order: 1.7
version: 2.1
---

# 手势

*注：该功能属于实验性功能*

Weex 封装了原生的触摸事件以提供手势系统。使用手势类似于在 Weex 中使用事件，只需在节点上设置 `on` 特性来监听手势即可。

## 手势类型

目前，仅支持以下四种手势类型：

- **Touch**：当触摸到一个点，移动或从触摸面移开时触发 `touch` 手势。触摸手势很精准，它会返回所有详细的事件信息。所以，监听 `touch` 手势可能很慢，即使只移动一丁点也需要处理大量事件。有三种类型的 `touch` 手势：

	- `touchstart` 将在触摸到触摸面上时触发。
	- `touchmove` 将在触摸点在触摸面移动时被触发。
	- `touchend` 将在从触摸面离开时被触发。

- **Pan**：`pan` 手势也会返回触摸点在触摸面的移动信息，有点类似于 `touch` 手势。但是 `pan` 手势只会采样收集部分事件信息因此比 `touch` 事件要快得多，当然精准性差于 `touch`。`pan` 也有三中类型的手势，这些手势的意义与 `touch` 完全一样：

	- `panstart`
	- `panmove`
	- `panend`

- **Swipe**：`swipe` 将会在用户在屏幕上滑动时触发，一次连续的滑动只会触发一次 `swiper` 手势。
- **LongPress**：`LongPress` 将会在触摸点连续保持 500 ms以上时触发。

`touch` 和 `pan` 非常接近，它们的特点可以总结成这样：

- **Touch**：完整信息，精准、很慢
- **Pan**：抽样信息，很快，不够精准

开发者可以根据自己的情况选择合适的手势。

## 属性

以下属性可以在手势的回调中使用：

- `direction`：仅在 `swipe` 手势中存在，返回滑动方向，返回值可能为 `up`, `left`, `bottom`, `right`。
- `changedTouches`：一个数组，包含了当前手势的触摸点的运动轨迹

### changedTouches

`changedTouches` 是一个数组，其子元素中包含以下属性：

- `identifier`：触摸点的唯一标识符。
- `pageX`：触摸点相对于文档左侧边缘的 X 轴坐标。
- `pageY`：触摸点相对于文档顶部边缘的 Y 轴坐标。
- `screenX`：触摸点相对于屏幕左侧边缘的 X 轴坐标。
- `screenY`：触摸点相对于屏幕顶部边缘的 Y 轴坐标。

## 约束

目前，由于会触发大量事件冲突，Weex Android 还不支持在滚动类型的元素上监听手势，例如 `scroller`, `list` 和 `webview` 这三个组件。
