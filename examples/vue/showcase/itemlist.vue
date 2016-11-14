<template>
  <list class="list" @loadmore="loadmore" loadmoreoffset=2000>
    <cell class="cell" v-for="item in shopList" :scope="item.scopeValue" @click="oncellclick(item.id)">
      <div class="shopDiv">
        <div class="shopHeader" style="flex-direction:row;">
          <div style="flex:2;flex-direction:row;">
            <div>
              <image style="width:60;height:60;" :src="item.PersonPhoto"></image>
            </div>
            <div style="flex-direction:column;margin-left:5;">
              <div style="margin-top:5;">
                <text style="font-size:20;">{{item.PersonName}}</text>
              </div>
              <div style="margin-top:5;">
                <text style="font-size:20;color:#cccccc;">{{item.PersonVisitTime}}</text>
              </div>
            </div>
          </div>
          <div style="flex:5;flex-direction:row;">
            <div style="flex-direction:row;margin-left:10;margin-top:10;">
              <div>
                <image style="width:20;height:20;"
                  src="https://img.alicdn.com/tps/i4/TB1zkDeIFXXXXXrXVXX07tlTXXX-200-200.png_88x88xz.jpg"></image>
              </div>
              <div>
                <text style="font-size:20;">Hope</text>
              </div>
            </div>
            <div style="position:absolute;left:90;top:10;flex-direction:row;">
              <div>
                <image style="width:20;height:20;"
                  src="https://img.alicdn.com/tps/i2/TB1hRb1IXXXXXX3XVXXXQaP.pXX-87-87.jpeg"></image>
              </div>
              <div>
                <text style="font-size:20;">Mem</text>
              </div>
            </div>
            <div style="position:absolute;left:170;top:10;flex-direction:row;">
              <div>
                <image style="width:20;height:20;"
                  src="https://img.alicdn.com/tps/i3/TB1DGkJJFXXXXaZXFXX07tlTXXX-200-200.png"></image>
              </div>
              <div>
                <text style="font-size:20;">auth</text>
              </div>
            </div>
            <div style="position:absolute;left:250;top:10;flex-direction:row;">
              <div>
                <image style="width:20;height:20;"
                  src="https://img.alicdn.com/tps/i1/TB1nFvPIXXXXXbUXXXXUAkPJpXX-87-87.png"></image>
              </div>
              <div>
                <text style="font-size:20;">Friend</text>
              </div>
            </div>
            <div style="position:absolute;left:330;top:10;flex-direction:row;">
              <div>
                <image style="width:20;height:20;"
                  src="https://img.alicdn.com/tps/i2/TB1CpD7IXXXXXbSXXXXUAkPJpXX-87-87.png"></image>
              </div>
              <div>
                <text style="font-size:20;">issue</text>
              </div>
            </div>
            <div style="position:absolute;left:410;top:10;flex-direction:row;">
              <div>
                <image style="width:20;height:20;"
                  src="https://gtms02.alicdn.com/tps/i2/TB11ZZfIVXXXXbMXFXXEDhGGXXX-32-32.png"></image>
              </div>
              <div>
                <text style="font-size:20;">super</text>
              </div>
            </div>
          </div>
        </div>
        <div class="shopBody" style="flex-direction:column;">
          <div class="descDiv" style="margin-top:10;margin-left:10;">
            <text class="shopDesc" style="font-size:25;">{{item.shopDesc}}</text>
          </div>
          <div style="flex-direction:row;">
            <div class="imgDiv" style="flex:1;flex-direction:column;margin:10;" v-for="img in item.shopImgList">
              <div>
                <image class="shopImg" :style="{ width: img.shopImgWidth, height: img.shopImgHeight }" :src="img.shopImg"></image>
              </div>
              <div style="flex:1;margin-top:10;flex-direction:row;">
                <div style="flex:1;justify-content:center;flex-direction:row;">
                  <div>
                    <image style="width:20;height:20;"
                           src="https://img.alicdn.com/tps/i1/TB1nFvPIXXXXXbUXXXXUAkPJpXX-87-87.png"></image>
                  </div>
                  <div style="margin-left:5;">
                    <text style="font-size:20;text-align:center;">Up</text>
                  </div>
                </div>
                <div style="flex:1;justify-content:center;flex-direction:row;">
                  <div>
                    <image style="width:20;height:20;"
                           src="https://img.alicdn.com/tps/i2/TB1CpD7IXXXXXbSXXXXUAkPJpXX-87-87.png"></image>
                  </div>
                  <div style="margin-left:5;">
                    <text style="font-size:20;text-align:center;">down</text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shopFooter" style="flex-direction:row;margin-top:10;margin-left:10;justify-content:flex-end;">
          <div style="margin-right:5;">
            <image class="shopLikeImg smallImg" :src="item.shopLikeImg"></image>
          </div>
          <div style="margin-right:15;">
            <text class="shopLikeText" style="font-size:20;">{{item.shopLikeText}}</text>
          </div>
          <div style="margin-right:5;">
            <image class="shopCommentImg smallImg" :src="item.shopCommentImg"></image>
          </div>
          <div style="margin-right:15;">
            <text class="shopCommentText" style="font-size:20;">{{item.shopCommentText}}</text>
          </div>
          <div style="margin-right:5;">
            <image class="shopLookImg smallImg" :src="item.shopLookImg"></image>
          </div>
          <div style="margin-right:15;">
            <text class="shopLookText" style="font-size:20;">{{item.shopLookText}}</text>
          </div>
          <div style="margin-right:5;">
            <image class="shareImg smallImg" :src="item.shareImg"></image>
          </div>
          <div style="margin-right:20;">
            <text class="shareText" style="font-size:20;">{{item.shareText}}</text>
          </div>
        </div>
      </div>
    </cell>
  </list>
</template>

<style>
  .flexRow {
    flex-direction: row;
  }

  .flexColumn {
    flex-direction: column;
  }

  .text {
  }

  .div {
  }

  .fixed {
    position: fixed;
    bottom: 50px;
    left: 50px;
    width: 300px;
    height: 50px;
    align-items: center;
    justify-content: center
  }

  .shopImg {
    width: 220;
    height: 220;
  }

  .list {
    flex-direction: column;
    overflow: hidden;
    width: 750;
    height: 1200;
    background-color: #dddddd;
  }

  .cell {
    background-color: #dddddd;
    flex-direction: column;
    width: 750;
  }

  .shopDiv {
    flex-direction: column;
    background-color: #ffffff;
    margin: 5;
    padding: 10;
    border-width: 1;
    border-color: #cccccc;
    overflow: visible;
  }

  .shopRowList {
    flex-direction: column;
    border-width: 1;
    border-color: #cccccc;
    overflow: visible;
    margin: 5;
    padding: 10;
    background-color: #ffffff;
  }

  .shopHeader {
    flex-direction: row;
    width: 720;
  }

  .shopFooter {
    flex-direction: row;
    width: 720;
  }

  .smallImg {
    width: 20;
    height: 20;
  }
</style>

<script>
  var modal = require('@weex-module/modal')
  module.exports = {
    data: {
      shopList: [
        {
          id: 1,
          scopeValue: 1,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Mendeleyev',
          PersonVisitTime: 'today',
          shopDesc: 'Genius only means hard-working all one\'s life',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB1rtOnHpXXXXXLaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/bao/uploaded/i4/TB15KrfFVXXXXXJXXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB1t5YBGVXXXXXcaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 2,
          scopeValue: 2,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Napoleon',
          PersonVisitTime: 'yesterday',
          shopDesc: 'The man who has made up his mind to win will never say "impossible "',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd1.alicdn.com/imgextra/i1/2655929383/TB2.qITjpXXXXcIXXXXXXXXXXXX_!!2655929383.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd3.alicdn.com/imgextra/i3/2655929383/TB2eWwZjpXXXXbHXXXXXXXXXXXX_!!2655929383.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/imgextra/i2/2655929383/TB2tgQWjpXXXXbZXXXXXXXXXXXX_!!2655929383.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 3,
          scopeValue: 3,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Balzac',
          PersonVisitTime: 'yesterday',
          shopDesc: 'There is no such thing as a great talent without great will - power',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd1.alicdn.com/imgextra/i1/TB1AFz9LXXXXXbrXVXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/imgextra/i2/2557954751/TB2is2njXXXXXatXpXXXXXXXXXX_!!2557954751.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/imgextra/i2/2557954751/TB2PNYGjXXXXXbXXXXXXXXXXXXX_!!2557954751.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 4,
          scopeValue: 4,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Thomas Carlyle',
          PersonVisitTime: '3 day ago',
          shopDesc: 'Cease to struggle and you cease to live',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/imgextra/i4/69426324/TB2zbwdfXXXXXa4XpXXXXXXXXXX_!!69426324.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/imgextra/i4/69426324/TB2L7ZAfXXXXXXOXXXXXXXXXXXX_!!69426324.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/imgextra/i4/69426324/TB2p9wufXXXXXbiXXXXXXXXXXXX_!!69426324.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 5,
          scopeValue: 5,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Addison',
          PersonVisitTime: 'yesterday',
          shopDesc: 'A strong man will struggle with the storms of fate',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1MQ8_KVXXXXaLXVXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/imgextra/i2/53218032/TB2bGSqiXXXXXXyXpXXXXXXXXXX_!!53218032.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB1kP2zKFXXXXbIXXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 6,
          scopeValue: 1,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Ruskin',
          PersonVisitTime: 'yesterday',
          shopDesc: 'Living without an aim is like sailing without a compass',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/bao/uploaded/i4/TB11yFnHXXXXXakaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/imgextra/i4/32720628/TB2CRJUcXXXXXXwXpXXXXXXXXXX_!!32720628.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB17LUzHXXXXXcEaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 7,
          scopeValue: 2,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Yiming',
          PersonVisitTime: 'today',
          shopDesc: 'Live a noble and honest life. Reviving past times in your old age will help you to enjoy your life again',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/bao/uploaded/i4/TB1hvNoJXXXXXaMaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/imgextra/i4/2058567235/TB2V8iygFXXXXaRXpXXXXXXXXXX_!!2058567235.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/imgextra/i2/2058567235/TB2im1QgFXXXXX8XXXXXXXXXXXX_!!2058567235.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 8,
          scopeValue: 3,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'Brown',
          PersonVisitTime: 'yesterday',
          shopDesc: 'Behind every successful man there\'s a lot u unsuccessful years',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd1.alicdn.com/bao/uploaded/i1/TB18BZ2KFXXXXb8XFXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd1.alicdn.com/imgextra/i1/2775383848/TB2r012jVXXXXXHXpXXXXXXXXXX_!!2775383848.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd3.alicdn.com/imgextra/i3/2775383848/TB2iI9VjVXXXXaoXpXXXXXXXXXX_!!2775383848.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 9,
          scopeValue: 4,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'YIMING',
          PersonVisitTime: 'today',
          shopDesc: 'Enrich your life today,. yesterday is history.tomorrow is mystery',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1JB.rLpXXXXXLXXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd4.alicdn.com/imgextra/i4/2702739128/TB2JdvmjVXXXXXjXXXXXXXXXXXX_!!2702739128.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd2.alicdn.com/imgextra/i2/2702739128/TB2A.e6jVXXXXXGXpXXXXXXXXXX_!!2702739128.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",

        },
        {
          id: 10,
          scopeValue: 5,
          PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
          PersonName: 'YIMING',
          PersonVisitTime: 'yesterday',
          shopDesc: 'The secret of success is constancy to purpose',
          shopImgList: [{
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd3.alicdn.com/bao/uploaded/i3/TB17zXOGXXXXXbEXVXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd1.alicdn.com/imgextra/i1/2265445951/TB22ACTbFXXXXXBXXXXXXXXXXXX_!!2265445951.jpg_220x220.jpg'
          }, {
            shopImgWidth: 220,
            shopImgHeight: 220,
            shopImg: 'https://gd3.alicdn.com/imgextra/i3/2265445951/TB2oXqUbFXXXXXIXXXXXXXXXXXX_!!2265445951.jpg_220x220.jpg'
          }],
          shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopLikeText: '6',
          shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
          shopCommentText: '97',
          shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
          shopLookText: '1003',
          shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
          shareText: "10",
        }
      ],
    },
    methods: {
      loadmore: function(e) {
        modal.toast({
          'message': 'loadmore',
          'duration': 2.0
        });
      },
      oncellclick: function(id) {
        modal.toast({
          'message': 'row ' + id + ' clicked',
          'duration': 2.0
        });
      }
    }

  }
</script>
