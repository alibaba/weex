#!/bin/bash

cat package.json | grep version | while read -r line ; do
  foo="${line//version/}"
  foo="v${foo//[\" \:\,]/}"
  if [ "x$foo" = "x" ]; then
    exit
  fi

  npm run build && npm run compress

  rm -Rf release
  mkdir release
  pwd
  cd release

  # git init
  # git checkout -b release
  # git pull git@github.com:alibaba/weex_js-framework.git release

  cp ../dist/index.js "./$foo.js"
  cp ../dist/index.js ./latest.js
  cp ../dist/index.mini.js "./$foo.mini.js"
  cp ../dist/index.mini.js ./latest.mini.js

  # git add -A
  # git commit -m "Release $foo"
  # git push -u git@github.com:alibaba/weex_js-framework.git HEAD:release --force
done
