---
title: Virtual DOM APIs
type: references
order: 5.3
version: 0.10
---

# Virtual DOM APIs

## `Document`

每个实例有一个与实例 id 对应的 document。Document 具有组成一个节点树的多个节点。

### 构造函数

##### `new Document(id: string, url: string?)`

### 成员

##### `createElement(tagName: string, props: Object?): Element`

创建一个特定类型 `Element` 对象。`props` 对象可能包含一个 `attr` 对象和一个 `style` 对象。例如 `createBody('div', {style: {backgroundColor: '#ffffff'}})`

##### `createComment(text: string): Comment`

创建一个具有一些注释文本的 `Comment` 对象。

##### `open()`

初始化渲染开始时设置一个标志，表示初始化渲染开始，每个 DOM 更新将被立即调用。

##### `close()`

初始化渲染完成时设置一个标志，标识初始化渲染完成，DOM 更新以后将在每个任务中批处理。

##### `fireEvent(el: Element, type: string, e: Object?, domChanges: Object?)`

在某个元素上触发一个带有特定类型的事件，这个事件带有一个事件对象。当事件导致一些 DOM 的变化，第四个参数将像 `createElement` 方法里的 `props` 参数一样描述这些 DOM 变化。

#### 只读属性 & Getters

##### `id: string`

##### `URL: string?`

##### `body: Element`

body 元素

##### `documentElement: Element`

document 元素

##### `getRef(ref: string): Node?`

通过内部 node map 的 `ref` 获取节点。 

**注意：**

在一个 document 被创建时会自动生成一个 `documentElement` ，并且 `body` 应该手动创建并添加到 `documentElement` 才能工作。`body` 的 `type` 必须是一个 `div`，`list` 或 `scroller`。

## `Node`

### 构造函数

##### `new Node()`

### 成员

##### `destroy()`

#### 只读属性 & Getters

##### `ref: string`

##### `nextSibling: Node?`

##### `previousSibling: Node?`

##### `parentNode: Node?`

## `Element` extends `Node`

### 构造函数

##### `new Element(type: string, props: Object?, ownerDocument: Document)`

创建一个元素，并且 `props` 对象可能包含一个 `attr` 对象和一个 `style` 对象。

### 成员

#### DOM 树

##### `appendChild(node: Node)`

##### `insertBefore(node: Node, before: Node?)`

##### `insertAfter(node: Node, after: Node?)`

##### `removeChild(node: Node, preserved: boolean?)`

移除一个子节点。`preserved` 参数表示是否立即销毁删除该节点或保存它。

##### `clear()`

#### DOM props

##### `setAttr(key: string, value: string, silent: boolean?)`

如果 `silent` 为 `true`，也不会调用 native。用于有 virtual-DOM 变化的事件处理。

##### `setStyle(key: string, value: string, silent: boolean?)`

`silent` 参数作用与 `setAttr` 中的一样。

##### `setClassStyle(classStyle: Object)`

class 样式的 CSS 优先级低于内联样式，当两种样式风格出现时，内联样式的值会覆盖 class 样式的值。

##### `addEvent(type: string, handler: Function)`

##### `removeEvent(type: string)`

##### `fireEvent(type: string, e: any)`

#### 只读属性 & Getters

##### `toJSON(): Object`

格式化 `{ref: string, type: string, attr: Object, style: Object, event: Array(string), children: Array}`

## `Comment` extends `Node`

`Comment` 将不被传给渲染引擎。因此，可作为占位符使用。

### 构造函数

##### `new Comment(value: string)`

### 成员

#### 只读属性 & Getters

##### `type: string`

返回 `'comment'`

##### `value: string`
