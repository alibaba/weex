##Extend to Android
<span class="weex-version">0.4</span>
 
### Module extend
weex sdk support Module extend,
Weex SDK provides only rendering capabilities, rather than have other capabilities, such as network, picture, and URL redirection. If you want the these features, you need to implement it.  

For example: If you want to implement an address jumping function, you can achieve a Module Follow the steps below. 
#### Step to customize a module 
1. Customize module must extend WXModule  
2. @WXModuleAnno annotation must be added, as it is the only the way to recognized by Weex  
3. The access levels of mehtod must be **public**  
4. The module class also can not be an inner class  
5. Customize can not be obfuscated by tools like ProGuard
6. Module methods will be invoked in UI thread, do not put time consuming operation there
7. Weex params can be int, double, float, String, Map, List

Refer to the following example: 

```java
    public class WXEventModule extends WXModule{
	
	private static final String WEEX_CATEGORY="com.taobao.android.intent.category.WEEX";
	
		@WXModuleAnno
		public void openURL(String url){
			//implement your module logic here
		}
    }

```
#### Support synchronous/asynchronous callback 
you can add  `` @JSMethod (uiThread = false or true ) `` annotation to choose the  callback mode of moudle . see the follow  example.
```java
     // as sync-callback mode 
    @JSMethod (uiThread = false)
    public void testSyncCall(){
        WXLogUtils.d("WXComponentSyncTest :"+ Thread.currentThread().getName());
    }
    
    // as async-callback mode 
    @JSMethod (uiThread = true)
    public void testAsyncCall(){
        WXLogUtils.e("WXComponentASynTest :"+ Thread.currentThread().getName() );
    }

```
#### Register the moulde

```java

  WXSDKEngine.registerModule("event", WXEventModule.class);

```

### Use this module in weex DSL   
Now `event` moudle is avaiable in weex, use the module like this:   
```javascript

var event = weex.requireModule('event');
event.openURL("http://www.github.com");

```

### Javascript callback
If the module need implement a callback to javascript, you just add `JSCallback` argument to the method you want expose to javascript:   
```java

	@WXModuleAnno
	public void openURL(String url,JSCallback callback){
		//implement your module logic here
		Map<String,Object> resp = new HashMap();
		resp.put("result","ok");
		callback.invoke(resp);
	}
	
```
At the javascript side, call the module with javascript function to receive callback data:   
```javascript

event.openURL("http://www.github.com",function(resp){ console.log(resp.result); });

```

### Component extend
<font color="gray">
There are label, image, div, scroll, ect. components in weex, you can also customize your own components.  

#### Step to customize a component

1. Customize components must extend WXComponent or WXContainer  
2. @WXComponentProp(name=value(value is attr or style of dsl)) for it be recognized by weex SDK.
3. The access levels of mehtod must be **public**
4. The component class can not be an inner class  
5. Customize can not be obfuscated by tools like ProGuard  
6. Component methods will be invoked in UI thread, do not put time consuming operation there.  
7. Weex params can be int, double, float, String, Map, List, Array


Refer to the following example 

```java

	public class MyViewComponent extends WXComponent{ 
	public MyViewComponent(WXSDKInstance instance, WXDomObject dom,
	                   WXVContainer parent, String instanceId, boolean isLazy) 
	 { 
	 public MyViewComponent(WXSDKInstance instance, WXDomObject dom,
	   WXVContainer parent, String instanceId, boolean isLazy) {
	  super(instance, dom, parent, instanceId, isLazy);
	 }
	 
	 @Override
	 protected void initView() {
	    mHost = new TextView(mContext);
	 }
	 @WXComponentProp(name=WXDomPropConstant.WX_ATTR_VALUE)
	 public void setMyViewValue(String value) {
	    ((TextView)mHost).setText(value);
	 }
	}

```
 
#### Register the Component


```java 
   WXSDKEngine.registerComponent("MyView", MyViewComponent.class);
```

### Adapter extend

#### ImagedownloadAdapter
<font color="gray">
Weex SDK has no image download capability, you need to implement `IWXImgLoaderAdapter`. Refer to the following examples.

```java

public class ImageAdapter implements IWXImgLoaderAdapter {

	private Activity mContext;

	public ImageAdapter(Activity activity) {
		mContext = activity;
	}

	@Override
	public void setImage(final String url, final ImageView view,
			WXImageQuality quality, WXImageStrategy strategy) {
		mContext.runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				if (TextUtils.isEmpty(url)) {
					view.setImageBitmap(null);
					return;
				}
				String temp = url;
				if (url.startsWith("//")){
					temp = "http:" + url;
				}
				if (view.getLayoutParams().width<=0 || view.getLayoutParams().height<=0) {
					return;
				}
				Picasso.with(WXEnvironment.getApplication())
						.load(temp)
						.resize(view.getLayoutParams().width,
								view.getLayoutParams().height).into(view);
			}
		});
	}
}

```
