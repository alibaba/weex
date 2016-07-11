'use strict'

// Flexbox polyfill
const flexboxSetters = (function () {
  const BOX_ALIGN = {
    stretch: 'stretch',
    'flex-start': 'start',
    'flex-end': 'end',
    center: 'center'
  }
  const BOX_ORIENT = {
    row: 'horizontal',
    column: 'vertical'
  }
  const BOX_PACK = {
    'flex-start': 'start',
    'flex-end': 'end',
    center: 'center',
    'space-between': 'justify',
    'space-around': 'justify' // Just same as `space-between`
  }
  return {
    flex: function (value) {
      this.node.style.webkitBoxFlex = value
      this.node.style.webkitFlex = value
      this.node.style.flex = value
    },
    alignItems: function (value) {
      this.node.style.webkitBoxAlign = BOX_ALIGN[value]
      this.node.style.webkitAlignItems = value
      this.node.style.alignItems = value
    },
    alignSelf: function (value) {
      this.node.style.webkitAlignSelf = value
      this.node.style.alignSelf = value
    },
    flexDirection: function (value) {
      this.node.style.webkitBoxOrient = BOX_ORIENT[value]
      this.node.style.webkitFlexDirection = value
      this.node.style.flexDirection = value
    },
    justifyContent: function (value) {
      this.node.style.webkitBoxPack = BOX_PACK[value]
      this.node.style.webkitJustifyContent = value
      this.node.style.justifyContent = value
    }
  }
})()

module.exports = flexboxSetters
