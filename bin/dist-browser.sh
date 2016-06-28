#!/user/bin/env bash

echo ''
echo ''
echo 'packing weex-html5 for distribution...'

# src_dir=./html5

base_dir=./dist/weex-html5
dist_dir=${base_dir}/dist

if [ -e $dist_dir ]
  then rm -rf $dist_dir
fi

mkdir $dist_dir

cp ./dist/browser.js ${dist_dir}/weex.js
cp ${dist_dir}/weex.js ${dist_dir}/weex.common.js
echo -e "\nmodule.exports = global.weex;" >> ${dist_dir}/weex.common.js

uglifyjs ${dist_dir}/weex.js -o ${dist_dir}/weex.min.js

# rm -rf ${base_dir}/src
# cp -fR ${src_dir} ${base_dir}/src

echo 'packing finished.'
echo ''
echo ''
