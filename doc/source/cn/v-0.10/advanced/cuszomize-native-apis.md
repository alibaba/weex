---
title: 自定义 native API
type: advanced
order: 8
has_chapter_content: true
version: 0.10
---

# 如何自定义 native API？

Weex 的 SDK 只提供了页面渲染的能力，但是一些其它操作，比如网络请求、图片加载、重定向等功能需要你自己去实现，这个例子讲述了如何用原生代码去扩展 Weex 的功能。

## 关于 URLHelper 的例子

### 新建一个 WXModule

```java
public class URLHelperModule extends WXModule{
    private static final String WEEX_CATEGORY="com.taobao.android.intent.category.WEEX";
    @WXModuleAnno
    public void openURL(String url){
        if (TextUtils.isEmpty(url)) {
            return;
        }
        StringBuilder builder=new StringBuilder("http:");
        builder.append(url);
        Uri uri = Uri.parse(builder.toString());
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.addCategory(WEEX_CATEGORY);
        mWXSDKInstance.getContext().startActivity(intent);
    }
} 
```

这里要注意   `@WXModuleAnno` 这个注解，它表示了你把这个方法暴露给 JavaScript。

```java
public class URLHelperModule extends WXModule{

    @WXModuleAnno
    public void openURL(String url,String callbackId){
        //...
        //callback to javascript 
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("ts", System.currentTimeMillis());
        WXBridgeManager.getInstance().callback(mWXSDKInstance.getInstanceId(), callbackId, result);
    }
}
```

### 把module注册到WXSDKEngine：

```java
try {
     WXSDKEngine.registerModule("myURL", URLHelperModule.class);
     //'myURL' is the name you'll use in javascript
    } catch (WXException e) {
       WXLogUtils.e(e.getMessage());
    }
```

### 在 JavaScript 中使用 `eventModule`：

```javascript
let URLHelper = require('@weex-module/myURL');//same as you registered
URLHelper.openURL("http://www.taobao.com",function(ts){  
  console.log("url is open at "+ts);
});
```

## 一些注意事项：

1. 定义一个 components 需要继承 `WXModule`

2. 不要忘记添加 `@WXModuleAnno` 注解，不然 Weex 没法识别这个方法

3. 定义的方法必须是 `public 的

4. module 类一定不能是内部类

5. 你定义的 components 不能被混淆，不然会找不到

6. Module 中的方法会在 UI 线程中被调用，所以一定不要做一些耗时操作

7. Moudle 中的方法参数类型可以为 `int`，`double`，`float`，`String`，`Map`，`List`，以及实现 `WXObject` 接口的类。
