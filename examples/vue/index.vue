<template>
  <example-list :items="items" dir="examples"></example-list>
</template>

<script>
  module.exports = {
    data: function () {
      var root = typeof window === 'object' ? 'vue-web/vue' : 'vue'
      return {
        items: [
          // common
          {name: root + '/syntax/hello-world', title: 'Hello World'},
          {name: root + '/style/index', title: 'Common Style'},
          {name: root + '/animation', title: 'Animation'},

          // component
          {name: root + '/components/text', title: 'Text'},
          {name: root + '/components/image', title: 'Image'},
          {name: root + '/components/input', title: 'Input'},
          {name: root + '/components/scroller', title: 'Scroller'},
          {name: root + '/components/list', title: 'List'},
          {name: root + '/components/slider', title: 'Slider'},
          {name: root + '/components/a', title: 'A'},
          {name: root + '/components/video', title: 'Video'},
          {name: root + '/components/countdown', title: 'Countdown'},
          {name: root + '/components/marquee', title: 'Marquee'},
          {name: root + '/components/web', title: 'Web'},
          {name: root + '/components/navigator', title: 'Navigator'},
          {name: root + '/components/tabbar', title: 'Tabbar'},

          // module
          {name: root + '/modules/instance-api', title: 'Instance API'},
          {name: root + '/modules/modal', title: 'Modal'},
          {name: root + '/modules/stream', title: 'Stream'},
          {name: root + '/modules/storage',title:'Storage'},
          // {name: 'module/clipboard', title: 'Clipboard'}, // 0.8 , developing

          // showcase
          {name: root + '/showcase/progress', title: 'Progress Bar'},
          {name: root + '/showcase/itemlist', title: 'List (Advanced)'},
          {name: root + '/showcase/calculator', title: 'Calculator'},
          // {name: root + '/showcase/minesweeper', title: 'Minesweeper'},
          // {name: root + '/showcase/ui', title: 'UI Gallery'},
          // {name: root + '/showcase/dropdown/dropdown-demo', title: 'Dropdown'}
        ]
      }
    },
    components: {
      exampleList: require('./include/example-list.vue')
    }
  }
</script>
