import { extend } from '../utils'
// import { validateStyles } from '../validator'

// let warned = false

function getHeadStyleMap () {
  return Array.from(document.styleSheets)
    .reduce((pre, styleSheet) => {
      const rules = styleSheet.rules || styleSheet.cssRules
      Array.from(rules).forEach(rule => {
        const selector = rule.selectorText || ''
        const match = selector.match(/^\.([^.]+)$/)
        if (match && match[1]) {
          pre[match[1]] = rule.cssText.match(/{([^}]+)}/)[1].trim().split(';')
            .reduce((styleObj, statement) => {
              statement = statement.trim()
              if (statement) {
                const resArr = statement.split(':').map((part) => part.trim())
                styleObj[resArr[0]] = resArr[1]
              }
              return styleObj
            }, {})
        }
      })
      return pre
    }, {})
}

// function getWarnText (prop) {
//   return `[Vue Rneder] "${prop}" is not a standard CSS property,`
//     + 'it may not support very well on weex vue render.'
// }

// function normalize (styles) {
//   const realStyle = {}
//   for (const key in styles) {
//     let value = styles[key]

//     // TODO: add more reliable check
//     if (typeof value === 'number') {
//       value += 'px'
//     }

//     // warn for unsupported properties
//     switch (key) {
//       case 'lines':
//       case 'item-color':
//       case 'itemColor':
//       case 'item-selected-color':
//       case 'itemSelectedColor':
//       case 'item-size':
//       case 'itemSize': console.warn(getWarnText(key)); break
//     }

//     realStyle[key] = value
//   }
//   return realStyle
// }

// function getStyleMap (component) {
//   if (component && component.$vnode && component.$vnode.context) {
//     const $options = component.$vnode.context.$options
//     if ($options && $options.style) {
//       if (!warned) {
//         warned = true
//         console.error('[Invalid Bundle Format] This bundle format is '
//           + 'generated for Android and iOS platform, '
//           + 'please use "vue-loader" to compile the ".vue" file on the web.')
//       }
//       return $options.style
//     }
//   }
// }

// function getStaticClass (component) {
//   if (component && component.$vnode && component.$vnode.data) {
//     const data = component.$vnode.data
//     return [].concat(data.staticClass, data.class)
//   }
// }

// function getComponentStyle (context) {
  // const styleMap = getStyleMap(context)
  // const staticClass = getStaticClass(context)

  // if (styleMap && Array.isArray(staticClass)) {
  //   const styles = staticClass.reduce((res, name) => {
  //     return extend(res, styleMap[name])
  //   }, {})

  //   return normalize(styles)
  // }
// }

// function mergeStyles (context) {
//   const styles = getComponentStyle(context)
//   if (context.$el && styles) {
//     validateStyles(context.$options && context.$options._componentTag, styles)
//     for (const key in styles) {
//       context.$el.style[key] = styles[key]
//     }
//   }
// }

export default {
  beforeCreate () {
    // get static class style map from document's styleSheets.
    if (!weex.styleMap) {
      weex.styleMap = getHeadStyleMap()
      Object.freeze(weex)
    }
  },
  // mounted () {
  //   console.log('call mounted: merged styles')
  //   mergeStyles(this)
  // },
  // beforeUpdate () {
  //   console.log('call beforeUpdate: merged styles')
  //   mergeStyles(this)
  // },

  methods: {
    prerender () {
      this.mergeStyles()
    },

    // get style from staticClass and staticStyle.
    getComponentStyle () {
      const style = {}
      const data = this.$vnode && this.$vnode.data || {}
      const staticStyle = data.staticStyle || {}
      const classNames = (data.staticClass || '').split(' ')

      // apply static class styles. This relies on getHeadStyleMap
      // being already triggered once in the hook beforeCreate.
      if (weex.styleMap) {
        classNames.forEach(className => {
          const styleObj = weex.styleMap[className] || {}
          extend(style, styleObj)
        })
      }

      // apply static inline styles.
      extend(style, staticStyle)

      return style
    },

    // merge static styles and static class styles into $vnode.data.mergedStyles.
    mergeStyles () {
      if (this.$vnode && this.$vnode.data) {
        this.$vnode.data.mergedStyle = this.getComponentStyle()
      }
    },

    getParentRect () {
      const parentElm = this.$options._parentElm
      return parentElm && parentElm.getBoundingClientRect()
    },

    getParentRectAsync (cb) {
      this.$nextTick(function () {
        return cb && cb.call(this, this.getParentRectSync())
      })
    }
  }
}
