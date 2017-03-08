<template>
  <scroller class="list" append="tree">
    <refresh class="refresh-view" :display="refresh_display" @refresh="onrefresh" @pullingdown="pullingdown">
      <img id="roate" ref="roate" src="http://gw.alicdn.com/bao/uploaded/TB1xDrVNFXXXXbEXFXXXXXXXXXX-48-48.png" style="width: 50px;height: 50px;"></img>
    </refresh>
    <div v-for="(sec, i) in sections" :key="i" class="section">
      <div class="header">
        <text class="header-title">{{sec.title}}</text>
      </div>
      <div v-for="item in sec.items" class="item" :key="item.index">
        <text class="item-title">row {{item.id}}</text>
      </div>
    </div>
    <loading class="loading-view" :display="loading_display" @loading="onloading">
      <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
    </loading>
  </scroller>
</template>

<style scoped>
  .refresh-view {
    height: 120px;
    width: 750px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }

  .refresh-arrow {
    font-size: 30px;
    color: #45b5f0;
  }

  .loading-view {
    height: 80px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #c0c0c0;
  }

  .indicator {
    height: 40px;
    width: 40px;
    color: #45b5f0;
  }

  .header {
    background-color: #45b5f0;
    padding: 20px;
    height: 88px;
    justify-content: center;
  }

  .header-title {
    color: white;
    font-weight: bold;
  }

  .item {
    justify-content: center;
    border-bottom-width: 2px;
    border-bottom-color: #c0c0c0;
    height: 100px;
    padding: 20px;
  }

  .item-title {
  }
</style>

<script>
  module.exports = {
    methods: {
      onrefresh: function(e) {
        var self = this;
        self.refresh_display = 'show';
        setTimeout(function () {
          self.refresh_display = 'hide';
        }, 3000)
      },
      onloading: function(e) {
        var self = this;
        self.loading_display = 'show';
        setTimeout(function () {
          self.loading_display = 'hide';
        }, 3000)
      },
      pullingdown: function(e){
        var dy = e.dy;
        var pullingDistance = e.pullingDistance;
        var viewHeight = e.viewHeight;
      }
    },
    data: function () {
      return {
        refresh_display: 'hide',
        loading_display: 'hide',
        sections: [
          {
            title: 'Header 1',
            items: [
              {id: 1},
              {id: 2},
              {id: 3},
              {id: 4},
              {id: 5}
            ]
          },
          {
            title: 'Header 2',
            items: [
              {id: 6},
              {id: 7},
              {id: 8},
              {id: 9},
              {id: 10},
              {id: 11}
            ]
          },
          {
            title: 'Header 3',
            items: [
              {id: 6},
              {id: 7},
              {id: 8},
              {id: 9},
              {id: 10},
              {id: 11}
            ]
          }
        ],
        moreSections: [
          {
            title: 'Header 3',
            items: [
              {id: 12},
              {id: 13},
              {id: 14},
              {id: 15},
              {id: 16},
              {id: 17},
              {id: 18}
            ]
          },
          {
            title: 'Header 4',
            items: [
              {id: 19},
              {id: 20},
              {id: 21},
              {id: 22}
            ]
          },
          {
            title: 'Header 5',
            items: [
            {id: 23},
            {id: 24},
            {id: 25},
            {id: 26},
            {id: 27}
            ]
          },
          {
            title: 'Header 6',
            items: [
            {id: 28},
            {id: 29},
            {id: 30},
            {id: 31},
            {id: 32}
            ]
          }
          ]
      }
    }
  }
</script>
