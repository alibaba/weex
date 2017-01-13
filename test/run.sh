# /bin/bash -eu

function buildAndroid {
    dir=$(pwd)
    builddir=$dir'/android/playground'
    current_dir=$PWD;
    cd $builddir;
    ./gradlew clean assembleDebug;
    cd $current_dir;
    pwd
}
function runAndroid {
    echo 'Run in Android....'
    buildAndroid
    platform=android macaca run -d $1
}

function buildIOS {
    builddir=$(pwd)'/ios/playground'
    current_dir=$PWD;
    cd $builddir
    product=$(PWD)'/build/Debug-iphoneos/WeexDemo.app'
    pod install --silent 
    [ -f product ] && rm -rf $product
    xcodebuild clean build -quiet -workspace WeexDemo.xcworkspace -sdk iphonesimulator -scheme Pods-WeexDemo SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO

    xcodebuild clean build -quiet -workspace WeexDemo.xcworkspace -sdk iphonesimulator -scheme WeexSDK SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    
    xcodebuild clean build -quiet -arch x86_64 -configuration RELEASE -workspace WeexDemo.xcworkspace -sdk iphonesimulator -scheme WeexDemo SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    echo $product
    cd $current_dir;
}
function runIOS {
    echo 'Run in iOS....'
    echo $1
    buildIOS

    platform=ios macaca run -d $1 --verbose
}

#validate macaca 


#get platform
platform_android='android'
platform=${1:-$platform_android}

#get test folder

#setup devices

#run tests
if [ $platform = $platform_android ]; then
    runAndroid ./test/scripts/
else
    runIOS ./test/scripts/
fi

