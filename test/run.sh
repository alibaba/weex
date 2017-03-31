#!/bin/bash -eu

function buildAndroid {
    dir=$(pwd)
    builddir=$dir'/android/playground'
    current_dir=$PWD;
    cd $builddir;
    ./gradlew assembleDebug;
    cd $current_dir;
    pwd
}
function runAndroid {
    buildAndroid
    platform=android macaca run -d $1
}

function buildiOS {
    builddir=$(pwd)'/ios/playground'
    current_dir=$PWD
    cd $builddir
    product=$(PWD)'/build/Debug-iphoneos/WeexDemo.app'

    pod update
    [ -f product ] && rm -rf product
    
    xcodebuild clean build -quiet -workspace WeexDemo.xcworkspace -sdk iphonesimulator -scheme Pods-WeexDemo SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    xcodebuild clean build -quiet -workspace WeexDemo.xcworkspace -sdk iphonesimulator -scheme WeexSDK SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    xcodebuild clean build -quiet -arch x86_64 -configuration RELEASE -workspace WeexDemo.xcworkspace -sdk iphonesimulator -scheme WeexDemo SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO

    echo $product
    cd $current_dir;

}

function runiOS {
    echo 'Run in iOS...'
    echo $1
    buildiOS
    sleep 1m
    echo 'killAll Simulator......'
    killAll Simulator || echo 'killall failed'
    # ps -ef
    platform=ios macaca run -d $1
}

platform_android='android'
 platform=${1:-$platform_android}
 
 #get test folder
 
 #setup devices
 
 #run tests
 if [ $platform = $platform_android ]; then
     runAndroid ./test/scripts/
 else
     runiOS ./test/scripts/
 fi

