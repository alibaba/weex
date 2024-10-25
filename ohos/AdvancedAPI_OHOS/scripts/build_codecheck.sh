#!/bin/sh

#进入到业务编译脚本的执行路径下
cd ../../../scripts
chmod +x *.sh
#方式1：执行业务编译脚本（该脚本只执行C/++的编译操作，不进行打包处理包等业务逻辑）
sh build_cpp.sh
