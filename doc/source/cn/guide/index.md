---
title: 快速上手
type: guide
order: 1
version: 2.1
has_chapter_content: true
---

# 快速上手

Weex 是一套简单易用的跨平台开发方案，能以 web 的开发体验构建高性能、可扩展的 native 应用，为了做到这些，Weex 与  Vue 合作，使用 Vue 作为上层框架，并遵循 W3C 标准实现了统一的 JSEngine 和 DOM API，这样一来，你甚至可以使用其他框架驱动 Weex，打造三端一致的 native 应用。

## Vue 是什么？

Vue.js 是 Evan You 开发的渐进式 JavaScript 框架，在易用性、灵活性和性能等方面都非常优秀。开发者能够通过撰写 `*.vue` 文件，基于 `<template>`, `<style>`, `<script>` 快速构建组件化的 web 应用。

## Hello World

尝试 Weex 最简单的方法是使用 [Playground App](https://alibaba.github.io/weex/download.html) 和在 [dotWe](http://dotwe.org) 编写一个 [Hello World](http://dotwe.org/vue/4d5a0471ece3daabd4681bc6d703c4c1) 例子。你不需要考虑安装开发环境或编写 native 代码，只需要做下面两件事：

- 为你的手机安装 [Playground App](https://alibaba.github.io/weex/download.html)，当然，Weex 是跨平台的框架，你依然可以使用浏览器进行预览，只是这样你就无法感受到 native 优秀的体验了。
- 在新标签页中打开 [Hello World](http://dotwe.org/vue/4d5a0471ece3daabd4681bc6d703c4c1) 例子，点击预览，然后用  Playground 扫码即可。


![mobile_preview](https://img.alicdn.com/tps/TB1Ymw3OpXXXXcvXpXXXXXXXXXX-500-1013.jpg)

很简单，我们可以看到语法就是我们熟悉的 Vue。你可以修改这个例子，再次扫码尝试。

## 搭建开发环境

### 第一步：安装依赖

Weex 官方提供了 weex-toolkit 的脚手架工具来辅助开发和调试。首先，你需要 Node.js 和 weex-toolkit。

安装 Node.js 方式多种多样，最简单的方式是在 [Node.js 官网](https://nodejs.org/en/) 下载可执行程序直接安装即可。

对于 Mac，可以使用 [Homebrew](http://brew.sh/) 进行安装：

```bash
brew install node
```

> 更多安装方式可参考 [Node.js 官方信息](https://nodejs.org/en/download/)

安装完成后，可以使用以下命令检测是否安装成功：

```bash
$ node -v
v6.3.1
$ npm -v
3.10.3
```

通常，安装了 Node.js 环境，npm 包管理工具也随之安装了。因此，直接使用 npm 来安装 weex-toolkit。

> npm 是一个 JavaScript 包管理工具，它可以让开发者轻松共享和重用代码。Weex 很多依赖来自社区，同样，Weex 也将很多工具发布到社区方便开发者使用。

**注意: ** weex-toolkit 目前仅有最新的 beta 版本开始才支持初始化 Vue 项目，使用前请确认版本是否正确。

```bash
$ npm install -g weex-toolkit@beta
```	  

国内开发者可以考虑使用淘宝的 npm 镜像 —— [cnpm](https://npm.taobao.org/) 安装 weex-toolkit

```bash
$ npm install -g cnpm
$ cnpm install -g weex-toolkit@beta
```

*提示：*

如果提示权限错误（*permission error*），使用 `sudo` 关键字进行安装

```bash
$ sudo cnpm install -g weex-toolkit@beta
```

安装结束后你可以直接使用 `weex` 命令验证是否安装成功，它会显示 `weex` 命令行工具各参数：

![](https://img.alicdn.com/tps/TB1kHFrOFXXXXaYXXXXXXXXXXXX-615-308.jpg)

### 第二步：初始化

然后初始化 Weex 项目：

```bash
$ weex init awesome-project
```

执行完命令后，在 `awesome-project` 目录中就创建了一个使用 Weex 和 Vue 的模板项目。

### 第三步：开发

之后我们进入项目所在路径，weex-toolkit 已经为我们生成了标准项目结构。

在 `package.json` 中，已经配置好了几个常用的 npm script，分别是：

- `build`: 源码打包，生成 JS Bundle
- `dev`: webpack watch 模式，方便开发
- `serve`: 开启静态服务器
- `debug`: 调试模式

我们先通过 `npm install` 安装项目依赖。之后运行 `npm run dev` 和 `npm run serve` 开启watch 模式和静态服务器。

然后我们打开浏览器，进入 `http://localhost:8080/index.html` 即可看到 weex h5 页面。 

初始化时已经为我们创建了基本的示例，我们可以在 `src/foo.vue` 中查看。

代码如下所示：

```html
<template>
  <div class="wrapper">
    <text class="weex">Hello Weex !</text>
    <text class="vue">Hello Vue !</text>
  </div>
</template>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .weex {
   font-size: 60px;
   text-align: center;
   color: #1B90F7;
  }
  .vue {
   font-size: 60px;
   text-align: center;
   margin-top: 30px;
   color: #41B883;
  }
</style>
```

关于 Weex 语法部分，你可以直接参考 [Vue Guide](https://vuejs.org/v2/guide/)，这里不再重复介绍。如果您想了解有关技术详情的更多信息，请继续阅读下一节。并且不要忘记在 dotWe 写代码并随时预览。