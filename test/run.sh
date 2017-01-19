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
    buildAndroid
    platform=android macaca run -d $1
}

#validate macaca 


#get platform

#get test folder

#setup devices

#run tests
runAndroid ./test/scripts/

