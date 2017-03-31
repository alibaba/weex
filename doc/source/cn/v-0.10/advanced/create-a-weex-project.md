---
title: 如何创建一个 Weex 项目
type: advanced
order: 3
has_chapter_content: true
version: 0.10
---

# 如何创建一个 Weex 项目

对于前端开发者来说开发一个 app 是不容易的，既然 Weex 能以 web 的开发体验构建高性能、可扩展的 native 应用，那我们怎么利用 Weex 简单高效的开发一个 native 应用呢？Weex 替你考虑了这件事。在本章中，我们将学习如何使用 Weexpack 工具快速生成一个全新的 Weex 项目。

根据你的操作系统的不同，步骤也略有差异，如果你从未接触过 native 开发，请慢慢来，遇到问题随时查阅 [FAQ](../faq.md)。

首先，不论任何平台，我们都需要 node.js 和 Weexpack。在本节中，默认你已经安装好了 node.js 和 npm，如有疑问，可参考上一章 [如何在本地开发 Weex 页面](../guide/develop-on-your-local-machine.html)。

Weexpack 是 Weex 新一代的工程开发套件，它允许开发者通过简单的命令，创建 weex 工程项目，将项目运行在不同的开发平台上。未来，我们考虑会将其集成在 weex-toolkits 上，但目前仍需要单独安装。好在安装 Weexpack 非常简单，可以直接使用 npm 安装：

```bash
npm install weexpack -g
```

或者用 cnpm：

```bash
cnpm install weexpack -g
```

接下来的步骤会有一些复杂和区别，根据开发平台的不同，我们提供了快速导航便于阅读：

- [iOS](#ios)
- [Android](#android)

## iOS

Mac 是唯一可以开发 iOS 应用的平台，因此创建 iOS 项目只支持 mac。对于 iOS，你需要安装 [Xcode](https://developer.apple.com/xcode/) 和 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) 。

安装 Xcode 最简单的方法是到 [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)。Xcode 体积较大，下载请耐心等待。

安装好 Xcode 后，你需要运行 Xcode，使 Xcode 自动安装开发者工具和确认使用协议。

之后你还需要安装 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) 。CocoaPods 是 Xcode 项目的类库管理工具，可以使用如下命令安装：

```bash
$ sudo gem install cocoapods
```

如果执行该命令无反应，很可能是 gem source 问题，你可以切换为淘宝 gem source：

```bash
$ gem sources --remove https://rubygems.org/
$ gem sources -a https://ruby.taobao.org/
$ sudo gem install cocoapods
```

如有问题，可参考 [CocoaPods 官方文档](https://guides.cocoapods.org/using/getting-started.html)

### 创建项目

然后，就可以使用 weexpack 创建 weex 工程了：

```bash
$ weexpack init appName
```

weexpack 会自动新建以 appName 命名的目录，并将项目模板拉取到该目录。

最终形成如下目录结构：

```bash
-> /appName
.
|—— .gitignore
|—— README.md
|—— package.json
|-- android.config.json
|-- ios.config.json
|—— webpack.config.js
|—— /src
|     |—— index.we
|—— /html5
|     |—— index.html
|—— /ios
|     |—— /playground
|     |—— /sdk
|     |—— /WXDevtool
|—— /android
|     |—— /playground
|     |—— /appframework
```

其中：

- `webpack.config.js` 是 webpack 配置文件，用于生成 `.we` 文件的 JSBunlde
- `ios.config.json` 是 iOS 项目配置文件
- `android.config.json` 是 Android 项目配置文件
- `/src` 目录放置 Weex 页面
- `/html5` 是 H5 端入口文件
- `/ios` 放置 iOS 项目
- `/android` 放置 Android 项目

紧接着，进入目录，并且安装依赖：

```bash
$ cd appName && npm install
```

至此，项目模版创建完成，接下来我们可以自定义我们的 APP 信息并打包运行。

### 运行与打包

如果一切正常，你可以使用 weexpack 打包或模拟器运行了：

模拟器运行

```bash
$ weexpack run ios
```

构建 ipa 包：

```bash
$ weexpack build ios
```

构建包的过程中，将会提示让您输入 CodeSign（证书）、Profile(provisioning profile)、AppId，只有输入真实的这些信息才能成功打包。 其余如AppName，和入口 weex bundle 文件可以编辑项目目录下的 `ios.config.json` 配置。 打完包成功之后，可以在 `/playground/build/ipa_build/` 目录下获取 ipa 文件。

注：证书需要预先安装到 keychain 中，在 keychain 中点击右键获取证书 id（证书名称）、provisioning profile 文件（\*mobileprovision）需要获取 UUID，进入目录可以看到 mobileprovision_UUID.sh 文件，此文件可以获取到 UUID。

mobileprovision_UUID.sh 用法如下：

```bash
$ ./mobileprovision_UUID.sh *mobileprovision
```

参数（\*mobileprovision）为 provisioning profile 文件路径

** 注：run 与 build 部分涉及 pod 的依赖安装问题。**

- 首先要安装 cocoapods ，具体安装步骤可查看[这里](https://cocoapods.org/)，建议安装 0.39.0 版本。
- 为了加快 CLI 执行速度，weexpack 创建的工程默认安装了需要的依赖库。但是命令执行依然会更新需要升级的依赖库。
  - 如果出现这种错误提示 `unable to find a specification for 'WeexSDK'` 这种错误，说明你本地没有更新 cocoapods master 仓库，运行 `pod repo update` ，此时运行 `pod search WeexSDK`：
 
  ![](https://img.alicdn.com/tps/TB1jLx4OFXXXXaoXFXXXXXXXXXX-212-33.png)  
 
  说明 master repo 更新成功。以上是以 `WeexSDK` 为例，其他库类似。
 
  - 如果出现这种错误 `error: The sandbox is not in sync with the Podfile.lock. Run 'pod install' or update your CocoaPods installation.` 进入 playground 目录（podfile 文件所在目录）按提示执行。

  更多 pod 使用细节请移步[cocoapods](https://cocoapods.org/)

- mobileprovision，参数（\*mobileprovision）为 provisioning profile 文件路径。

----

## Android

在 Mac 平台开发 Android 首先需要下载 [Android Studio](https://developer.android.com/studio/install.html)（你可能需要翻墙才能访问）。[Android Studio](https://developer.android.com/studio/install.html) 为我们提供了 Android SDK 及 AVD（模拟器）以便我们快速运行 Android 项目。

下载完成后运行 Android Studio，任意新建一个 Android 项目，在第二步中选择 **Android 5.1**，然后点击 next 完成项目创建，如图所示：

![android](https://gw.alicdn.com/tps/TB1VulhOFXXXXcPXFXXXXXXXXXX-828-686.png) 

待 Android Studio 打开后，在顶部菜单栏选择 Tools -> Android -> AVD Manager，安装 Android 模拟器：

![android](https://img.alicdn.com/tps/TB1CBdgOFXXXXXnXVXXXXXXXXXX-661-392.jpg)

之后，打开模拟器运行 Android。

**注意：**

1. 必须保持模拟器运行。
2. 保证 Android build-tool 的版本为 23.0。【可以在 Android Studio 的 SDK Manager 里查看是否已安装这个版本，如果没有可选择安装这一版本】。

### 配置环境变量

因为 Android Studio 安装的 SDK 不会自动配置环境变量（你自己安装的 SDK 同样不会）。所以需要您自己手动配置 Android_HOME 环境变量和 PATH 

如果是 Android Studio 安装的 SDK 安装路径可已在 SDK manager 里找到（打开 SDK manager 的方式请参照图2）

Windows 下请参照 [window 下如何设置 ANDROID 环境变量](http://jingyan.baidu.com/article/09ea3ede1b4df6c0aede39ab.html)

Linux/Mac 下只需编辑 `.bash_profile` 增加 PATH 即可：

```bash
vim ~/.bash_profile
```

然后添加下列代码进去（路径替换为你的真实路径）

```bash
export ANDROID_HOME=/xxx/Library/Android/sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools
```

然后保存退出（:wq）。再执行下列命令：

```bash
source ~/.bash_profile
```

### 创建项目

然后，就可以使用 weexpack 创建 weex 工程了：

```bash
$ weexpack init appName
```

weexpack 会自动新建以 appName 命名的目录，并将项目模板拉取到该目录。

最终形成如下目录结构：

```bash
-> /appName
.
|—— .gitignore
|—— README.md
|—— package.json
|-- android.config.json
|-- ios.config.json
|—— webpack.config.js
|—— /src
|     |—— index.we
|—— /html5
|     |—— index.html
|—— /ios
|     |—— /playground
|     |—— /sdk
|     |—— /WXDevtool
|—— /android
|     |—— /playground
|     |—— /appframework
```

其中：

- `webpack.config.js` 是 webpack 配置文件，用于生成 `.we` 文件的 JSBunlde
- `ios.config.json` 是 iOS 项目配置文件
- `android.config.json` 是 Android 项目配置文件
- `/src` 目录放置 Weex 页面
- `/html5` 是 H5 端入口文件
- `/ios` 放置 iOS 项目
- `/android` 放置 Android 项目

紧接着，进入目录，并且安装依赖：

```bash
$ cd appName && npm install
```

至此，项目模版创建完成，接下来我们可以自定义我们的 APP 信息并打包运行。

### 运行与打包

如果一切正常，你可以使用 weexpack 打包或模拟器运行了：

Android 的打包和构建是一体的 ：

```bash
$ weexpack run android
```

同样的你可以更改项目目录下的android.config.json

- `AppName`: 应用名
- `AppId`: application_id 包名
- `SplashText`: 欢迎页上面的文字
- `WeexBundle`: 指定的 weex bundle 文件（支持文件名和 url 的形式）

  指定文件名则以本地文件的方式加载 bundle，指定 url 则以远程的方式加载 JSBundle。如果以本地方式指定 bundle `.we` 文件请放到 `src` 目录。
