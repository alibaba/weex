# Weex

## Pre-release Notes

Weex is currently in Pre-release Stage.

We agrees that you may discuss technical information about Weex, except that you may not fork Weex to public repository , write public reviews or post screen shots using information from current repository(https://github.com/alibaba/weex) , redistribute weex within any form.

 
> A framework for building Mobile cross-platform UI.

Support Android 4.1 (API 16) and iOS soon. See [Weex website](http://alibaba.github.io/weex/) for more information. 

## Meet

* Install [Android Playground](http://g.tbcdn.cn/ali-wireless-h5/res/0.0.9/playground.apk).

    <img src="http://gtms03.alicdn.com/tps/i3/TB1uH3EMpXXXXcmXFXXdtp1PXXX-476-476.png" width="160" height="160" >

## Use

* See [Tutorial](http://alibaba.github.io/weex/doc/tutorial).
* See [Weex Documentation](http://alibaba.github.io/weex/doc) for more information.

### Android 

0. Prerequisites
    0. Install [Node.js](http://nodejs.org/) 4.0+
    0. `npm install` to install project
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

## Scripts

**clean `*.js` in the folders of `examples/build` and `test/build`**
```shell
npm run clean
```

**transform `*.we` in the folders of `examples` & `test`**
```shell
npm run transform
```

**build js-framework and h5-render**
```shell
npm run build
```

**copy the builded files to `playground`**
```shell
npm run copy
```

**npm run clean && npm run build**
```shell
npm run dev
```

**will run a file server at `12581` port**
```shell
npm run serve
```

**will run a watcher for `*.we` changed**
```shell
npm run watch
```

**will run test under js-framework and h5-render**
```shell
npm run ci
```

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md).
