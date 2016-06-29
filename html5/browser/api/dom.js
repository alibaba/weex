'use strict'

// const FrameUpdater = require('../frameUpdater')
// const Component = require('../components/component')
const scroll = require('scroll-to')
// const config = require('../config')
const logger = require('../logger')

const dom = {

  /**
   * createBody: create root component
   * @param  {object} element
   *    container|listview|scrollview
   * @return {[type]}      [description]
   */
  createBody: function (element) {
    const componentManager = this.getComponentManager()
    element.scale = this.scale
    element.instanceId = componentManager.instanceId
    return componentManager.createBody(element)
  },

  addElement: function (parentRef, element, index) {
    const componentManager = this.getComponentManager()
    element.scale = this.scale
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

  createFinish: function () {
    // TODO
    // FrameUpdater.pause()
  },

  refreshFinish: function () {
    // TODO
  },

  /**
   * scrollToElement
   * @param  {string} ref
   * @param  {obj} options {offset:Number}
   *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
   */
  scrollToElement: function (ref, options) {
    !options && (options = {})
    const offset = (Number(options.offset) || 0) * this.scale
    const componentManager = this.getComponentManager()
    const elem = componentManager.getElementByRef(ref)
    if (!elem) {
      return logger.error('component of ref ' + ref + ' doesn\'t exist.')
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
        logger.log('scroll end.')
      })
    }
  }

}

dom._meta = {
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
    name: 'refreshFinish',
    args: []
  }, {
    name: 'scrollToElement',
    args: ['string', 'object']
  }]
}

module.exports = dom
