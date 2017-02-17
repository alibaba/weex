echo y | android update sdk --no-ui --all --filter extra-android-m2repository
echo no | android create avd --force -n weexavd -t android-19 --abi armeabi-v7a
$ANDROID_HOME/tools/emulator avd -list-avds
