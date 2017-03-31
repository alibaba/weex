---
title: WebSocket
type: references
order: 3.11
version: 2.1
---

# WebSocket

## Summary

WebSockets 是一种先进的技术, 这使得在用户的 H5/iOS/Android 和一个服务器之间打开一个的交互式通信会话成为可能, 有了这个 API，你可以向服务器发送消息, 并接收事件驱动的响应, 无需轮询服务器的响应

## **注意：**
- iOS和h5提供 WebSockets 的 protocol 默认实现，安卓使用需要提供自定义 adapter 实现，source:  
  - [DefaultWebSocketAdapter.java](https://github.com/alibaba/weex/blob/dev/android/commons/src/main/java/com/alibaba/weex/commons/adapter/DefaultWebSocketAdapter.java);
  - [DefaultWebSocketAdapterFactory.java](https://github.com/alibaba/weex/blob/dev/android/commons/src/main/java/com/alibaba/weex/commons/adapter/DefaultWebSocketAdapterFactory.java);
  - 集成例子参考weex [playground](https://github.com/alibaba/weex/tree/dev/android/playground)

- 只在.we文件支持，不支持vue2.0

## API
### `WebSocket(url, protocol)`

创建 WebSockets，并连接服务器

#### Arguments

- `url {string}`: 表示要连接的 URL;
- `protocol {string}`: WebSockets 协议

### `send(data)`

通过WebSocket连接向服务器发送数据

#### Arguments

- `data{string}`:要发送到服务器的数据

### `close(code,reason)`

关闭 WebSockets 的链接

#### Arguments

- `code {number}`: 关闭连接的状态号.
- `reason {string}`: 关闭的原因

### `onopen(options)`

链接打开的监听

#### Arguments

- `options {object}`: 一个空的对象

### `onmessage(options)`

消息事件的监听器

#### Arguments

- `options {object}`: 服务器返回的消息对象
  - `data {string}`: 监听器接收的到的消息

### `onclose(options)`

关闭事件的监听器

#### Arguments

- `options {object}`: 监听器接收到的对象
  - `code {number}`: 服务器返回关闭的状态码
  - `reason {string}`: 服务器返回的关闭原因
  - `wasClean {boolen}`: 是否完全关闭.

### `onerror(options)`

错误事件的监听器

#### Arguments

- `options {object}`: 错误信息的事件
  - `data {string}`: 监听器接收到的信息

### Example

```html
<template>
  <scroller>
    <div>
      <div style="background-color: #286090">
        <text class="title" style="height: 80px ;padding: 20px;color: white">websocket</text>
      </div>
      <input
              type="text"
              placeholder="please input message to send"
              class="input"
              autofocus="false"
              value=""
              onchange="onchange"
              oninput="oninput"
              id = "input"
      />
      <div style="flex-direction: row; justify-content: center;">
        <text class="button" onclick="{{connect}}">connect</text>
        <text class="button" onclick="{{send}}">send</text>
        <text class="button" onclick="{{close}}">close</text>
      </div>

      <div style="background-color: lightgray">
        <text class="title" style="height: 80px ;padding: 20px;color: black">method = send</text>
      </div>
      <text style="color: black;height: 80px">{{sendinfo}}</text>


      <div style="background-color: lightgray">
        <text class="title" style="height: 80px ;padding: 20px;color: black">method = onopen</text>
      </div>
      <text style="color: black;height: 80px">{{onopeninfo}}</text>

      <div style="background-color: lightgray">
        <text class="title" style="height: 80px ;padding: 20px;color: black">method = onmessage</text>
      </div>
      <text style="color: black;height: 400px">{{onmessage}}</text>

      <div style="background-color: lightgray">
        <text class="title" style="height: 80px ;padding: 20px;color: black">method = onclose</text>
      </div>
      <text style="color: black;height: 80px">{{oncloseinfo}}</text>

      <div style="background-color: lightgray">
        <text class="title" style="height: 80px ;padding: 20px;color: black">method = onerror</text>
      </div>
      <text style="color: black;height: 80px">{{onerrorinfo}}</text>

      <div style="background-color: lightgray">
        <text class="title" style="height: 80px ;padding: 20px;color: black">method = close</text>
      </div>
      <text style="color: black;height: 80px">{{closeinfo}}</text>

    </div>
    </div>
  </scroller>
</template>

<style>
  .input {
    font-size: 40px;
    height: 80px;
    width: 600px;
  }
  .button {
    font-size: 36px;
    width: 150px;
    color: #41B883;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
    border-width: 2px;
    border-style: solid;
    margin-right: 20px;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
</style>

<script>
  var websocket = require('@weex-module/webSocket');
  module.exports = {
    data: {
      connectinfo: '',
      sendinfo: '',
      onopeninfo: '',
      onmessage: '',
      oncloseinfo: '',
      onerrorinfo: '',
      closeinfo: '',
      txtInput:'',
      navBarHeight: 88,
      title: 'Navigator',
      dir: 'examples',
      baseURL: '',
    },
    methods: {
      connect:function() {
        websocket.WebSocket('ws://115.29.193.48:8088','');
        var self = this;
        websocket.onopen = function(e)
        {
          self.onopeninfo = JSON.stringify(e);
        }
        websocket.onmessage = function(e)
        {
          self.onmessage = e.data;
        }
        websocket.onerror = function(e)
        {
          self.onerrorinfo = e.data;
        }
        websocket.onclose = function(e)
        {
          self.onerrorinfo = e.code;
        }
      },
      send:function(e) {
        var input = this.$el('input');
        input.blur();
        websocket.send(this.txtInput);
        this.sendinfo = this.txtInput;

      },
      oninput: function(event) {
        this.txtInput = event.value;
      },
      close:function(e) {
        websocket.close();
      },
    }
  };
</script>
```

[Have a try](http://dotwe.org/weex/993f33173a712fecfb61c1c4b03bcb70)
