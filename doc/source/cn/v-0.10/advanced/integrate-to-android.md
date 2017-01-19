---
title: 集成到 Android
type: advanced
order: 4
has_chapter_content: true
version: 0.10
---

# WEEX SDK 集成到 Android 工程

注：以下文档都是假设您已经具备一定的Android开发经验。
### Android 集成有两种方式

1. 源码依赖：能够快速使用WEEX最新功能，可以根据自己项目的特性进行相关改进。
2. SDK依赖：WEEX 会在jcenter 定期发布稳定版本。[jcenter](https://bintray.com/alibabaweex/maven/weex_sdk/view)  
   注:国内可能需要翻墙

## 前期准备

- 已经安装了[JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) version>=1.7 并配置了环境变量
- 已经安装[Android SDK](https://developer.android.com/studio/index.html) 并配置环境变量。
- Android SDK version 23 (compileSdkVersion in [`build.gradle`](https://github.com/alibaba/weex/blob/master/android/sdk/build.gradle))
- SDK build tools version 23.0.1 (buildToolsVersion in [`build.gradle`](https://github.com/alibaba/weex/blob/master/android/sdk/build.gradle))
- Android Support Repository >= 17 (for Android Support Library)

## 快速接入

如果你是尝鲜或者对稳定性要求比较高可以使用依赖SDK的方式。  
步骤如下：  
1. 创建Android工程，没有什么要特别说明的，按照你的习惯来。
2. 修改build.gradle 加入如下基础依赖  
   
   ```gradle
   compile 'com.android.support:recyclerview-v7:23.1.1'
   compile 'com.android.support:support-v4:23.1.1'
   compile 'com.android.support:appcompat-v7:23.1.1'
   compile 'com.alibaba:fastjson:1.1.46.android'
   compile 'com.taobao.android:weex_sdk:0.5.1@aar'
   ```
   
   注:版本可以高不可以低。  
### 代码实现

注:附录中有完整代码地址
- 实现图片下载接口，初始化时设置。

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
    //实现你自己的图片下载，否则图片无法显示。
  }
}
```
- 初始化

```java
package com.weex.sample;

import android.app.Application;

import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;

/**
 * 注意要在Manifest中设置android:name=".WXApplication"
 * 要实现ImageAdapter 否则图片不能下载
 * gradle 中一定要添加一些依赖，否则初始化会失败。
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
- 开始渲染

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
     * WXSample 可以替换成自定义的字符串，针对埋点有效。
     * template 是.we transform 后的 js文件。
     * option 可以为空，或者通过option传入 js需要的参数。例如bundle js的地址等。
     * jsonInitData 可以为空。
     * width 为-1 默认全屏，可以自己定制。
     * height =-1 默认全屏，可以自己定制。
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

## 源码依赖(IDE Android Studio)

1. 下载源码 `git clone https://github.com/alibaba/weex`
2. 创建 Android 工程。
3. 通过以下路径引入 SDK Module  
   File->New-Import Module-> 选择 WEEX SDK Module(weex/android/sdk) -> Finish  
4. app 的 build.gradle 中添加如下依赖:`compile project(':weex_sdk')`
5. 其他设置请参考上面快速接入

### 附录

WXSample地址
`https://github.com/xkli/WXSample.git`
