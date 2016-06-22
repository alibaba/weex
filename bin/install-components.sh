#!/bin/sh

if [ -e node_modules ] && ! [ -e node_modules/weex-components ]; then
  ln -sf ../dist/weex-components  node_modules/weex-components
fi
