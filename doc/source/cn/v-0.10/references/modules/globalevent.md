---
title: globalEvent
type: references
order: 4.9
version: 0.10
---

# 全局事件
<span class="weex-version">0.8 (开发中)</span>

`globalEvent` 用于监听持久性事件，例如定位信息，陀螺仪等的变化。全局事件是需要额外 APIs 处理的次要 API。你能通过 `addEventListener` 注册事件监听，当你不再需要的时候，也可以通过 `removingEventListener` 取消事件监听。

*提醒*

- 这是一个实例级别的事件，而非应用级别。

## 如何让你的模块支持全局事件

API 开发完成后，当需要发送事件时，需要通过以下方法：

```javascript
/**
  * 
  * @param eventName eventName
  * @param params event params
  */
instance.fireGlobalEventCallback(eventName,params);
```

如何在 weex-html5 组件或模块中分发全局事件？只需在文档元素上分派事件：

```javascript
var evt = new Event('some-type')
evt.data = { foo: 'bar' }
document.dispatchEvent(evt)
```

**示例**

### Android

```java
Map<String,Object> params=new HashMap<>();
params.put("key","value");
mWXSDKInstance.fireGlobalEventCallback("geolocation",params);
```

### iOS

```object-c 
[weexInstance fireGlobalEvent:@"geolocation" params:@{@"key":@"value"}];
```

## API

### `addEventListener(String eventName, String callback)`

注册全局事件。

#### 参数

- `eventName {string}`：需要监听的事件名称。
- `callback {Function}`：触发事件后的回调函数。

#### 示例

```javascript
var globalEvent = require('@weex-module/globalEvent');
globalEvent.addEventListener("geolocation", function (e) {
  console.log("get geolocation")
});
```

### `removeEventListener(String eventName)`

取消事件监听。

#### 参数

- `eventName {string}`：需要取消的事件名称。

#### 示例

```javascript
var globalEvent = require('@weex-module/globalEvent');
globalEvent.removeEventListener("geolocation");
```
