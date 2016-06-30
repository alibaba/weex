### Weex devtools

Weex devtools is a custom devtools for weex that implements [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol) inspired by [Stetho](https://github.com/facebook/stetho), it is designed to help you quickly inspect your app and debug your JS bundle source in a chrome web page.At present The devtools consist of two part : `Inspector` and `Debugger`. If you want it work well, you must install a `weex-devtool` as debug server.

- Inspector
 Inspector can be used to show your `Element` \ `NetWork` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` and so on.

- Debugger
 Debugger can be used to debug your bundle js source, you can set `Breakpoint` \ watch `CallStack`.

##### How to install and launch devtools server
Open your terminal then type `npm install -g weex-devtool` and run.Launch it just type and run the command `weex-devtool`, then a Chrome web page will be opened.

##### How to use on an android device or emulator

- gradle dependency on inspector.
````
dependencies {
        compile(:inspector)
}
````

- initialize in your XXXApplication file.
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

- set your remote bundle server ip.

    For example, in the playground it is in the `IndexActivity.java`, you need to change the value of `DEFAULT_IP` in IndexActivity.java from `"your_current_IP"` to a server ip like `"30.30.30.150"`:
````
    private static final String DEFAULT_IP = "30.30.30.150"; // "your_current_IP";
````

- enable network inspection.
````
OkHttpClient client = new OkHttpClient();
client.networkInterceptors().add(new OkHttpInterceptor());
````

- notice
  The network inspection only support OKHttpClient right now!!! If you want to use the network inspection to catch your bundle request, you must change your bundle server ip to the real server ip.
 
- ship it
  1.you must launch your bundle server firstly. in your weex dir, run command "./start";
  2.then launch your remote debug server. run command `weex-devtool`, chrome will open a web page show a simply guidance;
  3.if your app launched, you will see a device list in the chrome web page opened by last step, each device item have two button, `open debugger` and `open inspector`;
  4.once you click the button "open inspector" chrome will open a page show the inspector view, on the other side, click the button `open debugger` chrome will open a new page to show the debug view;
