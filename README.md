# Weex

A framework for building Mobile cross-platform UI.

Android[![Download](https://api.bintray.com/packages/alibabaweex/maven/weex_sdk/images/download.svg)](https://bintray.com/alibabaweex/maven/weex_sdk/_latestVersion)
iOS[![Pod version](https://badge.fury.io/co/WeexSDK.svg)](https://cocoapods.org/pods/WeexSDK)
HTML5[![npm version](https://badge.fury.io/js/weex-html5.svg)](https://www.npmjs.com/package/weex-html5)

[![CircleCI](https://circleci.com/gh/alibaba/weex/tree/dev.svg?style=svg&circle-token=b83b047a3a01f6ec26458a455530a5ddc261925f)](https://circleci.com/gh/alibaba/weex/tree/dev)

Support Android 4.1 (API 16) and iOS 7.0+.

## For Windows

Please ***INSTALL [Git for Windows](https://git-scm.com/download/win)*** and run all the following commands in git-bash.

## Meet Weex

* Install [Weex Playground App](https://weex.apache.org/playground.html) to see examples we already written.
* If you want to write a demo, install [weex-toolkit](https://www.npmjs.com/package/weex-toolkit) in [Node.js](http://nodejs.org/) 4.0+ and
* Run `weex init` to generate & start a simple project in an empty folder.
* Follow the instructions in the project README.
* Enjoy it.

## Use Weex

* [Tutorial](http://weex.apache.org/guide/)
* [Documents](http://weex.apache.org/references)

### Android

0. Prerequisites
    0. Install [Node.js](http://nodejs.org/) 4.0+
    0. Under project root
        0. `npm install`, install project
        0. `./start`
    0. Install [Android Environment](http://developer.android.com/training/basics/firstapp/index.html)
0. Run playground, In Android Studio
    0. Open `android/playground`
    0. In `app/java/com.alibaba.weex/IndexActivity`, modify `CURRENT_IP` to your local IP
    0. Click <img src="http://gtms04.alicdn.com/tps/i4/TB1wCcqMpXXXXakXpXX3G7tGXXX-34-44.png" height="16" > (`Run` button)
0. [Add an example](./examples/README.md#add-an-example)

#### Runtime

On Android Platform , Weex code is executed in [weex_v8core](https://github.com/alibaba/weex_v8core) which is based on Google V8 JavaScript engine.

### iOS

0. Prerequisites
  0. Install [Node.js](http://nodejs.org/) 4.0+
    0. Under project root
        0. `npm install`, install project
        0. `./start`
    0. Install [iOS Environment](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html)
    0. Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
0. Run playground
    0. `cd ios/playground`
    0. `pod install`
    0. Open `WeexDemo.xcworkspace` in Xcode
    0. Click <img src="http://img1.tbcdn.cn/L1/461/1/5470b677a2f2eaaecf412cc55eeae062dbc275f9" height="16" > (`Run` button) or use default shortcut `cmd + r` in Xcode
    0. If you want to run the demo on your device, don't need to modify `CURRENT_IP` manually. ~~In `DemoDefine.h`(you can search this file by Xcode default shortcut `cmd + shift + o`), modify `CURRENT_IP` to your local IP~~
0. [Add an example](./examples/README.md#add-an-example)

## Scripts

See [SCRIPTS.md](./SCRIPTS.md) for more information.

## IDE Plugin & Syntax Highlight & DevTool

Weex team have developed a [DevTool](https://github.com/weexteam/weex-devtool) to help you to improve `we file` debug efficiency.

See more stuff on [this wiki page](https://github.com/alibaba/weex/wiki/Weex-Community)

### Weex Community

* [StackOverflow](http://stackoverflow.com/questions/tagged/weex): Ask questions about Weex.
* [SegmentFault (cn)](https://segmentfault.com/t/weex): 中文交流与讨论
* [FAQ](https://weex.apache.org/faq.html)
* [Articles (cn)](https://github.com/weexteam/article/issues): Weex 相关文章集合

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md) for more information.
