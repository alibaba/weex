---
title: <video>
type: references
order: 2.14
version: 0.10
---

# &lt;video&gt;
<span class="weex-version">v0.6.1+</span>

The video component can be used to embed video content in a weex page.

**example**

```html
<template>
  <div>
    <text>Big Eater!</text>
    <video onstart='onstart' onpause='onpause' onfinish='onfinish' onfail='onfail'
           auto-play="false" play-status="pause" src="{{src}}" style="width:750;height:500;"></video>
</div>

  </div>
</template>

<script>
  module.exports ={
    data: {
      src:'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
    },
    methods:{
      onstart:function(e){
        console.log('onstart');
        console.log(e);
      },
      onpause:function(e){
        console.log('onpause');
      },
      onfinish:function(e){
        console.log('onfinish');
      },
      onfail:function(e){
        console.log('onfail');
      },
    }
  }
</script>
```

[try it](http://dotwe.org/97938570cddf76c792a1a5f9542253b1)

## Child Components
* text is the only valid type of child component.

## Attributes

* src: &lt;string&gt; The URL of the video to embed.
* play-status: &lt;boolean&gt; play | pause. Use it to control video's play/pause status. Default value is pause.
* auto-play: &lt;boolean&gt; true | false. Use it to control whether it is playing when the page initialization finished. Defalut value is false.

Other attributes please check out the [common attributes](../common-attrs.html).

## Styles
common styles: check out [common styles for components](../common-style.html)

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.

## Events
* onstart: triggered when playback state is Playing.
* onpause: triggered when playback state is Paused.
* onfinish: triggered when playback state is Finished.
* onfail: triggered when playback state is Failed.
