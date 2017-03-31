'use strict'

const boxAlignMap = {
  stretch: 'stretch',
  'flex-start': 'start',
  'flex-end': 'end',
  center: 'center'
}

const boxOrientMap = {
  row: 'horizontal',
  column: 'vertical'
}

const boxPackMap = {
  'flex-start': 'start',
  'flex-end': 'end',
  center: 'center',
  'space-between': 'justify',
  'space-around': 'justify' // Just same as `space-between`
}

export default {
  style: {
    flex (value) {
      this.node.style.webkitBoxFlex = value
      this.node.style.webkitFlex = value
      this.node.style.flex = value
    },

    alignItems (value) {
      this.node.style.webkitBoxAlign = boxAlignMap[value]
      this.node.style.webkitAlignItems = value
      this.node.style.alignItems = value
    },

    alignSelf (value) {
      this.node.style.webkitAlignSelf = value
      this.node.style.alignSelf = value
    },

    flexDirection (value) {
      this.node.style.webkitBoxOrient = boxOrientMap[value]
      this.node.style.webkitFlexDirection = value
      this.node.style.flexDirection = value
    },

    justifyContent (value) {
      this.node.style.webkitBoxPack = boxPackMap[value]
      this.node.style.webkitJustifyContent = value
      this.node.style.justifyContent = value
    }
  }
}

/* eslint-disable */
;
/* eslint-enable */
