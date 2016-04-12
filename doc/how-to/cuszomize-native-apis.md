### Module extend
Weex SDK provides only rendering capabilities, rather than have other capabilities, such as network, picture, and URL redirection. If you want the these features, you need to implement it.
#### eventModule

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
<font color="red">
*Warning: Module need to be registered before use*  

```
try {
	 WXSDKEngine.registerModule("event", WXEventModule.class);
	} catch (WXException e) {
	   WXLogUtils.e(e.getMessage());
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
