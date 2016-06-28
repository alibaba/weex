### Weex devtools

Weex devtools is a custom devtools for weex that implements [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol), it is designed to help you quickly inspect your app and debug your JS bundle source in a chrome web page, both Android and IOS platform are supported.At present The devtools consist of two part : `Inspector` and `Debugger`. If you want it work well, you must install a `weex-devtool` as debug server.

![devtools-main](../images/devtools-main.png "devtools-main")

#### Inspector
 Inspector can be used to show your `Element` \ `NetWork` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` and so on.

![devtools-inspector](../images/devtools-inspector.png "devtools-inspector")

##### Element
![inspector-element](../images/inspector-element.png "inspector-element")

##### NetWork

###### show the total time and latency
![inspector-network](../images/inspector-network0.png "inspector-network")
###### show the header and response
![inspector-network](../images/inspector-network1.png "inspector-network")

##### Console
![inspector-console](../images/inspector-console.png "inspector-console")

##### Resource
![inspector-resource](../images/inspector-resource.png "inspector-resource")

#### Debugger

 Debugger can be used to debug your bundle js source, you can set `Breakpoint` \ watch `CallStack`.
 
![devtools-debugger](../images/devtools-debugger.png "devtools-debugger")

##### Breakpoint and CallStack
![debugger-breakpoint](../images/debugger-breakpoint.png "debugger-breakpoint")


#### How to install and launch devtools server

[weex-devtool](https://github.com/weexteam/weex-devtool) is essential no matter running on Android or IOS.


###### Install
```
$npm install -g weex-devtool
```

######  Usage

`$weex-devtool`  # launch debugger server

`$weex-devtool -p 8888`  # launch debugger server and set the server port

#### How to debug with chrome devtools

##### Android

See the doc [Weex devtools](../../android/inspector/README.md), it will lead you to config and use it step by step.













