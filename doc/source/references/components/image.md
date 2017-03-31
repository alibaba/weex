---
title: <image>
type: references
order: 2.3
version: 2.1
---

# &lt;image&gt;

### Summary

`image` tag is used to render a specified picture, and it shouldn't contain any child component. You can use `img` as alias.

**Notes:** the styles of `width` and `height` should be specified, otherwise it won't work.

alias: `<img>`

### Child Components

This component supports no child components.

### Attributes

- `src`: &lt;string&gt; image source url
- `resize`: <span class="api-version">v0.5+</span> &lt;string&gt; the 'ScaleType' of the component. The default value is ``stretch``, if this attribute is not specified. Possible values are ``cover``, ``contain``, each of which has the same meaning with w3c standard.
- `placeholder`: <span class="api-version">v0.9+</span> &lt;string&gt; image to display while the network image src is loading.

### Styles

- `width`: &lt;length&gt; the width of the component. This style should be specified.
- `height`: &lt;length&gt; the height of the component. This style should be specifed.

**common styles**: check out the [common styles](../common-style.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](../common-event.html)

- support `click` event. Check out [common events](../common-event.html)
- support `appear` / `disappear` event. Check out [common events](../common-event.html)    
- `load`<sup class="api-version">v0.8+</sup> event. The `load` event fires on an image has been loaded. Only Android and iOS are supported currently. [example](http://dotwe.org/25bd347da6a59603dd31ec057d2691da)    
  - event object
    - `success` : `true` if the image was loaded successfully, otherwise `false`
    - `size` : the original size of image, contains two parameters: `naturalWidth` representing the original width of image in pixels, `naturalHeight` representing the original height of image in pixels. default value. The default value for both parameters is `0`.

### Examples

```html
<template>
  <scroller class="wrapper" >
    <div class="page-head" >
      <image class="title-bg" resize="cover" src="https://img.alicdn.com/tps/TB1dX5NOFXXXXc6XFXXXXXXXXXX-750-202.png"></image>
      <div class="title-box">
        <text class="title">Alan Mathison Turing</text>
      </div>
    </div>
    <div class="article">
      <text class="paragraph">Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.</text>
      <text class="paragraph">During the Second World War, Turing worked for the Government Code and Cypher School (GC&CS) at Bletchley Park, Britain's codebreaking centre. For a time he led Hut 8, the section responsible for German naval cryptanalysis. He devised a number of techniques for speeding the breaking of German ciphers, including improvements to the pre-war Polish bombe method, an electromechanical machine that could find settings for the Enigma machine. Turing played a pivotal role in cracking intercepted coded messages that enabled the Allies to defeat the Nazis in many crucial engagements, including the Battle of the Atlantic; it has been estimated that this work shortened the war in Europe by more than two years and saved over fourteen million lives.</text>
      <text class="paragraph">After the war, he worked at the National Physical Laboratory, where he designed the ACE, among the first designs for a stored-program computer. In 1948 Turing joined Max Newman's Computing Machine Laboratory at the Victoria University of Manchester, where he helped develop the Manchester computers and became interested in mathematical biology. He wrote a paper on the chemical basis of morphogenesis, and predicted oscillating chemical reactions such as the Belousov–Zhabotinsky reaction, first observed in the 1960s.</text>
      <text class="paragraph">Turing was prosecuted in 1952 for homosexual acts, when by the Labouchere Amendment, "gross indecency" was still criminal in the UK. He accepted chemical castration treatment, with DES, as an alternative to prison. Turing died in 1954, 16 days before his 42nd birthday, from cyanide poisoning. An inquest determined his death as suicide, but it has been noted that the known evidence is also consistent with accidental poisoning. In 2009, following an Internet campaign, British Prime Minister Gordon Brown made an official public apology on behalf of the British government for "the appalling way he was treated." Queen Elizabeth II granted him a posthumous pardon in 2013.</text>
    </div>
  </scroller>
</template>

<style>
  .page-head {
    width: 750px;
    height: 200px;
  }
  .title-bg {
    width: 750px;
    height: 200px;
  }
  .title-box {
    width: 750px;
    height: 200px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .title {
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
  }
  .article {
    padding: 20px;
  }
  .paragraph{
    margin-bottom: 15px;
  }
</style>
```

[try it](../../examples/image.html)