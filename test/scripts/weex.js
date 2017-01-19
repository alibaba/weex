'use strict'

var path = require('path');
var os = require('os')
var _ = require('macaca-utils');
var xml2map = require('xml2map');
var mapFunc = require("./weex-node-map.js")

const NODE_PATTERN = /([a-z-]+)(\[(\d+)\])?/;

var platform = process.env.platform || 'android';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '10.0',
  deviceName: 'iPhone 6s Plus',
  platformName: 'iOS',
  reuse:2,
  app: path.join(__dirname, '..', 'app', `${platform}-app-WeexDemo.zip`)
};

var androidOpts = {
  platformName: 'Android',
  app: path.join(__dirname, '..', `../android/playground/app/build/outputs/apk/playground.apk`)
};

const isIOS = platform === 'ios';

function createDriver(scheme){
    let host = scheme+"://"+getIpAddress()+":12581";
    //TODO: IOS
    let xPathPrefix = "//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]";

    var wd = require('webdriver-client')(_.merge({},  isIOS? iOSOpts : androidOpts));

    wd.addPromiseChainMethod('wBack', function () {
        if (platform === 'ios') {
            return this.elementByName('back').sleep(1000).click().sleep(1000)
        }

        return this
            .back();
    });

    //Open weex page by scheme URL
    wd.addPromiseChainMethod('wGet',function(path){
        return this.get(host+"/"+path)
    })

    //Find element by weex dom xpath
    wd.addPromiseChainMethod('wElements',function(xpath){
        return this.elementsByXPath(mapXPath(xPathPrefix,xpath))
    })

    wd.addPromiseChainMethod('wElement',function(xpath){
        return this
        .elementsByXPath(mapXPath(xPathPrefix,xpath))
        .then((elems)=>{
            return elems[0]
        })
    })

    //Get element text locate by weex dom xpath
    wd.addPromiseChainMethod('textOfXPath', function(xpath) {
        if(isIOS){
            return this
            .elementsByXPath(mapXPath(xPathPrefix,xpath))
            .then((elems)=>{
                return elems[0]
            })
            .text();
        } else {
            return this
            .elementsByXPath(mapXPath(xPathPrefix,xpath))
            .then((elems)=>{
                return elems[0]
            })
            .getProperty('description')
        }
    })

    return wd
}

function mapXPath(xPathPrefix,xpath){
    let results = [xPathPrefix];
    let parts = xpath.split('/');
    parts.forEach((part)=>{
        if(!part || part.length==0){
            return 
        }
        let nodeParts = part.match(NODE_PATTERN);
        if(!nodeParts){
            return
        }
        let pos = nodeParts[3]===undefined?'':"["+nodeParts[3]+"]";
        console.log("parts:"+nodeParts);
        console.log("pos:"+pos);
        results.push(mapFunc(nodeParts[1])+pos);
    });
    return results.join('/')
}

function getIpAddress(){
    let ifs = os.networkInterfaces()
    let addresses = ["127.0.0.1"];
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



module.exports = function(options){
    options = options || {}

    let scheme = options.scheme || "wxpage"
    console.log(scheme)

    return {
        "wd":createDriver(scheme)
    }
}