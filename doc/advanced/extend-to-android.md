##Extend to Android
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/27"  class="weex-translate">cn</a>
 
### Module extend
weex sdk support Moulde extend,
Weex SDK provides only rendering capabilities, rather than have other capabilities, such as network, picture, and URL redirection. If you want the these features, you need to implement it.  

For example: If you want to implement an address jumping function, you can achieve a Module Follow the steps below. 
#### Step to customize a module 
1. Customize module must extend WXModule  
2. @WXModuleAnno annotation must be added, as it is the only the way to recognized by Weex  
3. The access levels of mehtod must be **public**  
4. The module class also can not be an inner class  
5. Customize can not be obfuscated by tools like ProGuard
6. Module methods will be invoked in UI thread, do not put time consuming operation there
7. Weex params can be int, double, float, String, Map, List, self-defined class that implements WXObject interface

Refer to the following example 

```java
      
    import android.content.Intent;
    import android.net.Uri;
     ……………………

    public class WXEventModule extends WXModule{
	
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

#### Register the moulde

```java
/**
   * Register module. This is a wrapper method for
   * {@link WXModuleManager#registerModule(String, Class)}. 
   * The module register here only needto
   * be singleton in {@link WXSDKInstance} level.
   * @param moduleName  module name
   * @param moduleClass module to be registered.
   * @return true for registration success, false for otherwise.
   * @see {@link WXModuleManager#registerModule(String, Class, boolean)}
   */
  
  WXSDKEngine.registerModule("event", WXEventModule.class);

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
7. Weex params can be int, double, float, String, Map, List, self-defined class that implements WXObject interface 


Refer to the following example 

```java

	package com.taobao.weextest;
    ………………
	
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
  /**
   * Register component. The registration is singleton in {@link WXSDKEngine} level
   * @param type name of component. Same as type filed in the JS.
   * @param clazz the class of the {@link WXComponent} to be registered.
   * @param appendTree true for appendTree flag
   * @return true for registration success, false for otherwise.
   * @throws WXException Throws exception if type conflicts.
   */   
   WXSDKEngine.registerComponent("MyView", MyViewComponent.class);
```

### Adapter extend

#### ImagedownloadAdapter
<font color="gray">
Weex SDK has no image download capability, you need to implement IWXImgLoaderAdapter. Refer to the following examples.

```java
package com.alibaba.weex.extend;

import android.app.Activity;
import android.text.TextUtils;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXImageQuality;

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
