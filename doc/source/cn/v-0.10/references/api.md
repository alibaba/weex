---
title: ViewModel APIs
type: references
order: 1.3
version: 0.10
---

# 接口

你可以在组件的方法中通过 `this` （Vm）上下文访问这些 API。

例子：

```html
<script>
module.exports = {
  methods: {
    somemethod: function() {
      this.$vm('someId');
    }
  }
}
</script>
```

## $(id)

**不建议使用**，请使用 `$vm` 代替。
## $el(id)

返回对应 id 的元素对象的引用。
### Arguments
- `id` _(string)_: 唯一标识符。
### Returns
- _(Element)_: 一个元素对象的引用。
### Tips
- id 只能保证是当前（页面）组件中是唯一的，如果你需要寻找父组件或子组件，你可以利用组件间的通信模式实现。
- 延伸阅读： [id](../guide/syntax/id.md)，[Communicate Between Components](../guide/syntax/comm.md)
## $vm(id)

返回对应 id 的 vm 对象引用。
### Arguments
- `id` _(String)_: 唯一标识符。
### Returns
- `vm` _(Vm)_: 一个 Vm 对象引用。
### Tips
- id 只能保证是当前（页面）组件中是唯一的，如果你需要寻找父组件或子组件，你可以利用组件间的通信模式实现。
- 延伸阅读： [id](../guide/syntax/id.md)，[Communicate Between Components](../guide/syntax/comm.md)
## $getConfig()

获取当前全局环境变量和配置信息。
### Returns
- `config` _(object)_: 配置对象；
- `bundleUrl` _(string)_: bundle 的 url；
- `debug` _(boolean)_: 是否是调试模式；
- `env` _(object)_: 环境对象；
  - `weexVersion` _(string)_: Weex sdk 版本；
  - `appName` _(string)_: 应用名字；
  - `appVersion` _(string)_: 应用版本；
  - `platform` _(string)_: 平台信息，是 `iOS`、`Android` 还是 `Web`；
  - `osVersion` _(string)_: 系统版本；
  - `deviceModel` _(string)_: 设备型号 **（仅原生应用）**；
  - `deviceWidth` _(number)_: 设备宽度，默认为 `750`；
  - `deviceHeight` _(number)_: 设备高度。
## $call(module, method, ...args)

**不建议使用**，请使用 `require('@weex-module/module')[method](...args)` 代替。查看更多信息：[modules](./modules/main)。
