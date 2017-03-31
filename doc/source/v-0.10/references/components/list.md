---
title: <list>
type: references
order: 2.5
version: 0.10
---

# List

<span class="weex-version">v0.6.1+</span>

The List component, which inherits from Scroller component, is a core component, and it provides the most popular features for using a list of items.

It can provide excellent experience and performance while still maintaining smooth scroll and low memory usage.

**example**

```html
<template>
  <list>
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
</style>

<script>
  module.exports = {
    data: {
      staffs:[{name:'inns'},{name:'connon'},{name:'baos'},{name:'anna'},{name:'dolley'},{name:'lucy'},{name:'john'}, {name:'lily'},{name:'locke'},{name:'jack'},{name:'danny'},{name:'rose'},{name:'harris'},{name:'lotus'},{name:'louis'}]
    },
    methods:{
      onappear: function (e) {
        var index = e.target.attr.index
        nativeLog('+++++', index);
        console.log(this.staffs[index].name + ' is appearing...');
      },
      ondisappear:function (e) {
        nativeLog('+++++', e.target.attr.index);
      }
    }
  }
</script>

```

[try it](http://dotwe.org/15d58cfbca9b6a72c89c9a13ad1f6155)

### Child Components

Notes: The list now supports the following child components: cell, header, refresh, loading and fixed-position components. Other kinds of components will not be guaranteed to be displayed correctly.

* cell 0.6.1 defines the attributes and behavior of the cells that appear in list. 
* header 0.6.1 sticks to the top when it reaches the top of the screen.
* refresh 0.6.1 used inside list to add pull-down-to-refresh functionality.
* loading 0.6.1 used inside list to add pull-up-to-load-more functionality.


### Attributes

* show-scrollbar: true/false whether show the scroll bar or not, default value is true
* scroll-direction: <string> define scroll direction of component, horizontal or vertical
* loadmoreoffset : <number> default value is 0. The loadmore event will be triggered when the list is loadmoreoffset left to reach the bottom of the list view. e.g. a list has total content length of 1000, and the loadmoreoffset is set to 400, the loadmore event will be triggered when 600 has beed scrolled and there is less than 400 left.
* loadmoreretry : <number> default value 0，whether to reset loadmore related UI when loadmore failed, will be deprecated in further release.

Please checkout [Scroller Component Attributes](./scroller.html) to have a look at the inherited attributes from direct parent.

Other attributes please check out the [common attributes](../common-attrs.html).

### Styles

common styles: check out [common styles for components](../common-style.html)

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.

### Events

onloadmore  0.5 used with loadmoreoffset attribute. if the view has less than loadmoreoffset to scroll down, the onloadmore event will be triggered.

common events: check out the [common events](../common-event.html)

* support onclick event. Check out [common events](../common-event.html)
* support onappear / ondisappear event. Check out [common events](../common-event.html)


### API

All cells or cell's subcomponents in list support the scrollToElement API in [dom module](../modules/dom.html)

#### Difference between loading child component and onloadmore event

loading is a child component that can response to the onloading  event, and this event can only be triggered when the  scroller/list has been scrolled down to the bottom.
onloadmore is an event that will be triggered when the rest of the scroller/list is less than loadmoreoffset long.


* [scroller example](http://dotwe.org/85fd3988eefa24f058b7da7966e56203)
* [list example](http://dotwe.org/62f895249014dde26cc0725c8005e42c)

### Restrictions

Nested lists or scrollers within the same direction are not supported. In other words. nested lists/scroller must have different directions.
For example, a vertical list nested in a vertical list or scroller is not allowed. However, a vertical list nested in a horizontal list or scroller is legal.

### Example

```html
<template>
  <div class="wrapper">
    <list class="list">
      <header class="header">
        <text class="title">Search Results</text>
      </header>
      <refresh style="width: 750; padding: 30;" onrefresh="refreshData" display="{{refreshDisplay}}">
        <text class="text"> ↓ Pull to refresh </text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell class="row" repeat="item in items" id="item-{{$index}}">
        <div>
          <text class="item">Repo name: {{item.full_name}}</text>
        </div>
        <div>
          <text class="item">Repo star: {{item.stargazers_count}}</text>
        </div>
      </cell>
      <loading onloading="loadingData" style="width: 750; padding: 30;" display="{{loadingDisplay}}">
        <text class="text">{{loadingText}}</text>
      </loading>
    </list>
    <div class="up" onclick="goToTop">
      <img class="img" src="https://img.alicdn.com/tps/TB1ZVOEOpXXXXcQaXXXXXXXXXXX-200-200.png"></img>
    </div>
  </div>
</template>

<style>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.list{
  background-color: #ffffff;
  flex: 1;
}
.header {
  height: 80;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
  border-bottom-color: #eeeeee;
  border-bottom-width: 2;
  border-bottom-style: solid;
}
.title {
  text-align: center;
}
.text {
  text-align: center;
}
.row {
  padding: 20;
  border-bottom-color: #eeeeee;
  border-bottom-width: 2;
  border-bottom-style: solid;
}
.up {
  width: 70;
  height: 70;
  position: fixed;
  right: 20;
  bottom: 20;
}
.img {
  width: 70;
  height: 70;
}
</style>

<script>
var dom = require('@weex-module/dom') || {}
var stream = require('@weex-module/stream') || {}
var modal = require('@weex-module/modal') || {}

var SEARCH_URL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc'

module.exports = {
  data: {
    isLoaded: true,
    page: 1,
    loadingDisplay: 'hide',
    refreshDisplay: 'hide',
    loadingText: 'Loading...',
    items:[]
  },
  created: function () {
    var url = SEARCH_URL + '&page=' + this.page

    this.renderData(url)
    
    this.page++
  },
  methods: {
    renderData: function (url) {
      var self = this

      stream.fetch({
        method: 'GET',
        url: url,
        type:'json'
      }, function(res) {
        self.refreshDisplay = 'hide'
        self.loadingDisplay = 'hide'

        try {
          var results = res.data.items || []
          
          if (Array.isArray(results)) {
            for(var i = 0; i < results.length; i++) {
              self.items.push(results[i])
            }
          }

          self.isLoaded = true
        } catch(e) {}
      },function(res){
          
      })
    },
    loadingData: function (e) {
      var url = SEARCH_URL + '&page=' + this.page
      var self = this
      
      if (self.isLoaded === false) return 
      
      self.loadingDisplay = 'show'
      
      if (self.page <=10 ) {
        self.renderData(url)
        self.page++
      } else {
        self.loadingDisplay = 'hide'
        self.loadingText = 'NO MORE!'
      }
    },
    goToTop: function (e) {
      dom.scrollToElement(this.$el('item-0'), {
        offset: -100
      })
    },
    refreshData: function (e) {
      var url = SEARCH_URL + '&page=1'

      if (this.isLoaded === false) return 
      
      this.refreshDisplay = 'show'

      modal.toast({
        'message': 'Refreshing...', 
        'duration': 1
      })

      this.items = []
      this.page = 1
      this.renderData(url)

      this.refreshDisplay = 'hide'
    }
  }
}
</script>
```

[Try it](http://dotwe.org/ed524ade679b0fa96e980600c53ea5ce)