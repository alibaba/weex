## 快速开始

```bash
$ cd my-project && npm i && npm start
```

## 命令解释

```
  npm start
  启动开发服务器，以便在浏览器上预览 weex 页面
  还可以使用 weex playground 扫描二维码，真机预览weex页面

  npm run dev
  在监视模式下打开代码编译任务

  npm run build
  将 pages 下每个页面打包输出到 dist 目录

  npm run build:prod
  将 pages 下每个页面打包压缩输出到 dist 目录

  npm run test
  启动测试运行程序
```

## 如何使用 css 预编译 less/sass/pug

用 `sass` 举例:

```
$ npm i node-sass sass-loader --save
```

那么，你只需要将 `style` 标签改为： `<style lang="sass"><style>`.

## 如何创建新页面

如要新建 detail 页面，那么在 pages 下新建 detail 文件夹，再新建 entry.vue 为入口文件即可

## Weex 模板工程

本模板工程包含了我们建议的 Weex 项目最佳实践。包含以下内容：

【代码目录结构】

|---src
   |---components
      |---foo.vue
   |---pages
      |---index
         |---bar.vue
         |---entry.vue   ##页面的主 Vue 文件，默认主入口 Vue 的名称是 entry.vue，可以在 configs/config.js 中修改
      |---detail
         |---entry.vue
|---star
         |---entry.vue
   |---utils
      |---index.js

【entry.js】默认的入口 js，在 webpack 过程中会动态替换依赖的 vue 文件。

【index.html】预览和 Weex 页面降级时用到的 H5 容器
