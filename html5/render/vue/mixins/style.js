import { extend } from '../utils'
import { validateStyles } from '../validator'

let warned = false

function getWarnText (prop) {
  return `[Vue Rneder] "${prop}" is not a standard CSS property,`
    + 'it may not support very well on weex vue render.'
}

function normalize (styles) {
  const realStyle = {}
  for (const key in styles) {
    let value = styles[key]

    // TODO: add more reliable check
    if (typeof value === 'number') {
      value += 'px'
    }

    // warn for unsupported properties
    switch (key) {
      case 'lines':
      case 'item-color':
      case 'itemColor':
      case 'item-selected-color':
      case 'itemSelectedColor':
      case 'item-size':
      case 'itemSize': console.warn(getWarnText(key)); break
    }

    realStyle[key] = value
  }
  return realStyle
}

function getStyleMap (component) {
  if (component && component.$vnode && component.$vnode.context) {
    const $options = component.$vnode.context.$options
    if ($options && $options.style) {
      if (!warned) {
        warned = true
        console.error('[Invalid Bundle Format] This bundle format is '
          + 'generated for Android and iOS platform, '
          + 'please use "vue-loader" to compile the ".vue" file on the web.')
      }
      return $options.style
    }
  }
}

function getStaticClass (component) {
  if (component && component.$vnode && component.$vnode.data) {
    const data = component.$vnode.data
    return [].concat(data.staticClass, data.class)
  }
}

function getComponentStyle (context) {
  const styleMap = getStyleMap(context)
  const staticClass = getStaticClass(context)

  if (styleMap && Array.isArray(staticClass)) {
    const styles = staticClass.reduce((res, name) => {
      return extend(res, styleMap[name])
    }, {})

    return normalize(styles)
  }
}

function mergeStyles (context) {
  const styles = getComponentStyle(context)
  if (context.$el && styles) {
    validateStyles(context.$options && context.$options._componentTag, styles)
    for (const key in styles) {
      context.$el.style[key] = styles[key]
    }
  }
}

export default {
  mounted () {
    mergeStyles(this)
  },
  beforeUpdate () {
    mergeStyles(this)
  }
}
