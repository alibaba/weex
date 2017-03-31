---
title: 集成 Devtools 到 Android
type: advanced
order: 12
has_chapter_content: true
version: 0.10
---

# 集成 Devtools 到 Android

Weex Devtools 能够方便调试 Weex 页面，但此功能离不开 Native 的支持。如何让你的 App 也集成 Devtools，在本章将会详细说明 Android 端如何接入 Weex Devtools。

## Android 应用接入

### 添加依赖

可以通过 Gradle 或者 Maven 添加对 devtools aar 的依赖，也可以直接对源码依赖。强烈建议使用最新版本，因为 Weex SDK 和 devtools 都在快速的迭代开发中，新版本会有更多惊喜，同时也修复老版本中一些问题。最新的 release 版本可在[这里](https://github.com/weexteam/weex_devtools_android/releases)查看。所有的 release 版本都会发布到 [jcenter repo](https://bintray.com/alibabaweex/maven/weex_inspector)。

- *Gradle 依赖*

  ```gradle
  dependencies {
    compile 'com.taobao.android:weex_inspector:0.8.0.0'
  }
  ```

- *Maven依赖*

  ```xml
  <dependency>
    <groupId>com.taobao.android</groupId>
    <artifactId>weex_inspector</artifactId>
    <version>0.8.0.0</version>
    <type>pom</type>
  </dependency>
  ```

- *源码依赖*
  
  需要复制 [inspector](https://github.com/weexteam/weex_devtools_android/tree/master/inspector) 目录到你的 App 的同级目录，然后在工程的 `settings.gradle` 文件下添加 `include ":inspector"`，此过程可以参考 playground 源码的工程配置及其配置，然后在 App 的 `build.gralde` 中添加依赖。

  ```gradle
  dependencies {
    compile project(':inspector')
  }
  ```

  另外 weex_inspector 中有一部分包是以 provided 的方式引入，接入方需要自行解决依赖和版本冲突。
 
  - **provided方式引用的包**

    ```gradle
      dependencies {
        provided 'com.google.code.findbugs:jsr305:2.0.1'
        provided 'com.android.support:appcompat-v7:23.1.1'
        provided 'com.taobao.android:weex_sdk:0.8.0'
        provided 'com.alibaba:fastjson:1.1.45+'
        ...
      }
    ```
 
  - **反射引用的包(0.8.0.0以上版本)**

    ```gradle
      dependencies {
        compile 'com.squareup.okhttp:okhttp:2.3.0'
        compile 'com.squareup.okhttp:okhttp-ws:2.3.0'
        ...
      }
    ```
 
    或者
 
    ```gradle
    dependencies {
      compile 'com.squareup.okhttp:okhttp:3.4.1'
      compile 'com.squareup.okhttp:okhttp-ws:3.4.1'
        ...
    }
    ```

#### 版本兼容

| weex sdk | weex inspector | Debugger Server |
|----------|----------------|-----------------|
| 0.8.0.1+ | 0.0.8.1+       | 0.2.39+         |
| 0.7.0+   | 0.0.7.13       | 0.2.38          |
| 0.6.0+   | 0.0.2.2        | -               |


### 添加 Debug 模式开关

控制调试模式的打开和关闭的关键点可以概括为三条规则。

**规则一：通过 `sRemoteDebugMode` 和 `sRemoteDebugProxyUrl` 和来设置开关和 Debugger Server 地址。**

Weex SDK 的 `WXEnvironment` 类里有一对静态变量标记了 Weex 当前的调试模式是否开启分别是：

```java
public static boolean sRemoteDebugMode; // 是否开启 debug 模式，默认关闭
public static String sRemoteDebugProxyUrl; // DebugServer的websocket地址
```

无论在 App 中无论以何种方式设置 Debug 模式，都必须在恰当的时机调用类似如下的方法来设置 `WXEnvironment.sRemoteDebugMode` 和 `WXEnvironment.sRemoteDebugProxyUrl`。

```java
private void initDebugEnvironment(boolean enable, String host) {
  WXEnvironment.sRemoteDebugMode = enable;
  WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
}
```

**规则二：修改 `sRemoteDebugMode` 后一定要调用``WXSDKEngine.reload()`。**

一般來說，在修改了 `WXEnvironment.sRemoteDebugMode` 以后调用了 `WXSDKEngine.reload()` 方法才能够使 Debug模式生效。`WXSDKEngine.reload()` 用来重置 Weex 的运行环境上下文，在切换调试模式时需要调用此方法来创建新的 Weex 运行时和 DebugBridge 并将所有的 JS 调用桥接到调试服务器执行。在 reload 过程中会调用 launchInspector，这就是 SDK 控制 Debug 模式最核心一个方法，其传入参数即为 `sRemoteDebugMode`，若为 `true` 则该方法中尝试以反射的方式获取 DebugBridge 用来在远端执行 JS，否则在本地运行。

```java
private void launchInspector(boolean remoteDebug) {
  if (WXEnvironment.isApkDebugable()) {
    try {
      if (mWxDebugProxy != null) {
        mWxDebugProxy.stop();
      }
      HackedClass<Object> debugProxyClass = WXHack.into("com.taobao.weex.devtools.debug.DebugServerProxy");
      mWxDebugProxy = (IWXDebugProxy) debugProxyClass.constructor(Context.class, WXBridgeManager.class)
              .getInstance(WXEnvironment.getApplication(), WXBridgeManager.this);
      if (mWxDebugProxy != null) {
        mWxDebugProxy.start();
        if (remoteDebug) {
          mWXBridge = mWxDebugProxy.getWXBridge();
        } else {
          if (mWXBridge != null && !(mWXBridge instanceof WXBridge)) {
            mWXBridge = null;
          }
        }
      }
    } catch (HackAssertionException e) {
      WXLogUtils.e("launchInspector HackAssertionException ", e);
    }
  }
}
```

只要遵循上面的原理，开启 Debug 模式的方式和时机可由接入方灵活实现。从 launchInspector 可以看到，SDK 对 devtools 的 aar 包并无强依赖,我们的 App 只需要在 Debug 包中打包该 aar 即可，这样多少可以缓解包大小问题和安全问题。
 
**例外：** _若修改 `WXEnvironment.sRemoteDebugMode` 的时机在 `WXBridgeManager` 初始化和 restart 和之前则 `WXSDKEngine.reload()` 可忽略._

**规则三：通过响应 `ACTION_DEBUG_INSTANCE_REFRESH` 广播及时刷新。**

广播 `ACTION_DEBUG_INSTANCE_REFRESH` 在调试模式切换和 Chrome 调试页面刷新时发出，主要用来通知当前的 Weex容器以 Debug 模式重新加载当前页。在 playground 中的处理过程如下：

```java
public class RefreshBroadcastReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (IWXDebugProxy.ACTION_DEBUG_INSTANCE_REFRESH.equals(intent.getAction())) {
      if (mUri != null) {
        if (TextUtils.equals(mUri.getScheme(), "http") || TextUtils.equals(mUri.getScheme(), "https")) {
          loadWXfromService(mUri.toString());
        } else {
          loadWXfromLocal(true);
        }
      }
    }
  }
}
```

如果接入方的容器未对该广播做处理，那么将不支持刷新和调试过程中编辑代码时的 watch 功能。

## 接入示例

最简单方式就是复用 Playground 的相关代码，比如扫码和刷新等模块，但是扫码不是必须的，它只是与 App 通信的一种形式，二维码里的包含DebugServer IP 及 bundle 地址等信息，用于建立 App 和 Debugger Server 之间的连接及动态加载 bundle。在 Playground 中给出了两种开启 debug 模式的范例。

* 范例1：通过在 `XXXApplication` 中设置开关打开调试模式

```java
public class MyApplication extends Application {
  public void onCreate() {
  super.onCreate();
  initDebugEnvironment(true, "xxx.xxx.xxx.xxx"/*"DEBUG_SERVER_HOST"*/);
  }
}
```

这种方式最直接，在代码中直接 hardcode 了开启调试模式，如果在 SDK 初始化之前调用甚至连 `WXSDKEngine.reload()` 都不需要调用，接入方如果需要更灵活的策略可以将 `initDebugEnvironment(boolean enable, String host)` 和 `WXSDKEngine.reload()` 组合在一起在合适的位置和时机调用即可。

* 范例2：通过扫码打开调试模式

Playground 中较多的使用扫码的方式传递信息，不仅用这种方式控制 Debug 模式的开关,而且还通过它来传入 bundle 的 url 直接调试。应当说在开发中这种方式是比较高效的，省去了修改 SDK 代码重复编译和安装 App 的麻烦，缺点就是调试工具这种方式接入需要 App 具有扫码和处理特定规则二维码的能力。除了 Playground 中的方式，接入方亦可根据业务场景对 Debugger 和接入方式进行二次开发。

Playground 集成的具体代码可参考如下两个文件：

* 开关控制，主要参考对二维码的处理部分，详见 [`WXApplication.java`](https://github.com/weexteam/weex_devtools_android/blob/master/playground/app/src/main/java/com/alibaba/weex/WXApplication.java)

* 刷新控制 ，主要参考是对容器 `ACTION_DEBUG_INSTANCE_REFRESH`的处理，详见 [`WXPageActivity.java`](https://github.com/weexteam/weex_devtools_android/blob/master/playground/app/src/main/java/com/alibaba/weex/WXPageActivity.java)

## 牛刀小试

### 前置工作 

如果未安装 Debugger Server，在命令行执行 `npm install -g weex-toolkit` 既可以安装调试服务器，运行命令 `weex debug` 就会启动 DebugServer 并打开一个调试页面（详情请查看 [本地开发](/develop-on-your-local-machine.md)）。页面下方会展示一个二维码，这个二维码用于向 App 传递 Server 端的地址建立连接。

![_](https://img.alicdn.com/tps/TB1aKy4NXXXXXacXVXXXXXXXXXX-1019-756.png)

### 开始调试

如果你的 App 客户端完成了以上步骤那么恭喜你已经接入完毕，可以愉快的调试 Weex bundle 了，调试体验和网页调试一致！建议新手首先用官方的 Playground 体验一下调试流程。只需要启动 App 扫描 Chrome 调试页面下方的第一个二维码即可建立与 Debugger Server 的通信，Chorome 的调试页面将会列出连接成功的设备信息。

![devtools-main](https://img.alicdn.com/tps/TB13fwSKFXXXXXDaXXXXXXXXXXX-887-828.png)

#### 主要步骤如下

1. 如果你要加载服务器上 bundle，第一步就是要让你的 bundle sever 跑起来. 在 Playground 中特别简单，只需要你到 Weex 源码目录下，运行 `./start` 即可。
2. 命令行运行 `weex debug` 启动 Debugger Server，Chrome 将会打开一个网页，在网页下方有一个二维码和简单的介绍。
3. 启动 App 并确认打开调试模式。你将在上一步中打开的网页中看到一个设备列表，每个设备项都有两个按钮，分别是 `Debugger` 和 `Inspector`。
4. 点击 `Inspector` Chrome 将创建 Inspector 网页；点击 `Debugger` Chrome 将创建 Debugger 网页；二者是相互独立的功能，不相互依赖。

---

## 背景知识

### Devtools 组件介绍
Devtools 扩展了 [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol)，在客户端和调试服务器之间的采用 [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) 作为通信机制，本质上调试过程是两个进程间协同，相互交换控制权及运行结果的过程。更多细节还请阅读 [Weex Devtools Debugger 的技术选型实录](http://www.atatech.org/articles/59284)这篇文章。

* **客户端**

  Devtools 客户端作为 aar 被集成 App 中，它通过 webscoket 连接到调试服务器，此处并未做安全检查。出于安全机制及包大小考虑，强烈建议接入方只在 debug 版本中打包此 aar。

* **服务器**

  Devtools 服务器端是信息交换的中枢，既连接客户端，又连接 Chrome，大多数情况下扮演一个消息转发服务器和 Runtime Manager 的角色。

* **Web端**

  Chrome 的 V8 引擎扮演着 Bundle javascript runtime 的角色。开启 debug 模式后，所有的 bundle js 代码都在该引擎上运行。另一方面我们也复用了 Chrome 前端的调试界面，例如设置断点，查看调用栈等，调试页关闭则 runtime 将会被清理。

调试的大致过程请参考如下时序图。

![debug sequence diagram](https://img.alicdn.com/tps/TB1igLoMVXXXXawapXXXXXXXXXX-786-1610.jpg "debug sequence diagram")

## FAQ

在各业务接入过程中，陆续发现一些问题，对高频次的问题解答如下，开发中以 weex debug -V 的方式启动 Debugger Server 可以看到 server 端的 log 信息，对照上文中的时序图对于定位问题还是非常有帮助，建议调试中默认开启 server 端 log。

1. **扫码 App 在 DebugServerProxy 中抛出 class not found**

  已知的原因如下：

  * weex_inspector 以 provided 方式引用的包是否引入成功，如 fastjson 等。
  * weex_inspector 以 compile 方式引用的包是否引入成功，某些 app 重新引入 `com.squareup.okhttp:okhttp:2.3.0` 和 `com.squareup.okhttp:okhttp-ws:2.3.0` 则不再报错。
  * 混淆规则影响反射。

2. **playground 扫码调试 crash**

  已知的原因如下：

  * 系统为 android 6+，崩溃信息提示进程需要 `android.permission.READ_PHONE_STATE` 权限，代码中未做权限检查，在 0.0.2.7 版本以后已修复，不再需要此权限。

3. **扫码后设备列表页并没有出现我的设备信息**

  已知的原因如下：

  * Debugger Server 和手机在不同网段，被防火墙隔离。
  * 手机连接了 PC 端的代理，当前尚不支持。
  * 多进程连接服务器端的同一端口，比如在 Application 的 `onCreate` 中初始化 sdk，若多个进程连接服务器端的同一端口则报错，在 0.0.2.3 版本以后已支持多进程无此问题。

4. **调试过程中频繁刷新连接失败，Server 端提示重新启动 App，非必现**

  已知的原因如下：

  * 多线程操作网络连接引起，在频繁的即断即连时容易触发。在 0.0.7.1 版本已修复。
