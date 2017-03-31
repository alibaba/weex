'use strict'

import scroll from 'scroll-to'

let camelToKebab, appendStyle

const dom = {

  /**
   * createBody: create root component
   * @param  {object} element
   *    container|listview|scrollview
   * @return {[type]}      [description]
   */
  createBody: function (element) {
    const componentManager = this.getComponentManager()
    element.instanceId = componentManager.instanceId
    return componentManager.createBody(element)
  },

  addElement: function (parentRef, element, index) {
    const componentManager = this.getComponentManager()
    element.instanceId = componentManager.instanceId
    return componentManager.addElement(parentRef, element, index)
  },

  removeElement: function (ref) {
    const componentManager = this.getComponentManager()
    return componentManager.removeElement(ref)
  },

  moveElement: function (ref, parentRef, index) {
    const componentManager = this.getComponentManager()
    return componentManager.moveElement(ref, parentRef, index)
  },

  addEvent: function (ref, type) {
    const componentManager = this.getComponentManager()
    return componentManager.addEvent(ref, type)
  },

  removeEvent: function (ref, type) {
    const componentManager = this.getComponentManager()
    return componentManager.removeEvent(ref, type)
  },

  /**
   * updateAttrs: update attributes of component
   * @param  {string} ref
   * @param  {obj} attr
   */
  updateAttrs: function (ref, attr) {
    const componentManager = this.getComponentManager()
    return componentManager.updateAttrs(ref, attr)
  },

  /**
   * updateStyle: udpate style of component
   * @param {string} ref
   * @param {obj} style
   */
  updateStyle: function (ref, style) {
    const componentManager = this.getComponentManager()
    return componentManager.updateStyle(ref, style)
  },

  /**
   * scrollToElement
   * @param  {string} ref
   * @param  {obj} options {offset:Number}
   *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
   */
  scrollToElement: function (ref, options) {
    !options && (options = {})
    const offset = Number(options.offset) || 0
    const elem = this.getComponentManager().getComponent(ref)
    if (!elem) {
      return console.error(`[h5-render] component of ref ${ref} doesn't exist.`)
    }
    const parentScroller = elem.getParentScroller()
    if (parentScroller) {
      parentScroller.scroller.scrollToElement(elem.node, true, offset)
    }
    else {
      const offsetTop = elem.node.getBoundingClientRect().top
          + document.body.scrollTop
      const tween = scroll(0, offsetTop + offset, options)
      tween.on('end', function () {
        console.log('scroll end.')
      })
    }
  },

  /**
   * getComponentRect
   * @param {string} ref
   * @param {function} callbackId
   */
  getComponentRect: function (ref, callbackId) {
    const info = { result: false }

    if (ref && ref === 'viewport') {
      info.result = true
      info.size = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        top: 0,
        left: 0,
        right: document.documentElement.clientWidth,
        bottom: document.documentElement.clientHeight
      }
    }
    else {
      const elem = this.getComponentManager().getComponent(ref)
      if (elem && elem.node) {
        info.result = true
        info.size = elem.node.getBoundingClientRect()
      }
    }

    const message = info.result ? info : {
      result: false,
      errMsg: 'Illegal parameter'
    }
    this.sender.performCallback(callbackId, message)
    return message
  },

  /**
   * for adding fontFace
   * @param {string} key fontFace
   * @param {object} styles rules
   */
  addRule: function (key, styles) {
    key = camelToKebab(key)
    let stylesText = ''
    for (const k in styles) {
      if (styles.hasOwnProperty(k)) {
        stylesText += camelToKebab(k) + ':' + styles[k] + ';'
      }
    }
    const styleText = `@${key}{${stylesText}}`
    appendStyle(styleText, 'dom-added-rules')
  },

  createFinish (callback) {
    return this.getComponentManager().createFinish()
  },

  updateFinish (callback) {
    return this.getComponentManager().updateFinish()
  },

  refreshFinish (callback) {
    return this.getComponentManager().refreshFinish()
  }
}

const meta = {
  dom: [{
    name: 'createBody',
    args: ['object']
  }, {
    name: 'addElement',
    args: ['string', 'object', 'number']
  }, {
    name: 'removeElement',
    args: ['string']
  }, {
    name: 'moveElement',
    args: ['string', 'string', 'number']
  }, {
    name: 'addEvent',
    args: ['string', 'string']
  }, {
    name: 'removeEvent',
    args: ['string', 'string']
  }, {
    name: 'updateAttrs',
    args: ['string', 'object']
  }, {
    name: 'updateStyle',
    args: ['string', 'object']
  }, {
    name: 'createFinish',
    args: []
  }, {
    name: 'updateFinish',
    args: []
  }, {
    name: 'refreshFinish',
    args: []
  }, {
    name: 'scrollToElement',
    args: ['string', 'object']
  }, {
    name: 'getComponentRect',
    args: ['string', 'function']
  }, {
    name: 'addRule',
    args: ['string', 'object']
  }]
}

export default {
  init: function (Weex) {
    camelToKebab = Weex.utils.camelToKebab
    appendStyle = Weex.utils.appendStyle
    Weex.registerApiModule('dom', dom, meta)
  }
}
