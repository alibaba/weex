./test/serve.sh &
npm install macaca-cli --save-dev
npm install macaca-android --save-dev
macaca doctor
adb devices
./test/run.sh