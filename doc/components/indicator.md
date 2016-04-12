## &lt;indicator> Compoent

one child of [slider](slider.md) 

### Style

- `itemColor`: This attribute sets the normal item color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `itemSelectedColor`: This attribute sets the selected item color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `itemSize`: The size of the indicator elements. Is an float attribute.

### Example

```html
<template>
      <slider class="slider">
        <div class="slider-pages" repeat="{{itemList}}">
          <image class="img" src="{{pictureUrl}}"></image>
          <text class="title">{{title}}</text>
        </div>

        <indicator class="indicator"></indicator>
      </slider>
</template>

<style>
  .img {width: 150; height: 150;}
  .title {flex: 1; color: #ff0000; font-size: 48; font-weight: bold; background-color: #eeeeee;}
  .slider {
        flex-direction: row;
        margin: 18;
        width: 714;
        height: 230;
  }
  .slider-pages {
        flex-direction: row;
        width: 714;
        height: 200;
  }
  .indicator {
    width:714;
    height:200;
    position:absolute;
    top:1;
    left:1;
    itemColor: red;
    itemSelectedColor: blue;
    itemSize: 20;
  }
</style>

<script>
  module.exports = {
    data: {
      itemList: [
        {itemId: '520421163634', title: 'item1', pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: 'item2', pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: 'iten3', pictureUrl: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
      ]
    }
  }
</script>
```