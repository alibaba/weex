# Weex

> A framework for building Mobile cross-platform UI.

[![CircleCI](https://circleci.com/gh/alibaba/weex/tree/dev.svg?style=svg&circle-token=b83b047a3a01f6ec26458a455530a5ddc261925f)](https://circleci.com/gh/alibaba/weex/tree/dev) [![Gitter](https://img.shields.io/gitter/room/weexteam/cn.svg?maxAge=2592000)](https://gitter.im/weexteam) <sub>(English Gitter)</sub> [![Gitter](https://img.shields.io/gitter/room/weexteam/cn.svg?maxAge=2592000)](https://gitter.im/weexteam/cn) <sub>(Chinese 中文聊天室)</sub>

Support Android 4.1 (API 16) and iOS 7.0+. See [Weex website](http://alibaba.github.io/weex/) for more information. 

## For Windows

Please ***INSTALL [Git for Windows](https://git-scm.com/download/win)*** and run all the following commands in git-bash.

## Meet Weex

* [Install Playground](http://alibaba.github.io/weex/download.html).

## Use Weex

* [Tutorial](http://alibaba.github.io/weex/doc/tutorial.html)
* Doc: [English](http://alibaba.github.io/weex/doc/), [中文](https://github.com/weexteam/article/wiki/Weex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3)

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

## FAQ

See [FAQ](http://alibaba.github.io/weex/doc/faq.html) for more information.

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md) for more information.

