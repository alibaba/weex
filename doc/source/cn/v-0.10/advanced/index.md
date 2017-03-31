---
title: Weex 工作原理
type: advanced
order: 1
has_chapter_content: true
version: 0.10
---

# Weex 工作原理概述

## 总览

Weex是跨平台，可扩展的动态化技术. 你能通过在Weex源码中写`<template>`, `<style>` 和  `<script>`标签，然后把这些标签转换为JS Bundle用于部署, 在服务端以这些JS Bundle响应请求. 当客户端接收到JS Bundle时，它能用被客户端中的JS引擎用于管理Native渲染;API调用和用户交互.

### 工作流

```
Weex we 文件 --------------前端(we源码)
↓ (转换) ------------------前端(构建过程)
JS Bundle -----------------前端(JS Bundle代码)
↓ (部署) ------------------服务器
在服务器上的JS bundle  ----服务器
↓ (编译) ------------------ 客户端(JS引擎)
虚拟 DOM 树 --------------- 客户端(Weex JS Framework)
↓ (渲染) ------------------ 客户端(渲染引擎)
Native视图 ---------------  客户端(渲染引擎)
```

在上面的工作流中，我们提到:

- Transformer（转换器):  一个Node JS工具， 转换Weex源码为JS Bundle  
- Weex JS Framework(JS框架): 运行于客户端的的JS框架，管理着Weex实例的运行。Weex实例由JS Bundle创建并构建起虚拟DOM树. 另外，它发送/接受 Native 渲染层产生的系统调用，从而间接的响应用户交互。
- Native引擎:  在不同的端上，有着不同的实现: iOS/Android/HTML5. 他们有着共同的组件设计, 模块API 和渲染效果. 所以他们能配合同样的 JS Framework 和  JS Bundle工作。

## 转换器

转换器转换Weex源码为JS Bundle. 整体工作可以分为三个部分:

- 转换 `<template>` 为类JSON的树状数据结构, 转换数据绑定为返回数据的函数原型.例如. For example: `<foo a="{% raw %}{{x}}{% endraw %}" b="1" />` 将转换为 `{type: "foo", attr: {a: function () {return this.x}, b: 1}}`.
- 转换 `<style>` 为类JSON的树状数据结构. 例如: `.classname {name: value;}` 将转换为 `{classname: {name: value}}`.
- 把上面两部分的内容和 `<script>` 中的内容结合. 上面的三个部分将结合成一个JavaScript AMD 模块.

一个完整的例子:

```html
<template>
  <foo a="{{x}}" b="1" class="bar"></foo>
</template>
<style>
  .bar {width: 200; height: 200}
</style>
<script>
  module.exports = {
    data: function () {
      return {x: 100}
    }
  }
</script>
```

将转换为:

```javascript
define('@weex-component/main', function () {
  module.exports = {
    data: function () {
      return {x: 100}
    }
  }
  module.template = {
    type: "foo",
    attr: {
      a: function () {return this.x},
      b: 1,
      classname: ['bar']
    }
  }
  module.style = {
    bar: {width: 200, height: 200}
  }
})
bootstrap('@weex-component/main')
```

除此之外,转换器还会做一些额外的事情: 合并Bundle ,添加引导函数，配置外部数据等等，更详细的，请参阅[Synatax](../references/specs/js-bundle-format.html)章节.

## 注意

当前大部分Weex工具最终输出的JS Bundle格式都经过了[Webpack](https://webpack.github.io/)的二次处理，所以你实际使用工具输出的JS Bundle会和上面的有所区别.
## JS Framework

JS Framework 在初始化阶段被原生 JavaScript 引擎运行. 它提供被每个JS Bundle调用的 `define()` 和 `bootstrap()` 函数.  一旦JS Bundle从服务器下载后，这些函数就会执行. `define()` 函数以注册模块;`bootstrap()`会编译主要的模块为虚拟DOM，并发送渲染指令给Native .

JS 和 Native 的沟通主要通过两个关键方法进行:

- `callNative` 是一个由native代码实现的函数, 它被JS代码调用并向native发送指令,例如 `rendering`, `networking`, `authorizing`和其他客户端侧的 `toast` 等API.
- `callJS` 是一个由JS实现的函数,  它用于Native向JS发送指令. 目前这些指令由用户交互和Native的回调函数组成.
## Native 渲染引擎

Native 渲染引擎提供客户端组件和模块.

**Component(组件)** 在屏幕内可见，有特定行为. 能被配置不同的属性和样式,能响应用户交互. 常见的组件有:  `<div>`, `<text>`, `<image>`.

**Module(模块)** 是一组能被JS Framework调用的API. 其中的一些能以异步的方式调用JS Framework, 例如: 发送HTTP请求.

在Weex实例运行期间,Native渲染引擎将接收各种各样不同模块的API调用。这些调用创建或更新组件外观，运行如`toast`的Native API.当用户交互或模块回调时，`callJS()`会由JS Framework调用.  这样的循环往复将从Weex实例初始化到销毁一直持续. 如下面的架构图所示, HTML5渲染引擎提供和Native渲染引擎几乎一致的功能。 

![arch](http://gtms02.alicdn.com/tps/i2/TB1ootBMpXXXXXrXXXXwi60UVXX-596-397.png)

Weex架构图

### 从Javascript中调用Native

```
[JS Framework]
↓ callNative
模块 APIs
  渲染 -> 模块显示
  其他功能
[Native 渲染引擎]
```
### 从Native中调用Javascript

```
[Native 渲染引擎]
模块 APIs 回调
用户交互
↓ callJS
[JS Framework]
```
### 渲染流程

![render flow](http://gtms03.alicdn.com/tps/i3/TB1_SA4MXXXXXXGaXXXpZ8UVXXX-519-337.png)  

Weex 渲染流程

1. 虚拟DOM.
2. **构造树结构**. 分析虚拟DOM JSON数据以构造渲染树(RT).
3. **添加样式**. 为渲染树的各个节点添加样式.
4. **创建视图**. 为渲染树各个节点创建Native视图.
5. **绑定事件**. 为Native视图绑定事件.
6. **CSS布局**.  使用 [css-layout](https://github.com/facebook/css-layout) 来计算各个视图的布局.
7. **更新视窗(Frame)**. 采用上一步的计算结果来更新视窗中各个视图的最终布局位置.
8. 最终页面呈现.

在Weex HTML5环境下 `CSS 布局` and `更新视窗` 由浏览器引擎(例如webkit)实现.
