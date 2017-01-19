---
title: Native DOM APIs
type: references
order: 6
version: 2.1
has_chapter_content: true
---

# Native DOM APIs

Weex 在 JS 引擎中，为每个页面都提供了一套 Native DOM APIs，这套接口和 HTML DOM APIs 非常接近，利用这套接口我们可以通过 JavaScript 控制 native 的渲染逻辑。而且 Weex 上层的 Vue 2.0 也是基于这套接口进行适配的。

*绝大多数情况下 JS 框架会把 Native DOM APIs 都封装好，开发者不需要直接对 Native DOM 进行操作。*

* `Document` 类，整个页面文档。
* `Node` 类，结点的基础类。
* `Element` 类，元素结点，继承自 `Node`，单个视图单元。
* `Comment` 类，注释结点，继承自 `Node`，无实际意义，通常用作占位符。

**每个 Weex 页面都有一个 `weex.document` 对象，该对象就是一个 `Document` 类的实例，也是下面所有接口调用的起点。**

接下来详细介绍它们的用法：

## `Document` 类

每个 `Document` 实例在创建的时候都会自动拥有一个 `documentElement` 属性，表示文档结点。该文档结点可以拥有一个 `body`，即文档的主体结点。

**注意事项**: 文档的主体结点只接受 `<div>`、`<list>` 或 `<scroller>` 三种类型的元素结点。

### 构造函数

**`new Document(id: string, url: string?)`**

### 成员方法

**`createElement(tagName: string, props: Object?): Element`**

* 创建一个特定类型 `tagName` 的 `Element` 实例，即一个元素结点。`props` 可以包含 `attr` 对象和 `style` 对象。比如 `createBody('div', {style: {backgroundColor: '#ffffff'}})`。

**`createComment(text: string): Comment`**

* 创建一个 `Comment` 的实例，即一个注释结点，并设置一段文本描述。

**`createBody(tagName: string, props: Object?): Element`**

* 创建文档主体结点，并自动挂载到 `documentElement` 下。

**`fireEvent(el: Element, type: string, e: Object?, domChanges: Object?)`**

* 触发一个特定类型的事件，并附带一个事件对象 `e`。当该事件在产生过程中修改了 DOM 的特性或样式，则第四个参数用来描述这些改变，参数格式和上面 `createElement` 方法的格式相同。

**`destroy()`**

* 销毁当前文档。一旦销毁之后文档将不会再工作。

### 只读成员变量

**`id: string`**

* 每个 `Document` 实例都有一个唯一的 `id`。这同时也是每个 Weex 页面唯一拥有的 `id`。

**`URL: string?`**

* 如果当前 Weex 页面有 JS bundle URL 的话，这里则会返回 这个 URL。

**`body: Element`**

* 文档的主体结点，概念类似 HTML DOM 里的 `document.body`。

**`documentElement: Element`**

* 文档的对应结点，概念类似 HTML DOM 里的 `document.documentElement`。
* `body` 和 `documentElement` 的关系是：`documentElement` 是 `body` 的父结点。

**`getRef(id): Node`**

* 根据结点 id 获取结点。

## `Node` 类

### 构造函数

**`new Node()`**

### 成员

**`destroy()`**

### 只读成员变量或方法

**`ref: string`**

* 每个 `Node` 实例都有各自的在整个 `Document` 实例中唯一的 `ref` 值。

**`nextSibling: Node?`**

**`previousSibling: Node?`**

**`parentNode: Node?`**

* 上述三个接口和 HTML DOM 的定义吻合。

**`children: Node[]`**

* 该结点拥有的所有子结点的数组。

**`pureChildren: Node[]`**

* 该结点拥有的所有子元素的数组。和 `children` 的区别是，`pureChildren` 只包含了 `Element` 实例而不包含 `Comment` 实例。

## `Element` 类 <small>继承自 `Node`</small>

### 构造函数

**`new Element(type: string, props: Object?)`**

* 创建一个特定类型 `type` 的元素结点，参数 `props` 可以包含 `attr` 对象或 `style` 对象。

### DOM 树操作

**`appendChild(node: Node)`**

**`insertBefore(node: Node, before: Node?)`**

* 上述两个接口类似 HTML DOM。

**`insertAfter(node: Node, after: Node?)`**

* 在一个子结点之前插入新结点 after。

**`removeChild(node: Node, preserved: boolean?)`**

* 删除子结点 `node`，参数 `preserved` 表示立刻从内存中删除还是暂时保留。

**`clear()`**

* 清除所有的子结点。

### DOM 属性本身操作

**`setAttr(key: string, value: string, silent: boolean?)`**

**`setStyle(key: string, value: string, silent: boolean?)`**

* 上述两个接口中，当 `silent` 为真的时候，结点仅更新自己，不会传递命令给客户端渲染层。该参数用来处理用户事件在发生时已经改变结点相关属性的情况下，不会在 Native DOM 也改变之后重复发送命令给客户端。

**`addEvent(type: string, handler: Function)`**

**`removeEvent(type: string)`**

**`fireEvent(type: string, e: any)`**

* 绑定事件、解绑定事件、触发事件。

#### 特定组件类型的组件方法

特殊的：不同组件类型可以拥有自己特有的方法，比如 `<web>` 组件支持 `refresh` 方法，详见各组件的描述，在此情况下，我们会产生特定组件类型的 class，比如 `WebElement`，它继承自 `Element`。

如：

> #### `WebElement` <small>继承自 `Element`</small>
> 
> 表示在 Weex 页面中嵌入一个 webview
> 
> **`refresh()`**: 刷新当前 webview

### 只读成员变量或方法

**`ref`, `nextSibling`, `previousSibling`, `parentNode`**

* 继承自 `Node`。

**`nodeType: number`**

* 永远是数字 `1`。

**`type: string`**

* 和构造函数里的 `type` 一致。

**`attr: Object`**

* 当前结点的所有特性的键值对。推荐通过 `setAttr()` 方法进行修改，而不要直接修改这里的对象。

**`style: Object`**

* 当前结点的所有样式的键值对。推荐通过 `setStyle()` 方法进行修改，而不要直接修改这里的对象。

**`event: Object`**

* 当前结点的所有事件绑定。每个事件类型对应一个事件句柄方法。推荐通过 `addEvent()` / `removeEvent()` 方法进行修改，而不要直接修改这里的对象。

**`toJSON(): Object`**

* 返回描述该元素结点的一段 JSON 对象，形如：`{ref: string, type: string, attr: Object, style: Object, event: Array(string), children: Array}`。

## `Comment` 类 <small>继承自 `Node`</small>

### 构造函数

**`new Comment(value: string)`**

### 只读成员变量或方法

**`ref`, `nextSibling`, `previousSibling`, `parentNode`**

* 继承自 `Node`。

**`nodeType: number`**

* 永远是数字 `8`。

**`type: string`**

* 永远是字符串 `'comment'`

**`value: string`**

* 和构造函数里的 `value` 一致。

**`toJSON(): Object`**

* 返回描述该注释结点的一段 JSON 对象，形如：`<!-- value -->`。