define('@weex-component/global-variable3', function (require, exports, module) {

  module.exports.template = { "type": "container" }

  module.exports.style = {}

  module.exports = {
    data: function() {
      return {
        lists: ['A', 'B', 'C']
      }
    },
    ready: function () {
      for (i = 0; i < this.lists.length; ++i) {
        console.log(this.lists[i])
      }
    }
  }

})

bootstrap('@weex-component/global-variable3')
