## &lt;slider> Compoent

Use the **&lt;slider> compoent** to embed slider in a **WeexPage**.

### Attributes

- `auto_play`: `true` | `false` A Boolean attribute. defalut value is `false`.

### Events

- `change`: Sent when **&lt;slider> component** page index changed.

### Children

Any component.

### Example

```html
<container>
  <slider show-indicators="false" auto-play="true" onchange="change" style="...">
    <image repeat="{{imageList}}" src="{{src}}" style="..."></image>
  </slider>
</container>

<script>
  module.exports = {
    data: {
      imageList: [{src: '...'}, {src: '...'}, ...]
    },
    methods: {
      change: function (e) {
        // e.index
      }
    }
  }
</script>
```
