/* global CSSRule */

'use strict'

import './spinner.css'

let loopArray, getRgb

function getStyleSheet (spinner) {
  if (spinner.styleSheet) {
    return
  }
  const styles = document.styleSheets
  let i, l, j, m
  /* eslint-disable no-labels */
  outer: for (i = 0, l = styles.length; i < l; i++) {
    const rules = styles[i].rules
    if (!rules) {
      continue
    }
    for (j = 0, m = rules.length; j < m; j++) {
      const item = rules.item(j)
      if (
        (item.type === CSSRule.KEYFRAMES_RULE
          || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
        && item.name === 'weex-spinner') {
        break outer
      }
    }
  }
  /* eslint-enable no-labels */
  spinner.styleSheet = styles[i]
}

function setKeyframeColor (spinner, val) {
  getStyleSheet(spinner)
  const keyframeRules = computeKeyFrameRules(val)
  const rules = spinner.styleSheet.rules
  for (let i = 0, l = rules.length; i < l; i++) {
    const item = rules.item(i)
    if ((item.type === CSSRule.KEYFRAMES_RULE
          || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
        && item.name === 'weex-spinner') {
      const cssRules = item.cssRules
      for (let j = 0, m = cssRules.length; j < m; j++) {
        const keyframe = cssRules[j]
        if (keyframe.type === CSSRule.KEYFRAME_RULE
          || keyframe.type === CSSRule.WEBKIT_KEYFRAME_RULE) {
          keyframe.style.boxShadow = keyframeRules[j]
        }
      }
    }
  }
}

function computeKeyFrameRules (rgb) {
  if (!rgb) {
    return
  }
  const scaleArr = [
    '0em -2.6em 0em 0em',
    '1.8em -1.8em 0 0em',
    '2.5em 0em 0 0em',
    '1.75em 1.75em 0 0em',
    '0em 2.5em 0 0em',
    '-1.8em 1.8em 0 0em',
    '-2.6em 0em 0 0em',
    '-1.8em -1.8em 0 0em']
  const colorArr = [
    '1',
    '0.2',
    '0.2',
    '0.2',
    '0.2',
    '0.2',
    '0.5',
    '0.7'].map(function (e) {
      return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + e + ')'
    })
  const rules = []
  for (let i = 0; i < scaleArr.length; i++) {
    const tmpColorArr = loopArray(colorArr, i, 'r')
    rules.push(scaleArr.map(function (scaleStr, i) {
      return scaleStr + ' ' + tmpColorArr[i]
    }).join(', '))
  }
  return rules
}

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container')
    node.classList.add('weex-spinner-wrap')
    this.spinner = document.createElement('div')
    this.spinner.classList.add('weex-element')
    this.spinner.classList.add('weex-spinner')
    node.appendChild(this.spinner)
    return node
  }
}

const style = {
  color: function (val) {
    const rgb = getRgb(val)
    if (!rgb) {
      return console.error('[web-render] invalid color value:', val)
    }
    setKeyframeColor(this, rgb)
  }
}

// Spinner.prototype.updateStyle = function (style) {
//   Atomic.prototype.updateStyle.call(this, style)
//   if (style && style.color) {
//     this.setKeyframeColor(global.weex.utils.getRgb(this.node.style.color))
//   }
// }

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend
  getRgb = Weex.utils.getRgb
  loopArray = Weex.utils.loopArray

  function Spinner (data) {
    Atomic.call(this, data)
  }
  Spinner.prototype = Object.create(Atomic.prototype)
  extend(Spinner.prototype, proto)
  extend(Spinner.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })

  Weex.registerComponent('spinner', Spinner)
  Weex.registerComponent('loading-indicator', Spinner)
}

export default { init }
