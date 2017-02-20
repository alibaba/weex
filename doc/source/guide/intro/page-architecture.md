---
title: Weex Page Architecture
type: guide
order: 4.6
version: 2.1
---

# Weex Page Architecture

A Weex page is a independent mobile page which includes UI, interaction logic, device power, lifecycle management etc.

## UI

### Native DOM Model

Weex page has its HTML-like DOM model to manage UI. It will be decomposed into a DOM tree which consists of some DOM nodes.

**Links**

* [Weex Native DOM APIs](../../references/native-dom-api.html)

### Components

Weex supports many kinds of components. Some of them are content components such as text, image and videos. Some of them are container components such as div, list, scroller. Also there are some special components like slider, input, textarea, and switch.

**Links**

* [All components Weex supports](../../references/components/index.html)

### Layout System

Weex use some CSS properties to layout every nodes in the DOM tree together. It includes:

* Box model: Describe the `width`, `height`, `padding`, `margin` and `border` of a component node.
* Flexbox: Describe the relations between different nodes with CSS Flexbox Spec.
* Supportting `absolute`, `relative`, `fixed` and `sticky` value of CSS `position` property.

### Features

Weex supports lots of device features through modules such as storage, navigation, modals etc. Each of them exposes some JS APIs.

**Links**

* [All modules Weex supports](../../references/modules/index.html)

### Lifecycle

Every Weex page has its lifecycle which is defined and implemented in WeexSDK. All Weex pages will go through the whole process, from being created and last to being destroyed.
