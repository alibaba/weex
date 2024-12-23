#!/bin/bash
# ***********************************************************************
# Copyright: (c) Huawei Technologies Co., Ltd. 2019. All rights reserved.
# script for build
# version: 1.0.0
# change log:
# ***********************************************************************
set -ex
set -o pipefail

#先cd到脚本所在路径，再实现其他处理逻辑，否则该脚本执行会依赖脚本执行的路径
basepath=$(cd `dirname $0`; pwd)
cd $basepath

cd ..

if [[ ${JDK_PATH} != "" ]]; then
	export JAVA_HOME=${JDK_PATH}
	export PATH=${JDK_PATH}/bin:$PATH
fi

#代码根路径 全局参数 codepath
codepath=${WORKSPACE}"/FastAPPCenter"


#----安装打包需要的依赖
cd $codepath
npm install

# 设置编译环境
npm run build:advanced

zip_file=${pkg_name}

cd $codepath/project/advancedApiHsp/advanced_api_hsp/src/main/ets/
mkdir utils

cd $codepath/project/advancedApiHsp/advanced_api_har/src/main/
mkdir ets
cd ets
mkdir utils
cd ..
mkdir resources

cp $codepath/dist/advancedapi.min.js $codepath/project/advancedApiHsp/advanced_api_hsp/src/main/ets/utils/

cp $codepath/dist/advancedapi.min.js $codepath/project/advancedApiHsp/advanced_api_har/src/main/ets/utils/

cd $codepath

mkdir hwsdk

cp -R ${hwsdk}/hmscore ./hwsdk/
cp -R ${hwsdk}/licenses ./hwsdk/
cp -R ${hwsdk}/openharmony ./hwsdk/

cd ./hwsdk/hmscore/4.0.0/toolchains/modulecheck

sed -i 's/atomicService/shared/g' app.json

cd $codepath/project/advancedApiHsp

ohpm install

echo -e "{\r\n \"dependencies\":{\r\n   \"@ohos/hvigor\":\"2.3.0-s\",\r\n  \"@ohos/hvigor-ohos-plugin\":\"2.3.0-s\"\r\n}\r\n}" > package.json

npm install

echo "hwsdk.dir="$codepath/hwsdk > local.properties

node ./node_modules/@ohos/hvigor/bin/hvigor.js --mode project -p product=default assembleApp --parallel --incremental --daemon

node ./node_modules/@ohos/hvigor/bin/hvigor.js --mode module -p product=default assembleHar --parallel --incremental --daemon

cd $codepath
mkdir zipPath
cd zipPath
mkdir hsp
mkdir har
cp $codepath/project/advancedApiHsp/advanced_api_har/build/default/outputs/default/advanced_api_har.har $codepath/zipPath/har/
cp $codepath/project/advancedApiHsp/advanced_api_hsp/build/default/outputs/default/advanced_api_hsp.har $codepath/zipPath/hsp/
cp $codepath/project/advancedApiHsp/advanced_api_hsp/build/default/outputs/default/advanced_api_hsp-default-signed.hsp $codepath/zipPath/hsp/

# 插件工程打包
rm $codepath/project/AdvancedTemplete/entry/src/main/ets/har/advanced_api_har.har
cp $codepath/project/advancedApiHsp/advanced_api_har/build/default/outputs/default/advanced_api_har.har $codepath/project/AdvancedTemplete/entry/src/main/ets/har
mkdir $codepath/project/UniappToAtomicService/project
cp -r $codepath/project/AdvancedTemplete $codepath/project/UniappToAtomicService/project
cd $codepath/project/UniappToAtomicService
zip -r $codepath/zipPath/UniappToAtomicService ./

cd $codepath/zipPath
zip -r ${zip_file} ./

bash ${WORKSPACE}/Script/clouddragon/build2.0/service/getPackageInfo.sh "FastAPPCenter/zipPath" "${zip_file}"

if [[ $releaseVersion == "" ]];then
  echo "This build is snapshot"
  echo buildVersion="snapshot_${ENV_PIPELINE_STARTTIME}" >> ${WORKSPACE}/buildInfo.properties
else
  echo "This build is release"
  echo buildVersion="release_${ENV_PIPELINE_STARTTIME}" >> ${WORKSPACE}/buildInfo.properties
fi