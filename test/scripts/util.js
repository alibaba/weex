'use strict'

var path = require('path');
var os = require('os')

var platform = process.env.platform || 'android';
platform = platform.toLowerCase();

var iOSOpts = {
  deviceName: 'iPhone 6',
  platformName: 'iOS',
  //reuse:2,
  app: path.join(__dirname, '..', '../ios/playground/build/Debug-iphonesimulator/WeexDemo.app')
};

var androidOpts = {
  platformName: 'Android',
  app: path.join(__dirname, '..', `../android/playground/app/build/outputs/apk/playground.apk`)
};

const isIOS = platform === 'ios';
const isRunInCI = process.env.run_in_ci?true:false;

if(isRunInCI){
    console.log("Running in CI Envirment");
}

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


module.exports = {
    getConfig:function(){
        return isIOS? iOSOpts : androidOpts;
    },
    getDeviceHost:function(){
        return getIpAddress()+":12581";
    },
    getTimeoutMills:function(){
        return ( isRunInCI ? 60 : 10 ) * 60 * 1000;
    },
    getGETActionWaitTimeMills:function(){
        return (isRunInCI ? 120 : 5 ) * 1000;
    }
}
