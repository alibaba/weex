// module

define('@weex-component/bar1', function(require, exports, module) {;;
  module.exports.template = {
    type: 'container',
    children: [{
      type: 'text',
      attr: {
        value: 'bar1'
      }
    }, {
      type: 'bar2',
      id: 'bar2',
      component: true
    }]
  }

  ;
  module.exports.methods = {
    ready: function(isRefresh) {
      if (isRefresh) {
        this.$vm('bar2').ready(true)
      }
    }
  }

})

define('@weex-component/bar2', function(require, exports, module) {;;
  module.exports.template = {
    type: 'container',
    children: [{
      type: 'text',
      attr: {
        value: function() {
          return this.text
        }
      }
    }]
  }

  ;
  module.exports.data = function() {
    return {
      text: 'bar2'
    }
  }

  ;
  module.exports.methods = {
    ready: function(isRefresh) {
      if (isRefresh) {
        this.text = 'bar2-refresh'
      }
    }
  }


})

define('@weex-component/foo', function(require, exports, module) {

  ;
  module.exports.style = {}

  ;
  module.exports.template = {
    type: 'container',
    children: [{
      type: 'bar1',
      shown: function() {
        return this.showbar1
      },
      id: 'bar1',
      component: true
    }]
  }

  ;
  module.exports.data = function() {
    return {
      showbar1: false,
      ext: {
        showbar1: false
      }
    }
  }

  ;module.exports.methods = {
    refreshData: function(data) {
      for (var key in data) {
        this[key] = data[key]
      }
      this.ready(true)
    },
    ready: function(isRefresh) {
      var self = this
      this.showbar1 = this.ext.showbar1

      if (isRefresh) {
        if (this.showbar1) {
          this.$renderThen(() => {
            this.$vm('bar1').$on('hook:ready', function() {
              self.$vm('bar1').ready(true)
            })
          })
        }
      }
    }
  }

})

// require module

bootstrap('@weex-component/foo')
