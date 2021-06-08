> **NOTICE: This document is outdated and will be rewritten. (WIP)**

# Build Environment

The environment required to build weex is categorized by platforms.

## Android

* JDK `1.8+`
* Android SDK Platform 28
  * `ANDROID_HOME` must be configured by using `export ANDROID_HOME=/path_to_sdk`
  * Normally, you should install [Android Studio](https://developer.android.com/studio) to get Android SDK Platform 28 installed.
* Gradle 4.10+
* NDK `r18`
  * `ANDROID_NDK_HOME` must be configured by using `export ANDROID_NDK_HOME=/path_to_ndk`
  * Higher version of NDK than `r18` isn't not tested yet.
* CMake 3.4.1+

## iOS

* Install [iOS Environment](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html)
* Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
* XCode Command Tools 8.0+

## Mobile
* NodeJS 4.0+

This article was tested in MacOSX system.

# Build All by Script

// TODO: update this document

# Build for Platforms

You can build all SDKs with one script as described above, or just build for a single platform step by step.

## Build JavaScript Framework

Install npm dependencies (Please install [Node.js](https://nodejs.org/) v8.0.0+ at first):

```bash
npm install
```

Build bundled js framework (include both vue and rax):
```bash
npm run build:jsfm
```

Build specific js framework:
```bash
npm run build:vue
```

```bash
npm run build:rax
```

## Build Android SDK

1. Install the [Android environment](#android).
2. Execute the following command

```
cd android
./gradlew :weex_sdk:clean :weex_sdk:assembleRelease
```

3. Output can be found at `android/sdk/build/outputs/aar`

## Build iOS SDK

Execute command below to compile iOS SDK:
> `$ xcodebuild -project ios/sdk/WeexSDK.xcodeproj -target WeexSDK_MTL`

Then you'll find the iOS library(Framework file) under `ios_sdk/Products`.
