import toast from './toast'
import Alert from './alert'
import Confirm from './confirm'
import Prompt from './prompt'

// TODO: rewrite the modal styles
export default {

  // duration: default is 0.8 seconds.
  toast: function (config) {
    toast.push(config.message, config.duration)
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - callback
  alert: function (config, callback) {
    config.callback = function () {
      callback && callback()
    }
    new Alert(config).show()
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  confirm: function (config, callback) {
    config.callback = function (val) {
      callback && callback(val)
    }
    new Confirm(config).show()
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  prompt: function (config, callback) {
    config.callback = function (val) {
      callback && callback(val)
    }
    new Prompt(config).show()
  }
}
