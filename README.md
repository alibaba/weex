# Weex

## Pre-release Notes

Weex currently is in Pre-release Stage.

We allow you to discuss technical information about Weex, but you should not fork Weex to public repository, write public reviews or post screen shots using the information from current repository(https://github.com/alibaba/weex) , or redistribute weex within any form.

 
> A framework for building Mobile cross-platform UI.

Support Android 4.1 (API 16) and iOS is coming soon. See [Weex website](http://alibaba.github.io/weex/) for more information. 

## Meet Weex

* [Install Playground](http://alibaba.github.io/weex/download.html).

## Use Weex

* See [Tutorial](https://github.com/alibaba/weex/blob/dev/doc/tutorial.md).
* See [Weex Documentation](https://github.com/alibaba/weex/blob/dev/doc/INSTALL.md) for more information.

### Android 

0. Prerequisites
    0. Install [Node.js](http://nodejs.org/) 4.0+
    0. Under project root 
        0. `npm install`, install project 
        0. `./start`
    0. Install [Android Environment](http://developer.android.com/training/basics/firstapp/index.html)
0. Run playground, In Android Studio
    0. Open `android/playground`
    0. In `app/java/com.alibaba.weex/WXMainActivity`, modify `CURRENT_IP` to your local IP
    0. Click <img src="http://gtms04.alicdn.com/tps/i4/TB1wCcqMpXXXXakXpXX3G7tGXXX-34-44.png" height="16" > (`Run` button)
0. [Add an example](./examples/README.md#add-an-example)

## Scripts

### For end-user

**clean `*.js` files in `examples/build` and `test/build` folders** 
```shell
npm run clean
```

**transform `*.we` in `examples` and `test` folders**
```shell
npm run transform
```

**npm run clean && npm run transform**
```shell
npm run dev
```

**run a file server at `12580` port**
```shell
npm run serve
```

**run a watcher for `*.we` changed**
```shell
npm run watch
```

### For SDK Developer

**build js-framework and h5-render**
```shell
npm run build
```

**run test under js-framework and h5-render**
```shell
npm run ci
```

**copy the built files to `playground`**
```shell
npm run copy
```

## For Windows

Please install [Git for Windows](https://git-scm.com/download/win) or [Cygwin](https://www.cygwin.com/).

## Contributing

See [Weex Contributing Guide](./CONTRIBUTING.md) for more information.
