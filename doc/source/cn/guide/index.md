---
title: 快速上手
type: guide
order: 1
version: 2.1
has_chapter_content: true
---

# 快速上手

Vue.js 是 Evan You 开发的渐进式 JavaScript 框架，在易用性、灵活性和性能等方面都非常优秀。开发者能够通过撰写 `*.vue` 文件，基于  `<template>`, `<style>`, `<script>` 快速构建组件化的 web 应用。本章会教你如何搭建本地开发环境进行 Weex 开发。

开始之前，希望你能对 Weex 和 Vue 有基本的了解，推荐阅读 Weex Tutorial 和 Vue Introduction 了解更多信息。

## 第一步：安装依赖

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

## 第二步：初始化

然后初始化 Weex 项目：

```bash
$ weex init awesome-project
```

执行完命令后，在 `awesome-project` 目录中就创建了一个使用 Weex 和 Vue 的模板项目。

## 第三步：开发

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

我们暂时不去关心 Weex 的技术细节，仅看大致的代码结构。是不是觉得这些语法有些眼熟？没错，Weex 语法同 [Vue](https://github.com/vuejs/vue) 完全一样，甚至连文件名也是 `.vue`，如果你熟悉 Vue，你会很快适应 Weex 的开发。

关于 Weex 语法部分，你可以直接参考 [Vue Guide](https://vuejs.org/v2/guide/)，这里不再重复介绍。