# Weex    
Android[![Download](https://api.bintray.com/packages/alibabaweex/maven/weex_sdk/images/download.svg)](https://bintray.com/alibabaweex/maven/weex_sdk/_latestVersion)
iOS[![Pod version](https://badge.fury.io/co/WeexSDK.svg)](https://cocoapods.org/pods/WeexSDK)
HTML5[![npm version](https://badge.fury.io/js/weex-html5.svg)](https://www.npmjs.com/package/weex-html5)

> A framework for building Mobile cross-platform UI.

[![CircleCI](https://circleci.com/gh/alibaba/weex/tree/dev.svg?style=svg&circle-token=b83b047a3a01f6ec26458a455530a5ddc261925f)](https://circleci.com/gh/alibaba/weex/tree/dev) [![Gitter](https://img.shields.io/gitter/room/weexteam/cn.svg?maxAge=2592000)](https://gitter.im/weexteam) <sub>(English Gitter)</sub> [![Gitter](https://img.shields.io/gitter/room/weexteam/cn.svg?maxAge=2592000)](https://gitter.im/weexteam/cn) <sub>(Chinese 中文聊天室)</sub>

Support Android 4.1 (API 16) and iOS 7.0+. See [Weex website](https://alibaba.github.io/weex/) for more information.

## For Windows

Please ***INSTALL [Git for Windows](https://git-scm.com/download/win)*** and run all the following commands in git-bash.

## Meet Weex

* Install [Weex Playground App](https://alibaba.github.io/weex/download.html) to see examples we already written.
* If you want to write a demo, install [weex-toolkit](https://www.npmjs.com/package/weex-toolkit) in [Node.js](http://nodejs.org/) 4.0+ and
* Run `weex init` to generate & start a simple project in an empty folder.
* Follow the instructions in the project README.
* Enjoy it.

## Use Weex

* [Tutorial](https://alibaba.github.io/weex/doc/tutorial.html)
* Doc: [English](https://alibaba.github.io/weex/doc/), [中文](https://github.com/weexteam/article/wiki/Weex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3)

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
    0. If you want to run the demo on your device. In `DemoDefine.h`(you can search this file by Xcode default shortcut `cmd + shift + o`), modify `CURRENT_IP` to your local IP
0. [Add an example](./examples/README.md#add-an-example)

## Scripts

See [SCRIPTS.md](./SCRIPTS.md) for more information.


## IDE Plugin & Syntax Highlight & DevTool

See [Weex Community](https://github.com/alibaba/weex/wiki/Weex-Community) Wiki page

Weex team have developed a [DevTool](https://github.com/weexteam/weex-devtool) to help you to improve `we file` debug efficiency.

## FAQ

See [FAQ](https://alibaba.github.io/weex/doc/faq.html) for more information.


### Community based Weex knowledge site

* [weex article](https://github.com/weexteam/article/wiki) : article collection about Weex(文章集合)
* [weex.help](http://weex.help/)  : 3rd forum about Weex(第三方Weex中文技术论坛)
* [gitter.im chinese room](https://gitter.im/weexteam/cn?utm_source=share-link&utm_medium=link&utm_campaign=share-link) :   an instant message chat room about Weex(Weex中文聊天室)

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md) for more information.
