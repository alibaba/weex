---
title: 如何在本地开发 Weex 页面
type: guide
order: 2
has_chapter_content: true
version: 0.10
---

# 如何在本地开发 Weex 页面

使用 [dotWe](http://dotwe.org) 对 Weex 尝鲜是一个不错的选择，但如果你想更专业的开发 Weex， [dotWe](http://dotwe.org) 就不怎么够用了。本章会教你如何搭建本地开发环境进行 Weex 开发。

## 第一步：安装依赖

首先，你需要 Node.js 和 weex-toolkit。

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

```bash
$ npm install -g weex-toolkit    
```	  

国内开发者可以考虑使用淘宝的 npm 镜像 —— [cnpm](https://npm.taobao.org/) 安装 weex-toolkit

```bash
$ npm install -g cnpm
$ cnpm install -g weex-toolkit
```

*提示：*

如果提示权限错误（*permission error*），使用 `sudo` 关键字进行安装

```bash
$ sudo cnpm install -g weex-toolkit
```

安装结束后你可以直接使用 `weex` 命令验证是否安装成功，它会显示 `weex` 命令行工具各参数：

![](https://img.alicdn.com/tps/TB1kHFrOFXXXXaYXXXXXXXXXXXX-615-308.jpg)

## 第2步：创建文件

现在可以开始编写代码了。首先，我们创建一个 `.we` 文件（Weex 程序的文件后缀（扩展名）是 `.we`）。

打开空白的 `hello.we` 文件，输入三个标签，内容为：
 
```html
<template>
</template>

<style>
</style>

<script>
</script>      
```	

我们在 [Get started](./index.md) 里已经介绍过 Weex 基本的代码结构：`<template>`、`<style>`、`<script>` 分别对应于 Web 中的 HTML，CSS（`<style>` 标签），JavaScript（`<script>` 标签）。

其实，上面的代码就是最简单的 Weex 程序。但是 `.we` 文件是不能直接运行的，这时候需要使用刚才安装好的 weex-toolkit。weex-toolkit 会编译 `.we` 文件，并且创建静态服务器。

这里，使用 `weex hello.we` 命令编译该程序。

```bash
$ weex hello.we       
```

这时，命令行会做几件事： 

- 编译 `.we` 文件；
- 启动热加载服务；
- 启动静态服务器；
- 拉起浏览器，访问 `http://127.0.0.1:8081/weex_tmp/h5_render/?hot-reload_controller&page=hello.js&loader=xhr`

这时候，已经可以在浏览器预览 Weex 页面了。不过此时页面是空白的，因为 `.we` 文件中没有任何实质的内容。

## 第3步：添加内容

修改 `weex.we` 文件，向 `<template>` 标签中添加内容。具体代码如下：      

```html
<template>
  <div>
    <text>Hello world</text>
  </div>
</template>

<style></style>

<script></script>       
```

保存代码后，浏览器会自动刷新页面，这时会看到浏览器显示了 “Hello world”。

## 第4步：添加样式

现在，对已有的文本内容进行样式修饰。这里将文本颜色设置为红色，字体大小为 50 像素。具体代码如下：              

```html 
<template>
  <div>
    <text class="text" style="color: #FF0000;">Hello world</text>
  </div>
</template>

<style>
  .text{
    font-size: 50;
  }
</style>

<script></script>
```

这时候，浏览器已经重新载入了页面。其实，是weex-toolkit开启了热加载。可以看到红色的 “Hello world”。

**注意：**
Weex 支持通过 `style` 标签来设定样式，也支持内联样式风格。 对于数值，无需添加任何单位（包括 px、em、rem 等），这是建议的写法。如需了解有哪些通用的样式，可以参考 [通用样式](../references/common-style.md)。

## 第5步：预览

已经在浏览器中看到了刚才的代码效果，为了验证三端是否一致，我们还需 [Playground App](https://alibaba.github.io/weex/download.html) 验证。

这里，我们需要为 `weex hello.we` 增加 `--qr` 参数，表示生成二维码。

```bash
$ weex hello.we --qr
```

然后，使用 [Playground](https://alibaba.github.io/weex/download.html) 扫码即可。

![mobile_preview](https://img.alicdn.com/tps/TB1fZBpOFXXXXaFXXXXXXXXXXXX-506-1024.jpg)

## 第6步：调试

weex-toolkit 已经集成了 Debugger，只需要使用如下命令即可开启 Debugger 开关调试 `hello.we`：

```bash
$ weex debug hello.we
```

我们输入以上命令开启，会自动打开浏览器，页面上有两个二维码，第一个是 Debugger Server，第二个是 `.we` 文件的地址。我们在 Playground 中先扫第一个，此时浏览器会进入一个新的页面，请你选择你需要的调试模式：

- Debugger：将会打开 js debugger 页面，您可以通过 debugger 页面调试 js（诸如打断点 查看js log 和查看调用堆栈等信息）；
- Inspector：将会打开 inspector 页面，您可以通过这个页面查看 Weex 页面的 element 属性结构，包含高亮元素，展示样式表，以及显示 native 的 log。同时可以打开一个远程的手机镜像，便于查看界面。另外调试方块中的 ElementMode 可以用来选择 element 树显示原始的 native 组件树还是显示面向前端同学的 DSL （HTML）组件树。

选择一种模式后会新开窗口进入调试页面，这时我们再扫第二个二维码即可进入我们想要调试的页面进行调试了。

## 接下来做什么？

到目前为止，你已经可以在 [dotWe](http://dotwe.org) 或者本地开发 Weex 页面。接下来你可以去学习 Weex [语法](./syntax/main.md) 和 [开发手册](../references/main.md) 了解 Weex 更多特性。这些语法和特性，你完全可以用 [Playground](https://alibaba.github.io/weex/download.html) 运行起来。

如果你已经熟悉 Weex 开发，你应该考虑如何让你的 App 也支持 Weex 页面，或者，怎样用 Weex 开发一个全新的 App 呢？带着这些问题，你可以阅读 [开发进阶](./how-to/main.md)。
