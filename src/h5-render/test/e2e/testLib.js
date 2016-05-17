var lib = {

  globalInit: function (casper) {

    // get remote logs.
    // casper.on('remote.message', function (msg) {
    //   this.echo(msg)
    // })

    casper.on('page.initialized', function () {
      // sadly casperjs 1.1-beta3 hasn't support function.prototype.bind yet.
      // so polyfill must be added.
      this.evaluate(function () {
        var isFunction = function (o) {
          return typeof o == 'function'
        }

        var bind
        var slice = [].slice
        var proto = Function.prototype

        var featureMap = {
          'function-bind': 'bind'
        }

        function has(feature) {
          var prop = featureMap[feature]
          return isFunction(proto[prop])
        }

        // check for missing features
        if (!has('function-bind')) {
          // adapted from Mozilla Developer Network example at
          // 'https://developer.mozilla.org/en/JavaScript/'
          // + 'Reference/Global_Objects/Function/bind'
          bind = function bind(obj) {
            var args = slice.call(arguments, 1)
            var self = this
            var Nop = function () {}
            var bound = function () {
              return self.apply(
                  this instanceof Nop
                    ? this
                    : (obj || {})
                  , args.concat(slice.call(arguments)))
            }
            // Firefox cries sometimes if prototype is undefined
            Nop.prototype = this.prototype || {}
            bound.prototype = new Nop()
            return bound
          }
          proto.bind = bind
        }

      })
    })
  }
}

module.exports = lib
