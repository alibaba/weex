#!/bin/bash

echo 'packing weex-js-framework'

config=./html5/runtime/config.js

if ! [ -e $config ]; then
  echo "build JS Framework config"
  npm run build:config
fi

cd dist/weex-js-framework

rm -Rf src
mkdir src
cp ../../.babelrc .
cp -Rf ../../html5/* src/
rm -Rf src/render/browser
rm -Rf src/test

if [ $# -gt 0 ]; then
  if ! [ -e .git ]; then
    echo "init git first"
    git init
  fi
  echo "version specified! $1"
  npm version $1
  rm -Rf .git
  version=$( grep -o -E "\"version\": \"([0-9.]+)\"" package.json | grep -o -E "[0-9.]+" )
  sed -i .tmp "s/\"framework\": \"[0-9.]*\"/\"framework\": \"${version}\"/g" package.json
  rm package.json.tmp
  sed -i .tmp "s/\"framework\": \"[0-9.]*\"/\"framework\": \"${version}\"/g" ../../package.json
  rm ../../package.json.tmp
else
  echo "please pass a <version> or patch | minor | major"
fi

cd ../../

echo 'packing finished.'
