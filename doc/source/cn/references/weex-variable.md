---
title: Weex 实例变量
type: references
order: 7
version: 2.1
has_chapter_content: true
---

# Weex 实例变量

每个 Weex 页面的 JS 上下文中都有一个相互独立的 `weex` 变量，用来持有当前 Weex 页面相关的单例内容或方法。

## `weex.config`

该变量包含了当前 Weex 页面的所有环境信息，包括不仅限于：

* `bundleUrl: string`: JS bundle 的 URL。
* `env: Object`: 环境对象。
    * `weexVersion: string`: Weex sdk 版本。
    * `appName: string`: 应用名字。
    * `appVersion: string`: 应用版本。
    * `platform: string`: 平台信息，是 iOS、Android 还是 Web。
    * `osVersion: string`: 系统版本。
    * `deviceModel: string`: 设备型号 (仅原生应用)。
    * `deviceWidth: number`: 设备宽度，默认为 750。
    * `deviceHeight: number`: 设备高度。

## `weex.requireModule(module: string): Object`

获取某个 native module 的所有方法，比如：

```html
<template>
  <div><text>Hello World</text></div>
</template>
<script>
  var modal = weex.requireModule('modal')
  modal.toast({
    message: 'I am a toast.',
    duration: 3
  })
</script>
```

## `weex.document: Document`

返回当前 Weex 页面的文档对象。