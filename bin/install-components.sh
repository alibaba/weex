#!/bin/sh

if [ -e node_modules ] && ! [ -e node_modules/weex-components ]; then
  ln -sf ../src/components  node_modules/weex-components
fi