# Common Style

All of weex tags share some common style ruler

## Box Model

![box model](http://www.codeproject.com/KB/HTML/567385/boxmodel-image.png)

Weex box model based on the CSS box model , all of weex elements can be considered as boxes.  the term "box model" is used when talking about design and layout. The box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.

you can using below definition in weex box-model.

- width
- height
- Padding (space around content , between element content and the element border)
  - padding-left
  - padding-right
  - padding-top
  - padding-bottom
- Marging (space around elements ,outside the border)
  - margin-left
  - margin-right
  - margin-top
  - margin-bottom
- Border
  - border-style(solid,dashed,dotted)
  - border-width
    - border-left-width
    - border-top-width
    - border-right-width
    - border-bottom-width
  - border-color
    - border-left-color
    - border-top-color
    - border-right-color
    - border-bottom-color
  - border-radius  ( rounded borders to elements , default value is 0 meaning right angle )
    - border-bottom-left-radius
    - border-bottom-right-radius
    - border-top-left-radius
    - border-top-right-radius
    
   *For `<image>` tag,only border-style, border-width, border-color, border-radius are suppported*, 

Notes: weex box model using `border-box` as `box-sizing` , meaning the width and height properties includes content, padding and border, but not the margin.2. 


example:

```html
<template>
  <container>
    <image src="..." style="width: 400; height: 200; margin-left: 20;"></image>
  </container>
</template>
```

## flexbox

Weex box style model based on the CSS flexbox , ensures that elements behave predictably when the page layout must accommodate different screen sizes and different display devices.

flexbox consists of flex containers and flex items. if one weex element can containing other elements ,it is flex containers.

### flex container

flexbox is the default and only style modle in Weex , so you don't have to  add  `display: flex;` in container.

- `flex-direction`: `row` | `column`

The flex-direction property specifies the direction of the flexible items inside the flex container. The default value of flex-direction is row (left-to-right, top-to-bottom).


- `justify-content`: `flex-start` | `flex-end` | `center` | `space-between`

The justify-content property horizontally aligns the flexible container's items when the items do not use all available space on the main-axis. `flex-start` is default value. flex items are positioned at the beginning of the container;  `flex-end`: items are positioned at the end of the container;  `center` : items are positioned at the center of the container ;  `space-between` : items are positioned with space between the lines ; `space-around` : items are positioned with space before, between, and after the lines.

![justify-content](http://www.w3.org/TR/css3-flexbox/images/flex-pack.svg)

- `align-items`: `stretch` | `flex-start` | `center` | `flex-end`

The align-items property vertically aligns the flexible container's items when the items do not use all available space on the cross-axis. `stretch` is  the default value. items are stretched to fit the container. `flex-start` :items are positioned at the top of the container ;  `flex-end` : items are positioned at the bottom of the container; `center` : items are positioned at the center of the container (vertically).

![align-items](http://gtms02.alicdn.com/tps/i2/TB1VnHKMXXXXXcEaXXXDldN_pXX-1018-502.jpg)


### flex item

- flex : <number>

the flex property specifies the length of the flex item, relative to the rest of the flex items inside the same container.  if all of flex item set `flex: 1`, them will have equal width or height on direction of flex container's `flex-direction` . if two flex items ,one set `flex: 1` another set `flex: 2` , the first one will take 1/3 container space , the second one will take 2/3 container space. if all of flex items don't set `flex` , them will be aligned by the container's  `justify-content` property.


## Examples

equal ratio horizontal image list

```html
<template>
  <container style="width: 300; height: 100;">
    <image src="..." style="flex: 1;"></image>
    <image src="..." style="flex: 1;"></image>
    <image src="..." style="flex: 1;"></image>
  </container>
</template>
```

fixed width image and stretch text 

```html
<template>
  <container style="width: 300; height: 100;">
    <image src="..." style="width: 100; height: 100;"></image>
    <text style="flex: 1;">...</text>
  </container>
</template>
```

mixed direction alignment

```html
<template>
  <container style="flex-direction: column; width: 100;">
    <image src="..." style="width: 100; height: 100;"></image>
    <container>
      <text style="flex: 2; font-size: 32;">title</text>
      <text style="flex: 1; font-size: 16;">$100</text>
    </container>
  </container>
</template>
```


##  Position 

we can using below property control placement of weex tag

- `position`: `relative` | `absolute` | `sticky`  , `relative` is default value


`relative` meaning the item  is positioned relative to its normal position , `absolute` meaning the item is positioned relative to its container , `sticky` keeps elements positioned as "fixed" or "relative" depending on how it appears in the viewport. as a result the element is "stuck" when necessary while scrolling.

- `top`:  <number> , upward offset  value , default `0`
- `bottom`: <number> , downward offset value, default `0`
- `left`: <number> , leftward offset value ,default `0`
- `right`: <number> , rightward offset value ,default `0`

### Examples

```html
<template>
  <container style="flex-direction: column;">
    <container style="height: 3000;">
      <image src="..." style="top: 50; left: 50; ..."></image>
    </container>
    <container style="height: 3000;">
      <image src="..." style="position: sticky; ..."></image>
    </container>
    <container style="height: 3000;">
      <image src="..." style="position: absolute; top: 50; left: 50; ..."></image>
    </container>
  </container>
</template>
```


## Other Common Style

- `opacity` :  <number> value within range 0 to 1 , 1 is not transparent at all, 0.5 is 50% see-through, and 0 is completely transparent .  1 is default value.
- `background-color` : sets the background color of an element, `transparent` is default value.  color


## Type of Style Value 
- length : number followed by length unit `px` , `px` can be omitted.
- colors:  both  hexadecimal colors (`#RRGGBB`) and  RGBA colors (`rgb(255, 255, 255)`) is supported
- enumerated values: limited number of string value.

## Simple Step

these top to down steps help you plan weex style
1. overall style: divide whole page to different part
2. flex alignment: align boxs in every part of page
3. position box :  place box ,set offset
4. special style:  add special style  if needed

















 


