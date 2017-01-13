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
    reuse: 2,
    app: path.join(__dirname, '..', `../ios/playground/build/Debug-iphonesimulator/WeexDemo.app`)
};

var androidOpts = {
    platformName: 'Android',
    app: path.join(__dirname, '..', `../android/playground/app/build/outputs/apk/playground.apk`)
};

const isIOS = platform === 'ios';

function createDriver(scheme) {
    let host = scheme + "://" + getIpAddress() + ":12581";
    //TODO: IOS
    let xPathPrefixAndroid = "//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]";
    let xPathPrefixIOS = "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]"

    let xPathPrefix = isIOS ? xPathPrefixIOS : xPathPrefixAndroid;

    var wd = require('webdriver-client')(_.merge({}, isIOS ? iOSOpts : androidOpts));

    wd.addPromiseChainMethod('wBack', function () {
        if (platform === 'ios') {
            return this.elementByName('back').sleep(1000).click().sleep(1000)
        }

        return this
            .back();
    });

    //Open weex page by scheme URL
    wd.addPromiseChainMethod('wGet', function (path) {
        return this
            .get(host + "/" + path)
            .catch(function (e) {
                console.log("catch in get")
            })
            .then()
    })

    //Find element by weex dom xpath
    wd.addPromiseChainMethod('wElements', function (xpath) {
        return this.elementsByXPath(mapXPath(xPathPrefix, xpath))
    })

    wd.addPromiseChainMethod('wElement', function (xpath) {
        return this
            .elementsByXPath(mapXPath(xPathPrefix, xpath))
            .then((elems) => {
                return elems[0]
            })
    })

    //Get element text locate by weex dom xpath
    wd.addPromiseChainMethod('textOfXPath', function (xpath) {
        let prop = isIOS ? 'value' : 'description';
        return this
            .elementsByXPath(mapXPath(xPathPrefix, xpath))
            .then((elems) => {
                return elems[0]
            })
            .getProperty(prop)
            .then((data) => {
                return data[prop]
            });
    })

    return wd
}

function mapXPath(xPathPrefix, xpath) {
    let results = [xPathPrefix];
    let parts = xpath.split('/');
    parts.forEach((part) => {
        if (!part || part.length == 0) {
            return
        }
        let nodeParts = part.match(NODE_PATTERN);
        if (!nodeParts) {
            return
        }
        let pos = nodeParts[3] === undefined ? '[1]' : "[" + nodeParts[3] + "]";
        results.push(mapFunc(nodeParts[1]) + pos);
    });
    let result = results.join('/')
    console.log(result)
    return result
}

function getIpAddress() {
    let ifs = os.networkInterfaces()
    let addresses = ["127.0.0.1"];
    for (var i in ifs) {
        let interfaces = ifs[i];
        interfaces.forEach((face) => {
            if (!face.internal && face.family == 'IPv4') {
                addresses.unshift(face.address);
            }
        })
    }
    return addresses[0];
}



module.exports = function (options) {
    options = options || {}

    let scheme = options.scheme || "wxpage"
    console.log(scheme)

    return {
        "wd": createDriver(scheme)
    }
}