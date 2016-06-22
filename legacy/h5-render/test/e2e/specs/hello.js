var config = require('../testConfig.js')
var lib = require('../testLib.js')
var source = config.source['hello'].toString()

var DIV_LENGTH = 3

casper.test.begin('hello-test', 3, {

  setUp: function () {
    lib.globalInit(casper)
  },

  test: function (test) {

    casper.start(config.url)

    .then(function () {
      return this.evaluate(function (src) {
        init(src)
      }, source)
    })

    .then(function () {
      return casper.waitFor(function () {
        return this.evaluate(function (len) {
          return document.querySelectorAll('div').length === len
        }, DIV_LENGTH)
      }, undefined, undefined, config.timeout)
    })

    .then(function () {

      // #weex-root should be there
      test.assertTruthy(this.evaluate(function isWeexRootExist() {
        return !!document.querySelector('#weex-root')
      }), 'weex-root show.')

      // dom tree should have 3 div elements
      test.assertEvalEquals(function () {
        return document.querySelectorAll('div').length
      }, DIV_LENGTH, 'there are ' + DIV_LENGTH + ' divs.')

      // text content should be 'hello world'.
      test.assertTruthy(function () {
        return document.querySelector('#weex-root').textContent === 'Hello World.'
      })

    })

    .run(function () {
      test.done()
    })

  }

})

