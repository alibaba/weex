'use strict';

var _ = require('macaca-utils');
var assert = require('chai').assert
var wd = require('weex-wd')
var path = require('path');
var os = require('os');
var util = require("./util.js");

describe('weex mobile index', function () {
  this.timeout(util.getTimeoutMills());
  var driver = wd(util.getConfig()).initPromiseChain();
  driver.configureHttp({
    timeout: 100000
  });

  before(function () {
    return driver
      .initDriver()
      .get('wxpage://' + util.getDeviceHost() +'/dom-operation.js')
      .waitForElementByXPath('//div/text[2]',util.getGETActionWaitTimeMills(),1000);
  });

  after(function () {
      return driver
      .sleep(1000)
      .quit()
  })

  it('#1 Repeat', ()=>{
    return driver
    .elementsByXPath("//div/div[2]/div")
    .then((elems)=>{
        assert.equal(elems.length,5)
    })
    .elementByXPath("//div/div[1]/text")
    .then((noexist)=>{
        assert.equal(noexist,undefined)
    })
  })

  it('#2 Add new item', ()=>{
    return driver
    .elementByXPath("//div/text[1]")
    .click()
    .sleep(1000)
    .elementsByXPath("//div/div[2]/div")
    .then((elems)=>{
        assert.equal(elems.length,6)
    })
    .elementByXPath("//div/div[1]/text")
    .then((existed)=>{
        assert.notEqual(existed,undefined)
    })
  })

  it('#2 Remove item', ()=>{
    return driver
    .elementByXPath("//div/text[2]")
    .click()
    .sleep(1000)
    .elementsByXPath("//div/div[2]/div")
    .then((elems)=>{
        assert.equal(elems.length,5)
    })
    .elementByXPath("//div/div[1]/text")
    .then((noexist)=>{
        assert.equal(noexist,undefined)
    })
  })

  
});
