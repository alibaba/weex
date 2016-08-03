### Weex devtools

Weex devtools is a custom devtools for weex that implements [Chrome Debugging Protocol](https://developer.chrome.com/devtools/docs/debugger-protocol) inspired by [Stetho](https://github.com/facebook/stetho), it is designed to help you quickly inspect your app and debug your JS bundle source in a chrome web page.At present The devtools consist of two part : `Inspector` and `Debugger`. If you want it work well, you must install a `weex-devtool` as debug server.

- Inspector
 Inspector can be used to show your `Element` \ `NetWork` \ `Console log` \ `ScreenCast` \ `BoxModel` \ `Native View` and so on.

- Debugger
 Debugger can be used to debug your bundle js source, you can set `Breakpoint` \ watch `CallStack`.

##### How to install and launch devtools server
Open your terminal then type `npm install -g weex-devtool` and run.Launch it just type and run the command `weex-devtool`, then a Chrome web page will be opened.

##### How to use on an android device or emulator

###### Taste of first debug with playground
If you are a green hand to the debug of weex, we recommend you to try your first debug with `playground`, what you need to do is just launch the playground and scan the QR code shown in the debug page which wound opened if the `devtools server` have been launched. after you scan the QR code, the web page will list your connected devices.

![devtools-main](https://img.alicdn.com/tps/TB13fwSKFXXXXXDaXXXXXXXXXXX-887-828.png "connecting (multiple) devices")


###### Enable devtools in your own app
Of course you can reuse the code of playground to build your own app, that is the simplest way to let your app's js code debuggable. On the other hand QR code is not necessary, if your review the source code you can draw a conclusion that QR CODE is just a way to set `devtools server` address. following those steps you can do the same thing.

- gradle dependency on inspector.
  * *source code dependency*. you can set the dependency just like `playground` have done.
    * copy project dir `android/inspect` to the same dir of your app. 
    * add dependency in your app's build.gradle. 
     ````
     dependencies {
             compile project(:inspector)
     }
     ````
    * include the inspector in your project's settings.gradle. 
    ```
    include ':app', ':inspector'
    ```


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

- [**OPTION**] *set your remote bundle server ip.*

    For example, in the playground it is in the `IndexActivity.java`, you need to change the value of `DEFAULT_IP` in IndexActivity.java from `"your_current_IP"` to a server ip like `"30.30.30.150"`:
````
    private static final String DEFAULT_IP = "30.30.30.150"; // "your_current_IP";
````

- [**OPTION**] *enable network inspection.*
````
OkHttpClient client = new OkHttpClient();
client.networkInterceptors().add(new OkHttpInterceptor());
````

- notice
  The network inspection only support OKHttpClient right now!!! If you want to use the network inspection to catch your bundle request, you must change your bundle server ip to the real server ip.
 
- ship it
  1. you must launch your bundle server firstly. in your weex dir, run command "./start";
  2. then launch your remote debug server. run command `weex-devtool`, chrome will open a web page show a simply guidance;
  3. if your app launched, you will see a device list in the chrome web page opened by last step, each device item have two button, `open debugger` and `open inspector`;
  4. once you click the button "open inspector" chrome will open a page show the inspector view, on the other side, click the button `open debugger` chrome will open a new page to show the debug view;
