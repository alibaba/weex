---
title: 如何将原有 Weex 项目改造成 Vue 版本
type: references
order: 12.1
version: 2.1
---

# 如何将原有 Weex 项目改造成 Vue 版本

Weex 本身有一套语法规则，和 Vue 本身很相似，现在 Weex 与 Vue 有了官方合作，支持将 Vue 2.x 作为内置的前端框架，我们也推荐大家使用 Vue 2.x 的语法开发原生应用。对于现存旧版的 `.we` 文件，建议大家将其改造成 Vue 版本。

## 要解决的问题

> 将内核切换成 Vue 之后，原先基于 Weex 语法开发的项目将如何过渡到 Vue ？

首先需要明确一点：Weex 原有的前端框架也会继续存在于 WeexSDK 中，依然支持 `.we` 文件格式的写法。

此外，由于 `.we` 和 `.vue` 文件的格式本身就比较接近，所以迁移成本比较小，建议大家将现有 `.we` 格式的文件都转换成 `.vue` 格式。我们也推出了相应的工具和方法辅助迁移，在内部也有大量的成功实践，下边将重点介绍一下将 `.we` 文件转成 `.vue` 文件的方法。

## 第一步，借助工具实现语法转换

首先介绍一个工具： **[weex-vue-migration](https://github.com/songsiqi/weex-vue-migration)** ，它可以自动将 `.we` 文件转为 `.vue` 文件，绝大多数的模板语法都能自动转换，语法差异如下：

|  | Weex | Vue |
| ---- | ---- | --- |
| 生命周期  | `ready: function() {}` | `mounted: function() {}` |
| 条件指令  | `if="{% raw %}{{!foo}}{% endraw %}"`  | `v-if="!foo"` |
| 循环指令 | `repeat="{% raw %}{{item in list}}{% endraw %}"`  | `v-for="item in list"` |
| 样式类名  | `class="btn btn-{% raw %}{{type}}{% endraw %}"` | `:class="['btn', 'btn-' + type]"` |
| 内联样式 | `style="color:{% raw %}{{textColor}}{% endraw %}"` | `:style="{ color: textColor }"` |
| 事件绑定 | `onclick="handler"` | `@click="handler"` |
| 原生事件 | `onclick="xxx"` | `@click.native="xxx"` |
| 数据绑定 | `src="{% raw %}{{rightItemSrc}}{% endraw %}"` | `:src="rightItemSrc"` |
| 内容/槽 | `<content></content>` | `<slot></slot>` |
| 数据初始化 | `data: { value: 'x' }` | `data: function() { return { value: 'x' } }` |
| 标签 ID | `id="xxx"` | `ref="xxx"` |
| 获取节点 | `this.$el('xxx')` | `this.$refs.xxx` |

想要了解更多语法差异的细节，可以参考这篇文章：[《Weex 和 Vue 2.x 的语法差异》](./difference.html) 。

### 使用方法

首先安装工具：

```bash
npm install weex-vue-migration -g
```

转换文件：

```bash
weex-vue-migrate demo.we
```

转换成功后，将会在当前目录下生成 `demo.vue` 文件，控制台将会有如下输出：

```
[Success]: Migrate demo.we => demo.vue in 33ms
Migration finished in 0.035s
```

除了逐个转换 `.we` 文件以外，`weex-vue-migration` 还支持批量转换整个目录，参考其[说明文档](https://github.com/songsiqi/weex-vue-migration/blob/master/README.md)可以了解更详细的使用方法。

### 注意事项

转换工具将不再支持 Weex 中废弃的语法，如果代码中有如下写法，建议先手动修改再做转换。

0. 忽略 `require('@weex-components')` 语句，可以通过 npm 包的方式引入外部组件。
0. 无法转换 `repeat="list"` 写法，仅支持 `repeat="item in list"` 格式。
0. 不支持转换 `<script type="config"></script>`，目前 Vue 中不支持原有的降级配置。

## 第二步，手动调整代码细节

模板和样式的转换都可以借助工具轻易转换过来，`<script>` 中基本的语法也可以转换；但是由于 javascript 的写法比较灵活，仅仅使用工具做转换，并不一定能完美过渡。工具只能处理语法但是理解不了代码中的逻辑，在 Weex 和 Vue 的框架特性存在一些差异，有些差异还是需要手动修改才可以生效。

> 提示：在代码中使用的“黑科技”越多，项目就越难以转换。

### 样式单位

在 `.we` 文件写样式时，开发者通常都不写长度单位，默认会被视为 `px`。在新的 Vue 版本的 Web 渲染器中，`<style>` 中的样式将会直接转化成 CSS class，如果不写单位、浏览器将无法正确识别，会导致在 Web 端无法正常渲染。Native 环境中不受影响。

尽管不影响 Native 页面的渲染，也建议给样式长度加上单位 `px`。

### 旧框架中的内置属性

+ `vm._app`
  + `vm._app.differ`
  + `vm._app.doc`
  + `vm._app.updateActions()`

### 事件派发机制

+ `$dispatch` 、`$broadcast` 、`$call` 方法已经废弃。
+ `$emit` 行为不一致。

可以使用 Vuex 管理数据状态。

### 直接操作 Virtual-DOM

Weex 和 Vue 中的 Virtual-DOM 格式并不相同，如果你使用了 `this.$el('id')` 获取了某个组件的 element 之后，又修改了其中的某些属性或者调用了某些方法，这些操作在 Vue 中很难找到直接的对应写法。

从另一个角度讲，我们也非常不建议在 Weex 或 Vue 项目中直接操作 Virtual-DOM，这些写法都应该修改。

## 调整开发环境和工具

在文件转换完成后，还需要重新调整一下开发环境。

### 文件的编译

`weex-loader` 同时支持编译 `.we` 和 `.vue` 文件，如果你使用的是 `webpack` 来配置编译环境，将不需要做任何改变就能直接编译 `.vue` 文件。

需要注意的是，Vue 本身就是一个独立的前端框架，使用 Vue 编写的项目在 Web 上完全可以不依赖 Weex 容器运行。在这种情况下，需要配置基于 `vue-loader` 的编译脚本生成适用于 Web 平台 js 文件；然后引入 Vue 格式的 Weex 组件库就可以在 Web 中。

### 辅助工具

Weex 提供了 [weex-toolkit](https://github.com/weexteam/weex-toolkit) 的脚手架工具来辅助开发和调试、[weex-pack](https://github.com/weexteam/weex-pack) 实现打包原生应用；同样在 Vue 中也有 [vue-cli](https://github.com/vuejs/vue-cli) 脚手架工具。Weex 和 Vue 的工具互相做了适配，建议在创建项目和开发 Vue 项目的时候使用 `vue-cli` ，在调试时使用 `weex-toolkit`，在打包原生应用时使用 `weex-pack` 。
