# 找节点
<span class="weex-version">0.4</span>

weex中，可以通过在特定的节点上设置 `id` 属性，以此来唯一标识该节点。然后可以用 `this.$el(id)`来找到该节点，以[`scrollToElement()`](../modules/dom.md#scrolltoelementnode-options)为例，如下：

```
  <template>
    <container>
      <text id="top">Top</text>
      <container style="height: 10000; background-color: #999999;">
      </container>
      <text onclick="back2Top">Back to Top</text>
    </container>
  </template>
  <script>
    var dom = require('@weex-module/dom')
    module.exports = {
      methods: {
        back2Top: function () {
          var top = this.$el('top')
          dom.scrollToElement(top)
        }
      }
    }
    </script>
```

`id` 也可以在 `repeat`语法中使用，更多详见[显示逻辑控制器](./display-logic.md), ，但是要确保循环的节点需要用不同的`id`，如下:

```
  <template>
    <container>
      <image id="{{imgId}}" src="{{imgUrl}}" onclick="getImageId" repeat="{{images}}"></image>
    </container>
  </template>
  <script>
  module.exports = {
    data: {
      images: [
        {imgId: 1, imgUrl: '...'},
        {imgId: 2, imgUrl: '...'},
        {imgId: 3, imgUrl: '...'},
        ...
      ]
    },
    methods: {
      getImageId: function(e) {
        // get e.target.id
      }
    }
  }
  </script>
```

另外，我们可以通过this.$vm(id) 方法可以访问子组件的上下文，用法见 [组件封装](./composed-component.md)。

下一篇： [组件间如何通信](./comm.md).
