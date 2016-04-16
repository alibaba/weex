# Weex
 
> A framework for building Mobile cross-platform UI.

Support Android 4.1 (API 16) and iOS soon. See [Weex website](http://alibaba.github.io/weex/) for more information. 

## Meet

* Install [Android Playground](http://g.tbcdn.cn/ali-wireless-h5/res/0.0.4/playground.apk).

    <img src="http://gtms04.alicdn.com/tps/i4/TB16hf.MpXXXXc9XFXXROsDUpXX-488-496.png" height="160" >

## Use

* See [Tutorial](http://alibaba.github.io/weex/doc/tutorial).
* See [Weex Documentation](http://alibaba.github.io/weex/doc) for more information.

### Android 

0. Prerequisites
    0. Install [Node.js](http://nodejs.org/)
    0. `npm install`
    0. Install [Android Environment](http://developer.android.com/training/basics/firstapp/index.html)
0. Run playground
    0. `npm run serve`
    0. In Android Studio
        0. Open `android/playground`
        0. In `app/java/com.alibaba.weex/WXMainActivity`, modify `CURRENT_IP` to your local IP
        0. Click <img src="http://gtms04.alicdn.com/tps/i4/TB1wCcqMpXXXXakXpXX3G7tGXXX-34-44.png" height="16" > (`Run` button)
0. Add an example
    0. `npm run watch`
    0. In `examples`, add a file `newExample.we`  
    0. In `examples/index.we`, add an item `{name: 'newExample', title: 'New Example'}` for array `data.cases`

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md).
