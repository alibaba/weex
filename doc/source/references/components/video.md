---
title: <video>
type: references
order: 2.14
version: 2.1
---

# &lt;video&gt;
<span class="weex-version">v0.6.1+</span>

The video component can be used to embed video content in a weex page.

## Child Components
* text is the only valid type of child component.

## Attributes

* src: &lt;string&gt; The URL of the video to embed.
* play-status: &lt;boolean&gt; play | pause. Use it to control video's play/pause status. Default value is pause.
* auto-play: &lt;boolean&gt; true | false. Use it to control whether it is playing when the page initialization finished. Defalut value is false.

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

## example

```html
<template>
  <div>
    <video class="video" :src="src" autoplay controls
      @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>
    <text class="info">state: {{state}}</text>
  </div>
</template>

<style scoped>
  .video {
    width: 630px;
    height: 350px;
    margin-top: 60px;
    margin-left: 60px;
  }
  .info {
    margin-top: 40px;
    font-size: 40px;
    text-align: center;
  }
</style>

<script>
  export default {
    data () {
      return {
        state: '----',
        src:'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
      }
    },
    methods:{
      onstart (event) {
        this.state = 'onstart'
      },
      onpause (event) {
        this.state = 'onpause'
      },
      onfinish (event) {
        this.state = 'onfinish'
      },
      onfail (event) {
        this.state = 'onfinish'
      }
    }
  }
</script>
```

[try it](../../examples/video.html)