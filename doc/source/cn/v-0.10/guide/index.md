---
title: 上手教程
type: guide
order: 1
has_chapter_content: true
version: 0.10
---

# 起步教程

Weex 是一套简单易用的跨平台开发方案，能以 web 的开发体验构建高性能、可扩展的 native 应用，为了做到这些，Weex 与  Vue 合作，使用 Vue 作为上层框架，并遵循 W3C 标准实现了统一的 JSEngine 和 DOM API，这样一来，你甚至可以使用其他框架驱动 Weex，打造三端一致的 native 应用。

尝试 Weex 最简单的方法是使用 [Playground App](https://alibaba.github.io/weex/download.html) 和在 [dotWe](http://dotwe.org) 编写一个 [Hello World](http://dotwe.org/656345423a7ef46f4b897ff471fd2ab5) 例子。你不需要考虑安装开发环境或编写 native 代码，只需要做下面两件事：

- 为你的手机安装 [Playground App](https://alibaba.github.io/weex/download.html)，当然，Weex 是跨平台的框架，你依然可以使用浏览器进行预览，只是这样你就无法感受到 native 优秀的体验了。
- 在新标签页中打开 [Hello World](http://dotwe.org/656345423a7ef46f4b897ff471fd2ab5) 例子，点击预览，然后用  Playground 扫码即可。

在这个例子中，我们看到了熟悉的 HTML 语义化标签、CSS 样式和 Javascript 代码。这是一个最简单的 Weex 示例，它在页面中渲染了一个 "Hello World"。

![mobile_preview](https://img.alicdn.com/tps/TB1Ymw3OpXXXXcvXpXXXXXXXXXX-500-1013.jpg)

## 发生了什么？

就如示例代码所示：

```html
<template>
  <div>
    <text class="text">{{text}}</text>
  </div>
</template>

<style>
  .text {
    font-size: 50;
  }
</style>

<script>
  module.exports = {
    data: {
        text: 'Hello World.'
    }
  }
</script>
```

我们暂时不去关心 Weex 的技术细节，仅看大致的代码结构。Weex 代码由三部分构成：`template`、`style`、`script`，这三个概念之于 Weex 就如 HTML，CSS，JavaScript 之于 Web。

模板部分赋予 Weex 以骨架，由标签以及标签包围的内容构成，标签中能添加 `attribute（特性）`，不同的 `attribute` 有不同的含义，例如 class 特性让同样的样式可以作用于多组 Weex 标签， onclick 特性让标签能对用户点击事件作出回应。

样式部分描述 Weex 标签如何显示。和你一样，我们喜欢 CSS，所以 Weex 中的样式尽量和 CSS 标准一致。Weex 支持很多 CSS 中的特性： margin, padding, fixed...... 更好的是， flexbox 布局模型在 Weex 中获得了很好的支持。

脚本部分为 Weex 标签添加数据与逻辑，在这里你能方便的访问本地或远程的数据并动态更新。你还能定义方法并让这些方法响应不同的事件。Weex 脚本的组织方式基本遵循于 CommonJS module 规范。

是不是觉得这些语法有些眼熟？没错，Weex 语法参考了 [Vue](https://github.com/vuejs/vue)，如果你熟悉 Vue，你会很快适应 Weex 语法（最新的 Weex framework 将会基于 [Vue 2.0](https://github.com/vuejs/vue) 开发，完全兼容 Vue，可参见我们的 [Roadmap](https://github.com/weexteam/weex-vue-framework/issues/9)），更好的是，我们拥抱规范，尽可能的按照 W3C 标准进行实现，因此，你大可不必担心 Weex 三端差异。

你可以试着修改 [Hello World](http://dotwe.org/656345423a7ef46f4b897ff471fd2ab5) 的代码，再次点击预览即可生成新的二维码进行扫描。

Weex 不止是个 Demo，在接下来的章节中，你还会看到更多 Weex 开发 native 应用并将其集成到你的 App 中的精彩教程。不要忘了随时在 [dotWe](http://dotwe.org) 中编写代码验证并通过 [Playground App](https://alibaba.github.io/weex/download.html) 预览。
