---
title: Path (英)
type: references
order: 1.9
version: 2.1
has_chapter_content: true
---

# Path

<span class="weex-version">v0.9+</span>

本文将介绍 Weex 中 uri(url) 的用法。包括使用图像、字体等资源，处理相对路径以及如何访问本地及打包的资源文件。

## Schemes

* 本地资源

  Weex SDK 提供 `local`  scheme 来访问打包在应用程序中的资源，此 scheme 无法在 H5 环境下使用。目前，开发者可以在 `image` 组件和字体文件中使用本地资源。 

  * 在 iOS 中，Weex 会在 `bundle resources` 中查找。例如，`image` 组件的 `src` 属性为 `local：//app_icon'`， Weex 会加载 `bundle resouce` 中名为 `app_icon` 的图像资源，而字体文件也以相同的方式工作。 

  * 在 Android 中，`image` 组件将从 `drawable` 资源文件夹加载，如  `res/drawable-xxx`。但加载字体文件是不同的，Android 框架无法从 `res` 加载字体文件，因此 SDK 将从 `asserts` 文件夹加载它。

* HTTP/HTTPS   

  它的工作方式与 web 相同，Weex 一直支持这种方式。  

* File    

使用 `file`  scheme 访问本地磁盘文件。这个方案有其局限性：你不应该在源页面中硬编码文件 url。因为不管它是否在不同的平台（iOS，Android）上运行，内容将在另一个设备上完全不同，这取决于具体的设备。

所以一种可行的方案是在运行时动态获取文件 url，你可以使用它来显示本地磁盘的图像，或者稍后上传它。

## 相对路径

[与我们在 HTML 中的用法类似](https://www.w3.org/TR/html4/types.html#type-uri)，Weex 以相同的方式处理相对路径。以`/`、`.`、`..`、`//` 开头的相对 URI 将相对于 bunle url 解析。

这意味着， 一个以 `/` 开头的路径将是相对于 JS Bundle 文件的根文件夹。`.` 则是当前文件夹，`..` 是父文件夹。 `//` 则被解析为与 JS Bundle 相同的 scheme。

## URI Adapter

以上所有是默认实现，开发者可以通过提供一个 `URI Adapter` 来扩展或覆盖默认实现。与其他 Adapter 相同，应在 Weex SDK 初始化之前设置自定义 Adapter。