#!/bin/sh

branch_regex="^(master|dev|android|ios|jsfm|html5|doc|website|example|test|all)(-(bugfix|feature|hotfix)-.+)?$"
branch_name=$(git rev-parse --abbrev-ref HEAD)

if ! (echo $branch_name | grep -iqE "$branch_regex"); then
    echo "\nERROR: current branch is \"$branch_name\", name format is not correct!
     
See https://github.com/alibaba/weex/blob/dev/CONTRIBUTING.md#branch-name\n"
    exit 1
fi