---
title: <refresh> & <loading>
type: references
order: 2.7
version: 0.10
---

# refresh & loading

<span class="weex-version">v0.6.1+</span>

## Loading Components

To be rendered properly, the refresh/loading Components must appear inside the Scroller Component or the List Component.


**example**

```html
<template>
  <list>
    <header>
      <div class="center">
        <text style="text-align:center">I am the header</text>
      </div>
    </header>
    <loading onloading="onloading" display="{{loadingDisplay}}" style="width:750;flex-direction: row;justify-content: center;">
      <loading-indicator style="height:160;width:160;color:#3192e1"></loading-indicator>
    </loading>
    <cell onappear="onappear" ondisappear="ondisappear" class="row" repeat="{{staffs}}" index="{{$index}}">
        <div class="item">
          <text>{{name}}</text>
        </div>
    </cell>
  </list>
</template>

<style>
  .row {
    width: 750;
  }
  .item {
    justify-content: center;
    border-bottom-width: 2;
    border-bottom-color: #c0c0c0;
    height: 100;
    padding:20;
  }
  .center {
    border-bottom-width: 2;
    border-bottom-color: #cccccc;
    height: 100;
    padding:20;
    background-color:#FFFFFF;
    justify-content: center;
  }
</style>

<script>
  module.exports = {
    data: {
      staffs:[],
      loadingDisplay: 'show',
      loadingText: 'pull up to load more',
      refreshText: 'pull down to refresh'
    },
    created:function() {
      this.refreshDisplay='show'
      this.staffs=[{name:'inns'},{name:'connon'},{name:'baos'},{name:'anna'},{name:'dolley'},{name:'lucy'},{name:'john'}, {name:'lily'},{name:'locke'},{name:'jack'},{name:'danny'},{name:'rose'},{name:'harris'},{name:'lotus'},{name:'louis'}];
    },
    methods:{
      onappear: function (e) {
        var index = e.target.attr.index
        // nativeLog('+++++', index);
        // console.log(this.staffs[index].name + ' is appearing...');
      },
      ondisappear:function (e) {
        // nativeLog('+++++', e.target.attr.index);
      },
      onloading:function(e){
        console.log('onloading...');
        this.staffs.push({name:'onloading'})
      }
    }
  }
</script>

```

[try it](http://weex.alibaba-inc.com/raw/html5/a34523fee395aa68018d65f0fb622310.js)

### Child Components

Any other components, like the text and img components, can be put inside the refresh component. And there is a special component named loading-indicator used only inside the refresh or the loading components.

* loading-indicator is a child component implemented with default animation effect for the refresh component.
[example](http://weex.alibaba-inc.com/playground/a34523fee395aa68018d65f0fb622310)

### Attributes

* display has value of show or hide.

Other attributes please check out the [common attributes](../common-attrs.html).


### Styles
common styles: check out [common styles for components](../common-style.html)

### Events

* onloading triggered when loading


#### Restrictions
* refresh/loading does not support remove action,  Weex 0.9 will fix it.
* refresh/loading despite setting with display='hide', the refresh/loading view will still appear when scrolling due to known issues. it can be fixed with a another display='hide' when the refresh/loading should be hidden.
* refresh/loading can only be hidden or displayed with an attribute display with value of show or hide. And there should be a statement of display='hide' when display='show' shows up in an event function, or your scroller may not response to user inputs.

## Refresh Components

To be rendered properly, the refresh/loading Components must appear inside the Scroller Component or the List Component.

```html
<template>
  <scroller onloadmore="onloadmore" loadmoreoffset="1000">
    <refresh onrefresh="onrefresh" display="{{refreshDisplay}}">
      <text id="refreshText">{{refreshText}}</text>
    </refresh>
    <div repeat="{{v in items}}">
      <text style="font-size: 40; color: #000000">{{v.item}}</text>
    </div>
    <loading onloading="onloading" display="{{loadingDisplay}}">
      <text id="loadingText">{{loadingText}}</text>
    </loading>
  </scroller>
</template>
<script>
  module.exports = {
    data: {
      refreshDisplay: 'show',
      loadingDisplay: 'show',
      loadingText: 'pull up to load more',
      refreshText: 'pull down to refresh',
      items: []
    },
    created: function () {
      for (var i = 0; i < 30; i++) {
        this.items.push({'item': 'test data' + i});
      }
    },
    methods: {
      onrefresh: function () {
        var vm = this;
        vm.refreshDisplay = 'show'
        if (vm.items.length > 50) {
          vm.refreshText = "no more data!"
          vm.refreshDisplay = 'hide'
          return;
        }
        var len = vm.items.length;
        for (var i = len; i < (len + 20); i++) {
          vm.items.unshift({'item': 'test data ' + i});
        }
        vm.refreshDisplay = 'hide'
      },
      onloading: function () {
        var vm = this;
        vm.loadingDisplay = 'show'
        if (vm.items.length > 30) {
          vm.loadingText = "no more data!"
          vm.loadingDisplay = 'hide'
          return;
        }

        var len = vm.items.length;
        for (var i = len; i < (len + 20); i++) {
          vm.items.push({'item': 'test data ' + i});
        }
        vm.loadingDisplay = 'hide'
      },
      onloadmore:function(){
        console.log("into--[onloadmore]")
      }
    }
  }
</script>
```

[try it](http://dotwe.org/242add915e41d307f2fa6f423278425a)

### Child Components

Any other components, like the text and img components, can be put inside the refresh component. And there is a special component named loading-indicator used only inside the refresh or the loading components.

* loading-indicator is a child component implemented with default animation effect for the refresh component.
[example](http://dotwe.org/e65a2cb0abfcdbbabda6778064837a92)

### Attributes
* display has value of show or hide, default value is show.

Other attributes please check out the [common attributes](../common-attrs.html).


### Styles
common styles: check out [common styles for components](../common-style.html)

### Events
* onrefresh triggered when the scroller has been pulled down
* onpullingdown available on Android. triggered when the scroller has been pulled down. you can get dy, headerHeight, maxHeight from onpullingdowns event object. [example](http://dotwe.org/10ee6bd59ebe173f0f578a4eb8bac6f1)

**example**

```html
<template>
  <list>
    <header>
      <div class="center">
        <text style="text-align:center">I am the header</text>
      </div>
    </header>
    <refresh onpullingdown='onpullingdown' onrefresh="onrefresh" display="{{refreshDisplay}}" style="width:750;flex-direction: row;justify-content: center;">
      <loading-indicator style="height:160;width:160;color:#3192e1"></loading-indicator>
    </refresh>
    <cell onappear="onappear" ondisappear="ondisappear" class="row" repeat="{{staffs}}" index="{{$index}}">
        <div class="item">
          <text>{{name}}</text>
        </div>
    </cell>
  </list>
</template>

<style>
  .row {
    width: 750;
  }
  .item {
    justify-content: center;
    border-bottom-width: 2;
    border-bottom-color: #c0c0c0;
    height: 100;
    padding:20;
  }
  .center {
    border-bottom-width: 2;
    border-bottom-color: #cccccc;
    height: 100;
    padding:20;
    background-color:#FFFFFF;
    justify-content: center;
  }
</style>

<script>
  module.exports = {
    data: {
      staffs:[],
      refreshDisplay: 'show',
      loadingDisplay: 'show',
      loadingText: 'pull up to load more',
      refreshText: 'pull down to refresh'
    },
    created:function() {
      this.refreshDisplay='show'
      this.staffs=[{name:'inns'},{name:'connon'},{name:'baos'},{name:'anna'},{name:'dolley'},{name:'lucy'},{name:'john'}, {name:'lily'},{name:'locke'},{name:'jack'},{name:'danny'},{name:'rose'},{name:'harris'},{name:'lotus'},{name:'louis'}];
    },
    methods:{
      onappear: function (e) {
        var index = e.target.attr.index
        // console.log(this.staffs[index].name + ' is appearing...');
      },
      ondisappear:function (e) {
      },
      onrefresh:function(e){
        this.refreshDisplay='show';
        // this.staffs=[{name:'inns'},{name:'connon'},{name:'baos'},{name:'anna'}];
        this.refreshDisplay='hide'
        // console.log(this.refreshDisplay);
      },
      onpullingdown:function(e){
        console.log('onpullingdown triggered.');
        console.log('dy:'+e.dy);
        console.log('headerHeight:'+e.headerHeight);
        console.log('maxHeight:'+e.maxHeight);
      }
    }
  }
</script>

```

[try it ](http://dotwe.org/10ee6bd59ebe173f0f578a4eb8bac6f1)


### Restrictions

* refresh/loading does not support remove action, may support in Weex 0.9.
* refresh/loading despite setting with display='hide', the refresh/loading view will still appear when scrolling due to known issues. it can be fixed with a another display='hide' when the refresh/loading should be hidden.
* refresh/loading can only be hidden or displayed with an attribute display with value of show or hide. And there should be a statement of display='hide' when display='show' shows up in an event function, or your scroller may not response to user inputs.
