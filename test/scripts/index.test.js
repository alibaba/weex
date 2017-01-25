'use strict';

var _ = require('macaca-utils');
var assert = require('chai').assert
var wd = require('weex-wd')
var path = require('path');
var os = require('os');

function getIpAddress(){
    let ifs = os.networkInterfaces()
    let addresses = ['127.0.0.1'];
    for( var i in ifs){
        let interfaces = ifs[i];
        interfaces.forEach((face)=>{
            if(!face.internal && face.family == 'IPv4'){
                addresses.unshift(face.address);
            }
        })
    }
    return addresses[0];
}

describe('weex mobile index', function () {
  this.timeout(1 * 30 * 1000);

  var driver = wd({
        platformName: 'Android',
        app: path.join(__dirname, '..', `../android/playground/app/build/outputs/apk/playground.apk`)
  }).initPromiseChain();

  var windowSize = driver.getWindowSize();

  driver.configureHttp({
    timeout: 100000
  });

  before(function () {
    return driver
      .initDriver()
      .get('wxpage://' + getIpAddress() +':12581/index.js')
      .sleep(1000);
  });


  it('#1 Index', () => {
    return driver
    .elementByXPath('//div/text[1]')
    .text()
    .then((text)=>{
      assert.equal(text.description,'hello world.')
    })
  })

  it('#2 Click Button', () => {
    return driver
    .elementByXPath('//div/text[3]')
    .click()
    .elementByXPath('//div/text[2]')
    .text()
    .then((text)=>{
      assert.equal(text.description,'btn click.')
    })
  })

  it('#2 Input Blur', () => {
    return driver
    .elementByXPath('//div/input')
    .click()
    .elementByXPath('//div/text[4]')
    .click()
    .elementByXPath('//div/text[2]')
    .text()
    .then((text)=>{
      assert.equal(text.description,'input blur.')
    })
  })

  
});
