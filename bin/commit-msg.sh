#!/usr/bin/env bash

# Validate commit log
commit_regex='^Merge.+|[+*-] \[(android|ios|jsfm|html5|component|doc|website|example|test|all)\] .{1,50}'

if ! grep -iqE "$commit_regex" "$1"; then
    echo "ERROR: commit log format is not correct!"
    echo "See https://github.com/alibaba/weex/blob/dev/CONTRIBUTING.md#commit-log"
    exit 1
fi
# FIXME no effect after editor (like vim) exits
# ISSUE merge or conflict
