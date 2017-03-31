---
title: JS Service
type: references
order: 9
version: 2.1
---


# JS Service

<span class="weex-version">v0.9.5+</span>

JS service and Weex instance are parallel in js runtime. Weex instance lifecycle will invoke JS service lifecycle. Currently provide create, refresh, destroy of lifecycle.

!!!Important: JS Service is very powerful. Please be careful to use.


## Register JS Service

### iOS
```objective-c
[WeexSDKEngine registerService:@"SERVICE_NAME" withScript: @"SERVICE_JS_CODE" withOptions: @{}];
```

### Android
```java
HashMap<String, String> options = new HashMap<>()
options.put("k1", "v1")
String SERVICE_NAME = "SERVICE_NAME"
String SERVICE_JS_CODE = "SERVICE_JS_CODE"
boolean result = WXSDKEngine.registerService(SERVICE_NAME, SERVICE_JS_CODE, options)
```

### Web
```html
<!-- Should be loaded after then jsfm -->
<script src="SERVICE_JS_CODE_URL"></script>
```



## Write a JS Service
```javascript
// options: native inject options
// options.serviceName is native options name
service.register(options.serviceName, {
  /**
    * JS Service lifecycle. JS Service `create` will before then each instance lifecycle `create`. The return param `instance` is Weex protected param. This object will return to instance global. Other params will in the `services` at instance.
    *
    * @param  {String} id  instance id
    * @param  {Object} env device environment
    * @return {Object}
    */
  create: function(id, env, config) {
    return {
      instance: {
        InstanceService: function(weex) {
          var modal = weex.requireModule('modal')
          return {
            toast: function(title) {
              modal.toast({ message: title })
            }
          }
        }
      },
      NormalService: function(weex) {
        var modal = weex.requireModule('modal')
        return {
          toast: function(title) {
            modal.toast({ message: title })
          }
        }
      }
    }
  },

  /**
    * JS Service lifecycle. JS Service `refresh` will before then each instance lifecycle `refresh`. If you want to reset variable or something on instance refresh.
    *
    * @param  {String} id  instance id
    * @param  {Object} env device environment
    */
  refresh: function(id, env, config){

  },

  /**
    * JS Service lifecycle. JS Service `destroy` will before then each instance lifecycle `destroy`. You can deleted variable here. If you doesn't detete variable define in JS Service. The variable will always in the js runtime. It's would be memory leak risk.
    *
    * @param  {String} id  instance id
    * @param  {Object} env device environment
    * @return {Object}
    */
  destroy: function(id, env) {

  }
})
```

## Using JS Service (vuejs)
```html
<script>
var _InstanceService = new InstanceService(weex)
var _NormalService = new service.normalService(weex)

module.exports = {
  created: fucntion() {
    // called modal module to toast something
    _InstanceService.toast('Instance JS Service')
    _NormalService.toast('Normal JS Service')
  }
}
</script>
```
