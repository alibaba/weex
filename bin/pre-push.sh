#!/usr/bin/env bash

# Validate branch name
branch_regex="^(\d+\.\d+\.\d+)|(master|dev|android|ios|jsfm|html5|component|doc|website|example|test|all)(-(bugfix|feature|hotfix)-.+)?$"
branch_name=$(git rev-parse --abbrev-ref HEAD)

if ! (echo $branch_name | grep -iqE "$branch_regex"); then
    echo "ERROR: current branch is \"$branch_name\", name format is not correct!
     
See https://github.com/alibaba/weex/blob/dev/CONTRIBUTING.md#branch-name\n"
    exit 1
fi