#!/usr/bin/env bash

if ! test -e ./bin/.welcome; then
  touch ./bin/.welcome
  echo '********************************************************************************'
  echo '*                                                                              *'
  echo '*                       Thanks for contributing Weex!                          *'
  echo '*       See https://github.com/alibaba/weex/blob/master/CONTRIBUTING.md        *'
  echo '*                                                                              *'
  echo '********************************************************************************\n'
fi