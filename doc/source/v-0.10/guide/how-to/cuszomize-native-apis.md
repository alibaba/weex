---
title: Customize native APIs
type: guide
order: 3.4
version: 0.10
---

# How to customize native APIs ?

Weex SDK provides only rendering capability, rather than having other capabilities, such as network, picture, and URL redirection. If you want the these features, you need to implement them yourselves.   
The example below will describe how to extend weex with native logic or 'bridge' your existed native code.

## A URLHelper Example
### Create your own `WXModule` in native:   

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

Notice the `@WXModuleAnno`, use this annotation to mark the methods you wanna expose to javascript.
If your also want to callback to javascript, you should define a `callbackId` parameter to received 'JS callback function id':

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


### Register your module to engine:   

```
try {
	 WXSDKEngine.registerModule("myURL", URLHelperModule.class);//'myURL' is the name you'll use in javascript
	} catch (WXException e) {
	   WXLogUtils.e(e.getMessage());
	}
```
### Now, you can use eventModule in javascript like this:   

```javascript
let URLHelper = require('@weex-module/myURL');//same as you registered
URLHelper.openURL("http://www.taobao.com",function(ts){
	console.log("url is open at "+ts);
});

```


## Things you need to note:
1. Customized components must inherit from `WXModule`;
2. @WXModuleAnno annotation must be added, as it is the only way to be recognized by Weex;
3. The access levels of method must be **public**;
4. The module class also can not be an inner class;
5. Customized components should not be obfuscated by tools like ProGuard;
6. Module methods will be invoked on the UI thread, so do not put time-consuming operations there;
7. Weex parameter's type can be int, double, float, String, Map, List, self-defined class that implements WXObject interface;
