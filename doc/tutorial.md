# Tutorial

We will make a simple but realistic list of tech that weex used, this form of list also work for a lot of e-commerce app/mobile site.

## Getting Started

Let's start easy though, making a item of list.

```html
<template>
  <div class="container" >
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE3AJt"></image>  
       <text class="title">JavaScript</text>
    </div>
  </div>
</template>

<style>
  .cell{margin-top:10 ; margin-left:10 ; flex-direction: row; }
  .thumb {width: 200; height: 200; }
  .title {text-align: center ; flex: 1; color: grey; font-size: 50; }  
</style>
```

You can copy and paste above code to a Weex file named `tech_list.we` (`.we` is our recommended the file extension name)

The Weex CLI toolchain is Node JS based, so you need to install [Node](https://nodejs.org/en/download/stable/) first. Then you can install Weex CLI program using Node JS npm command.

```
sudo tnpm install -g @ali/weex-toolkit
```

After Weex CLI program install finished, you should test to ensure the Weex CLI is properly installed by typing weex on the command line. You should see the following help text displayed:

```
Usage: weex foo/bar/your_next_best_weex_script_file.we  [options]

Options:
  -n      do not open preview browser automatic                        [boolean]
  --qr    display QR code for native runtime                           [boolean]
  -h      specify weex server listen host                 [default: "127.0.0.1"]
  -o      transform weex JS bundle only, specify bundle file name using the
          option                                 [default: "no JSBundle output"]
  -s      start a http file server, weex .we file will be transformed on the
          server, specify local root path using the option     [default: false]
  --help  Show help                                                    [boolean]
```

If all works well, navigate to the directory where you save the newly created tech_list.we, then type

```
weex tech_list.we
```

A browser window will open automatically  to display  something like below

![weex html5 render](http://gtms02.alicdn.com/tps/i2/TB1y151LVXXXXXXaXXXoRYgWVXX-495-584.jpg)

## Intro Weex Syntax
So  it's  time for some "boring syntax",  as  content of  tech_list.we showing,  Weex source code is  written in three parts --  *template*,  *style*, *script* just like html,css,javascript for the Web.

Template is the skeleton that give weex structure, it composed by tags which surround content and apply meaning to it. Weex has two type of tag, opening tag & closing tag, we call every couple  of opening tag &  closing tag a Weex tag. Tag have *attributes*,  different attribute have different meaning,   class attribute makes it possible to define equal styles for multiple tags,  onclick attribute makes the tag  responds to click  event.

Style describes how Weex tags are to be displayed. We like you, love the  CSS, so we try to keep consistent with CSS standard as possible. Weex Style support a lot of CSS features, eg:  margin, padding, fixed...... Better yet, flexbox layout (flex) is well supported in Weex Style.

Script add *data* & *logic* to Weex tags, help you easy access local or remote data and update tags. You can also define some methods for your tag  to respond to different events. Weex Script organizing learn a lot from CommonJS module style.

More complete information about Weex syntax can be found  in our [Syntax chapter](syntax/main.md).

## Add More Item

We can't call one item an list, so we need add more item to our  tech list.  open  tech_list.we in your favorite editor  and  update it's content  like below

```html
<template>
  <div class="container"  >
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE3AJt"></image>  
       <text class="title">JavaScript</text>
    </div>
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE3uo9"></image>
       <text class="title">Java</text>
    </div>
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE31hq"></image>  
       <text class="title">Objective C</text>
    </div>
  </div>
</template>

<style>
  .cell{margin-top:10 ; margin-left:10 ; flex-direction: row; }
  .thumb {width: 200; height: 200; }
  .title {text-align: center ; flex: 1; color: grey; font-size: 50; }  
</style>
```

Now we will try to  render our  tech_list.we  with Weex native renderer.  open your terminal and  navigate to the directory where you save the tech_list.we again,then type

```
weex tech_list.we --qr

```
An QR code will be display in the terminal window, like:


![weex qr](http://gtms01.alicdn.com/tps/i1/TB1ggfiLVXXXXbPXXXXELJK6FXX-334-379.jpg)


The QR code will work together with Weex playground App, you can download the app  here.  After successful installation, open Weex playground App then click scan icon at  top right corner, then scan the Qr code in your terminal.If all works well, a beautiful list will be displayed in your phone. Here, i must stress that the list is render using native widget ( no webkit ), so your app get faster loading and less memory overhead than common embedded webkit  renderer.

![list1 in Android](http://gtms04.alicdn.com/tps/i4/TB1FH15LVXXXXcYXFXXFzbANVXX-504-896.png)

Now open tech_list.we again and trying to change some text, after changes saved the Weex playground App will  immediately display these changes.  this called **Hot-Reload**, it also works with default Weex browser renderer. We hope hot-reload will be  helpful when you debug Weex script.

## Add Build-in Component

Beyond writing basic tag by yourself, Weex provide  a lot of build-in components.   For example,  Slider is common to many App/Mobile Web, So Weex include  a  build-in  Slider  and you can easily using the component in your script.  Let's open tech_list.we and update it's content like below.


```html
<template>
  <div style="flex-direction: column;">
    <slider class="slider" interval="{{intervalValue}}" auto-play="{{isAutoPlay}}" >
      <div class="slider-pages" repeat="{{itemList}}" onclick="goWeexSite" >
        <image class="thumb" src="{{pictureUrl}}"></image>
        <text class="title">{{title}}</text>
      </div>
    </slider>

  <div class="container" onclick="goWeexSite" >
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE3AJt"></image>  
       <text class="title">JavaScript</text>
    </div>
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE3uo9"></image>
       <text class="title">Java</text>
    </div>
    <div class="cell">
       <image class="thumb" src="http://t.cn/RGE31hq"></image>  
       <text class="title">Objective C</text>
    </div>
  </div>
</template>

<style>
  .cell{margin-top:10 ; margin-left:10 ; flex-direction: row; }
  .thumb {width: 200; height: 200; }
  .title {text-align: center ; flex: 1; color: grey; font-size: 50; }
  .slider {
        margin: 18;
        width: 714;
        height: 230;
  }
  .slider-pages {
        flex-direction: row;
        width: 714;
        height: 200;
  }  
</style>

<script>
module.exports = {
    data: {
      intervalValue:"1000",
      isShowIndicators:"true",
      isAutoPlay:"true",
      itemList: [
        {title: 'Java', pictureUrl: 'http://t.cn/RGE3uo9'},
        {title: 'Objective C', pictureUrl: 'http://t.cn/RGE31hq'},
        {title: 'JavaScript', pictureUrl: 'http://t.cn/RGE3AJt'}
      ]
    },
    methods: {
      goWeexSite: function () {
        this.$openURL('http://alibaba.github.io/weex/')
      }       
    }
}
</script>
```

Open terminal  and run the command again.

```
weex tech_list.we
```


You should see a  slider prepend  to our list.

![slider demo](http://gtms02.alicdn.com/tps/i2/TB1MB2gLVXXXXaLXpXXB8.XUXXX-596-1000.gif)


More information about Slider Component can be found [here](/components/slider.md).

Just as previous example, the slider can be rendering in native, easily in Weex playground,also in your App. Please refer [the document](/advanced/main.md) for integrating Weex into your App.
