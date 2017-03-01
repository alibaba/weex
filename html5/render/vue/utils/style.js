import { normalize } from './flex'

/**
 * remove comments from a cssText.
 */
export function trimComment (cssText) {
  return cssText.replace(/(?:\/\*)[^*]*\*\//g, '')
}

/**
 * add flex prefixes for compatibility conisderation.
 */
export function normalizeStyles (style) {
  return normalize(style)
}

export function supportSticky () {
  const element = window.document.createElement('div')
  const elementStyle = element.style
  elementStyle.cssText = 'position:-webkit-sticky;position:sticky;'
  return elementStyle.position.indexOf('sticky') !== -1
}
