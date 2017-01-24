---
title: Debug in html5 renderer
type: guide
order: 3.5
version: 0.10
---

# How to debug in html5 renderer ?

Since weex-html5 can run on a modern mobile browser, it's naturally supported to debug weex-html5 code in browsers' dev tools. Use browser's devTools to iterate, debug and profile your weex-html5 app. Take chrome's debug tool as a example:

![chrome's debug tool](https://gw.alicdn.com/mt/TB1V1hIMpXXXXaHXVXXXXXXXXXX-983-730.png)

## Elements

Use elements' panel to inspect the layout and design of the weex-html5 page, and manipulate the DOM and CSS to do some experiment freely.

## Console

You can use `console.log` to log information on console, but it's highly recommended to use `nativeLog` instead, since nativeLog can run on a native platform based on a browser. The defect of `nativeLog` is that it's not supported to trace it from the console to the source file which the `nativeLog` is called in, therefore in this situation you'd better use `console.log`, and you should make sure this code will not run on native platform (otherwise a exception or a crash will be caused).

## Breakpoints

You can set breakpoints to debug code. Breakpoints are one of the most effective way to debug code. Breakpoints enable you to pause script execution and then investigate the call stack variable values at that particular moment in time.

Manual breakpoints are individual breakpoints that you set on a specific line of code. You can set these via Chrome DevTools GUI, or by inserting the `debugger` keyword in your code.

## Locate your bug

Generally speaking, there are three possible layer the bug could happen on: the renderer (weex-html5), the js-framework (weex-js-framework) and the transformer (gulp-weex).

Here are some suggestions to locate your bug so that you can recognize which layer the bug is on:

* check the console for errors. In debug mode if there is a error happend there will be info about it on the console.
* in bridge/receiver.js, whether the `callNative` function is called.
* whether the supposed to be called API method is actually called and executed.
* whether the `callJS` method for event firing or callback executing is called.

## other

More info about how to debug h5 pages on chrome devTools: [chrome's devTools docs](https://developers.google.com/web/tools/chrome-devtools/?hl=en)






