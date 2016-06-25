# Scripts
There are several scripts for end-user and developer.

after install [WeexToolkit](https://www.npmjs.com/package/weex-toolkit), many of them can be easily and flexible processed using system global CMD `weex`.


## For end-user

### clean `*.js` in `examples/build` and `test/build` folders
```shell
npm run clean
```

### create `.we` file(run `npm run create -- -h` for help)**
```shell
npm run create -- [name] -o [directory]
```

### transform `*.we` in `examples` and `test` folders**
```shell
npm run transform
```

#### using WeexToolkit
```shell
$weex test/ -o test/build;
$weex examples/ -o examples/build;
```

`we file` in directory test/ and examples/  will be transform to JS bundle in corresponding directory.

### npm run clean && npm run transform**
```shell
npm run dev
```

### run a file server at `12580` port**
```shell
npm run serve
```

#### using WeexToolkit
```shell
$ weex -s examples/ --port 12580
```
`we file` in directory examples will be transform to JS bundle on every time access.


### run a watcher for `*.we` changed
```shell
npm run watch
```

#### using WeexToolkit
```shell
$ weex test/ -o test/build/ --watch
```

every time you update `we file` in test/ directory  , corresponding JS bundle in  test/build/ directory will be update.


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
