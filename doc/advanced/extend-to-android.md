### Module extend
weex sdk support Moulde extend,
Weex SDK provides only rendering capabilities, rather than have other capabilities, such as network, picture, and URL redirection. If you want the these features, you need to implement it.  

For example: If you want to implement an address jumping function, you can achieve a Module Follow the steps below. 
#### eventModule
First, you need to inherit the class “WXModule”.  
Second, you need to define a method that is called in JavaScript, and you need to add @WXModuleAnno this comment, so we think this is a method that can be called Module.  
Here is the code:

```
import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import com.taobao.weex.common.WXModuleAnno;
import com.taobao.weex.common.WXModule;


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
After Module code is written, you need to be registered with WXSDKEngine, so we can call WEEX Module achieved by way of reflection.  
Here is the code: 

```
public class WXApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    WXSDKEngine.init(this);
    try {
      WXSDKEngine.registerModule("event", WXEventModule.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
  }
}
```
##### <font color="red">  Custom module you need to note the following points:
1. Customize components must extend WXModule  
2. @WXModuleAnno annotation must be added, as it is the only the way to recognized by Weex  
3. The access levels of mehtod must be **public**  
4. The module class also can not be an inner class  
5. Customize can not be obfuscated by tools like ProGuard
6. Module methods will be invoked in UI thread, do not put time consuming operation there
7. Weex params can be int, double, float, String, Map, List, self-defined class that implements WXObject interface

#### Component extend
<font color="gray">
There are label, image, div, scroll, ect. components in weex, you can also customize your own components.  

To implement a custom Component that you need to follow the following steps:
  
First: You need to inherit the class WX Component. WX Component is our base class, similar to Android in the base class View.    
Second: You need to override the init View method, "mHost" be assigned to the Native View.  
Next: custom attributes method to add annotations @WXComponentProp  
Refer to the following example 

	package com.taobao.weextest;
	import android.widget.TextView;
	import com.taobao.weex.WXSDKInstance;
	import com.taobao.weex.common.WXDomPropConstant;
	import com.taobao.weex.dom.WXDomObject;
	import com.taobao.weex.ui.component.WXComponent;
	import com.taobao.weex.ui.component.WXComponentProp;
	import com.taobao.weex.ui.component.WXVContainer;
	
	public class MyViewComponent extends WXComponent{ 
	 public MyViewComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) 
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
 
After Native code is written, you need to be registered, so that we can find it.

```
public class WXApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    WXSDKEngine.init(this);
    try {
    WXSDKEngine.registerComponent("MyView", MyViewComponent.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
  }
}
```

##### <font color="red">Custom Component you need to note the following points 
 
1. Customize components must extend WXComponent or WXContainer  
2. @WXComponentProp(name=value(value is attr or style of dsl)) for it be recognized by weex SDK.
3. The access levels of mehtod must be **public**
4. The component class can not be an inner class  
5. Customize can not be obfuscated by tools like ProGuard  
6. Component methods will be invoked in UI thread, do not put time consuming operation there.  
7. Weex params can be int, double, float, String, Map, List, self-defined class that implements WXObject interface 

#### ImagedownloadAdapter
<font color="gray">
Weex SDK has no image download capability, you need to implement IWXImgLoaderAdapter. Refer to the following examples.

```
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
