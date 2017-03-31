'use strict'

import { extend, camelToKebab } from '../../utils'
import { getFilters } from './valueFilter'

let pseudoId = 0
function getPseudoId () {
  return '' + (pseudoId++)
}

export function create (nodeType) {
  return document.createElement(nodeType || 'div')
}

export function createChildren () {
  const children = this.data.children
  const parentRef = this.data.ref
  const componentManager = this.getComponentManager()
  if (children && children.length) {
    const fragment = document.createDocumentFragment()
    let isFlex = false
    for (let i = 0; i < children.length; i++) {
      children[i].instanceId = this.data.instanceId
      const child = componentManager.createElement(children[i])
      fragment.appendChild(child.node)
      child.parentRef = parentRef
      if (!isFlex
        && child.data.style
        && child.data.style.hasOwnProperty('flex')
      ) {
        isFlex = true
      }
    }
    this.node.appendChild(fragment)
  }
}

export function appendChild (data) {
  const children = this.data.children
  const componentManager = this.getComponentManager()
  const child = componentManager.createElement(data)
  this.node.appendChild(child.node)
  // update this.data.children
  if (!children || !children.length) {
    this.data.children = [data]
  }
  else {
    children.push(data)
  }
  return child
}

export function insertBefore (child, before) {
  const children = this.data.children
  let i = 0
  let l
  let isAppend = false

  // update this.data.children
  if (!children || !children.length || !before) {
    isAppend = true
  }
  else {
    for (l = children.length; i < l; i++) {
      if (children[i].ref === before.data.ref) {
        break
      }
    }
    if (i === l) {
      isAppend = true
    }
  }

  if (isAppend) {
    this.node.appendChild(child.node)
    children.push(child.data)
  }
  else {
    if (before.fixedPlaceholder) {
      this.node.insertBefore(child.node, before.fixedPlaceholder)
    }
    else if (before.stickyPlaceholder) {
      this.node.insertBefore(child.node, before.stickyPlaceholder)
    }
    else {
      this.node.insertBefore(child.node, before.node)
    }
    children.splice(i, 0, child.data)
  }
}

export function removeChild (child) {
  const children = this.data.children
  // remove from this.data.children
  let i = 0
  const componentManager = this.getComponentManager()
  if (children && children.length) {
    let l
    for (l = children.length; i < l; i++) {
      if (children[i].ref === child.data.ref) {
        break
      }
    }
    if (i < l) {
      children.splice(i, 1)
    }
  }
  // remove from componentMap recursively
  componentManager.removeComponent(child.data.ref)
  child.unsetPosition()
  child.node.parentNode.removeChild(child.node)
}

export function updateAttrs (attrs) {
  // Note：attr must be injected into the dom element because
  // it will be accessed from the outside developer by event.target.attr.
  if (!this.node.attr) {
    this.node.attr = {}
  }
  for (const key in attrs) {
    const value = attrs[key]
    const attrSetter = this.attr[key]
    if (typeof attrSetter === 'function') {
      attrSetter.call(this, value)
    }
    else {
      if (typeof value === 'boolean') {
        this.node[key] = value
      }
      else {
        this.node.setAttribute(key, value)
      }
      this.node.attr[key] = value
    }
  }
}

export function updateStyle (style) {
  const pseudoData = {}
  for (const key in style) {
    let value = style[key]
    const pseudoClassReg = /^([^:]+)((?::[^:]+)+)/
    const match = key.match(pseudoClassReg)
    let styleName, pseudoName
    if (match) {
      styleName = match[1]
      pseudoName = match[2]
    }
    else {
      styleName = key
    }

    const styleSetter = this.style[styleName]
    if (typeof styleSetter === 'function') {
      styleSetter.call(this, value)
      continue
    }
    const parser = getFilters(styleName)[typeof value]
    if (typeof parser === 'function') {
      value = parser(value)
    }

    if (!match) {
      this.node.style[styleName] = value
      continue
    }

    if (pseudoData[pseudoName]) {
      pseudoData[pseudoName][styleName] = value
    }
    else {
      pseudoData[pseudoName] = { [styleName]: value }
    }
  }

  if (Object.keys(pseudoData).length > 0) {
    processPseudoClass(this, 'data-pseudo-id', pseudoData)
  }
}

// modify styles of pseudo class.
function processPseudoClass (component, idName, pseudoData) {
  let pseudoId = component.node.getAttribute('data-pseudo-id')

  function getCssText (selector, rulesObj) {
    // TODO: must process vendors if needed.
    // !important is needed since the style rules is inline for most components.
    const rulesText = Object.keys(rulesObj).map(key => `${camelToKebab(key)}:${rulesObj[key]}!important;`).join('')
    return `${selector}{${rulesText}}`
  }

  if (!pseudoId) {
    pseudoId = getPseudoId()
    component.node.setAttribute('data-pseudo-id', pseudoId)
    const style = document.createElement('style')
    style.type = 'text/css'
    style.setAttribute('data-pseudo-id', pseudoId)
    document.getElementsByTagName('head')[0].appendChild(style)
    const cssText = Object.keys(pseudoData).map(pseudo => {
      const rules = pseudoData[pseudo]
      return getCssText(`[data-pseudo-id="${pseudoId}"]${pseudo}`, rules)
    }).join('')
    return style.appendChild(document.createTextNode(cssText))
  }

  const styleSheets = Array.prototype.slice.call(document.styleSheets || [])
    .filter(style => style.ownerNode.getAttribute('data-pseudo-id') === pseudoId)
  if (!styleSheets || styleSheets.length <= 0) {
    return
  }
  const styleSheet = styleSheet[0]
  const rules = styleSheet.cssRules || styleSheet.rules
  Object.keys(pseudoData).forEach(pseudo => {
    const data = pseudoData[pseudo]
    const selector = `[data-pseudo-id="${pseudoId}"]${pseudo}`
    const res = Array.prototype.slice.call(rules).reduce((res, rule, idx) => {
      (rule.selectorText === selector) && (res.idx = idx)
      return res
    }, { idx: -1 })
    const { idx } = res
    if (idx !== -1) {
      const pseudoRule = rules[idx]
      const match = pseudoRule.cssText.match(/^[^{]+\{([^}]+)\}/)
      if (match && match[1]) {
        const rulesData = match[1].split(';').reduce((res, str) => {
          const match = str.match(/(\S+)\s*:\s*(\S+)/)
          if (match && match[1] && match[2]) {
            res[match[1]] = match[2]
          }
          return res
        }, {})
        extend(rulesData, data)
        Object.keys(rulesData).forEach(rule => {
          if (!rulesData[rule]) { delete rulesData[rule] }
        })
        styleSheet.deleteRule(idx)
        styleSheet.insertRule(getCssText(selector, rulesData), rules.length - 1)
      }
    }
    else {
      styleSheet.insertRule(getCssText(selector, data), rules.length)
    }
  })
}

export function bindEvents (evts) {
  const self = this
  const weexInstance = this.getWeexInstance()
  evts.map(function (evt) {
    const func = self.event[evt] || {}
    const setter = func.setter
    if (setter) {
      self.node.addEventListener(evt, setter)
      return
    }
    const sender = weexInstance.sender
    const listener = function (e) {
      // do stop bubbling.
      // do not prevent default, otherwise the touchstart
      // event will no longer trigger a click event
      if (e._alreadyTriggered) {
        return
      }
      e._alreadyTriggered = true
      const event = extend({}, e)
      event.target = self.data
      sender.fireEvent(self.data.ref, evt, {
        extra: func.extra && func.extra.bind(self),
        updator: func.updator && func.updator.bind(self)
      }, event)
    }
    self.node.addEventListener(evt, listener, false, false)
    let listeners = self._listeners
    if (!listeners) {
      listeners = self._listeners = {}
      self.node._listeners = {}
    }
    listeners[evt] = listener
    self.node._listeners[evt] = listener
  })
}

export function unbindEvents (evts) {
  const self = this
  evts.map(function (evt) {
    const listener = this._listeners
    if (listener) {
      self.node.removeEventListener(evt, listener)
      self._listeners[evt] = null
      self.node._listeners[evt] = null
    }
  })
}
