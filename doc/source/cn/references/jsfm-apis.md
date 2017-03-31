---
title: JS Framework APIs 
type: references
order: 1.3
version: 2.1
---

# JS Framework APIs 

## BroadcastChannel <span class="api-version">v0.9+</span>

`BroadcastChannel` API 是 Weex 实例间通信的解决方案。

###  参考

+ [BroadcastChannel specification](https://html.spec.whatwg.org/multipage/comms.html#broadcasting-to-other-browsing-contexts).
+ [MessageEvent specification](https://html.spec.whatwg.org/multipage/comms.html#messageevent)

### API

+ `postMessage(message)`: 通过消息通道发送特定消息给其他 BroadcastChannel 对象。
+ `close`: 关闭 BroadcastChannel 对象，以便垃圾回收。
+ `onmessage`: Event 处理函数, 当 BroadcastChannel 对象接收到消息时触发。

### 使用

```javascript
const Stack = new BroadcastChannel('Avengers')
Stack.onmessage = function (event) {
  console.log(event.data) // in this case, it's "Hulk Smash !!!"
}

// in another instance
const Hulk = new BroadcastChannel('Avengers')
Hulk.postMessage("Hulk Smash !!!")
```

运行以上代码，Stack 可以从 Hulk 接收消息。

### 注意

需要注意的是: ** `message` 如果是一个对象，该对象不会深拷贝。**

参考以下例子

```javascript
const a = new BroadcastChannel('app')
const b = new BroadcastChannel('app')

const message = {
  lists: ['A', 'B']
}

a.onmessage = function (event) {

  // in this case, event.data is a reference of message
  console.assert(event.data === message)

}

b.postMessage(message)
```

在这个例子中，`event.data` 全等于 `message`。

与深拷贝相比，这种方式能够提高效率并减少内存消耗。但是，不建议开发者在使用时缓存或修改事件对象 (所有类型的事件处理程序都应该有此限制)。