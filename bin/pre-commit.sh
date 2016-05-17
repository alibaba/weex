#!/usr/bin/env bash

sh ./bin/welcome.sh

# Validate email
email=$(git config user.email | grep -E 'alibaba-inc.com|taobao.com|tmall.com|1688.com')
if [ "$email" != "" ];then 
  echo "ERROR: Your git repo email is '$email'. Please run:\n"
  echo "    git config user.email 'your.github@binded.email'\n"
  exit 1
fi