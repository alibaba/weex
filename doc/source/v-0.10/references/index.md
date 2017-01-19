---
title: Bootstrap
type: references
order: 1
has_chapter_content: false
chapter_title: Common Options
version: 0.10
---

# Bootstrap

Besides its default meaning, `<script>` tag supports two more configuration with its `type` property *in the top level component of a page*.

* `type="data"`: For initial data configuration, the data defined here will overwrite the data definition in the `<script>`.
* `type="config"`: For configuration definition.

```html
<script type="data">
  /* (optional) the definition of initial data */
</script>

<script type="config">
  /* (optional) the definition of configuration */
</script>
```

## Initial data definition

Sometimes, it is hard to maintain huge data structure in the default `<script>` tag. So Weex allows us to have a `<script type="data">` tag to define initial data. The data defined in here will totally replace the data defined in the default `<script>` tag.

here is an example:

```html
<script type="data">
{
  title: 'Alibaba',
  date: new Date().toLocaleString()
}
</script>
```

## script configuration

Weex also allows us to do some configuration with a `<script type="config">`, So far, we only support the `downgrade` configs.

- `downgrade.osVersion`
- `downgrade.appVersion`
- `downgrade.weexVersion`
- `downgrade.deviceModel`
