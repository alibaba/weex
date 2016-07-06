# Example Guide

## Add an example

* Add a file `newExample.we` copied from [template](./template.we) with [UI Gallery](#ui-gallery) (recommended).
* In [index.we](./index.we), add an item `{name: 'newExample', title: 'New Example'}` for array `data.cases`

## Rule

0. File name is dash (`-`) separated words, and each word is lower case, e.g. `index.we`, `style-demo.we`
0. ***DO NOT*** use [builtin components](../doc/components) name as file name, it may fail to run. 

## UI Gallery

> Inspired by Bootstrap.

We import a simple UI Gallery for a consistent UI style. See [UI Gallery Example](./showcase/ui.we) for details.

<img src="http://gtms04.alicdn.com/tps/i4/TB1_v6FMpXXXXXfXXXX7XWpVpXX-278-519.gif" width="160" /> <img src="http://gtms03.alicdn.com/tps/i3/TB13LTOMpXXXXceXXXXIxc4RpXX-944-1316.png" width="214" />

Reference: https://www.npmjs.com/package/weex-components
