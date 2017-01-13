'use strict';

var _ = require('macaca-utils');
var weex = require('./weex.js')()
var assert = require('chai').assert
var wd = weex.wd

describe('weex mobile index', function () {
  this.timeout(5 * 60 * 1000);
  var driver = wd.initPromiseChain();
  var windowSize = driver.getWindowSize()
  driver.configureHttp({
    timeout: 100000
  });

  before(function () {
    try {
      return driver
        .initDriver()
        .wGet("index.js")
        .catch()
        .then()
        .sleep(2000);
    } catch (error) {
    }

  });


  it('#1 Index', () => {
    return driver
      .textOfXPath("//div[1]/text[1]")
      .then((text) => {
        assert.equal(text, "hello world.")
      })
  })


  it('#2 Click Button', () => {
    return driver
      .wElement("//div[1]/text[3]")
      .click()
      .textOfXPath("//div[1]/text[2]")
      .then((text) => {
        assert.equal(text, "btn click.")
      })
  })

  it('#2 Input Blur', () => {
    return driver
      .wElement("//div[1]/input")
      .click()
      .wElement("//div[1]/text[4]")
      .click()
      .textOfXPath("//div[1]/text[2]")
      .then((text) => {
        assert.equal(text, "input blur.")
      })
  })

});
