---
title: Common Attribute
type: references
order: 1.5
version: 0.10
---

# Common Attribute

Attributes provide additional information about weex tags. All weex tags can have attributes, attributes are always specified in the start tag and usually come in name/value pairs like: name="value". Mustache can be used inside a value. 
All of weex tags have the following attributes：  

## id

Specifies a unique id for an element in `<template>` scope. With `id` attribute you can easily refer a weex tag.    

```html
<div id="logo"></div>
<div id="item-{{index}}"></div>
```     

## style    

Specifies an inline style for an element.    

```html
<div style="width: 200; height: 200"></div>
<div style="padding: {{x}}; margin: 0"></div>
```     

## class    

Specifies one or more classnames for an element (refers to a class in a style sheet).    

```html
<div class="button"></div>
<div class="button {{btnStatus}}"></div>
```    

## repeat    

We can use the `repeat` attribute to render a list of items based on an array. The `repeat` attribute has a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an alias for the array element being iterated on.     

```html
<div repeat={{list}}></div>
<div repeat={{item in list}}></div>
```    

## if

Provide a boolean value to decide whether or not to display current tag.    

```html
<div if="true"></div>
<div if="{{opened}}"></div>
<div if="{{direction === 'row'}}"></div>
```    

## append

By providing the value of tree or node, it determines the progress of rendering.    

```html
<div append="tree/node"></div>
```    

## Event Handing (on...)

Register event handlers on weex tag.

```html
<div onclick="openDetail"></div>
<div onappear="{{loadMore}}"></div>
```    

## Notes!

Weex is basically following [HTML attribute](https://en.wikipedia.org/wiki/HTML_attribute) naming rule, so please **do not use CamelCase** in your attribute, **kebab-case** with "-" as delimiter is much better.
