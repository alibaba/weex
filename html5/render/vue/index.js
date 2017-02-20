import semver from 'semver'
import { setViewport } from './env'
import * as components from './components'
import styleMixin from './mixins/style'

function install (Vue) {
  setViewport()

  Vue.prototype.$getConfig = () => {
    console.warn('[Vue Render] "this.$getConfig" is deprecated, please use "weex.config" instead.')
    return window.weex.config
  }

  const htmlRegex = /^html:/i
  Vue.config.isReservedTag = tag => htmlRegex.test(tag)
  Vue.config.parsePlatformTagName = tag => tag.replace(htmlRegex, '')

  for (const name in components) {
    Vue.component(name, components[name])
  }

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    if (semver.lt(Vue.version, '2.1.5')) {
      console.warn(`[Vue Render] The version of Vue should be ` +
        `greater than 2.1.5, current is ${Vue.version}.`)
    }
    console.info(`[Vue Render] Registered components: `
      + `[${Object.keys(components).join(', ')}].`)

    // merge styles to inline
    Vue.mixin(styleMixin)
  }
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
