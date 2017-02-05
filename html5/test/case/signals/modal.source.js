define('@weex-component/modal', function (require, exports, module) {

;
  var modal = require('@weex-module/modal')
  module.exports = {
    data: function () {
      return {
        x: 'foo'
      }
    },
    created: function () {
      var message = 'Here is a message for you!'
      var okTitle = 'OK'
      modal.alert({
        message: message,
        okTitle: okTitle
      }, function() {
        this.x = 'bar'
      }.bind(this))
    }
  }


;module.exports.template = {
  "type": "div",
  "children": [
    {
      "type": "text",
      "attr": {
        "value": function () {
          return this.x
        }
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/modal')
