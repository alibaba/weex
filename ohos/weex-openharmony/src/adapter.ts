/*
 * Copyright (C) 2024. Huawei Device Co., Ltd. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Apache-2.0 license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache-2.0 license for more details.
 */

let weexModule = {
  name: "weex扩展API",
  // 默认走同步
  // isAsync: 是否异步方式调用 native api
  callNative: function (name, paramObj, callback, isAsync = false) {
    // @ts-ignore
    native.run(name, paramObj, callback, isAsync);
  }
}

let clipboard = {
  name: "weex剪贴板事件",
  getString: function (callback) {
    weexModule.callNative('getString', "", callback);
  },
  setString: function (text) {
    let paramObj = {"message": text};
    weexModule.callNative('setString', paramObj, undefined);
  }
}

let deviceInfo = {
  name: "weex获取全屏高度",
  enableFullScreenHeight: function (callback) {
    weexModule.callNative('enableFullScreenHeight', null, callback);
  }
}

let navigator = {
  name: "weex导航事件",
  pop: function (options, callback) {
    weexModule.callNative('navigatorPop', options, callback);
  },
  push: function (options, callback) {
    weexModule.callNative('navigatorPush', options, callback);
  },
  replace: function (options, callback) {
    weexModule.callNative('navigatorReplace', options, callback);
  }
}

let globalEvent = {
  name: "weex监听全局事件",
  addEventListener: function (eventName, callback) {
    if (callback === undefined) {
      console.error("callback is undefined.");
      return;
    }

    let paramObj = {'eventName': eventName}
    weexModule.callNative('addEventListener', paramObj, callback);
  },
  removeEventListener: function (eventName) {
    let paramObj = {'eventName': eventName}
    weexModule.callNative('removeEventListener', paramObj, undefined);
  }
}

let errorHandlers = [];
let closeHandlers = [];
let openHandlers = [];
let messageHandlers = [];
let socket = null;
const WEB_SOCKET_NO_READY = 'WebSocket is not ready'

// 给error event事件添加一个data属性
function handleError(handlers, errorMsg) {
  const event = new Event('error');
  handlers.forEach(handler => handler(Object.defineProperty(event, 'data', {
    value: errorMsg,
    enumerable: true,
    writable: true
  })));
}

const websocket = {
  WebSocket: function (url, protocols) {
    // 重新创建socket对象，初始化socket
    if (socket) {
      errorHandlers = [];
      closeHandlers = [];
      openHandlers = [];
      messageHandlers = [];
      socket = null;
    }
    socket = new WebSocket(url, protocols !== undefined && protocols !== '' ? protocols : 'wss');

    socket.onopen = function handleOpen(event) {
      openHandlers.forEach(handler => handler(event));
    };

    socket.onmessage = function handleMessage(event) {
      messageHandlers.forEach(handler => handler(event));
    };

    socket.onclose = function handleClose(event) {
      closeHandlers.forEach(handler => handler(event));
    };
  },

  onopen: function (handler) {
    openHandlers.push(handler);
  },

  onmessage: function (handler) {
    messageHandlers.push(handler);
  },

  onerror: function (handler) {
    errorHandlers.push(handler);
  },

  onclose: function (handler) {
    closeHandlers.push(handler);
  },

  send: function (data) {
    if (socket != null) {
      try {
        socket.send(data);
      } catch (e) {
        handleError(errorHandlers, e.message)
      }
    } else {
      handleError(errorHandlers, WEB_SOCKET_NO_READY)
    }
  },

  close: function () {
    if (socket != null) {
      // socket存在即关闭
      try {
        socket.close();
        errorHandlers = [];
        closeHandlers = [];
        openHandlers = [];
        messageHandlers = [];
        socket = null
      } catch (e) {
        handleError(errorHandlers, e.message)
      }
    } else {
      handleError(errorHandlers, WEB_SOCKET_NO_READY)
    }
  }
}


let picker = {
  name: "weex 选择器",
  pick: function (options, callback) {
    weexModule.callNative('pick', { 'options': options }, callback);
  },
  pickDate: function (options, callback) {
    weexModule.callNative('pickDate', { 'options': options }, callback);
  },
  pickTime: function (options, callback) {
    weexModule.callNative('pickTime', { 'options': options }, callback);
  }
}

export {
  clipboard,
  weexModule,
  deviceInfo,
  navigator,
  globalEvent,
  websocket,
  picker
}