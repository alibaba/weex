---
title: Weex Variable  
type: references
order: 7
version: 2.1
---

# Weex instance variable

Each Weex page has a separate weex variable, which exists in the JS context. They hold a single instance or method of the current Weex page.   

`weex.config`

This variable contains all the environment information for the current Weex page, including not only:       

+ `BundleUrl`: string: The URL of the JS bundle.
+ `Env: Object`: environment object.
+ `WeexVersion: string`: Weex sdk version.
+ `AppName: string`: application name.
+ `AppVersion: string`: app version.
+ `Platform: string`: platform information, that is iOS, Android or Web.
+ `OsVersion: string`: system version.
+ `DeviceModel: string`: device model (native application only).
+ `DeviceWidth: number`: device width, default 750.
+ `DeviceHeight: number`: device height.    

`weex.requireModule(module: string): Object`     

Get all the methods of a native module, such as:    

```html
<template>
  <div><text>Hello World</text></div>
</template>
<script>
  var modal = weex.requireModule('modal')
  modal.toast({
    message: 'I am a toast.',
    duration: 3
  })
</script>
```   


`weex.document: Document` 

Returns the document object of the current Weex page.
