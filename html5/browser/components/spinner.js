/* global CSSRule */

'use strict'

const Atomic = require('./atomic')
const utils = require('../utils')

require('../styles/spinner.css')

function Spinner (data) {
  Atomic.call(this, data)
}

Spinner.prototype = Object.create(Atomic.prototype)

Spinner.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-container', 'weex-spinner-wrap')
  this.spinner = document.createElement('div')
  this.spinner.classList.add('weex-element', 'weex-spinner')
  node.appendChild(this.spinner)
  return node
}

Spinner.prototype.updateStyle = function (style) {
  Atomic.prototype.updateStyle.call(this, style)
  if (style && style.color) {
    this.setKeyframeColor(utils.getRgb(this.node.style.color))
  }
}

Spinner.prototype.getStyleSheet = function () {
  if (this.styleSheet) {
    return
  }
  const styles = document.styleSheets
  let i, l, j, m
  /* eslint-disable no-labels */
  outer: for (i = 0, l = styles.length; i < l; i++) {
    const rules = styles[i].rules
    for (j = 0, m = rules.length; j < m; j++) {
      const item = rules.item(j)
      if (
        (item.type === CSSRule.KEYFRAMES_RULE
          || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
        && item.name === 'spinner') {
        break outer
      }
    }
  }
  /* eslint-enable no-labels */
  this.styleSheet = styles[i]
}

Spinner.prototype.setKeyframeColor = function (val) {
  this.getStyleSheet()
  const keyframeRules = this.computeKeyFrameRules(val)
  const rules = this.styleSheet.rules
  for (let i = 0, l = rules.length; i < l; i++) {
    const item = rules.item(i)
    if ((item.type === CSSRule.KEYFRAMES_RULE
          || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
        && item.name === 'spinner') {
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

Spinner.prototype.computeKeyFrameRules = function (rgb) {
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
    const tmpColorArr = utils.loopArray(colorArr, i, 'r')
    rules.push(scaleArr.map(function (scaleStr, i) {
      return scaleStr + ' ' + tmpColorArr[i]
    }).join(', '))
  }
  return rules
}

module.exports = Spinner
