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
    return driver
      .initDriver()
      .wGet("index.js")
      .sleep(1000);
  });


  it('#1 Index', () => {
    return driver
    .textOfXPath("//div/text[1]")
    .then((text)=>{
      assert.equal(text.description,"hello world.")
    })
  })

  it('#2 Click Button', () => {
    return driver
    .wElement("//div/text[3]")
    .click()
    .textOfXPath("//div/text[2]")
    .then((text)=>{
      assert.equal(text.description,"btn click.")
    })
  })

  it('#2 Input Blur', () => {
    return driver
    .wElement("//div/input")
    .click()
    .wElement("//div/text[4]")
    .click()
    .textOfXPath("//div/text[2]")
    .then((text)=>{
      assert.equal(text.description,"input blur.")
    })
  })

  
});
