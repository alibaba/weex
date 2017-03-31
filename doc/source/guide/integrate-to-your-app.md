---
title: Integrate to Your App  
type: guide
order: 3
has_chapter_content: false
chapter_title: Intro
version: 2.1
---

# Integrate to Your App

## Integrate to Android
Tip：The following documents assume that you already have a certain Android development experience.    

### Android has tow ways to integrate weex
1.using source code: Can quickly use the latest features of WEEX, according to your own characteristics of the project. So, you can do some related improvements.

2.using SDK: WEEX will regularly release a stable version at jcenter.[jcenter](https://bintray.com/alibabaweex/maven/weex_sdk/view)       

### Prerequisites
Make sure the following configuration is complete:   

+ [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) version >= 1.7 , and configure the environment variable   
+ Android SDK installed and configure the environment variable    
+ Android SDK version 23 (compileSdkVersion in build.gradle)
+ SDK build tools version 23.0.1 (buildToolsVersion in build.gradle)
+ Android Support Repository >= 17 (for Android Support Library)    

### Quick to use
If you are the first time to try or have a higher demand for stability, you can use the way to dependence on the SDK.      
The steps are as follows:       
 
1. Create an Android project. There is nothing to be specified, according to your habits to.
2. Update build.gradle by adding the following dependencies:

```java
compile 'com.android.support:recyclerview-v7:23.1.1'
compile 'com.android.support:support-v4:23.1.1'
compile 'com.android.support:appcompat-v7:23.1.1'
compile 'com.alibaba:fastjson:1.1.46.android'
compile 'com.taobao.android:weex_sdk:0.5.1@aar'
```

Note: the version can be high can not be low.    

#### Start writing code

Note: There is a complete code address in the appendix    

+ Implement the picture download interface, set the initialization.   

```java
package com.weex.sample;
import android.widget.ImageView;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXImageQuality;
/**
* Created by lixinke on 16/6/1.
*/
public class ImageAdapter implements IWXImgLoaderAdapter {
  @Override
  public void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy) {
    //To implement picture download interface, otherwise the picture can not be displayed.
  }
}
```

+ initialization

```java
package com.weex.sample;
import android.app.Application;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;

/**
* Note: add android:name=".WXApplication"  into Manifest file
* To implement ImageAdapter, otherwise the picture can not be downloaded
* Gradle must add some dependencies, otherwise the initialization will fail.
* compile 'com.android.support:recyclerview-v7:23.1.1'
* compile 'com.android.support:support-v4:23.1.1'
* compile 'com.android.support:appcompat-v7:23.1.1'
* compile 'com.alibaba:fastjson:1.1.45'
*/

public class WXApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    InitConfig config=new InitConfig.Builder().setImgAdapter(new ImageAdapter()).build();
    WXSDKEngine.initialize(this,config);
  }
}
```

+ Start rendering  

```java
package com.weex.sample;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;
public class MainActivity extends AppCompatActivity implements IWXRenderListener {
  WXSDKInstance mWXSDKInstance;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mWXSDKInstance = new WXSDKInstance(this);
    mWXSDKInstance.registerRenderListener(this);
    /**
    * WXSample can be replaced by any string
    * Template is  js file that .we converted 
    * Option can be empty, or through the option passed js required parameters. Such as the address of the bundle js.
    * JsonInitData can be empty.
    * width is -1 , default full screen, you can customize it.
    * height is -1 , default full screen, you can customize it.
    */
    mWXSDKInstance.render("WXSample", WXFileUtils.loadFileContent("hello.js", this), null, null, -1, -1, WXRenderStrategy.APPEND_ASYNC);
  }
  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {
    setContentView(view);
  }
  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
  }
  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {
  }
  @Override
  protected void onResume() {
    super.onResume();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityResume();
    }
  }
  @Override
  protected void onPause() {
    super.onPause();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityPause();
    }
  }
  @Override
  protected void onStop() {
    super.onStop();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityStop();
    }
  }
  @Override
  protected void onDestroy() {
    super.onDestroy();
    if(mWXSDKInstance!=null){
      mWXSDKInstance.onActivityDestroy();
    }
  }
}
```

### Dependence on source code (IDE Android Studio)  
1.Download source code. git clone https://github.com/alibaba/weex.    
2.Create an android project.
3.Import the SDK Module through the following path:   
` File->New-Import Module-> chose WEEX SDK Module(weex/android/sdk) -> Finish`  
4.Add the following dependencies: compile project (': weex_sdk') to build.gradle file.
5.Other settings please refer to the above "Quick to use".

Appendix: [WXSample address](https://github.com/xkli/WXSample.git) `https://github.com/xkli/WXSample.git`   


## Integrated to iOS

Through the cocoaPods integrated Weex iOS SDK to the project.  
First assume that you have finished installing the [iOS development environment](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) and [CocoaPods](https://guides.cocoapods.org/using/getting-started.html).    

### Step 1: Add Dependencies
Import Weex iOS SDK to your existing project, if not, you can create a new project.   
Before proceeding, make sure that the Podfile file is under the project file. If not, create one and open with  text editor.      

+ Integration framework

WeexSDK The latest version on cocoaPods can be obtained [here](https://cocoapods.org/pods/WeexSDK) .       
Add the following to the Podfile file:       

```object-c
source 'git@github.com:CocoaPods/Specs.git' 
target 'YourTarget' do
    platform :ios, '7.0' 
    pod 'WeexSDK', '0.9.5'   ## Suggest using latest Weex SDK
end 
```

+ Integrate with source code

First copy the ios / sdk directory to your existing project directory (here to copy the root directory of your existing project as an example), and then add the Podfile file. 

```object-c
source 'git@github.com:CocoaPods/Specs.git' 
target 'YourTarget' do
    platform :ios, '7.0' 
    pod 'WeexSDK', :path=>'./sdk/' 
end  
```

### Step 2: Install Dependencies

Open the command line, switch to the directory of the Podfile file, and run the pod install command. If there are no errors, it means that the environment has been configured.   

### Step 3: Initialize the Weex environment   
In the AppDelegate.m file to do the initialization operation, usually in the didFinishLaunchingWithOptions method as follows to add.     

```object-c
//business configuration
[WXAppConfiguration setAppGroup:@"AliApp"];
[WXAppConfiguration setAppName:@"WeexDemo"];
[WXAppConfiguration setAppVersion:@"1.0.0"];
//init sdk enviroment   
[WXSDKEngine initSDKEnviroment];
//register custom module and component，optional
[WXSDKEngine registerComponent:@"MyView" withClass:[MyViewComponent class]];
[WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
//register the implementation of protocol, optional
[WXSDKEngine registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
//set the log level    
[WXLog setLogLevel: WXLogLevelAll];
```

### Step 4: Render weex Instance   

Weex supports both full page rendering and partial rendering. What you need to do is render Weex's view with the specified URL and add it to its parent container. The parent container is generally a viewController.   

```object-c
#import <WeexSDK/WXSDKInstance.h>
- (void)viewDidLoad 
{
    [super viewDidLoad];
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = self.view.frame; 
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        [weakSelf.view addSubview:weakSelf.weexView];
    };
    _instance.onFailed = ^(NSError *error) {
        //process failure
    };
    _instance.renderFinish = ^ (UIView *view) {
        //process renderFinish
    };
    [_instance renderWithURL:self.url options:@{@"bundleUrl":[self.url absoluteString]} data:nil];
}
```

WXSDKInstance is a very important class that provides a basic method and some callbacks, such as renderWithURL, onCreate, onFailed, etc., can be found in WXSDKInstance.h.     

### Step 5: Destroy Weex Instance   
In the dealloc phase of the viewController destroyed Weex instance, can play a role in avoiding memory leaks.   

```object-c
- (void)dealloc
{
    [_instance destroyInstance];
}
```

#### Import the Weex SDK framework to the project.     
The Weex SDK can be compiled from the source code. You can try the latest feature in the new feature or bugfix branch.        
Refer to [here](https://open.taobao.com/doc2/detail?spm=a219a.7629140.0.0.tFddsV&&docType=1&articleId=104829) for direct import of weexSDK.