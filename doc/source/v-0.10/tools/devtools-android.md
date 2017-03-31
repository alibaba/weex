---
title: Devtools for Android
type: tools
order: 2.1
version: 0.10
---

# Devtools for Android

[![GitHub release](https://img.shields.io/github/release/weexteam/weex_devtools_android.svg)](https://github.com/weexteam/weex_devtools_android/releases)   [![Codacy Badge](https://api.codacy.com/project/badge/Grade/af0790bf45c9480fb0ec90ad834b89a3)](https://www.codacy.com/app/weex_devtools/weex_devtools_android?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=weexteam/weex_devtools_android&amp;utm_campaign=Badge_Grade) 	[![Code Climate](https://codeclimate.com/github/weexteam/weex_devtools_android/badges/gpa.svg)](https://codeclimate.com/github/weexteam/weex_devtools_android) [![Issue Count](https://codeclimate.com/github/weexteam/weex_devtools_android/badges/issue_count.svg)](https://codeclimate.com/github/weexteam/weex_devtools_android) [![GitHub issues](https://img.shields.io/github/issues/weexteam/weex_devtools_android.svg)](https://github.com/weexteam/weex_devtools_android/issues)  [ ![Download](https://api.bintray.com/packages/alibabaweex/maven/weex_inspector/images/download.svg) ](https://bintray.com/alibabaweex/maven/weex_inspector/_latestVersion)

Weex devtools is a custom devtools for weex that implements [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol) inspired by [Stetho](https://github.com/facebook/stetho), it is designed to help you quickly inspect your app and debug your JS bundle source in a chrome web page.At present The devtools consist of two part : `Inspector` and `Debugger`. If you want it work well, you must install a `weex-devtool` as debug server.

- **Inspector**
 Inspector can be used to show your `Element` \ `NetWork` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` and so on.

- **Debugger**
 Debugger can be used to debug your bundle js source, you can set `Breakpoint` \ watch `CallStack`.

## Install and launch devtools server
Open your terminal then type `npm install -g weex-toolkit` and run.Launch it just type and run the command `weex debug`, then a Chrome web page will be opened.

## Use on an android device or emulator

### Taste of first debug with playground
If you are a green hand to the debug of weex, we recommend you to try your first debug with `playground`, what you need to do is just launch the playground and scan the QR code shown in the debug page which wound opened if the `devtools server` have been launched. after you scan the QR code, the web page will list your connected devices.

![devtools-main](https://img.alicdn.com/tps/TB13fwSKFXXXXXDaXXXXXXXXXXX-887-828.png "connecting (multiple) devices")

#### How Debugger Works
Devtools expands [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol) and the mechanism of communication between client and debug sever is based on [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC).

##### Devtools Client
Devtools Client is integrated in App as aar, it connects to debug server through webscoket protocol with out permission check. I recommend you just packaged it in your debug version consider of the security mechanism.

##### Devtools Debug Server
Devtools Debug Server is the center node of the communication, it connects to both app and chrome, acts as the turn server of debugging protocol messages and the manager of the js runtime.

##### Chrome FrontEnd
Chrome's V8 engine acts as the javascript runtime, when debug mode is enabled, all the js code run on it. On the other side we also reuse most of the Chrome's debugging user interface, such as set breakpoint, see call stack and so on. 

![debug sequence diagram](https://img.alicdn.com/tps/TB1igLoMVXXXXawapXXXXXXXXXX-786-1610.jpg "debug sequence diagram")

### Enable devtools in your own app
Of course you can reuse the code of playground to build your own app, that is the simplest way to let your app's js code debuggable. On the other hand QR code is not necessary, if your review the source code you can draw a conclusion that QR CODE is just a way to set `devtools server` address. following those steps you can do the same thing.

#### Gradle dependency on inspector. 
There are two choices to set the dependency, the Choice A is recommanded if you have no change to weex_sdk or inspector, while if you use your own custom weex_sdk or inspector Choice B is suitable.
 
  * *A - aar dependency from jcenter*.
  ````
  dependencies {
          compile 'com.taobao.android:weex_inspector:0.0.8.1'
  }
  ````
I strongly recommend you use the latest version since both weex sdk and devtools are developed iteratively and rapidly. See the release version list [here](https://github.com/weexteam/weex_devtools_android/releases). All the release version will publish to the [jcenter repo](https://bintray.com/alibabaweex/maven/weex_inspector).

  * *B - source code dependency.*

  you need to copy the dir of inspector to the same dir of your app and add `include ":inspector"`in your project's `settings.gradle` file just like playground have done, then add dependency in your app's `build.gralde`.
  ````
  dependencies {
          compile project(':inspector')
  }
  ````

##### Version compatibility

| weex sdk | weex inspector | debug server |
|----------|----------------|--------------|
|0.8.0.1+  | 0.0.8.1        |0.2.39+       |
|0.7.0+    | 0.0.7.13       |0.2.38        |
|0.6.0+    | 0.0.2.2        |              |


#### Initialize in your XXXApplication file.
````
    public class MyApplication extends Application {
      public void onCreate() {
      super.onCreate();
      initDebugEnvironment(true, "xxx.xxx.xxx.xxx"/*"DEBUG_SERVER_HOST"*/);
      }
      private void initDebugEnvironment(boolean enable, String host) {
        WXEnvironment.sRemoteDebugMode = enable;
        WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
      }
}
````

#### Ship It!
  1. You must launch your bundle server firstly. In your weex dir, run command "./start";
  2. Launch your remote debug server. Run command `weex debug`, chrome will open a web page show a simply guidance and QR code;
  3. Launch your app and make sure debug mode was enabled. You will see a device list in the chrome web page opened by last step, each device item have two button, `Debugger` and `Inspector`;There are two way to enable debug mode:
    * scaning the QR code and handle the content just like the playground have done.
    * init it in the XXXApplication by calling `initDebugEnvironment(true, "xxx.xxx.xxx.xxx")`, if you call `initDebugEnvironment(true, "xxx.xxx.xxx.xxx")` after weex sdk inited, you need to call `WXSDKEngine.reload()` to refresh the runtime.
  4. Once you click the button `Inspector` chrome will open a page show the inspector view, on the other side, click the button `Debugger` chrome will open a new page to show the debug view;





---

#### OPTIONS

##### [**OPTION**] *set your remote bundle server ip.*

    For example, in the playground it is in the `IndexActivity.java`, you need to change the value of `DEFAULT_IP` in IndexActivity.java from `"your_current_IP"` to a server ip like `"30.30.30.150"`:
````
    private static final String DEFAULT_IP = "30.30.30.150"; // "your_current_IP";
````

##### [**OPTION**] *enable network inspection.*
````
OkHttpClient client = new OkHttpClient();
client.networkInterceptors().add(new OkHttpInterceptor());
````

###### Notice
  The network inspection only support OKHttpClient right now!!! If you want to use the network inspection to catch your bundle request, you must change your bundle server ip to the real server ip.
  
#### Known Issues
 You can report issues and bugs [here](https://github.com/weexteam/weex_devtools_android/issues). We will reply as soon as possible.
