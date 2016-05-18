<template>
  <div style="flex-direction: column;">
    <wxc-tabbar tab-items = {{tabItems}}></wxc-tabbar>
  </div>
</template>

<script>
  require('weex-components');
  module.exports = {
    data: {
      dir: 'examples',
      tabItems: [
        {
          index: 0,
          title: 'tab1',
          titleColor: '#000000',
          icon: '',
          image: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
          selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png',
          src: 'component/tabbar/tabbar-item.js?itemId=tab1',
          visibility: 'visible',
        },
        {
          index: 1,
          title: 'tab2',
          titleColor: '#000000',
          icon: '',
          image: 'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png',
          selectedImage: 'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png',
          src: 'component/tabbar/tabbar-item.js?itemId=tab2',
          visibility: 'hidden',
        },
        {
          index: 2,
          title: 'tab3',
          titleColor: '#000000',
          icon: '',
          image: 'http://gtms01.alicdn.com/tps/i1/TB1B0v5MpXXXXcvXpXX9t7RGVXX-46-46.png',
          selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB1NxY5MpXXXXcrXpXX9t7RGVXX-46-46.png',
          src: 'component/tabbar/tabbar-item.js?itemId=tab3',
          visibility: 'hidden',
        }
      ],
    },
    created: function() {
        var bundleUrl = this.$getConfig().bundleUrl;
        console.log('hit', bundleUrl);
        var nativeBase;
        var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
        var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
        if (isAndroidAssets) {
          nativeBase = 'file://assets/';
        }
        else if (isiOSAssets) {
          // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
          // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
          nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
        }
        else {
          var host = 'localhost:12580';
          var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
          if (matches && matches.length >= 2) {
            host = matches[1];
          }
          nativeBase = 'http://' + host + '/' + this.dir + '/build/';
        }
        var h5Base = './' + this.dir + '/build/';
        // in Native
        var base = nativeBase;
        if (typeof window === 'object') {
          // in Browser or WebView
          base = h5Base;
        }

        for(var i = 0; i < this.tabItems.length; i++) {
            var tabItem = this.tabItems[i];
            tabItem.src = base + tabItem.src;
        }
        // see log in Android Logcat
        //if (this.items.length) console.log('hit', this.items[0].url);
    },
    methods: {
      ready: function (e) {
        var vm = this;
        vm.$on('tabBar.onClick',function(e){
          var detail= e.detail;
          nativeLog('tabBar.onClick ' + detail.index);
        });
      },
    }
  }
</script>