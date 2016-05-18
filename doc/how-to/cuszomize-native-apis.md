# How to customize native APIs ?

Weex SDK provides only rendering capabilities, rather than have other capabilities, such as network, picture, and URL redirection. If you want the these features, you need to implement it.   
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
1. Customize components must extend WXModule  
2. @WXModuleAnno annotation must be added, as it is the only the way to recognized by Weex  
3. The access levels of mehtod must be **public**  
4. The module class also can not be an inner class  
5. Customize can not be obfuscated by tools like ProGuard
6. Module methods will be invoked in UI thread, do not put time consuming operation there
7. Weex params can be int, double, float, String, Map, List, self-defined class that implements WXObject interface
