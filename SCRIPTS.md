# Scripts

There are several scripts for end-user and developer.

## For end-user

**clean `*.js` in `examples/build` and `test/build` folders**
```shell
npm run clean
```

**create `.we` file(run `npm run create -- -h` for help)**
```shell
npm run create -- [name] -o [directory]
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

## For SDK Developer

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
