# How to customize a native Component ?
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

Weex has wrap up the most critical platform components,such as ScrollView、ListView、Text、Imageview. Certainly these components  can not completely meet your need. And  thousands of native UI components that alwaysly be  using in our project may be required to integrate into Weex easily. Fortunately,it's quite convenient to wrap up your own components that shuold be from any existing components.

##### Step By Step
 
1. Customize components must extend WXComponent or WXContainer  
2. @WXComponentProp(name=value(value is attr or style of dsl)) for it be recognized by weex SDK.
3. The access levels of mehtod must be **public**
4. The component class can not be an inner class  
5. Component can not be obfuscated by tools like ProGuard  
6. Component methods will be invoked in UI thread, do not contain time consuming operation here.  
7. Weex params can be int, double, float, String, Map, List, self-defined class that implements WXObject interface 


#### Refer to the following example: 

	package com.taobao.weex.ui.component;
	……

    public class  MyViewComponent extends WXComponent{

           public MyViewComponent(WXSDKInstance instance, WXDomObject node, 
                        WXVContainer parent,  String instanceId, boolean lazy) {                
               super(instance, node, parent, instanceId, lazy);
            }

           @Override
           protected void initView() {
              //TODO:your own code ……
           }

          @Override
          public WXFrameLayout getView() {
             //TODO:your own code ………        
          }
          @WXComponentProp(name=WXDomPropConstant.WX_ATTR_VALUE)
	      public void setMyViewValue(String value) {
	         ((TextView)mHost).setText(value);
	      }

    }

#### Component should be registered 

	WXSDKEngine.registerComponent("MyView", MyViewComponent.class);
	  	
	  	

