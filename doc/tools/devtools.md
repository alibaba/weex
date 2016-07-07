# Devtools

Weex devtools is a custom devtools for weex that implements [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol), it is designed to help you quickly inspect your app and debug your JS bundle source in a chrome web page, both Android and IOS platform are supported.

## Install

* Install 
    * `$ npm install -g weex-devtool`
* Usage
    * `$ weex-devtool` , launch debugger server
    * `$ weex-devtool -p 8888`  # launch debugger server and set the server port

## Features

### Connect devices
![devtools-main](https://img.alicdn.com/tps/TB13fwSKFXXXXXDaXXXXXXXXXXX-887-828.png "connecting (multiple) devices")

### Inspector
 Inspector can be used to show your `Element` \ `NetWork` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` and so on.

![devtools-inspector](https://img.alicdn.com/tps/TB1O.nwKFXXXXX8XpXXXXXXXXXX-1436-811.png "devtools-inspector")

#### Element
![inspector-element](https://img.alicdn.com/tps/TB1.02bKFXXXXXwaXXXXXXXXXXX-2880-1800.png "inspector-element")

#### NetWork

##### show the total time and latency
![inspector-network](https://img.alicdn.com/tps/TB1NjO_KFXXXXcaaXXXXXXXXXXX-2880-1800.png "inspector-network")

##### show the header and response
![inspector-network](https://img.alicdn.com/tps/TB1ck6lKFXXXXbZXFXXXXXXXXXX-2880-1800.png "inspector-network")

#### Console
![inspector-console](https://img.alicdn.com/tps/TB1a7HqKFXXXXXMXFXXXXXXXXXX-2880-1800.png "inspector-console")

#### Resource
![inspector-resource](https://img.alicdn.com/tps/TB1oY6cKFXXXXXQaXXXXXXXXXXX-2880-1800.png "inspector-resource")

### Debugger

 Debugger can be used to debug your bundle js source, you can set `Breakpoint` \ watch `CallStack`.
 
![devtools-debugger](https://img.alicdn.com/tps/TB1aPTEKFXXXXXaXXXXXXXXXXXX-1436-813.png "devtools-debugger")

#### Breakpoint and CallStack
![debugger-breakpoint](https://img.alicdn.com/tps/TB1_trbKFXXXXc0XVXXXXXXXXXX-2880-1800.png "debugger-breakpoint")


## Integrate devtools

* Android
    * See the doc [Weex devtools (Android)](/tools/devtools-android.md), it will lead you to config and use it step by step.
* IOS
    * See the doc [Weex devtools (IOS)](/tools/devtools-ios.md), it will lead you to config and use it step by step.

