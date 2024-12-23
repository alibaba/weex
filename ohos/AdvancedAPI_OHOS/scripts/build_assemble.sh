#!/bin/bash
# ***********************************************************************
# Copyright: (c) Huawei Technologies Co., Ltd. 2019. All rights reserved.
# script for build
# version: 1.0.0
# change log:
# ***********************************************************************
set -ex
set -o pipefail

# =============================================================================
#进入脚本路径
basepath=$(cd `dirname $0`; pwd)
cd ${basepath}
echo ${basepath}

# =============================================================================
# "执行qafapi.js编译脚本"
bash build_qafapi.sh

# =============================================================================
# "执行libNative.so编译脚本"
bash build_cpp.sh

# =============================================================================
# 流水线build2.0编译后打包

cd ${basepath}

# 新建打包目录
rm -rf ${WORKSPACE}/package_assemble
mkdir -p ${WORKSPACE}/package_assemble
pkg_path=${WORKSPACE}/package_assemble

# 获取qafapi.min.js放到新建打包目录
cp ${WORKSPACE}/${codeRootDir}/dist/qafapi.min.js ${pkg_path}
cp -r ${WORKSPACE}/${codeRootDir}/dist/bridge ${pkg_path}

# 获取libNativeAPI.so放到新建打包目录
cp ${WORKSPACE}/${codeRootDir}/thirdparty/libs/ohos/${OHOS_ARCH}/libNativeAPI.so ${pkg_path}

# 压缩在根目录创建的输出包文件夹并放置在当前脚本目录以qafapi.zip命名
zip -r ${basepath}/qafapi.zip ${pkg_path}

echo "查看待打包目录"
cd ${pkg_path}
ls

echo "查看已经打包目录"
cd ${basepath}
ls

# =============================================================================
# 发布包
bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "${codeRootDir}" "qafapi.zip"