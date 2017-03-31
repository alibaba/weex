---
title: Integrate to Android
type: advanced
order: 3
has_chapter_content: true
version: 0.10
---

# Integrate to Android

When you need to use the new features or to customize specific features, you can rely on the Source SDK for development。

## Prerequisites

Assuming you have the Android SDK installed, run `android` to open the Android SDK Manager.

Make sure you have the following installed:

1. Android SDK version 23 (compileSdkVersion in [`build.gradle`](https://github.com/alibaba/weex/blob/master/android/sdk/build.gradle))
2. SDK build tools version 23.0.2 (buildToolsVersion in [`build.gradle`](https://github.com/alibaba/weex/blob/master/android/sdk/build.gradle))
3. Android Support Repository >= 17 (for Android Support Library)
4. Android NDK (download & extraction instructions [here](http://developer.android.com/ndk/downloads/index.html))

Point Gradle to your Android SDK: either have `$ANDROID_SDK` and `$ANDROID_NDK ` defined, or create a local.properties file in the root of your weex checkout with the following contents:

```
sdk.dir=absolute_path_to_android_sdk
ndk.dir=absolute_path_to_android_ndk
```

Example:

```
sdk.dir=/Users/your_name/android-sdk-macosx
ndk.dir=/Users/your_name/android-ndk-r10e
```


## Building the source

#### 1. Clone source from github

First, you need to git clone `weex` from github:

```shell
git clone https://github.com/alibaba/weex.git
```
##### 2. Build APK
  ***   1) Android studio build APK ***
 
 ```
     Step 1: run android studio 
     Step 2: open the file of ~/weex/android/playground/build.gradle 
     Step 3: Run the Project and the Apk will auto install in your android device
 ```
 ***   2) Gradle build APK ***
 
 ```
     Step 1: enter the direction of "/weex/android/playground"
     Step 2: run the build command: ./gradlew clean assemble
     Step 3: obtain the payground APK from the direction of weex/android/playground/app/build/outputs/apk/
     Step 3: then adb install -r weex/android/playground/app/build/outputs/apk/playgroud.apk
 ```
#### 3. Adding the `:weex_sdk_android` project
  

Add the `:weex_sdk_android` project in `android/settings.gradle`:

```gradle
include ':weex_sdk_android'

project(':weex_sdk_android').projectDir = new File(
    rootProject.projectDir, '../weex_sdk_android')
```

Modify your `android/app/build.gradle` to use the `:weex_sdk_android` project instead of the pre-compiled library, e.g. - replace `compile 'com.taobao.android:weex_sdk:0.4.1` with `compile project(':weex_sdk_android')`:

```gradle
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:23.0.1'

    compile project(':weex_sdk_android')

    ...
}
```

#### 3. Making 3rd-party modules use your project

If you use 3rd-party weex modules, you need to override their dependencies so that they don't build the pre-compiled library. Otherwise you'll get an error while compiling - `Error: more than one library with package name 'com.taobao.weex'`.

Modify your `android/app/build.gradle` and replace `compile project(':weex-custom-module')` with:

```gradle
compile(project(':weex-custom-module')) {
    exclude group: 'com.taobao.weex', module: 'weex_sdk_android'
}
```

#### 4、How to load local Your Js bundle in the directory of Android assets
Besides load a Js Bundle online, you also can load the js bundle from the directory of Android assets.

For Example:
  
   ```   
   String yourbundleStr =  WXFileUtils.loadFileContent("yourBundle.js", context);
   WXSDKInstance.render(TAG, yourbundleStr, options, null, width, Height, WXRenderStrategy.APPEND_ASYNC);
  ```


## Building from Android Studio

From the Welcome screen of Android Studio choose "Import project" and select the `playground` folder of your app.

You should be able to use the _Run_ button to run your app on a device. 

## Tip
1. Since the packet size limit is currently only compiled arm , X86 does not support.

2. Gradle build fails in `ndk-build`. See the section about `local.properties` file above.

#Quick access
 
## Requirements

* an existing, gradle-based Android app

## Prepare your app

In your app's `build.gradle` file add the WEEX dependency:

    compile 'com.taobao.android:weex_sdk:0.4.1'

You can find the latest version of the WEEX library on [jcenter](https://bintray.com/search?query=weex_sdk&forceAgnostic=true). Next, make sure you have the Internet permission in your `AndroidManifest.xml`:

    <uses-permission android:name="android.permission.INTERNET" />


## Add native code

You need to add some native code in order to start the Weex runtime and get it to render something. To do this, we're going to create an `Application` to init weex, then we we're going to create an `Activity` that creates a WeexContainerView, starts a Weex application inside it and sets it as the main content view.


```java
public class WXApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        WXEnvironment.addCustomOptions("appName","TBSample");
        WXSDKEngine.init(this);
        try {

            WXSDKEngine.registerComponent("wtRichText", WTRichText.class);
            ......
            
            WXSDKEngine.registerModule("event", WXEventModule.class);
        } catch (WXException e) {
            e.printStackTrace();
        }
    }
}
```

Next, 

```java
// Create or find RenderContainer view. 
// Notice: If you create RenderContainer manually, don't forget add it to view tree.
RenderContainer renderContainer = (RenderContainer)findViewById(R.id.container);

//crate Weex instance
WXSDKInstance mInstance = new WXSDKInstance(this);
//set render container
mInstance.setRenderContainer(renderContainer);
//set image Adapter
mInstance.setImgLoaderAdapter(new ImageAdapter(this));
//register render listener
mInstance.registerRenderListener(new IWXRenderListener() {
   @Override
   public void onViewCreated(WXSDKInstance instance, View resultView) {
       // Notice: If you don't setRenderContainer before render, you need add the resultView to view tree here.

   } 
   @Override
   public void onRenderSuccess(WXSDKInstance instance) {
   }
   @Override
   public void onRefreshSuccess(WXSDKInstance instance) {
   }
   @Override
   public void onException(WXSDKInstance instance, String errCode,String msg) {
   }
}); 
//start render weex view   
mInstance.render(pageName,template, null, null, -1, -1, WXRenderStrategy.APPEND_ASYNC);
```

That's it, your activity is ready to run some JavaScript code.

## Reference Example   

[`Weex Examples`](https://github.com/alibaba/weex/tree/master/examples)
