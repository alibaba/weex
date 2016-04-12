# Weex

> A framework for building Mobile cross-platform UI.

Support Android 4.1 (API 16) and iOS soon. See [Weex website](http://alibaba.github.io/weex/) for more information. 

## Meet

* Install `/android/playground.apk`.

## Use

* See [Tutorial](http://alibaba.github.io/weex/doc/tutorial).
* See [Weex Documentation](http://alibaba.github.io/weex/doc) for more information.

### Dev



### Android 

0. Prerequisites
    0. Install [Node.js](http://nodejs.org/)
    0. `npm install`
    0. Install [Android Environment](http://developer.android.com/training/basics/firstapp/index.html)
0. Run
    0. `npm run serve`
    0. Open Android Studio
    0. `/java/com.alibaba.weex/WXMainActivity`, modify `CURRENT_IP` to your local IP
    0. `open android/playground`, Click `Run` button
0. Dev
    0. npm run watch
    0. add a new `newExample.we` file in `/examples`
    0. modify `examples/index.we`
        0. add `{name: 'newExample', title: 'New Example'}` for data.cases
        0. change `localBase` to your local IP

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md).