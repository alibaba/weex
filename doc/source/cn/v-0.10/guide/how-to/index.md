---
title: 使用 Devtools 调试 Weex 页面
type: guide
order: 4
has_chapter_content: false
chapter_title: 最佳实践
version: 0.10
---

# 如何使用 Devtools 调试 Weex 页面

Weex Devtools 是为 Weex 开发者服务的一款调试工具，能够审查 Weex app 运行时属性，可对 `.we` 代码及 JavaScript 代码断点调试，支持 iOS 和 Android 两个平台。

Weex Devtools 基于 Chrome devtools 实现了 [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol)，能够使用 Chrome devtools 调试 Weex 项目，其主要功能分为两大部分—— Debugger 和 Inspector。

## Devtools 主要功能一览

### 连接设备
devtools 可以动态检测客户端的连接绑定请求，同时连接／调试多个 device（或者模拟器）是很容易的事情，连接到 Devtools 的客户端显示在 “Device List” 界面。如下图所示。

![devtools-main](https://img.alicdn.com/tps/TB13fwSKFXXXXXDaXXXXXXXXXXX-887-828.png)

点击对应设备的 Debugger 按钮即开始调试流程，并弹出JS断点调试的页面；随后点击 Inspector 按钮可弹出调试 DOM 的页面。

### Debugger

这个是用来调试 Weex 的 JSBundle 代码的页面，“Sources” tab 能够显示所有 JS 源码，包括 Weex JSFramework 和 JSBundle 代码。可以设置断点、查看调用栈，与 Chrome 浏览器调试类似。“Console” 控制台显示前端的 Log 信息，并能根据级别（info/warn/error等）和关键字过滤。

![devtools-debugger](https://img.alicdn.com/tps/TB1aPTEKFXXXXXaXXXXXXXXXXXX-1436-813.png)

### 断点调试

![debugger-breakpoint](https://img.alicdn.com/tps/TB1_trbKFXXXXc0XVXXXXXXXXXX-2880-1800.png)

### Inspector

Inspector 功能丰富，能够用来查看 `Element` \ `Network` \ `Console log` \ `Screencast` \ `BoxModel` \ `Native View` 等。

![devtools-inspector](https://img.alicdn.com/tps/TB1O.nwKFXXXXX8XpXXXXXXXXXX-1436-811.png)

### Device Screencast & View Inspect

如下图所示，通过 Inspector 页面的两个开关，点击右侧 Icon 可以打开设备投屏，然后点击左侧 Icon 再在投屏上点选元素则可以自动在 DOM tree 中定位并审查该元素。

![screencast-inspect](https://img.alicdn.com/tps/TB1_.20OpXXXXX4XVXXXXXXXXXX-1314-787.png)

### Elements

这里展示的是在 Android／iOS 上的 native DOM 树，及其 style 属性和 layout 图。鼠标在 DOM 树移动时，在 device（或模拟器）上对应节点会高亮显示，有助于 native 开发者定位和发现节点。

**注意：**
screencast 只是对屏幕图像拷贝，在远程调试时能看到远程设备界面，数据网络下 screencast 也将有较大流量花销，如果设备就在手头儿则建议关掉。

Elements 审查有两种模式分别是：native 和 vdom。其中，native 模式下展示的是 Weex 所映射的 native view 的结构，它更接近实现本质；vdom 模式则对应 `.we` 文件中定义的 dom 结构，主要用来审查 `.we` 文件编译为 JSBundle 之后对应的 dom tree 的逻辑构成。

#### native view element

![native-element](https://img.alicdn.com/tps/TB16L3ENXXXXXcsXVXXXXXXXXXX-2878-1798.png)

#### weex dom element

![dom-element](https://img.alicdn.com/tps/TB1TsMuNXXXXXcsaXXXXXXXXXXX-2450-1460.png)

### Network

这里展示的是 JSBundle 资源加载网络访问的性能。所以如果 JSBundle 资源在设备本地，Network 是没有数据的。

#### 查看网络请求的总耗时和延时

![inspector-network](https://img.alicdn.com/tps/TB1NjO_KFXXXXcaaXXXXXXXXXXX-2880-1800.png)

#### 查看网络请求的header和response

![inspector-network](https://img.alicdn.com/tps/TB1ck6lKFXXXXbZXFXXXXXXXXXX-2880-1800.png)

### 控制台

这里显示的是 Android／iOS 上的 native log，并不是 JS log（JS log 显示在 Debugger 页面）。同样 native log 也有对应级别--warn/error 等和关键字过滤，native 开发查询很方便。

![inspector-console](https://img.alicdn.com/tps/TB1a7HqKFXXXXXMXFXXXXXXXXXX-2880-1800.png)

### 资源（Android Only）

远端访问的资源文件会显示在这里，这里不是查看源码的最佳方式。在 Debugger 页面，“Sources” 里已经有源码并可以断点调试。如果你的应用里有 SQLITE 数据库文件，在这里无需 root 便可以查看和更新，对于 mock 数据来说比较便利。

![inspector-resource](https://img.alicdn.com/tps/TB1oY6cKFXXXXXQaXXXXXXXXXXX-2880-1800.png)

### 远程控制 (Android Only)
 
Android 版本支持在 screencast 上进行远程控制，能够通过鼠标模拟在手机的输入事件，方便手机不在本地的用户进行远程调试。

## 如何安装和启动devtools

无论是跑在 iOS 或者 Android 端，[weex-devtool](https://github.com/weexteam/weex-devtool) 都是必需的，用来启动服务器和 Chrome 页面。

### 安装

如果你已经在前面的教程中安装过 weex-toolkit，就无需再次安装了。

```bash
$ npm install  -g  weex-toolkit
```

#### 用法

 weex debug [options] [we_file|bundles_dir]
            
  选项:

    -h, --help           显示帮助
    -V, --verbose        显示debug服务器运行时的各种log
    -v, --version        显示版本
    -p, --port [port]    设置debug服务器端口号 默认为8088
    -e, --entry [entry]  debug一个目录时,这个参数指定整个目录的入口bundle文件,这个bundle文件的地址会显示在debug主页上(作为二维码)
    -m, --mode [mode]    设置构建we文件的方式,transformer 最基础的风格适合单文件,loader:wepack风格 适合模块化的多文件.默认为transformer


## 如何在设备或者模拟器上调试

### weex调试初体验之playground

如果你是一名 Weex 调试的新手，那么推荐你先下载 [Playground](http://alibaba.github.io/weex/download.html) 体验一下 Devtools 调试 JSBundle 的基础流程.

- 前提: 
  - 安装 `weex-toolkit`，内含调试命令 `weex debug`
  - android／iOS 设备与 PC 在同一局域网，若位于不同网段请确保防火墙可访问性
    
- Inspector 功能演示

<embed src="//cloud.video.taobao.com/play/u/1955166971/p/2/e/1/t/1/45803002.swf" quality="high" width="100%" height="500px" align="middle" allowScriptAccess="never" allowFullScreen="true" type="application/x-shockwave-flash"></embed>

- Debugger功能演示

<embed src="//cloud.video.taobao.com/play/u/1955166971/p/2/e/1/t/1/45803641.swf" quality="high" width="100%" height="500px" align="middle" allowScriptAccess="never" allowFullScreen="true" type="application/x-shockwave-flash"></embed>

- 调试步骤:
  -  **启动 debug server**

  执行命令 `weex debug` 将启动 debug server。如果启动成功将会在 Chrome 打开一个 welcome 页面，在网页下方有一个二维码。

  - **启动 Playground 并扫码**

  点击启首页左上角的扫码按钮扫码上一步中网页下方的二维码。此时 welcome 页面将会出现你的设备信息。Playground 进入 loading 页面，等待你的下一步操作。

  - **点击网页上的 Debugger 按钮**

  app 结束 loading 进入 debugging 状态。同时 Chrome 将会打开 Debugger 页面。按照页面提示打开该页的 JavaScript 控制台并进入 source tab。

  - **设置断点刷新当前页**

  点击 Playground 首页 list 中的任意项将打开一个 Weex 页面，此时在 Sources 里会出现相应的 JSBundle 文件，设置断点并刷新  Playground  即可调试。

  - **点击网页上的 Inspector 按钮**

  Chrome 会打开 inspector页面，可以查看Element， Console， Network状态。

### Weex调试初体验之应用

如果是接入 Weex 的应用想调试自己的 Weex 代码，有以下几个方式：

1. 借助 Playground 扫码调试
  - 先确定 Playground 已经是可调试状态
  - 使用命令行工具打开调试功能 `weex debug`，用 Playground 扫浏览器打开的页面中的二维码 
  - 用 Playground 扫描 JSBundle 二维码
  - 手机上即显示 Weex 页面的结果。相应在 “Debugger” 和 “Inspector” 页面调试。

2. 为应用接入 Devtools 接口

  - [Android sdk接入指南](https://github.com/weexteam/weex_devtools_android/blob/master/README-zh.html)
  - [iOS sdk接入指南](https://github.com/weexteam/weex-devtool-iOS/blob/master/README-zh.html)

有任何问题或者建议，请提交[这里](https://github.com/weexteam/weex-devtool/issues)，会很快得到解答。

## 更详细的视频讲解

- 第一集 devtools简介
http://cloud.video.taobao.com/play/u/1955166971/p/1/e/1/t/1/45796387.swf
- 第二集 inspector功能演示 
http://cloud.video.taobao.com/play/u/1955166971/p/1/e/1/t/1/45803002.swf
- 第三集 debugger功能演示 
http://cloud.video.taobao.com/play/u/1955166971/p/1/e/1/t/1/45803641.swf
- 第四集 native 与 weex 联调
http://cloud.video.taobao.com/play/u/1955166971/p/1/e/1/t/1/45804472.swf
- 第五集 第三方App接入指南
http://cloud.video.taobao.com/play/u/1955166971/p/1/e/1/t/1/45805276.swf