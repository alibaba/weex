const Vues = [
  require('./vender/vue-2.0.0.js'),
  require('./vender/vue-2.1.0.js')
]

/**
 * Describe tests for multiple versions of Vue.
 */
export function multiDescribe (title, fn) {
  return describe(title, () => {
    Vues.forEach(Vue => {
      let components = {}
      Vue.config.isReservedTag = function () { return false }
      describe(`Vue ${Vue.version}`, () => fn(Vue, {
        register (name, component) {
          components[name] = component
        },
        reset () {
          components = {}
        },
        createVm (options = {}) {
          options.components = components
          return new Vue(options).$mount()
        },
        compile (template) {
          return this.createVm({ template })
        }
      }))
    })
  })
}
