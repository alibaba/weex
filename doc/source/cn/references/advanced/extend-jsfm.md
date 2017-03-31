---
title: 拓展 JS framework
type: references
order: 11.4
version: 2.1
---

# 定制自己的 JS Framework

*这部分扩展能力还在讨论尝试中，可能随时会有调整，请留意。*

Weex 希望能够尊重尽可能多的开发者的使用习惯，所以除了 Weex 官方支持的 Vue 2.0 之外，开发者还可以定制并横向扩展自己的或自己喜欢的 JS Framework。完整一套 JS Framework 的定制和扩展需要以下几个步骤：

1. 首先你要有一套完整的 JS Framework。
2. 了解 Weex 的 JS 引擎的特性支持情况。
3. 适配 Weex 的 native DOM APIs。
4. 适配 Weex 的初始化入口和多实例管理机制。
5. 在 Weex JS runtime 的 framework 配置中加入自己的 JS Framework 然后打包。
6. 基于该 JS Framework 撰写 JS bundle，并加入特定的前缀注释，以便 Weex JS runtime 能够正确识别。

## Weex JS 引擎的特性支持情况

* 在 iOS 下，Weex 使用的是系统自带的 JavaScriptCore，所以 ES 支持情况取决于操作系统的版本。目前保守判断，ES5 的特性市面上主流的 iOS 设备都是可以完美支持的，但是 ES6+ 的特性存在一定的碎片化。
* 在 Android 下，Weex 使用的是 UC 提供的 v8 内核，出于体积、性能和稳定性的考虑，我们使用的并不是最新版本的 v8 内核，同样的保守判断，ES5 特性能够全部支持，包括严格模式、`Object.freeze` 等。
* Weex JS 引擎不支持 HTML DOM APIs 和 HTML5 JS APIs，这包括 `document`, `setTimeout` 等。
* 在此基础上，我们加入了 `Promise` 的 polyfill，以及 `console` 的 polyfill。
* 额外的，为了尽可能的确保 JS 引擎的长效内存管理，我们对一个通用的全局对象进行了 `Object.freeze()` 冻结操作，这包括：
    * `Object`
    * `Object.prototype`
    * `Array`
    * `Array.prototype`
    * `String.prototype`
    * `Number.prototype`
    * `Boolean.prototype`
    * `Error.prototype`
    * `Date.prototype`
    * `RegExp.prototype`

## 适配 Weex 的初始化入口和多实例管理机制

开发者提供的 JS Framework 最终需要包装成一个 CommonJS 包，并且这个包需要对外暴露以下方法：

### 框架初始化

* `init(config)`
    * `config`
        * `Document`
        * `Element`
        * `Comment`
        * `TaskSender`
        * `CallbackManager`

该方法会把 Weex 提供的 Native DOM 类和两个辅助类放到 `config` 参数中，并允许框架本身完成初始化。

*小提示：同时，框架作者也能够通过在框架初始化时传入不同的 `config` 来进行框架的测试或环境模拟。*

#### 参数格式介绍

* `TaskSender`: wip...
* `CallbackManager`: wip...

### 注册可用的 native 组件和模块

* `registerComponents(components)`
* `registerModules(modules)`

这两个方法会在框架初始化之后立刻调用，这样框架就能够知道当前的客户端支持哪些组件和模块，在一些特殊逻辑或必要的情况下，有机会为框架本身提供参考信息。

#### 参数格式介绍

* `components: Array`: 描述组件的数组，每一项包括：
    * `type: string`: 组件名称，比如 `div`。
    * `methods: string[]`: 可选项，该组件支持的方法名称列表，这些方法可以遵循 Weex 的 native DOM APIs 的组件方法调用方式。
* `modules: Object`: 描述一系列模块的散列表，每一项的 key 是模块名，每一项的值是一个数组，数组里的每一项描述了一个该模块中的一个方法，该方法的信息包括：
    * `name: string`: 方法名
    * `args: string[]`: 参数个数和类型描述

例如：

```js
registerComponents([
  { type: 'web', methods: ['goBack', 'goForward', 'refresh']}
])

registerModules({
  event: [
    {name: 'openURL', args: ['string']}
  ]
})
```

### 多实例生命周期管理

* `createInstance(instanceId, code, config, data, env)`
* `refreshInstance(instanceId, data)`
* `destroyInstance(instanceId)`

每个 Weex 页面都有被创建、被销毁两个必经阶段，同时在 Weex 页面运行过程中，native 有机会主动向 Weex 页面发送消息，不同的框架可以根据自己框架的设计对这样的消息有自己的理解和设计实现。

#### 参数格式介绍

* `instanceId: string`: 该 Weex 页面的唯一 id，由 native 产生。
* `code: string`: 该 Weex 页面的 JS bundle 的代码，通过 native 传入。
* `config: Object?`: 该 Weex 页面的配置信息，比如代表该 bundle 地址的 `bundleUrl`，由 native 配置产生，和 JS bundle 本身的内容无关。
* `data: Object?`: Native 有机会在创建一个 Weex 页面的时候，传入一份外部数据，JS 框架也有机会接此机会为相同的 JS bundle 配合不同的 `data` 生成不同的页面内容。
* `env: Object?`: 当前 Weex 页面的相关环境信息，各字段的含义：
    * `info: Object`: 框架 info 信息，详见之后的 “JS Bundle 格式要求”。
    * `config: Object`: 等同该方法的第三个参数 `config`。
    * `callbacks: CallbackManager`: 该 Weex 页面唯一的 `CallbackManager` 实例。
    * `created: number`: 该 Weex 页面的创建时间毫秒数。
    * `framework: string`:  该 Weex 页面基于的框架名，等同于 `info.framework`。

### Native 通信

* `receiveTasks(instanceId, tasks)`

Native 除了通过 `refreshInstance` 方法向 JS 框架层发送消息之外，更多的会通过 `receiveTasks` 发送用户事件或方法回调给 JS 框架。

比如用户点击了一个按钮，native 就会发送一个 `fireEvent` 类型的任务给 JS 框架，然后 JS 框架再处理相应的事件逻辑。这部分工作机制和 native DOM 接口中的 `addEvent` 的设计有关。

再比如用户发起了一个 `fetch` 网络请求，当请求在 native 端完成时，会以一个 `callback` 类型的任务发给 JS 框架。由于 native 无法传递 JavaScript 中的 function，所以实际上知会发送一个 `callbackId` 给 JS 框架。这部分工作机制和之前出现过的 `CallbackManager` 的设计有关。

### 辅助方法

* `getRoot(instanceId): JSON`

该方法可以返回文档主体结点的完整 JSON 描述，开发者可以以此查看到完整的 native DOM 树，具体返回值的格式和 native DOM 接口中的 `toJSON()` 方法返回值格式一致。此功能多用作开发者工具扩展。

## 在 WeexSDK 中配置 JS Framework

### 准备好你的 JS Framework 代码

```javascript
// your-own-js-framework.js

export function init (config) { ... }

export function registerComponents (components) { ... }
export function registerModules (modules) { ... }

export function createInstance (id, code, config, data, env) { ... }
export function destroyInstance (id) { ... }
export function refreshInstance (id, data) { ... }

export function recieveTasks (id, tasks) { ... }
export function getRoot (id) { ... }
```

### 注册一个 JS Framework

```javascript
import * as Vue from '...'
import * as React from '...'
import * as Angular from '...'

export default { Vue, React, Angular };
```

然后打包 JS runtime，集成到 WeexSDK 中。

### JS Bundle 格式要求

**框架 info**

你需要保障基于该 JS Framework 的 JS Bundle 在文件开头带有如下格式的注释，我们称其为框架 info：

```javascript
// { "framework": "Vue" }
...
```

这样 Weex JS 引擎就会识别出这个 JS bundle 需要用 Vue 框架来解析。并分发给 Vue 框架处理。同理，Weex 支持同时多种框架在一个移动应用中共存并各自解析基于不同框架的 JS bundle。