/**
 * Navigator module
 */

// TODO: config.animated
export default {
  push: function (config, callback) {
    window.location.href = config.url
    callback && callback()
  },

  pop: function (config, callback) {
    window.history.back()
    callback && callback()
  }
}
