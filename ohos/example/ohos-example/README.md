# harmonyos-shell

20230830：
1、添加advanced_api_har.har包及依赖配置，原advancedapi.min.js直接引用方式修改为引用har包。
2、修改web组件执行js脚本的时机，将onPageEnd修改为onPageBegin，解决生命周期方法报错问题。