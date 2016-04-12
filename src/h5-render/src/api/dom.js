'use strict'

var messageQueue = require('../messageQueue')
var FrameUpdater = require('../frameUpdater')
var Component = require('../components/component')
var scroll = require('scroll-to')
var config = require('../config')
// var Weex = require('../weex')

var dom = {

  /**
   * createBody: create root component
   * @param  {object} element
   *    container|listview|scrollview
   * @return {[type]}      [description]
   */
  createBody: function (element) {
    var componentManager = this.getComponentManager()
    element.scale = this.scale
    element.instanceId = componentManager.instanceId
    return componentManager.createBody(element)
  },

  addElement: function (parentRef, element, index) {
    var componentManager = this.getComponentManager()
    element.scale = this.scale
    element.instanceId = componentManager.instanceId
    return componentManager.addElement(parentRef, element, index)
  },

  removeElement: function (ref) {
    var componentManager = this.getComponentManager()
    return componentManager.removeElement(ref)
  },

  moveElement: function (ref, parentRef, index) {
    var componentManager = this.getComponentManager()
    return componentManager.moveElement(ref, parentRef, index)
  },

  addEvent: function (ref, type) {
    var componentManager = this.getComponentManager()
    return componentManager.addEvent(ref, type)
  },

  removeEvent: function (ref, type) {
    var componentManager = this.getComponentManager()
    return componentManager.removeEvent(ref, type)
  },

  /**
   * updateAttrs: update attributes of component
   * @param  {string} ref
   * @param  {obj} attr
   */
  updateAttrs: function (ref, attr) {
    var componentManager = this.getComponentManager()
    return componentManager.updateAttrs(ref, attr)
  },

  /**
   * updateStyle: udpate style of component
   * @param {string} ref
   * @param {obj} style
   */
  updateStyle: function (ref, style) {
    var componentManager = this.getComponentManager()
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
    var componentManager = this.getComponentManager()
    var elem = componentManager.getElementByRef(ref)
    if (elem) {
      var offsetTop = elem.node.getBoundingClientRect().top
          + document.body.scrollTop
      var offset = (Number(options.offset) || 0) * config.scale
      var tween = scroll(0, offsetTop + offset, options)
      // tween.on('end', function () {
      // })
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
